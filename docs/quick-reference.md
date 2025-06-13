---
layout: default
---

<link rel="stylesheet" href="assets/style.css">

---

# Quick Reference

> Comprehensive guide to patterns, templates, and functions for development, troubleshooting, and documentation

## 🧭 Navigation & Assistance

### Getting Help with ChatModes

| Need Help With | Use This ChatMode | Focus Areas |
|----------------|-------------------|-------------|
| **Development** | Developer | Template creation, workflows, coding patterns |
| **Documentation** | Documenter | Help files, XML documentation, markdown updates |
| **Troubleshooting** | Developer | Error analysis, debugging, pattern adherence |

### Quick Setup (Developers & Assistants)

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

## 🏗️ Core Architectural Patterns

### The Node Object Pattern

```powershell
# ✅ CORRECT: Use New-NodeObject for all node operations
$node = New-NodeObject @{ Node = "PC123"; Group = "Lab"; Status = "Complete" }
NodeList -Action Update -Nodes @($node) -CreateIfMissing:$false

# ❌ WRONG: Direct manipulation
$global:nodeList += @{ Node = "PC123" }  # Breaks type consistency
$node.Status = "Complete"  # Doesn't update global store
```

### The Process-Parallel Pattern

```powershell
# ✅ CORRECT: Automatic credential management
$results = $nodes | Process-Parallel -ScriptBlock {
    param($node, $customParam, $credential, $fqdn)
    # $credential and $fqdn automatically populated with correct credentials
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock { ... }
} -ArgumentList $customParam -UseCredentials -MaxParallel 8

# ❌ WRONG: Manual credential management
$cred = Get-Credential  # Blocks GUI, no Passman integration
```

### The Split Reporting Pattern

```powershell
# ✅ CORRECT: Separate task logging from business reporting
$results | Write-TaskLog -Function $function -TaskParams @{} | Out-Null
Set-Report -ReportName $name -Function $function -Data $results | Out-Null

# ❌ WRONG: Causes double reporting errors
Set-Report -Task -TaskParams @{...}
```

### The Status Update Pattern

```powershell
# ✅ CORRECT: Use TaskStatus for progress tracking
foreach ($node in $global:nodeList) {
    if ($nodeNames -contains $node.Node) {
        $node.TaskStatus = 'Pending'  # During processing
        $node.TaskStatus = 'Complete'  # After success
        $node.TaskStatus = 'Error'  # After error
        $node.TaskStatus = $null  # When done
    }
}

# ❌ WRONG: Missing status updates
# No TaskStatus updates prevents GUI progress tracking
```

## 📊 Excel Reporting Best Practices

### Excel Compatibility Pattern

For maximum compatibility with Excel pivot tables and slicers:

```powershell
# Step 1: Clean data during report creation
Set-Report -ReportName "System Inventory" -Function "Get-SystemInfo" -Data $results -CleanData

# Step 2: Export with automatic column name cleaning
$report = Get-CheckITStore -Store Reports | Where-Object { $_.ReportName -eq "System Inventory" }
$report.Data | Export-ToExcel -Title "System_Inventory"

# Step 3: Add pivot tables and slicers (optional)
$excelFile = $report.Data | Export-ToExcel -Title "System_Inventory" -PromptUser:$false
Invoke-Pivotizer -ExcelPath $excelFile -SourceSheet "System_Inventory" -RowFields @("OS") -DataFields @("Count")
```

### Column Name Cleaning Rules

The CheckIT Excel export system automatically handles these Excel limitations:

| Excel Limitation | How CheckIT Handles It |
|-----------------|------------------------|
| 31-character name limit | Trims names to 31 chars |
| No special characters | Replaces with underscores |
| No duplicate column names | Adds numeric suffix (_1,_2) |
| Spaces cause pivot issues | Converts to underscores |

### Template Workflow Excel Integration

```powershell
# Best practice for template workflows with Excel
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Add pivot tables afterward
$result = Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info") -WorkflowName "OS_Report" -ExportToExcel
Invoke-Pivotizer -ExcelPath $result.ExcelFile -SourceSheet "Get_OS_Info" -RowFields @("OS") -DataFields @("Count")
```

