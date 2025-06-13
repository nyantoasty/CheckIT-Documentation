---
title: Quick Reference
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

# CheckIT Quick Reference

> Essential patterns, functions, and rules for rapid development and troubleshooting

## ⚡ 30-Second Setup (AI Assistants & Developers)

```powershell
# 1. Get complete function template
Manage-Templates -Type Codebase -Action Preview  # Select "CheckIT Function Template"

# 2. Use enhanced template workflows
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Audit" -ExportToExcel

# 3. Export your function
Export-ModuleMember -Function @('YourNewFunction')
```

## 🔥 Critical Rules (Never Violate)

| Rule | Correct | Wrong |
|------|---------|-------|
| **String Interpolation** | `"Node: $($node.Name)"` | `"Node: $node.Name"` |
| **Line Continuation** | Single line or splatting | `Backticks` (break with whitespace) |
| **Node Updates** | `New-NodeObject $data` | `$node.Property = $value` |
| **Global Variables** | `NodeList -Action Add` | `$global:nodeList += $node` |
| **Function Export** | Add to `Export-ModuleMember` | Function won't be available |
| **Reporting Pattern** | Separate `Write-TaskLog` and `Set-Report` | `Set-Report -Task` (causes errors) |
| **Excel Dependencies** | `Export-ToExcel` | `Export-Excel` (external module) |
| **GUI Compatibility** | `if ($PromptUser) { Read-Host }` | `Read-Host` (blocks GUI) |
| **Array Safety** | `@(SomeFunction)` | `SomeFunction` (unsafe) |
| **DateTime Formatting** | `(Get-Date).ToString("yyyy-MM-dd")` | `Get-Date -Format "yyyy-MM-dd"` |

## 🚀 Enhanced Template Workflow System

### Quick Template Usage
```powershell
# Execute multiple templates with Excel export
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Enhanced confirmation modes
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm:$false  # Auto-execute
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm "Auto"  # Smart session automation

# Individual template execution
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info" -Confirm:$false

# Template management
Manage-Templates -Type Command -Action List    # List command templates
Manage-Templates -Type Codebase -Action Search # Find development patterns
```

### Enhanced Confirmation System
```powershell
# Three-tier confirmation pattern:
[object]$Confirm = $true   # $true, $false, or "Auto"

# Session automation with YA/NA support
if ($global:WorkflowAutoConfirm.ContainsKey('*')) {
    $shouldProceed = $global:WorkflowAutoConfirm['*']  # Uses session choice
}
```

## 📊 Function Readiness Matrix

| Need This? | Use This Function | Status | Key Features |
|------------|------------------|--------|--------------|
| **Template workflows** | Invoke-TemplateWorkflow | ✅ Ready | Multi-template execution, Excel export, session automation |
| **Template commands** | Invoke-TemplateCommand | ✅ Ready | Enhanced confirmation, workflow integration |
| **Template management** | Manage-Templates | ✅ Ready | Command, Test, Codebase templates with search |
| **Software inventory** | Get-Software | ✅ Ready | Parallel processing, All/Specific modes |
| **SCCM packages** | Get-CCMPackages | ✅ Ready | Interactive management, CIM/WMI fallback |
| **Remote commands** | Invoke-NodeCommand | ✅ Ready | Dry-run support, comprehensive logging |
| **System connectivity** | Test-NodeConnection | ✅ Ready | WinRM/WSMan/Credentials validation |
| **Excel export** | Export-ToExcel | ✅ Ready | No dependencies, multi-sheet support |
| **Software analysis** | Get-SoftwareSampleAnalysis | ✅ Ready | OU-based sampling, statistical analysis |
| **Node management** | NodeList, New-NodeObject | ✅ Ready | Preserves Passman status |
| **Credential handling** | Process-Parallel -UseCredentials | ✅ Ready | Automatic resolution, Passman integration |

## ⚡ The Big 3 Patterns (Master These First)

### 1. Enhanced Confirmation Pattern
```powershell
# ✅ CORRECT: Three-tier confirmation with session memory
function My-CheckITFunction {
    param([object]$Confirm = $true)  # $true, $false, or "Auto"
    
    if ($Confirm -eq $false) {
        $shouldProceed = $true
    } elseif ($Confirm -eq "Auto") {
        # Check session-wide automation state
        if ($global:WorkflowAutoConfirm.ContainsKey('*')) {
            $shouldProceed = $global:WorkflowAutoConfirm['*']
        }
    }
}

# ❌ WRONG: Boolean-only confirmation
[bool]$Confirm = $true  # Limits automation flexibility
```

