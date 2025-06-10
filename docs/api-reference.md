---
title: API Reference
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

# CheckIT API Reference

> Complete function library with usage examples, status, and dependencies

## 🚀 Quick Function Lookup

### Core Data Collection
```powershell
# Software inventory
Get-Software -Nodes $nodes -Mode All -ReportName "Audit"
Get-Software -Nodes $nodes -Mode Specific -SearchStrings @("Chrome","Office")

# SCCM package management  
Get-CCMPackages -Nodes $nodes -Mode Interactive  # Full interactive discovery/evaluation
Get-CCMPackages -Nodes $nodes -PackageFilter "*Office*" -Mode Discovery

# User sessions
Get-Users -Nodes $nodes -Report
```

### Template Workflows & Automation
```powershell
# Template command execution
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info" -Confirm:$false
Invoke-TemplateCommand -TemplateName "List"  # Show available templates

# Multi-template workflows with Excel export
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Auto-execute without confirmation
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm:$false -ExportToExcel

# Smart session automation
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"  # Prompts once, remembers choice
```

### Template Management & Development
```powershell
# Template discovery and management
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search  # Find development patterns
Manage-Templates -Type Test -Action Add

# Built-in template categories:
# Command: Remote PowerShell commands (Get OS Info, Check Disk Space, etc.)
# Test: Interactive functionality tests with manual/auto steps
# Codebase: Function development templates and patterns
```

### Documentation & Maintenance
```powershell
# Change tracking and documentation updates
Add-ChangelogEntry -Summary "Enhanced template workflow system" -Type "Enhancement"
Generate-DocumentationAnalysisPrompt -Summary "Major update" -Type "Enhancement"
```

### Analysis & Sampling
```powershell
# OU-based software analysis
Get-SoftwareSampleAnalysis -SampleSize 5 -Export  # Auto-generates Excel report
Get-SoftwareSampleAnalysis -BaseOU "Lab" -WindowsOnly -CredStoreOnly

# Statistical analysis of existing data
Get-SoftwareSampleAnalysis -Existing $reportData -Export
```

### Remote Operations & Diagnostics
```powershell
# Remote command execution
Invoke-NodeCommand -Nodes $nodes -Command "Get-Service SCCM*"
Invoke-NodeCommand -Nodes $nodes -ScriptBlock { Get-ComputerInfo } -DryRun

# System connectivity
Test-NodeConnection -Nodes $nodes -OnlineOnly
Test-NodeConnection -Nodes $nodes  # Full WinRM/WSMan/Credentials test

# Remote system tools
Open-RemoteSystemTools -Node "PC123"  # Interactive menu
Open-RemoteSystemTools -Node "PC123" -Tool ComputerMgmt
Open-RemoteExplorer -Node "PC123"  # Opens C$ share with credentials
```

### Node & Credential Management
```powershell
# Node management (always use these - never manipulate $global:nodeList directly)
NodeList -Action Add -Nodes @("PC1","PC2") -PromptUser:$false
NodeList -Action Update -Nodes @($updatedNode) -PromptUser:$false
$node = New-NodeObject @{ Node = "PC123"; Group = "LabA"; Status = "Complete" }

# Credential management
Ensure-GlobalCredStore -PromptUser:$false
$credInfo = Get-NodeCredAndFQDN -Node "PC123" -PromptUser:$false
Get-ValidCredStatus -Nodes $nodes
Passman -Nodes $nodes  # Retrieves credentials from Passman
```

### Reporting & Export
```powershell
# Excel export (no external dependencies)
Export-ToExcel -Sheets @{ "Audit" = $results } -Title "Report"
Export-ToExcel -InputObject $data -Columns @("Node","Status","Error")

# Pivot tables and analysis
Invoke-Pivotizer -ExcelPath $file -SourceSheet "Data" -RowFields @("OU")

# Task logging and business reporting
$results | Write-TaskLog -Function $function -TaskParams @{} | Out-Null
Set-Report -ReportName "Audit" -Function $function -Data $results | Out-Null
```

### Active Directory Integration
```powershell
# AD information updates
AD -Nodes $nodes  # Updates OS and OU from AD
Get-ADMembership -Node "PC123"  # Group membership and metadata
Select-OUComputers -BaseOU "Lab" -WindowsOnly  # Interactive OU selection
```

## 📊 Function Readiness Matrix

