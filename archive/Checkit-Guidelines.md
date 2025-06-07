# CheckIT-Core Development Guidelines

## Recent Changes (Last 30 Days)
- **2025-06-06**: Template System Enhancement for Function Development (Enhancement)
- **2025-06-05**: Open-RemoteSystemTools Menu Flow Fix (Fix)  
- **2025-06-05**: Add-ChangelogEntry Function Path Fix (Fix)
- **2025-06-04**: Passman preservation fix (Fix)   
- **2025-06-04**: Credential lookup standardization (Enhancement)

*For complete changelog history, see [CHANGELOG.md](CHANGELOG.md)*

---

## 🚨 Critical Rules & Patterns

### Never Violate These:
- **Module Load Order:** Call `Ensure-CheckITGlobals` ONLY after function definitions (end of module)
- **Global Variables:** NEVER manipulate `$global:nodeList` directly - use `NodeList` function
- **Node Updates:** ALWAYS use `New-NodeObject` for creating/updating nodes (preserves Passman status)
- **String Interpolation:** ALWAYS use `$($variable)` inside double quotes
- **Null Comparisons:** ALWAYS use `$null -eq $variable` (null on left)
- **DateTime:** ALWAYS use `(Get-Date).ToString("format")` not `Get-Date -Format`
- **GUI Calls:** ALWAYS use `-PromptUser:$false` when calling Core functions from GUI
- **Case Sensitivity:** ALWAYS use case-insensitive comparisons for node names (`$_.Node.ToUpper() -eq $target.ToUpper()`)
- **JSON Import:** ALWAYS use `-AsHashtable` parameter in `ConvertFrom-Json` for GUI compatibility
- **Array Safety:** ALWAYS wrap uncertain results in `@()` to ensure array output
- **Automatic Variables:** NEVER use PowerShell automatic variables (`$error`, `$input`, `$matches`, etc.) for custom logic
- **Progress Reporting:** NEVER duplicate Update-Progress calls with conflicting parameters
- **Function Export:** ALWAYS add new functions to Export-ModuleMember at module end
- **StatusCallback Support:** ALWAYS include StatusCallback parameter for GUI compatibility
- **Excel Dependencies:** ALWAYS use `Export-ToExcel` (COM-based, no dependencies) not `Export-Excel`
- **Line Continuation:** NEVER use backticks (`) for line continuation - use single lines or parameter splatting


### 🔄 The Big 3 Patterns (Master These First)

#### 1. Reporting Pattern
```powershell
# ❌ WRONG - Creates double reporting errors:
Set-Report -Task -TaskParams @{...}

# ✅ CORRECT - Two separate calls:
$results | Write-TaskLog -Function $function -TaskParams @{...} | Out-Null
Set-Report -ReportName $ReportName -Function $function -Data $cleanResults | Out-Null
```

#### 2. Progress Pattern  
```powershell
# ✅ CORRECT - CLI/GUI compatible:
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

# ❌ WRONG - Duplicate parameters:
Update-Progress -Status "Processing..." -Current $i -Total $total `
    -Status "Different status..." -Current $i -Total $total  # Duplicate parameter
```

#### 3. Credential Pattern
```powershell
# ✅ CORRECT - Automatic credential handling:
Process-Parallel -ScriptBlock { 
    # $credential and $fqdn automatically available here
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock { ... }
} -UseCredentials

# ❌ WRONG - Manual credential handling:
$cred = Get-Credential  # Blocks GUI, no Passman integration
```

---

## 🚦 Quick Reference (AI Assistants & Developers)

### 30-Second Setup
```powershell
# 1. Get template
Manage-Templates -Type Codebase -Action Preview  # Select "CheckIT Function Template"

# 2. Use credential magic
Process-Parallel -ScriptBlock { /* your code uses $credential, $fqdn */ } -UseCredentials

# 3. Add to exports
Export-ModuleMember -Function @('YourNewFunction')
```

### Most Common Patterns (80% of functions use these)
- ✅ **Process-Parallel -UseCredentials** (95% of remote operations)
- ✅ **New-NodeObject** (preserves Passman status)  
- ✅ **NodeList -Action Add** (never manipulate $global:nodeList)
- ✅ **Export-ToExcel** (built-in, no ImportExcel dependency)

### Function Readiness Matrix
| Need This? | Use This Function | Status | Dependencies |
|------------|------------------|--------|--------------|
| Software inventory | Get-Software | ✅ Ready | Process-Parallel, NodeList |
| Excel export | Export-ToExcel | ✅ Ready | Excel COM (built-in) |
| Package management | Get-CCMPackages | ✅ Ready | Process-Parallel |
| Node sampling | Get-SoftwareSampleAnalysis | ✅ Ready | Get-Software, Export-ToExcel |
| Remote tools | Open-RemoteSystemTools | ✅ Ready | Credential management |

### Quick Function Lookup
```powershell
# Data collection
Get-Software -Nodes $nodes -Mode All -ReportName "Audit"
Get-CCMPackages -Nodes $nodes -Mode Interactive

# Analysis  
Get-SoftwareSampleAnalysis -SampleSize 5 -Export

# Reporting
Export-ToExcel -Sheets $data -Path $file -Title "Report"
Set-Report -ReportName "MyReport" -Function $func -Data $results

# Node management (preserves Passman status)
$node = New-NodeObject $inputData
NodeList -Action Add -Nodes $newNodes -PromptUser:$false

# Credential management
Ensure-GlobalCredStore
$credInfo = Get-NodeCredAndFQDN -Node $nodeName

# Remote operations  
Process-Parallel -ScriptBlock $script -UseCredentials  # 100% reliable job completion
Invoke-NodeCommand -Nodes $nodes -Command $cmd         # Interactive with dry-run
Get-CCMPackages -Nodes $nodes -Mode Interactive        # Enhanced evaluation support
```

### Implementation Status
#### ✅ Complete & Ready (95% of Core Functions)
| Region | Key Functions | Status |
|--------|---------------|--------|
| **Main Tools** | Get-Software, Get-CCMPackages, Invoke-NodeCommand | **100% Complete** |
| **Diagnostics** | Open-RemoteSystemTools, Test-RemoteSystemAccess, Get-NodeStats | **95% Complete** |
| **Infrastructure** | NodeList, Process-Parallel, Credential Management | **100% Complete** |
| **Excel & Reporting** | Export-ToExcel, Invoke-Pivotizer, Set-Report | **100% Complete** |
| **Templates** | Manage-Templates with Codebase support | **100% Complete** |

#### ❌ Not Implemented
- `Get-NodeDiagnostics` (has placeholder - very low priority)

---

## 🏗️ Module Development Guide

### Function Export & Structure
```powershell
# ✅ At end of module - Export ALL implemented functions:
Export-ModuleMember -Function @(
    'CoreFunction1', 'CoreFunction2', 'UtilityFunction1',
    'NewlyAddedFunction'  # Always add new functions here
)

# Initialize globals AFTER exports
Ensure-CheckITGlobals
```

### Region Organization
- **#region Global Variables** - Module-level state and preferences
- **#region Utility Functions** - Helpers used by multiple functions  
- **#region Global Store Management** - NodeList, Reports, CredStore access
- **#region Main Tools** - Core user-facing functionality
- **#region Excel Export** - Reporting and data export
- **Export-ModuleMember** - Function visibility
- **Ensure-CheckITGlobals** - Initialization (LAST)

### Development Checklist
- [ ] Use `Manage-Templates -Type Codebase` for complete function template
- [ ] Use `Process-Parallel -UseCredentials` (handles ALL credential magic automatically)
- [ ] Separate task logging from business reporting (see Big 3 patterns above)
- [ ] Use `New-NodeObject` for node updates (preserves Passman status)
- [ ] Test both CLI (`-PromptUser:$true`) and GUI (`-PromptUser:$false`)
- [ ] **Add StatusCallback parameter** for GUI progress reporting
- [ ] **Avoid duplicate Update-Progress calls** (common mistake in analysis functions)
- [ ] **Export functions in Export-ModuleMember** when complete
- [ ] Update implementation status when complete

### Testing & Validation
```powershell
# GUI Integration Testing
$results = CoreFunction -Nodes $selectedNodes -PromptUser:$false
Refresh-CheckITGrid -Store "NodeList"

# Error handling patterns
Show-Error "Error message"  # Not Write-Host
Set-StatusBarText "Status update"

# Data normalization (required for GUI)
$normalized = ConvertTo-PSCustomObject $hashtableData
$data = Get-Content "file.json" | ConvertFrom-Json -AsHashtable
```

---

## 🛠️ Technical Solutions & Troubleshooting

### Working Solutions

#### Process-Parallel Job Management
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
}