### 2. Reporting Pattern (SEPARATE task logging from business reporting)
```powershell
# ✅ CORRECT: Two separate calls
$results | Write-TaskLog -Function $function -TaskParams @{} | Out-Null
Set-Report -ReportName $name -Function $function -Data $results | Out-Null

# ❌ WRONG: Causes double reporting errors
Set-Report -Task -TaskParams @{...}
```

### 3. Credential Pattern (Automatic credential management)
```powershell
# ✅ CORRECT: Process-Parallel with -UseCredentials
Process-Parallel -ScriptBlock { 
    param($node, $customParam, $credential, $fqdn)
    # $credential and $fqdn automatically available
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock { ... }
} -UseCredentials

# ❌ WRONG: Manual credential handling
$cred = Get-Credential  # Blocks GUI, no Passman integration
```

## 🔧 Instant Troubleshooting

| Problem | Quick Fix | Common Cause |
|---------|-----------|--------------|
| **"Function not found"** | Add to `Export-ModuleMember`, reload module | Function not exported |
| **Template workflow double-prompting** | Check confirmation inheritance in workflow | Missing `$templateConfirm` parameter |
| **Excel export empty sheets** | Verify template returns `CleanResults` | Template returns verbose output |
| **Session automation not working** | Check `$global:WorkflowAutoConfirm` state | Missing session state management |
| **Command syntax errors** | Use single line or splatting | Backticks with trailing whitespace |
| **Template not found** | Run `Ensure-Templates -Force` | Templates not loaded |
| **Credential problems** | Use `Process-Parallel -UseCredentials` | Manual credential handling |
| **GUI hangs** | Add `if ($PromptUser)` around prompts | CLI-only code in GUI |
| **Double reporting** | Separate `Write-TaskLog` and `Set-Report` | Using `-Task` parameter incorrectly |
| **Node properties lost** | Use `New-NodeObject` for updates | Direct property assignment |

## 📋 Essential Function Calls

### Enhanced Template Workflows
```powershell
# Multi-template execution with Excel export
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Auto-execute without confirmation
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm:$false -ExportToExcel

# Smart session automation (prompts once, remembers choice)
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
```

### Core Data Collection
```powershell
# Software inventory
Get-Software -Nodes $nodes -Mode All -ReportName "Audit"
Get-Software -Nodes $nodes -Mode Specific -SearchStrings @("Chrome","Office")

# SCCM package management
Get-CCMPackages -Nodes $nodes -Mode Interactive
Get-CCMPackages -Nodes $nodes -PackageFilter "*Office*" -Mode Discovery

# User sessions and connectivity
Get-Users -Nodes $nodes -Report
Test-NodeConnection -Nodes $nodes -OnlineOnly
```

### Template Management
```powershell
# Template discovery and management
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search  # Find development patterns
Manage-Templates -Type Test -Action Add

# Individual template execution
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info" -Confirm:$false
Invoke-TemplateCommand -TemplateName "List"  # Show available templates
```

### Remote Operations & Analysis
```powershell
# Remote command execution
Invoke-NodeCommand -Nodes $nodes -Command "Get-Service SCCM*" -DryRun
Invoke-NodeCommand -Nodes $nodes -ScriptBlock { Get-ComputerInfo }

# System tools and analysis
Open-RemoteSystemTools -Node "PC123" -Tool ComputerMgmt
Get-SoftwareSampleAnalysis -SampleSize 5 -Export -BaseOU "Lab"
```

### Node & Credential Management
```powershell
# Node management (always use these - never manipulate $global:nodeList directly)
$node = New-NodeObject @{ Node = "PC123"; Group = "LabA"; Status = "Complete" }
NodeList -Action Add -Nodes @("PC1","PC2") -PromptUser:$false
NodeList -Action Update -Nodes @($updatedNode) -PromptUser:$false

# Credential management
Ensure-GlobalCredStore -PromptUser:$false
Get-ValidCredStatus -Nodes $nodes
Passman -Nodes $nodes  # Retrieves credentials from Passman
```

### Reporting & Export
```powershell
# Excel export with multi-sheet support
Export-ToExcel -Sheets @{ "Audit" = $results; "Summary" = $summary } -Title "Report"
Export-ToExcel -InputObject $data -Columns @("Node","Status","Error")

# Pivot tables and business reporting
Invoke-Pivotizer -ExcelPath $file -SourceSheet "Data" -RowFields @("OU")
Set-Report -ReportName "Audit" -Function $function -Data $results
```

## 🛠️ Small Tweaks Development Philosophy