| Need This? | Use This Function | Status | CLI | GUI | Dependencies |
|------------|------------------|--------|-----|-----|--------------|
| **Template workflows** | Invoke-TemplateWorkflow | ✅ Ready | ✅ | ✅ | Template system, Excel |
| **Template commands** | Invoke-TemplateCommand | ✅ Ready | ✅ | ✅ | Process-Parallel, templates |
| **Template management** | Manage-Templates | ✅ Ready | ✅ | ✅ | Global stores |
| **Software inventory** | Get-Software | ✅ Ready | ✅ | ✅ | Process-Parallel, NodeList |
| **SCCM packages** | Get-CCMPackages | ✅ Ready | ✅ | ✅ | Process-Parallel, CIM/WMI |
| **Remote commands** | Invoke-NodeCommand | ✅ Ready | ✅ | ✅ | Process-Parallel, credentials |
| **System connectivity** | Test-NodeConnection | ✅ Ready | ✅ | ✅ | Process-Parallel, WinRM |
| **Excel export** | Export-ToExcel | ✅ Ready | ✅ | ✅ | Excel COM (built-in) |
| **Pivot tables** | Invoke-Pivotizer | ✅ Ready | ✅ | ✅ | Excel COM |
| **Node management** | NodeList, New-NodeObject | ✅ Ready | ✅ | ✅ | Core functions |
| **Credential handling** | Process-Parallel -UseCredentials | ✅ Ready | ✅ | ✅ | Passman integration |
| **Software analysis** | Get-SoftwareSampleAnalysis | ✅ Ready | ✅ | ✅ | Get-Software, AD, Export |
| **Remote tools** | Open-RemoteSystemTools | ✅ Ready | ✅ | ✅ | MMC, credentials |
| **User sessions** | Get-Users | ✅ Ready | ✅ | ✅ | Process-Parallel |
| **File explorer** | Open-RemoteExplorer | ✅ Ready | ✅ | ✅ | cmdkey, rundll32 |
| **AD integration** | AD, Get-ADMembership | ✅ Ready | ✅ | ✅ | Active Directory module |
| **Dynamic testing** | Start-Test, Invoke-TestStep | ✅ Ready | ✅ | ✅ | Template system |
| **Task logging** | Write-TaskLog | ✅ Ready | ✅ | ✅ | Global stores |
| **Business reporting** | Set-Report | ✅ Ready | ✅ | ✅ | Global stores |
| **Data persistence** | Save/Load-CheckITDataCore | ✅ Ready | ✅ | ✅ | JSON serialization |
| **Store management** | Manage-Store | ✅ Ready | ✅ | ✅ | Global stores |
| **Documentation** | Add-ChangelogEntry | ✅ Ready | ✅ | ✅ | Standard patterns |

## 🏗️ Implementation Status by Region

### ✅ Template System & Workflows (100% Complete - ENHANCED)

#### Template Workflows (New Enhanced Features)
- **Multi-Template Execution**: Invoke-TemplateWorkflow with Excel export and sheet combination
- **Enhanced Confirmation**: Three-tier confirmation system ($true, $false, "Auto") with session memory
- **Template Auto-Detection**: Automatic detection of Command vs Test templates
- **Excel Integration**: Individual template sheets + summary sheet for comprehensive reporting

#### Template Commands (Enhanced with Confirmation)
- **Enhanced Invoke-TemplateCommand**: Now supports enhanced confirmation patterns
- **Workflow Integration**: Inherits confirmation settings from workflow execution
- **Auto-Execute Support**: Seamless automation with -Confirm:$false
- **Session Awareness**: Respects global workflow confirmation preferences

#### Template Management (Complete)
- **Built-in Templates**: Command (OS Info, Disk Space, Services, etc.), Test (functionality tests), Codebase (development patterns)
- **User Templates**: Add, edit, remove user-defined templates with full CRUD operations
- **Template Discovery**: Search, preview, and copy templates across all types
- **Development Support**: Complete function templates and patterns for CheckIT development

### ✅ Complete & Ready (95% of Core Functions)

#### Core Infrastructure (100% Complete)
- **Global Store Management**: Ensure-CheckITGlobals, Get-CheckITStore, Manage-Store
- **Data Management**: Save/Load/Normalize-CheckITData, session persistence
- **Parallel Processing**: Process-Parallel with enhanced job management and credential support

#### Node & Credential Management (100% Complete)
- **Node Operations**: NodeList, New-NodeObject, Resolve-NodeObjects
- **Credential Management**: Passman, Get-NodeCredAndFQDN, Get-ValidCred/Status, Ensure-GlobalCredStore
- **Store Integration**: Credential caching, expiration handling, Passman status preservation

#### Data Collection Tools (100% Complete)
- **Software Inventory**: Get-Software with parallel processing and comprehensive reporting
- **SCCM Integration**: Get-CCMPackages with CIM/WMI fallback and interactive management
- **User Sessions**: Get-Users with session details and login information
- **Remote Commands**: Invoke-NodeCommand with dry-run support and comprehensive logging