#### Windows Explorer + UNC Paths + Credentials
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

#### CCM Package Management
**Problem:** Interactive SCCM package discovery and deployment.

**Working Solution:**
```powershell
# ✅ Interactive management:
Get-CCMPackages -Nodes $global:nodeList -Mode Interactive

# ✅ Filtered discovery:  
Get-CCMPackages -Nodes $nodes -PackageFilter "*Office*" -Mode Discovery

# ✅ GUI integration:
$packages = Get-CCMPackages -Nodes $nodes -Mode Interactive -PromptUser:$false
# Returns objects with InstallCommand, UninstallCommand, EvaluateCommand properties
```
#### CCM Package Evaluation (Enhanced)
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

#### Username Format by Context
```powershell
$formats = @{
    "cmdkey"           = "Administrator"                    # No domain prefix
    "PSCredential"     = "DOMAIN\Administrator"            # Full domain format  
    "net use"          = ".\Administrator"                 # Local context
    "WinRM/PowerShell" = "DOMAIN\Administrator"            # Domain format
}
```

### Common Anti-Patterns to Avoid
```powershell
# ❌ Missing from exports (function won't be available):
function New-AwesomeFunction { ... }
# No corresponding entry in Export-ModuleMember

# ❌ Fragile backtick line continuation (breaks with trailing whitespace):
$results = SomeFunction `
    -Parameter1 $value1 `
    -Parameter2 $value2 `
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