### ✅ Enhanced Template Integration Pattern
```powershell
# Small enhancement: Add enhanced confirmation to existing function
function Existing-Function {
    param(
        [array]$Nodes,
        [object]$Confirm = $true,  # NEW: Enhanced confirmation support
        [bool]$PromptUser = $true
    )
    
    # NEW: Enhanced confirmation logic
    if ($Confirm -eq $false) {
        $shouldProceed = $true
    } elseif ($Confirm -eq "Auto") {
        # Check session state, prompt with YA/NA options
    }
    
    # UNCHANGED: All existing functionality preserved
    # Existing logic remains exactly the same
}
```

### ✅ Template Workflow Integration Pattern
```powershell
# Small enhancement: Make function template-workflow friendly
foreach ($templateName in $Templates) {
    # NEW: Inherit confirmation settings from workflow
    $templateConfirm = if ($Confirm -eq $false -or $global:WorkflowAutoConfirm.ContainsKey('*')) { 
        $false  # Inherit automation setting
    } else { 
        $true   # Use standard confirmation
    }
    
    # UNCHANGED: Use existing template execution
    $result = Invoke-TemplateCommand -TemplateName $templateName -Confirm:$templateConfirm
}
```

### ❌ Large Refactors to Avoid
```powershell
# ❌ WRONG: Complete rewrites
function Invoke-TemplateWorkflow {
    # Complete rewrite changing fundamental behavior
    # Breaks existing integrations and user expectations
}

# ❌ WRONG: Bypassing core functions
$global:nodeList += $newNode  # Direct manipulation
$global:Reports['Reports'] += $result  # Bypassing Set-Report

# ❌ WRONG: Artificial data batching
Build-Report -Batch $WorkflowName -Result $result  # Don't combine unrelated concerns
```

## 📖 Development Checklist

### Before Starting
- [ ] Check existing templates: `Manage-Templates -Type Command -Action List`
- [ ] Get function template: `Manage-Templates -Type Codebase -Action Preview`
- [ ] Verify template workflows can't solve the need first

### During Development
- [ ] Use enhanced confirmation pattern: `[object]$Confirm = $true`
- [ ] Implement session automation with `$global:WorkflowAutoConfirm`
- [ ] Use `Process-Parallel -UseCredentials` for remote operations
- [ ] Separate `Write-TaskLog` and `Set-Report` calls
- [ ] Use `New-NodeObject` for all node updates

### Before Completion
- [ ] Add to `Export-ModuleMember`
- [ ] Test enhanced confirmation modes: `$true`, `$false`, `"Auto"`
- [ ] Test template workflow integration if applicable
- [ ] Verify session automation works (YA/NA options)
- [ ] Test both CLI (`-PromptUser:$true`) and GUI (`-PromptUser:$false`)

## 🎯 Working Solutions (Production-Tested)

### Enhanced Template Workflow Integration
```powershell
# Session-wide automation with inheritance
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
# User selects "Yes to All" → all subsequent templates auto-execute
# No double-prompting, seamless automation
```

### Process-Parallel Job Management
```powershell
# Multi-method job completion detection
foreach ($j in $jobs) {
    if ($j.Job.State -in @("Completed", "Failed", "Stopped")) {
        $isComplete = $true
    } elseif ($j.Job.HasExited) {
        $isComplete = $true
    } elseif ($jobAge.TotalMinutes -gt 10) {
        Stop-Job -Job $j.Job -Force; $isComplete = $true
    }
}
```

### Excel Multi-Sheet Export Strategy
```powershell
# Template workflow creates comprehensive Excel reports
$sheets = @{}
# Individual template sheets from clean data
foreach ($templateName in $executedTemplates) {
    $cleanSheetName = $templateName -replace '[^A-Za-z0-9_\-]', '_'
    $sheets[$cleanSheetName] = $workflowResults[$templateName]
}
# Summary sheet with all results combined
$sheets["Summary"] = $allResults
Export-ToExcel -Sheets $sheets -Title $WorkflowName
```

---

📖 **Full Documentation**

- [Developer Guide](developer-guide.md) - Enhanced patterns and template-driven development
- [API Reference](api-reference.md) - Complete function library with template workflow system
- [AI Assistant Guide](assistance-guide.md) - Human-AI collaboration with template workflows
- [Troubleshooting](troubleshooting.md) - Solutions including template system troubleshooting
- [Implementation Status](implementation-status.md) - Current completion status (100% complete)

**Last Updated**: 2025-06-09 | **Enhanced**: Template workflow system with session automation | **Status**: Production Ready