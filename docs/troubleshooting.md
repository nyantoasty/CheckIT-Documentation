# CheckIT Troubleshooting Guide

> Solutions, fixes, and anti-patterns for CheckIT-Core development and deployment

## 🔥 Instant Troubleshooting Table

| Problem | Solution | Common Cause |
|---------|----------|--------------|
| "Function not found" | Check Export-ModuleMember, reload module | Function not exported |
| **Command syntax errors** | **Check for backticks with trailing whitespace - use single line or splatting** | **Fragile line continuation** |
| Progress bar issues | Look for duplicate Update-Progress calls | Mixed progress approaches |
| Excel export fails | Use Export-ToExcel not Export-Excel | Wrong module dependency |
| Credential problems | Use Process-Parallel -UseCredentials | Manual credential handling |
| GUI hangs | Add `if ($PromptUser)` around Read-Host calls | CLI-only code in GUI |
| Double reporting | Separate Write-TaskLog and Set-Report calls | Mixing task and business reporting |
| Node properties lost | Use New-NodeObject for updates | Direct property assignment |
| Array errors | Wrap uncertain results in @() | Unsafe array assumptions |
| String interpolation fails | Use $($variable) not $variable | Direct variable reference |
| DateTime formatting issues | Use (Get-Date).ToString() not Get-Date -Format | Wrong DateTime method |
| Jobs hanging at 8/47 nodes | Use robust job completion detection | Simple HasExited check only |

## 🛠️ Working Solutions (Production-Tested)

### Process-Parallel Job Management
**Problem:** Jobs hanging at specific counts (e.g., 8/47 nodes) due to incomplete job detection.

**Working Solution:**
```powershell
# ✅ Robust job completion detection with multiple methods:
foreach ($j in $jobs) {
    $isComplete = $false
    try {
        # Method 1: Check job state (most reliable)
        if ($j.Job.State -in @("Completed", "Failed", "Stopped")) {
            $isComplete = $true
        }
        # Method 2: Check if job has exited (backup)
        elseif ($j.Job.HasExited) {
            $isComplete = $true
        }
        # Method 3: Timeout detection (safety net)
        elseif ($jobAge.TotalMinutes -gt 10) {
            Stop-Job -Job $j.Job -Force
            $isComplete = $true
        }
    } catch {
        # If we can't check status, assume complete
        $isComplete = $true
    }
}

# ✅ Safety checks prevent infinite loops:
if ($done.Count -eq 0) {
    # Force completion check and ultimate timeout logic
    Start-Sleep -Milliseconds 500
    $forceCheck = $true
}
```

**Why This Works:**
- **Multiple detection methods** prevent single-point-of-failure
- **Timeout safety net** prevents infinite hanging
- **Exception handling** gracefully handles job state errors
- **Force completion logic** breaks infinite loops

### Windows Explorer + UNC Paths + Credentials
**Problem:** Opening remote file shares programmatically with authentication.

**Working Solution:**
```powershell
# ✅ Store credentials first:
$cmdkeyAdd = "cmdkey /add:`"$fqdn`" /user:`"Administrator`" /pass:`"$password`""
cmd /c $cmdkeyAdd

# ✅ Open with rundll32 (most reliable):
& rundll32.exe url.dll,FileProtocolHandler $uncPath

# ✅ Auto-cleanup:
Start-Job -ScriptBlock { Start-Sleep 600; cmd /c "cmdkey /delete:`"$fqdn`"" }
```

**Key Insights:**
- **cmdkey username:** Use `Administrator` not `.\Administrator`
- **rundll32 FileProtocolHandler:** Same as Windows Run dialog - most reliable
- **Alternative methods ranked:** rundll32 > Invoke-Item > cmd start > explorer.exe
- **Auto-cleanup:** Prevents credential store pollution

### CCM Package Evaluation (Enhanced)
**Problem:** CCM package evaluation failures and false error detection.

**Working Solution:**
```powershell
# ✅ CIM-first, WMI-fallback evaluation pattern:
try {
    $app = Get-CimInstance -Namespace "root\ccm\clientsdk" -ClassName "CCM_Application" | 
           Where-Object { $_.Name -eq $packageName -and $_.Publisher -eq $publisher }
    if ($app) {
        $result = Invoke-CimMethod -InputObject $app -MethodName "EvaluateApplication"
        return "CIM Evaluation result: $($result.ReturnValue) (0=Success)"
    }
} catch {
    # Fallback to WMI
    $app = Get-WmiObject -Namespace "root\ccm\clientsdk" -Class "CCM_Application" | 
           Where-Object { $_.Name -eq $packageName -and $_.Publisher -eq $publisher }
    if ($app) {
        $result = $app.EvaluateApplication()
        return "WMI Evaluation result: $($result.ReturnValue) (0=Success)"
    }
}