# ❌ Inconsistent progress reporting:
Update-Progress -Activity "Working" -Status "Step 1"
Write-Progress -Activity "Working" -Status "Step 2"  # Mixed approaches

# ❌ Excel dependency confusion:
Export-Excel -Path $file  # Requires ImportExcel module
# Use: Export-ToExcel -Path $file  # CheckIT built-in, no dependencies

# ❌ GUI incompatibility:
Read-Host "Enter value"  # Blocks GUI
# Use: if ($PromptUser) { Read-Host "Enter value" }

# ❌ Unsafe array assumptions:
$results = SomeFunction
$results[0]  # May fail if $results is null or single object

# ✅ Safe array handling:
$results = @(SomeFunction)
if ($results.Count -gt 0) { $results[0] }

# ❌ Simple job completion check (unreliable):
$done = $jobs | Where-Object { $_.Job.HasExited }

# ✅ Robust job completion with multiple methods:
$done = @()
foreach ($j in $jobs) {
    if ($j.Job.State -in @("Completed", "Failed", "Stopped") -or 
        $j.Job.HasExited -or 
        $jobAge.TotalMinutes -gt 10) {
        $done += $j
    }
}

# ❌ No safety checks (can cause infinite loops):
while ($jobs.Count -gt 0) {
    $done = $jobs | Where-Object { $_.Job.HasExited }
    # Process $done...
}