#### Analysis & Reporting (100% Complete)
- **Software Analysis**: Get-SoftwareSampleAnalysis with OU-based sampling and statistics
- **Excel Export**: Export-ToExcel using COM objects (no external dependencies)
- **Pivot Tables**: Invoke-Pivotizer with dynamic field selection and slicer support
- **Task & Business Reporting**: Comprehensive logging with Write-TaskLog and Set-Report

## 📖 Enhanced Function Reference

### Template System Functions

#### Invoke-TemplateWorkflow
**Purpose**: Execute multiple templates in sequence with Excel export
```powershell
# Basic workflow execution
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit"

# With Excel export (separate sheets per template + summary)
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Audit" -ExportToExcel

# Enhanced confirmation modes
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm:$false  # Auto-execute
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm "Auto"  # Smart session automation
```
**Enhanced Features**:
- **Excel Integration**: Each template creates individual sheets plus summary sheet
- **Enhanced Confirmation**: Y/N/YA/NA options with session-wide memory
- **Auto-Detection**: Automatically detects Command vs Test templates
- **Inheritance**: Confirmation settings inherit to individual template executions
- **Clean Separation**: Each template creates its own report, Excel combines them

#### Invoke-TemplateCommand (Enhanced)
**Purpose**: Execute individual command templates with enhanced confirmation
```powershell
# Interactive template selection
Invoke-TemplateCommand -Nodes $nodes

# Specific template execution
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info" -Confirm:$false

# List available templates
Invoke-TemplateCommand -TemplateName "List"

# Auto mode (inherits from workflow)
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Check Disk Space" -Confirm "Auto"
```
**Enhanced Features**:
- **Enhanced Confirmation**: Three-tier confirmation system ($true, $false, "Auto")
- **Workflow Integration**: Inherits confirmation settings from Invoke-TemplateWorkflow
- **Session Awareness**: Respects global workflow confirmation preferences
- **No Double-Prompting**: Seamless automation when "Yes to All" is selected

#### Manage-Templates
**Purpose**: Complete template management for Command, Test, and Codebase templates
```powershell
# Browse available templates
Manage-Templates -Type Command -Action List
Manage-Templates -Type Test -Action Preview

# Development templates and patterns
Manage-Templates -Type Codebase -Action Search  # Find development patterns

# User template management
Manage-Templates -Type Command -Action Add
Manage-Templates -Type Test -Action Edit
```
**Template Categories**:
- **Command**: Remote PowerShell commands (Get OS Info, Check Disk Space, Services, Network, etc.)
- **Test**: Interactive functionality tests with manual/automated steps
- **Codebase**: Function development templates, patterns, and best practices

### Core Data Collection

#### Get-Software
**Purpose**: Comprehensive software inventory with parallel processing
```powershell
# Full inventory for all nodes
Get-Software -Nodes $global:nodeList -Mode All -ReportName "Lab Audit"

# Search for specific software
Get-Software -Nodes $nodes -Mode Specific -SearchStrings @("Chrome", "Office", "Acrobat")

# GUI usage
$results = Get-Software -Nodes $nodes -Mode All -PromptUser:$false -StatusCallback $callback
```
**Features**:
- Parallel processing for performance
- Comprehensive error handling and logging
- CLI and GUI compatible
- Automatic credential management
- Task logging and business reporting

#### Get-CCMPackages
**Purpose**: SCCM package discovery, evaluation, and management
```powershell
# Interactive package management
Get-CCMPackages -Nodes $nodes -Mode Interactive

# Discovery with filtering
Get-CCMPackages -Nodes $nodes -PackageFilter "*Office*" -Mode Discovery

# List mode for GUI/automation
$packages = Get-CCMPackages -Nodes $nodes -Mode List -PromptUser:$false
```
**Features**:
- CIM-first, WMI-fallback for compatibility
- Interactive package selection and evaluation
- Enhanced error detection for CCM data
- Install/uninstall command generation
- Package availability assessment

### Enhanced Workflow Patterns

#### Enhanced Confirmation System
```powershell
# Three-tier confirmation system for automation-friendly workflows:

# Standard confirmation (prompts every time)
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info" -Confirm:$true

# Auto-execute (no prompts)
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info" -Confirm:$false

# Smart automation (prompts once per session, remembers choice)
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
# First run: prompts with Y/N/YA/NA options
# YA = "Yes to All" - remembers for entire session
# NA = "No to All" - cancels all subsequent operations
```

