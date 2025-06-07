# CheckIT Quick Reference

> Essential patterns, functions, and rules for rapid development and troubleshooting

## ⚡ 30-Second Setup (AI Assistants & Developers)

```powershell
# 1. Get complete function template
Manage-Templates -Type Codebase -Action Preview  # Select "CheckIT Function Template"

# 2. Use automatic credential management
Process-Parallel -ScriptBlock { 
    # $credential and $fqdn automatically available here
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock { ... }
} -UseCredentials

# 3. Export your function
Export-ModuleMember -Function @('YourNewFunction')
```

## 🔥 Critical Rules (Never Violate)

| Rule | Correct | Wrong |
|------|---------|-------|
| **String Interpolation** | `"Node: $($node.Name)"` | `"Node: $node.Name"` |
| **DateTime Formatting** | `(Get-Date).ToString("yyyy-MM-dd")` | `Get-Date -Format "yyyy-MM-dd"` |
| **Null Comparisons** | `$null -eq $variable` | `$variable -eq $null` |
| **Node Updates** | `New-NodeObject $data` | `$node.Property = $value` |
| **Global Variables** | `NodeList -Action Add` | `$global:nodeList += $node` |
| **Function Export** | Add to `Export-ModuleMember` | Function won't be available |
| **Line Continuation** | Single line or splatting | Backticks (break with whitespace) |
| **Excel Dependencies** | `Export-ToExcel` | `Export-Excel` (external module) |
| **GUI Compatibility** | `if ($PromptUser) { Read-Host }` | `Read-Host` (blocks GUI) |
| **Array Safety** | `@(SomeFunction)` | `SomeFunction` (unsafe) |

## 🚀 Function Readiness Matrix

| Need This? | Use This Function | Status | Key Features |
|------------|------------------|--------|--------------|
| **Software inventory** | Get-Software | ✅ Ready | Parallel processing, All/Specific modes |
| **SCCM packages** | Get-CCMPackages | ✅ Ready | Interactive management, CIM/WMI fallback |
| **Remote commands** | Invoke-NodeCommand | ✅ Ready | Dry-run support, comprehensive logging |
| **System connectivity** | Test-NodeConnection | ✅ Ready | WinRM/WSMan/Credentials validation |
| **Excel export** | Export-ToExcel | ✅ Ready | No dependencies, multi-sheet support |
| **Software analysis** | Get-SoftwareSampleAnalysis | ✅ Ready | OU-based sampling, statistical analysis |
| **Remote tools** | Open-RemoteSystemTools | ✅ Ready | MMC integration, credential management |
| **Node management** | NodeList, New-NodeObject | ✅ Ready | Preserves Passman status |
| **Credential handling** | Process-Parallel -UseCredentials | ✅ Ready | Automatic resolution, Passman integration |
| **Template system** | Manage-Templates | ✅ Ready | Command, Test, and Codebase templates |
| **Full diagnostics** | Get-NodeDiagnostics | 🚧 Placeholder | Use Get-NodeStats + Test-NodeConnection |

## ⚡ Most Common Patterns (80% of functions use these)

### The Big 3 Patterns

```powershell
# 1. Reporting Pattern - SEPARATE task logging from business reporting
$results | Write-TaskLog -Function $function -TaskParams @{} | Out-Null
Set-Report -ReportName $name -Function $function -Data $results | Out-Null

# 2. Progress Pattern - CLI/GUI compatible
if ($StatusCallback) {
    & $StatusCallback @{ Activity = "Working"; Status = "Step 1"; PercentComplete = 50 }
} elseif ($PromptUser) {
    Write-Progress -Activity "Working" -Status "Step 1" -PercentComplete 50
}

# 3. Credential Pattern - Automatic credential management
Process-Parallel -ScriptBlock { 
    # $credential and $fqdn automatically available
} -UseCredentials
```

### Essential Function Calls

```powershell
# Data collection
Get-Software -Nodes $nodes -Mode All -ReportName "Audit"
Get-CCMPackages -Nodes $nodes -Mode Interactive
Get-SoftwareSampleAnalysis -SampleSize 5 -Export

# Node management (preserves Passman status)
$node = New-NodeObject $inputData
NodeList -Action Add -Nodes $newNodes -PromptUser:$false

# Remote operations
Invoke-NodeCommand -Nodes $nodes -Command $cmd -DryRun
Test-NodeConnection -Nodes $nodes -OnlineOnly

# Reporting & export
Export-ToExcel -Sheets $data -Title "Report"
Set-Report -ReportName "MyReport" -Function $func -Data $results
```

## 🔧 Instant Troubleshooting

| Problem | Solution | Quick Fix |
|---------|----------|-----------|
| **"Function not found"** | Check Export-ModuleMember | Add to exports, reload module |
| **Command syntax errors** | **Check backticks with trailing whitespace** | **Use single line or splatting** |
| **Progress bar issues** | Duplicate Update-Progress calls | Use consistent progress pattern |
| **Excel export fails** | Wrong module dependency | Use Export-ToExcel not Export-Excel |
| **Credential problems** | Manual credential handling | Use Process-Parallel -UseCredentials |
| **GUI hangs** | Read-Host without PromptUser check | Add `if ($PromptUser)` wrapper |
| **Double reporting** | Mixed reporting approaches | Separate Write-TaskLog and Set-Report |
| **Node properties lost** | Direct property assignment | Use New-NodeObject for updates |
| **Jobs hanging** | Simple HasExited check | Use multi-method completion detection |
| **Array errors** | Unsafe array assumptions | Wrap results in @() |