# ✅ Safety checks prevent hanging:
while ($jobs.Count -gt 0) {
    # Robust completion detection
    if ($done.Count -eq 0) {
        # Force completion logic
        # Ultimate timeout safety
    }
}
### Instant Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| "Function not found" | Check Export-ModuleMember, reload module |
| **Command syntax errors** | **Check for backticks with trailing whitespace - use single line or splatting** |
| Progress bar issues | Look for duplicate Update-Progress calls |
| Excel export fails | Use Export-ToExcel not Export-Excel |
| Credential problems | Use Process-Parallel -UseCredentials |
| GUI hangs | Add `if ($PromptUser)` around Read-Host calls |
| Double reporting | Separate Write-TaskLog and Set-Report calls |
| Node properties lost | Use New-NodeObject for updates |
| Array errors | Wrap uncertain results in @() |
| String interpolation fails | Use $($variable) not $variable |
| DateTime formatting issues | Use (Get-Date).ToString() not Get-Date -Format |

---

## 📝 Change Management & Guidelines

### AI Assistant Guidelines

#### When Analyzing Code:
1. **Check Implementation Status** above before suggesting function usage
2. **Verify Critical Rules** - Check for datetime, string interpolation, null comparison violations
3. **Use Template System** - Reference `Manage-Templates -Type Codebase` for patterns
4. **Think Multi-Method** - When initial approach fails, explore alternative Windows mechanisms
5. **Preserve Node Properties** - Use `New-NodeObject` to maintain Passman status

#### When Suggesting Solutions:
1. **Use Complete Templates** - No placeholders, provide ready-to-use code
2. **Follow Big 3 Patterns** - Reporting, Progress, and Credential patterns
3. **Test Multiple Approaches** - Provide 2-3 ranked alternatives when possible
4. **Document New Patterns** - Add successful solutions to "Technical Solutions"
5. **Update Status** - Mark functions complete when implementing
6. **Check Export Status** - Verify functions are exported in Export-ModuleMember
7. **Validate Progress Patterns** - Ensure no duplicate Update-Progress calls
8. **Consider GUI Requirements** - Include StatusCallback for long-running operations
9. **Use CheckIT Excel Functions** - Prefer Export-ToExcel over Import-Excel module dependencies

#### Critical Syntax Patterns:
```powershell
# ✅ Correct patterns:
(Get-Date).ToString("yyyy-MM-dd")
"Node: $($node.Name)"
if ($null -eq $variable)
NodeList -Action Add -Nodes $newNode
$updatedNode = New-NodeObject $existingNode  # Auto-preserves Passman
$results | Write-TaskLog -Function $func -TaskParams @{...} | Out-Null
Set-Report -ReportName $name -Function $func -Data $results | Out-Null

# ❌ Wrong patterns:
Get-Date -Format "yyyy-MM-dd"           # Use (Get-Date).ToString("yyyy-MM-dd")
"Node: $node.Name"                      # Use "Node: $($node.Name)"
if ($variable -eq $null)                # Use if ($null -eq $variable)
$global:nodeList += $newNode            # Use NodeList -Action Add
$node.Passman = $false                  # Use New-NodeObject (preserves status)
Set-Report -Task -TaskParams @{...}     # Separate Write-TaskLog and Set-Report calls
```

### When Making Changes:
1. **Use Template System** - `Manage-Templates -Type Codebase` for consistent patterns
2. **Test Both Environments** - CLI and GUI compatibility
3. **Update Status** - Mark functions complete in implementation status above
4. **Document Significant Changes** - Use `Add-ChangelogEntry` for major modifications

### Files & Locations:
- **Core Module:** `checkit-core.psm1` - All backend functions
- **GUI Application:** `checkit-guiLIVE.ps1` - Windows Forms interface  
- **Guidelines:** This file - Development standards and status
- **Changelog:** `CHANGELOG.md` - Detailed change history

---
## 📝 Code Documentation & Organization Standards

### Comment Architecture (Follow Process-Parallel Example)