#### Template Workflow Integration
```powershell
# Workflow confirmation inheritance prevents double-prompting:

# User selects "Yes to All" at workflow level
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
# Workflow prompts: "Y/N/YA=Yes to All/NA=No to All"
# User selects YA

# Individual templates inherit the "auto-proceed" setting
# No additional prompts for individual template execution
# Each template executes automatically with clean results
```

#### Excel Export Strategy
```powershell
# Workflow creates comprehensive Excel reports:

Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space", "List Installed Apps") -WorkflowName "Complete_Audit" -ExportToExcel

# Results in Excel file with multiple sheets:
# - "Get_OS_Info" sheet with OS information from all nodes
# - "Check_Disk_Space" sheet with disk information from all nodes  
# - "List_Installed_Apps" sheet with software inventory from all nodes
# - "Summary" sheet with combined results from all templates

# Each template creates its own clean report first
# Excel export reads from actual report data
# No artificial batching or data manipulation
```

## 🔧 Developer Integration Patterns

### Template-Driven Development
```powershell
# Always check existing templates before creating new functions:

# 1. Search for existing solutions
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search

# 2. Use template workflows for complex operations
Invoke-TemplateWorkflow -Templates @("Existing Template 1", "Existing Template 2")

# 3. Get development templates for new functions
Manage-Templates -Type Codebase -Action Preview  # Select "CheckIT Function Template"
```

### Enhanced Confirmation Integration
```powershell
# For functions that need automation support:

function My-CheckITFunction {
    param(
        [array]$Nodes,
        [object]$Confirm = $true,  # $true, $false, or "Auto"
        [bool]$PromptUser = $true
    )
    
    # Check for session-wide automation preferences
    if ($Confirm -eq $false) {
        $shouldProceed = $true
    } elseif ($Confirm -eq "Auto") {
        # Use global workflow automation state
        if ($global:WorkflowAutoConfirm -and $global:WorkflowAutoConfirm.ContainsKey('*')) {
            $shouldProceed = $global:WorkflowAutoConfirm['*']
        } else {
            # Standard prompt with enhanced options
            $confirm = Read-Host "Proceed? (Y/N/YA=Yes to All/NA=No to All)"
        }
    } else {
        # Traditional confirmation
        $confirm = Read-Host "Proceed? (Y/N)"
    }
}
```

### Template Workflow vs Individual Functions
```powershell
# Use template workflows for:
# - Multiple related operations
# - Excel export requirements
# - Standardized audit procedures
# - Automation with session control

# Use individual functions for:
# - Single-purpose operations  
# - Custom data processing
# - Integration with other systems
# - Specialized error handling

# Template Workflow Pattern:
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -ExportToExcel

# Individual Function Pattern:
$osInfo = Invoke-TemplateCommand -TemplateName "Get OS Info" -Confirm:$false
$diskInfo = Invoke-TemplateCommand -TemplateName "Check Disk Space" -Confirm:$false
# Custom processing of individual results
```

## 📋 Quick Reference Checklists

### Template System Usage
- [ ] Use `Invoke-TemplateWorkflow` for multi-template operations with Excel export
- [ ] Use `Invoke-TemplateCommand` for single template execution
- [ ] Check available templates with `Manage-Templates -Type Command -Action List`
- [ ] Use `-Confirm "Auto"` for smart session automation
- [ ] Use `-Confirm:$false` for complete automation

### Enhanced Confirmation System
- [ ] Use `$true` for standard confirmation (prompts every time)
- [ ] Use `$false` for auto-execution (no prompts)
- [ ] Use `"Auto"` for smart automation (prompts once, remembers choice)
- [ ] Implement session-wide automation with `$global:WorkflowAutoConfirm`

### Excel Export & Reporting
- [ ] Use `-ExportToExcel` with template workflows for comprehensive reports
- [ ] Each template creates individual sheets plus summary sheet
- [ ] No artificial data batching - uses actual report data
- [ ] Clean separation between template execution and Excel export

### Before Using Any Function
- [ ] Check implementation status (✅ Ready vs 🚧 Placeholder)
- [ ] Verify CLI vs GUI compatibility requirements
- [ ] Ensure credentials are available (run `Ensure-GlobalCredStore`)
- [ ] Check dependencies are met

---

📖 **Documentation Index**
- [Developer Guide](developer-guide.md) - Core patterns and development workflow
- [AI Assistant Guide](assistance-guide.md) - Human-AI collaboration patterns
- [Troubleshooting](troubleshooting.md) - Solutions and fixes for common issues
- [Implementation Status](implementation-status.md) - Current completion status
- [Main README](../README.md) - Project overview and quick start

**Last Updated**: 2025-06-09 | **Enhanced**: Template workflow system with confirmation automation