# ✅ Enhanced error detection for CCM data:
elseif ($output -match '(?i)(InstallState|EvaluationState|PSComputerName|Name.*SoftwareVersion)') {
    # This looks like structured CCM/WMI data - NOT an error
    $isError = $false
}
```

**Why This Works:**
- **CIM-first approach** uses modern PowerShell capabilities
- **WMI fallback** ensures compatibility with older systems
- **Enhanced error detection** prevents false positives with structured data
- **Proper error classification** distinguishes data from actual errors

### Username Format by Context
**Problem:** Credential authentication fails due to wrong username format for different Windows contexts.

**Working Solution:**
```powershell
$formats = @{
    "cmdkey"           = "Administrator"                    # No domain prefix
    "PSCredential"     = "DOMAIN\Administrator"            # Full domain format  
    "net use"          = ".\Administrator"                 # Local context
    "WinRM/PowerShell" = "DOMAIN\Administrator"            # Domain format
    "MMC Tools"        = "Administrator"                   # Simple format for MMC
}

# ✅ Context-specific credential formatting:
switch ($context) {
    "cmdkey" { $username = "Administrator" }
    "PSCredential" { $username = "$($env:USERDNSDOMAIN)\Administrator" }
    "net use" { $username = ".\Administrator" }
    default { $username = "$($env:USERDNSDOMAIN)\Administrator" }
}
```

**Key Insights:**
- **Different tools expect different formats** - test each context
- **cmdkey is picky** about domain prefixes (use none)
- **PSCredential needs full domain** for remote operations
- **MMC tools prefer simple format** without domain prefix

## ❌ Common Anti-Patterns & Fixes

### Line Continuation Fragility
```powershell
# ❌ Fragile backtick line continuation (breaks with trailing whitespace):
$results = SomeFunction `
    -Parameter1 $value1 `
    -Parameter2 $value2 `  # Invisible trailing space breaks this
    -Parameter3 $value3

# ✅ Robust single-line or splatting approach:
$results = SomeFunction -Parameter1 $value1 -Parameter2 $value2 -Parameter3 $value3

# ✅ Or use parameter splatting for complex calls:
$params = @{
    Parameter1 = $value1
    Parameter2 = $value2
    Parameter3 = $value3
}
$results = SomeFunction @params
```

### Function Export Forgetting
```powershell
# ❌ Missing from exports (function won't be available):
function New-AwesomeFunction { 
    # Function implementation here
}
# No corresponding entry in Export-ModuleMember = function won't be available

# ✅ Always add to exports:
Export-ModuleMember -Function @(
    'ExistingFunction1', 'ExistingFunction2',
    'New-AwesomeFunction'  # Always add new functions here
)
```

### Progress Reporting Inconsistency
```powershell
# ❌ Inconsistent progress reporting:
Update-Progress -Activity "Working" -Status "Step 1"
Write-Progress -Activity "Working" -Status "Step 2"  # Mixed approaches

# ❌ Duplicate parameters (common mistake):
Update-Progress -Status "Processing..." -Current $i -Total $total `
    -Status "Different status..." -Current $i -Total $total  # Duplicate parameter

# ✅ Consistent CLI/GUI pattern:
if ($StatusCallback) {
    & $StatusCallback @{
        Activity = "Processing items"
        Status = "Item $($i+1) of $($total): $($item.Name)"
        PercentComplete = [math]::Round(($i+1) / $total * 100, 1)
    }
} elseif ($PromptUser) {
    Write-Progress -Activity "Processing items" `
        -Status "Item $($i+1) of $($total): $($item.Name)" `
        -PercentComplete ([math]::Round(($i+1) / $total * 100, 1))
}
```

### Excel Module Confusion
```powershell
# ❌ Excel dependency confusion:
Export-Excel -Path $file  # Requires ImportExcel module