#### 1. Major Section Headers (80-character width)
```powershell
# ====================================================================
# INITIALIZATION & SETUP PHASE
# ====================================================================
```

#### 2. Subsection Headers (60-character width)
```powershell
# ========================================================
# ENHANCED PROGRESS REPORTING WITH NODE TRACKING
# ========================================================
```

#### 3. Inline Documentation (40-character width)
```powershell
# ================================================================
# JOB SLOT MANAGEMENT - Wait for available slots
# ================================================================
```

#### 4. Code Block Comments (Explain the "Why")
```powershell
# Pre-resolve all credentials if requested and no map provided
# This prevents credential lookup delays during parallel execution
if ($UseCredentials -and $CredentialMap.Count -eq 0) {
    # Build credential map for all nodes
    foreach ($obj in $allInput) {
        # Extract node name from input object (supports strings and objects)
        $nodeName = if ($obj -is [string]) { $obj } else { $obj.Node }
```

#### 5. Developer Guidance Comments
```powershell
# ========================================================================
# PIPELINE PROCESSING BLOCKS (PowerShell Pattern)
# ========================================================================
begin {
    # Initialize collections for job management and result aggregation
    $jobs = @()              # Active job tracking with metadata
    $results = @()           # Successful results collection
    $errors = @()            # Error collection for troubleshooting
    $allInput = @()          # Accumulated pipeline input
}
```

### Function Organization Template

```powershell
function Your-Function {
<#
.SYNOPSIS
    Brief one-line description of what the function does.

.DESCRIPTION
    Detailed explanation including:
    - What it accomplishes
    - How it integrates with CheckIT patterns
    - CLI vs GUI compatibility notes
    - Any special considerations

.PARAMETER ParameterName
    Detailed explanation of each parameter, including:
    - Expected data types and formats
    - CLI vs GUI behavior differences
    - Default values and when they apply

.EXAMPLE
    # CLI usage
    Your-Function -Param1 "value" -PromptUser:$true

.EXAMPLE
    # GUI usage
    $results = Your-Function -Param1 "value" -PromptUser:$false -StatusCallback $callback

.NOTES
    - Compatibility notes (CLI/GUI)
    - Dependencies on other CheckIT functions
    - Any special requirements or limitations
    - Performance considerations
#>
    param(
        [Parameter(Mandatory)]
        [ValidateSet("Value1", "Value2")]
        [string]$RequiredParam,
        
        [bool]$PromptUser = $true,
        [scriptblock]$StatusCallback
    )

    # ====================================================================
    # INITIALIZATION & VALIDATION PHASE
    # ====================================================================
    $user = $env:USERNAME
    $timestamp = Get-Date
    $function = "Your-Function"
    
    # 1. ✅ ALWAYS: Ensure credentials
    Ensure-GlobalCredStore -PromptUser:$PromptUser

    # 2. ✅ ALWAYS: Normalize input data
    # [Detailed comments about normalization logic]
    
    # ====================================================================
    # MAIN PROCESSING PHASE
    # ====================================================================
    # [Section comments explaining the core logic]
    
    # ====================================================================
    # RESULTS & CLEANUP PHASE  
    # ====================================================================
    # [Section comments about result processing and cleanup]
    
    return $results
}
```

### Variable Naming & Comments

#### Variable Purpose Documentation
```powershell
# Collection Management
$jobs = @()              # Active job tracking with metadata
$results = @()           # Successful results collection  
$errors = @()            # Error collection for troubleshooting
$allInput = @()          # Accumulated pipeline input

# State Tracking
$completedCount = $results.Count + $errors.Count + 1    # Current progress counter
$nodeNameFromJob = "Node $($completedCount)"            # Display name for progress
$wasValid = $true        # Tracks if credential store was initially valid

# Configuration
$maxRetries = 3          # Maximum connection retry attempts
$timeoutSeconds = 30     # Per-operation timeout limit
```