## 📋 Essential Function Calls

### Template Workflows

```powershell
# Multi-template execution with Excel export
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Auto-execute without confirmation
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm:$false -ExportToExcel

# Smart session automation (prompts once, remembers choice)
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
```

### Documentation Functions

```powershell
# Add standardized changelog entry
Add-ChangelogEntry -Summary "Added new feature" -Type "Feature" -Version "1.5.0" `
    -KeyChanges @("Added new template support", "Fixed report formatting") `
    -FilesChanged @("checkit-core.psm1", "templateInfo.md") -Impact "Medium"

# Generate documentation analysis prompt
Generate-DocumentationAnalysisPrompt -Summary "Template update" -Type "Enhancement" `
    -FunctionsAdded @("New-TemplateFunction") -Impact "Documentation needs updating"
```

### SCCM Integration

```powershell
# SCCM package management
Get-CCMPackages -Nodes $nodes -Mode Interactive
Get-CCMPackages -Nodes $nodes -PackageFilter "*Office*" -Mode Discovery

# Package deployment
Invoke-CCMPackageDeployment -Nodes $nodes -Method Install -Mode Specific -SearchStrings @("Office")
Get-AvailablePackages -SearchPattern "*Chrome*"
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

### Exporting to Excel

```powershell
# Excel export with pivot tables and slicers
Export-ToExcel -InputObject $results -Title "Analysis" 
Invoke-Pivotizer -ExcelPath "C:\Transcripts\Analysis_*.xlsx" -SourceSheet "Sheet1" `
    -RowFields @("Status") -DataFields @("Count") -SlicerFields @("Department")

# Template workflow with automatic Excel export
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") `
    -WorkflowName "Audit" -ExportToExcel -Confirm:$false

# Add interactive pivot table and slicers to workflow output
$excelFile = Get-ChildItem "C:\Transcripts\Audit_*.xlsx" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Invoke-Pivotizer -ExcelPath $excelFile -SourceSheet "Get_OS_Info" -RowFields @("OS") -SlicerFields @("Node")

# Advanced: Customized multi-sheet exports
$sheets = @{
    "SystemInfo" = $osResults
    "DiskSpace" = $diskResults 
    "Summary" = $allResults
}
$excelFile = Export-ToExcel -Sheets $sheets -Title "SystemAudit" -PromptUser:$false
```

### Adding a Pivot Table or Slicers

```powershell
# Template workflow with multi-sheet export, pivot tables and slicers
$sheets = @{}
# Individual template sheets from clean business data
foreach ($templateName in $executedTemplates) {
    $cleanSheetName = $templateName -replace '[^A-Za-z0-9_\-]', '_'
    $sheets[$cleanSheetName] = $workflowResults[$templateName]
}
# Summary sheet with full audit metadata
$sheets["Summary"] = $allFullResults
$excelFile = Export-ToExcel -Sheets $sheets -Title $WorkflowName -PromptUser:$false

# Add pivot table and slicers to first data sheet
Invoke-Pivotizer -ExcelPath $excelFile -SourceSheet ($sheets.Keys | Select-Object -First 1) `
    -RowFields @("Status", "Group") -DataFields @("Count") -SlicerFields @("Node", "Date")
```

---

📖 **Full Documentation**

- [Developer Guide](https://nyantoasty.github.io/CheckIT-Documentation/docs/developer-guide.html) - Enhanced patterns and template-driven development
- [API Reference](https://nyantoasty.github.io/CheckIT-Documentation/docs/api-reference.html) - Complete function library with template workflow system
- [Assistance Guide](https://nyantoasty.github.io/CheckIT-Documentation/docs/assistance-guide.html) - Human-AI collaboration with template workflows
- [Troubleshooting](https://nyantoasty.github.io/CheckIT-Documentation/docs/troubleshooting.html) - Solutions including template system troubleshooting
- [ChatModes Reference](https://nyantoasty.github.io/CheckIT-Documentation/docs/chatmodes.html) - Using specialized ChatModes for development assistance

**Last Updated**: 2025-06-12 | **Enhanced**: Template system with 34 templates, improved documentation integration | **Status**: Beta v1.5.0 (open to request)