## 📊 Implementation Status

### ✅ Complete & Ready (95% of Core Functions)

- **Main Tools**: Get-Software, Get-CCMPackages, Invoke-NodeCommand (100%)
- **Diagnostics**: Open-RemoteSystemTools, Test-RemoteSystemAccess, Get-NodeStats (95%)
- **Infrastructure**: NodeList, Process-Parallel, Credential Management (100%)
- **Excel & Reporting**: Export-ToExcel, Invoke-Pivotizer, Set-Report (100%)
- **Templates**: Manage-Templates with Codebase support (100%)

### 🚧 In Progress

- `Get-NodeDiagnostics` (placeholder only - use Get-NodeStats + Test-NodeConnection)

## 🛠️ Development Checklist

### Before Starting

- [ ] Get template: `Manage-Templates -Type Codebase -Action Preview`
- [ ] Use Process-Parallel -UseCredentials for remote operations
- [ ] Plan CLI/GUI compatibility (PromptUser parameter)

### During Development

- [ ] Follow Big 3 patterns (Reporting, Progress, Credential)
- [ ] Use New-NodeObject for all node updates
- [ ] Test both CLI and GUI modes
- [ ] Add StatusCallback parameter for GUI progress

### Before Completion

- [ ] Add to Export-ModuleMember
- [ ] Test error scenarios
- [ ] Update implementation status
- [ ] Document in changelog

## 📖 Working Solutions (Production-Tested)

### Process-Parallel Job Management

```powershell
# Multi-method job completion detection
foreach ($j in $jobs) {
    $isComplete = $false
    try {
        if ($j.Job.State -in @("Completed", "Failed", "Stopped")) {
            $isComplete = $true
        } elseif ($j.Job.HasExited) {
            $isComplete = $true
        } elseif ($jobAge.TotalMinutes -gt 10) {
            Stop-Job -Job $j.Job -Force
            $isComplete = $true
        }
    } catch {
        $isComplete = $true  # If we can't check, assume complete
    }
}
```

### CCM Package Evaluation

```powershell
# CIM-first, WMI-fallback pattern
try {
    $app = Get-CimInstance -Namespace "root\ccm\clientsdk" -ClassName "CCM_Application"
    $result = Invoke-CimMethod -InputObject $app -MethodName "EvaluateApplication"
} catch {
    $app = Get-WmiObject -Namespace "root\ccm\clientsdk" -Class "CCM_Application"
    $result = $app.EvaluateApplication()
}
```

### Windows Explorer + UNC Paths

```powershell
# Store credentials, open with rundll32, auto-cleanup
$cmdkeyAdd = "cmdkey /add:`"$fqdn`" /user:`"Administrator`" /pass:`"$password`""
cmd /c $cmdkeyAdd
& rundll32.exe url.dll,FileProtocolHandler $uncPath
Start-Job -ScriptBlock { Start-Sleep 600; cmd /c "cmdkey /delete:`"$fqdn`"" }
```

### Username Format by Context

```powershell
$formats = @{
    "cmdkey"           = "Administrator"           # No domain prefix
    "PSCredential"     = "DOMAIN\Administrator"   # Full domain format
    "net use"          = ".\Administrator"        # Local context
    "WinRM/PowerShell" = "DOMAIN\Administrator"   # Domain format
}
```

## 🎯 Quick Function Lookup

### Core Data Collection

```powershell
Get-Software -Nodes $nodes -Mode All -ReportName "Audit"
Get-Software -Nodes $nodes -Mode Specific -SearchStrings @("Chrome","Office")
Get-CCMPackages -Nodes $nodes -Mode Interactive
Get-Users -Nodes $nodes -Report
```

### Analysis & Sampling

```powershell
Get-SoftwareSampleAnalysis -SampleSize 5 -Export
Get-SoftwareSampleAnalysis -BaseOU "Lab" -WindowsOnly -CredStoreOnly
```

### Remote Operations

```powershell
Invoke-NodeCommand -Nodes $nodes -Command "Get-Service SCCM*"
Test-NodeConnection -Nodes $nodes -OnlineOnly
Open-RemoteSystemTools -Node "PC123"
Open-RemoteExplorer -Node "PC123"
```

### Reporting & Export

```powershell
Export-ToExcel -Sheets @{ "Data" = $results } -Title "Report"
Invoke-Pivotizer -ExcelPath $file -SourceSheet "Data"
Set-Report -ReportName "Audit" -Function $function -Data $results
```

---

📖 **Full Documentation**

- [Developer Guide](developer-guide.md) - Complete patterns and workflows
- [API Reference](api-reference.md) - Detailed function documentation
- [Troubleshooting](troubleshooting.md) - Solutions for common issues
- [Implementation Status](implementation-status.md) - Current completion status

**Last Updated**: 2025-06-07 | **For Questions**: See troubleshooting guide or contact CheckIT team