#### Inline Logic Explanation
```powershell
# Extract node name from input object (supports strings and objects with .Node property)
$nodeName = if ($obj -is [string]) { 
    $obj 
} elseif ($obj.PSObject.Properties['Node']) { 
    $obj.Node 
} else { 
    $null 
}

# Performance optimization: Serial execution for small datasets
# For small datasets (< 2 items), parallel overhead exceeds benefits
if ($total -lt 2) {
    Write-Verbose "Process-Parallel: Using serial execution for $total items (below parallel threshold)"
    # ... serial processing logic
}
```

### Error Handling Documentation

```powershell
try {
    # ========================================================
    # MAIN SCRIPTBLOCK EXECUTION
    # ========================================================
    # Execute the user-provided scriptblock with all prepared arguments
    $result = & $script @execArgs
    
} catch {
    # ========================================================
    # COMPREHENSIVE ERROR HANDLING & REPORTING
    # ========================================================
    $tmpTime = Get-Date
    $errorMessage = $_.Exception.Message
    $errorDetails = $_.Exception.ToString()
    $nodeDuration = ($tmpTime - $nodeStartTime).TotalSeconds
    
    # Create standardized error record with comprehensive information
    $nodeRecord = [PSCustomObject]@{
        Node = $nodeName
        TaskStatus = "Failed"
        LastError = "Error processing node: $($errorMessage)"
        Error = $errorMessage
        ErrorDetails = $errorDetails
        LastErrorTime = $tmpTime
        Duration = $nodeDuration
    }
}
```

### Algorithm Documentation Patterns

#### Decision Logic Documentation
```powershell
# ============================================================
# INTELLIGENT ERROR DETECTION & CLASSIFICATION
# ============================================================
# Determine if output represents an actual error or just non-JSON data
$isError = $false

if ([string]::IsNullOrWhiteSpace($output)) {
    $isError = $true
    Write-Verbose "Process-Parallel: Empty output detected - treating as error"
} elseif ($output -match '(?i)(error|exception|failed|cannot|unable|timeout|access.*denied)') {
    $isError = $true
    Write-Verbose "Process-Parallel: Error keywords detected in output"
} elseif ($output.StartsWith('ERROR:', [StringComparison]::OrdinalIgnoreCase)) {
    $isError = $true
    Write-Verbose "Process-Parallel: Explicit ERROR prefix detected"
}
```

#### Flow Control Documentation
```powershell
# ================================================================
# JOB SLOT MANAGEMENT - Wait for available slots
# ================================================================
# This loop manages the job queue to stay within MaxParallel limits
# Processes completed jobs while waiting for slots
while ($jobs.Count -ge $MaxParallel) {
    $done = $jobs | Where-Object { $_.Job.HasExited }
    
    foreach ($j in $done) {
        # Process each completed job and clean up resources
        # [Additional processing comments]
    }
    
    # Brief pause to prevent excessive CPU usage in tight loops
    Start-Sleep -Milliseconds 200
}
```

### Developer Guidance Comments

#### For Future Maintainers
```powershell
# ========================================================================
# DEVELOPER NOTES & MAINTENANCE GUIDANCE
# ========================================================================
# This function follows CheckIT Guidelines patterns:
# - Uses Process-Parallel -UseCredentials for automatic credential management
# - Separates task logging from business reporting (see Big 3 patterns)
# - Supports both CLI (PromptUser:$true) and GUI (PromptUser:$false) modes
# - Provides StatusCallback for real-time progress reporting in GUI
#
# Key dependencies:
# - Ensure-GlobalCredStore: Must be called before credential operations
# - New-NodeObject: Required for all node creation/updates (preserves Passman status)
# - NodeList -Action Update: Never manipulate $global:nodeList directly
#
# Performance considerations:
# - Uses parallel processing for datasets > 2 items
# - Pre-resolves credentials to prevent delays during parallel execution
# - Includes comprehensive progress reporting for long-running operations
#
# For troubleshooting:
# - All operations logged to TaskLog with detailed timing and error information
# - Use Write-Verbose for diagnostic output
# - StatusCallback provides real-time feedback for GUI integration
```