# ✅ Use CheckIT built-in:
Export-ToExcel -Path $file -Title "Report"  # CheckIT built-in, no dependencies
```

### GUI Incompatibility
```powershell
# ❌ GUI incompatibility:
Read-Host "Enter value"  # Blocks GUI
$cred = Get-Credential   # Blocks GUI

# ✅ CLI/GUI safe patterns:
if ($PromptUser) { 
    $value = Read-Host "Enter value" 
} else {
    # Return error or use default for GUI
    throw "Value required but PromptUser is false"
}

# Use Process-Parallel -UseCredentials for automatic credential handling
```

### Array Safety Issues
```powershell
# ❌ Unsafe array assumptions:
$results = SomeFunction
$results[0]  # May fail if $results is null or single object

# ✅ Safe array handling:
$results = @(SomeFunction)
if ($results.Count -gt 0) { 
    $results[0] 
}
```

### Job Completion Detection Problems
```powershell
# ❌ Simple job completion check (unreliable):
$done = $jobs | Where-Object { $_.Job.HasExited }

# ❌ No safety checks (can cause infinite loops):
while ($jobs.Count -gt 0) {
    $done = $jobs | Where-Object { $_.Job.HasExited }
    # Process $done...
    # If no jobs complete, this loops forever
}

# ✅ Robust job completion with multiple methods:
$done = @()
foreach ($j in $jobs) {
    if ($j.Job.State -in @("Completed", "Failed", "Stopped") -or 
        $j.Job.HasExited -or 
        $jobAge.TotalMinutes -gt 10) {
        $done += $j
    }
}

# ✅ Safety checks prevent hanging:
while ($jobs.Count -gt 0) {
    # Robust completion detection
    if ($done.Count -eq 0) {
        # Force completion logic
        Start-Sleep -Milliseconds 500
        # Ultimate timeout safety
        if ($overallDuration.TotalMinutes -gt 30) {
            Write-Warning "Job timeout reached, forcing completion"
            break
        }
    }
}
```

## 🔍 Diagnostic Techniques

### Function Availability Testing
```powershell
# Check if function is properly exported
Get-Command Get-Software -Module CheckIT-Core

# Verify module load and function availability
Get-Module CheckIT-Core | Select-Object -ExpandProperty ExportedFunctions

# Test function with minimal parameters
Get-Software -Nodes @("localhost") -Mode All -PromptUser:$false
```

### Credential Troubleshooting
```powershell
# Check credential store status
Ensure-GlobalCredStore -PromptUser:$false

# Verify specific node credentials
$credInfo = Get-NodeCredAndFQDN -Node "PC123" -PromptUser:$false
Write-Host "Status: $($credInfo.Status), Error: $($credInfo.ErrorMessage)"

# Test credential validity
Get-ValidCredStatus -Nodes @("PC123")
```

### Progress Reporting Debug
```powershell
# Test StatusCallback functionality
$testCallback = {
    param($status)
    Write-Host "GUI Progress: $($status.Activity) - $($status.Status) ($($status.PercentComplete)%)"
}

# Use in function call
$results = Get-Software -Nodes @("PC123") -PromptUser:$false -StatusCallback $testCallback
```

### Module Load Order Verification
```powershell
# Check if Ensure-CheckITGlobals is called after function definitions
$moduleContent = Get-Content "$PSScriptRoot\checkit-core.psm1" -Raw
$globalsPosition = $moduleContent.IndexOf("Ensure-CheckITGlobals")
$exportPosition = $moduleContent.IndexOf("Export-ModuleMember")

if ($globalsPosition -lt $exportPosition) {
    Write-Warning "❌ Ensure-CheckITGlobals called before exports - fix module load order"
} else {
    Write-Host "✅ Correct module load order" -ForegroundColor Green
}
```

## 🚨 Emergency Fixes

### Module Won't Load
```powershell
# Force module removal and reload
Remove-Module CheckIT-Core -Force -ErrorAction SilentlyContinue
Import-Module "$PSScriptRoot\checkit-core.psm1" -Force