#### Integration Points
```powershell
# ================================================================
# CHECKIT INTEGRATION POINTS
# ================================================================
# This function integrates with the following CheckIT components:
# 
# 1. Credential Management:
#    - Uses Get-NodeCredAndFQDN for standard credential resolution
#    - Integrates with global CredStore for cached credentials
#    - Supports Passman integration for automated credential retrieval
#
# 2. Node Management:
#    - Updates $global:nodeList via NodeList function (never direct manipulation)
#    - Uses New-NodeObject for all node creation/updates
#    - Preserves existing node properties (especially Passman status)
#
# 3. Reporting System:
#    - Task logging via Write-TaskLog (audit trail)
#    - Business reporting via Set-Report (clean user data)
#    - Excel export compatibility via Export-ToExcel
#
# 4. GUI Integration:
#    - StatusCallback support for progress reporting
#    - PromptUser:$false mode for non-interactive operation
#    - Returns structured objects for data binding
```

### Performance Documentation

```powershell
# ====================================================================
# PERFORMANCE OPTIMIZATION NOTES
# ====================================================================
# Serial vs Parallel Decision:
# - Datasets < 2 items: Serial execution (avoids job overhead)
# - Datasets >= 2 items: Parallel execution with MaxParallel limit
# - Default MaxParallel = 8 (balanced for network and CPU resources)
#
# Credential Pre-resolution:
# - All credentials resolved before parallel execution begins
# - Eliminates credential lookup delays during parallel processing
# - Credential filtering option to skip nodes without valid credentials
#
# Memory Management:
# - Results processed and cleaned immediately after job completion
# - Temp files cleaned up automatically
# - Job objects removed from tracking array after processing
#
# Network Optimization:
# - Connection pooling via credential pre-resolution
# - Configurable timeout values to prevent hanging
# - Graceful degradation for unreachable nodes
```

### Documentation Checklist

When adding comments to any function, ensure:

- [ ] **Major sections** clearly delineated with 80-character headers
- [ ] **Algorithm decisions** explained (why this approach?)
- [ ] **Integration points** documented (how does it connect to other CheckIT components?)
- [ ] **Performance considerations** noted (why this optimization?)
- [ ] **Error handling strategy** explained (how does it handle failures?)
- [ ] **CLI vs GUI differences** documented (behavioral variations)
- [ ] **Dependencies** clearly listed (what does it require?)
- [ ] **Future maintenance notes** included (what should maintainers know?)
- [ ] **Variable purposes** explained (especially complex data structures)
- [ ] **Flow control logic** documented (especially loops and conditionals)

### Comment Anti-Patterns to Avoid

```powershell
# ❌ Bad: States what the code does without explaining why
$result = Get-Software -Nodes $nodes  # Gets software from nodes

# ✅ Good: Explains the purpose and decision
# Query software inventory using parallel processing for performance
# This provides the baseline data for compliance analysis
$result = Get-Software -Nodes $nodes -Mode All

# ❌ Bad: Obvious comment that adds no value
$count = $count + 1  # Increment count

# ✅ Good: Explains the business logic
$processedCount++  # Track completion for progress reporting

# ❌ Bad: Outdated or incorrect comment
# TODO: Fix this hack (comment from 2+ years ago on production code)

# ✅ Good: Current, actionable guidance
# Future enhancement: Consider adding retry logic for transient network failures
```

This documentation standard ensures that every function becomes as readable and maintainable as the Process-Parallel example, making the entire codebase accessible to both AI assistants and human developers.
---

*This organized version preserves all critical troubleshooting knowledge while improving accessibility for both AI assistants and developers through logical flow and strategic information placement.*