# Check for syntax errors
$errors = $null
$null = [System.Management.Automation.PSParser]::Tokenize((Get-Content "$PSScriptRoot\checkit-core.psm1" -Raw), [ref]$errors)
$errors | Where-Object { $_.Type -eq "ParseError" }
```

### GUI Hanging Issues
```powershell
# Find blocking calls in functions
Select-String -Path "$PSScriptRoot\checkit-core.psm1" -Pattern "Read-Host|Get-Credential" -Context 2

# Check for missing PromptUser conditions
Select-String -Path "$PSScriptRoot\checkit-core.psm1" -Pattern "Read-Host" | 
    Where-Object { $_.Line -notmatch "PromptUser" }
```

### Process-Parallel Debugging
```powershell
# Enable verbose output for job debugging
$VerbosePreference = "Continue"
$results = Process-Parallel -ScriptBlock { Get-Date } -InputObject @("test") -Verbose

# Check for hanging jobs manually
Get-Job | Where-Object { $_.State -eq "Running" }

# Force cleanup if necessary
Get-Job | Where-Object { $_.State -eq "Running" } | Stop-Job -Force
Get-Job | Remove-Job -Force
```

## 📋 Troubleshooting Checklist

### Before Reporting Issues
- [ ] **Module reload** - Remove and re-import CheckIT-Core module
- [ ] **Function exports** - Verify function is in Export-ModuleMember list
- [ ] **Syntax check** - Look for backticks with trailing whitespace
- [ ] **Parameter validation** - Check for duplicate parameters in calls
- [ ] **Credential status** - Run `Ensure-GlobalCredStore` 
- [ ] **Progress patterns** - Verify no duplicate Update-Progress calls
- [ ] **CLI vs GUI mode** - Test with both `-PromptUser:$true` and `-PromptUser:$false`
- [ ] **Array safety** - Wrap uncertain results in `@()`
- [ ] **Error patterns** - Check if using CheckIT error handling patterns

### For New Function Development
- [ ] **Template usage** - Start with `Manage-Templates -Type Codebase`
- [ ] **Big 3 patterns** - Implement Reporting, Progress, and Credential patterns
- [ ] **Export addition** - Add function to Export-ModuleMember
- [ ] **Testing matrix** - Test CLI, GUI, and error scenarios
- [ ] **Documentation** - Add help comments and parameter descriptions
- [ ] **Status update** - Mark function complete in implementation status

### For Performance Issues
- [ ] **Job completion** - Use robust multi-method job detection
- [ ] **Credential pre-resolution** - Let Process-Parallel handle credentials
- [ ] **Parallel thresholds** - Use serial execution for small datasets
- [ ] **Timeout safety** - Implement ultimate timeout safeguards
- [ ] **Memory cleanup** - Process and remove completed jobs immediately

## 📖 Error Message Directory

### Common Error Messages & Solutions

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "The term 'FunctionName' is not recognized" | Function not exported | Add to Export-ModuleMember |
| "Cannot bind parameter 'Status'" | Duplicate parameters | Check for duplicate Update-Progress calls |
| "Exception calling 'EvaluateApplication'" | CCM evaluation failure | Use CIM-first, WMI-fallback pattern |
| "Access denied" with credentials | Wrong username format | Use context-appropriate username format |
| "Jobs hanging at X/Y nodes" | Incomplete job detection | Use robust job completion detection |
| "Cannot index into a null array" | Array safety issue | Wrap results in @() |
| "String interpolation failed" | Wrong syntax | Use $($variable) not $variable |
| "DateTime formatting error" | Wrong method | Use (Get-Date).ToString() not Get-Date -Format |

---

📖 **Documentation Index**
- [Developer Guide](developer-guide.md) - Core patterns and development workflow
- [AI Assistant Guide](assistance-guide.md) - AI-specific development guidelines  
- [Implementation Status](implementation-status.md) - Current completion status
- [Main README](../README.md) - Project overview and quick start

**Last Updated**: 2025-06-07 | **Next Review**: After major changes or reported issues

---
