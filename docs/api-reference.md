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

### Documentation & Maintenance
```powershell
# Change tracking and documentation updates
Add-ChangelogEntry -Summary "Fixed software inventory bug" -Type "Fix"
Generate-DocumentationAnalysisPrompt -Summary "Major update" -Type "Enhancement"

# Template system for development
Manage-Templates -Type Codebase -Action Preview  # Get function development templates
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

### Templates & Testing
```powershell
# Template management
Manage-Templates -Type Command -Action List
Manage-Templates -Type Test -Action Add
Manage-Templates -Type Codebase -Action Preview  # Get function templates

# Dynamic testing
Start-Test -TemplateName "Default Functionality Test" -Nodes $nodes
Start-Test -Self -TemplateName "Custom Test"  # Test local machine
```

## 📊 Function Readiness Matrix

| Need This? | Use This Function | Status | CLI | GUI | Dependencies |
|------------|------------------|--------|-----|-----|--------------|
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
| **Hardware stats** | Get-NodeStats | ✅ Ready | ✅ | ✅ | Process-Parallel, WMI |
| **File explorer** | Open-RemoteExplorer | ✅ Ready | ✅ | ✅ | cmdkey, rundll32 |
| **AD integration** | AD, Get-ADMembership | ✅ Ready | ✅ | ✅ | Active Directory module |
| **Template system** | Manage-Templates | ✅ Ready | ✅ | ✅ | Global stores |
| **Dynamic testing** | Start-Test, Invoke-TestStep | ✅ Ready | ✅ | ✅ | Template system |
| **Task logging** | Write-TaskLog | ✅ Ready | ✅ | ✅ | Global stores |
| **Business reporting** | Set-Report | ✅ Ready | ✅ | ✅ | Global stores |
| **Data persistence** | Save/Load-CheckITDataCore | ✅ Ready | ✅ | ✅ | JSON serialization |
| **Store management** | Manage-Store | ✅ Ready | ✅ | ✅ | Global stores |
| **General** | Add-ChangelogEntry | ✅ Ready | ✅ | ✅ | Standard patterns |
| **General** | Generate-DocumentationAnalysisPrompt | ✅ Ready | ✅ | ✅ | Standard patterns |

## 🏗️ Implementation Status by Region

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

#### Diagnostics & System Tools (95% Complete)
- **Connectivity Testing**: Test-NodeConnection with WinRM, WSMan, and credential validation
- **Remote Management**: Open-RemoteSystemTools (MMC), Open-RemoteExplorer (file shares)
- **Access Testing**: Test-RemoteSystemAccess for credential validation

#### Active Directory Integration (100% Complete)
- **Node Updates**: AD function for OS and OU information from Active Directory
- **Group Membership**: Get-ADMembership with metadata and last logon details
- **OU Management**: Select-OUComputers with interactive selection and sampling
- **Computer Summaries**: Get-OUComputerSummary for statistics and analysis

#### Analysis & Reporting (100% Complete)
- **Software Analysis**: Get-SoftwareSampleAnalysis with OU-based sampling and statistics
- **Excel Export**: Export-ToExcel using COM objects (no external dependencies)
- **Pivot Tables**: Invoke-Pivotizer with dynamic field selection and slicer support
- **Data Import**: Import-FromExcel and Import-CheckITData with automatic routing

#### Logging & Task Management (100% Complete)
- **Task Logging**: Write-TaskLog for audit trails and task tracking
- **Business Reporting**: Set-Report for clean user data and report management
- **Error Handling**: New-ErrorRecord for standardized error logging
- **Report Building**: Build-Report for comprehensive report generation

#### Templates & Testing (100% Complete)
- **Template Management**: Manage-Templates for Command, Test, and Codebase templates
- **Dynamic Testing**: Start-Test with CLI/GUI support and resume capability
- **Test Execution**: Invoke-TestStep for individual step processing
- **Template Creation**: New-TestTemplate for interactive template building

#### Utilities & User Experience (100% Complete)
- **User Preferences**: Set/Get-UserPreference for configuration management
- **Colored Output**: Write-Color for CLI feedback and status messages
- **Progress Reporting**: Update-Progress with CLI/GUI compatibility
- **Configuration Validation**: SanityCheck for common issues
- **Documentation**: Add-ChangelogEntry for change tracking


## 📖 Detailed Function Reference

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

**Parameters**:
- `Nodes` - Array of node objects or names (required)
- `Mode` - "All" or "Specific" (required)
- `ReportName` - Name for the generated report
- `SearchStrings` - Array of product names (for Specific mode)
- `PromptUser` - CLI vs GUI mode control
- `StatusCallback` - GUI progress reporting

#### Get-CCMPackages
**Purpose**: SCCM package discovery, evaluation, and management
```powershell
# Interactive package management
Get-CCMPackages -Nodes $nodes -Mode Interactive

# Discovery with filtering
Get-CCMPackages -Nodes $nodes -PackageFilter "*Office*" -Mode Discovery

# Evaluation of specific packages
Get-CCMPackages -Nodes $nodes -Mode Evaluation -PackageFilter "Chrome*"
```
**Features**:
- CIM-first, WMI-fallback for compatibility
- Interactive package selection and evaluation
- Enhanced error detection for CCM data
- Install/uninstall command generation
- Package availability assessment

**Parameters**:
- `Nodes` - Array of node objects or names (required)
- `Mode` - "Interactive", "Discovery", or "Evaluation"
- `PackageFilter` - Wildcard filter for package names
- `ReportName` - Name for the generated report
- `PromptUser` - CLI vs GUI mode control
- `StatusCallback` - GUI progress reporting

### Remote Operations

#### Invoke-NodeCommand
**Purpose**: Interactive remote command execution with dry-run support
```powershell
# Interactive command execution
Invoke-NodeCommand -Nodes $nodes -Command "Get-Service SCCM*"

# Script block execution
Invoke-NodeCommand -Nodes $nodes -ScriptBlock { Get-ComputerInfo; Get-HotFix | Select -First 5 }

# Dry run mode
Invoke-NodeCommand -Nodes $nodes -Command "Restart-Service Spooler" -DryRun
```
**Features**:
- Interactive command building and validation
- Dry-run mode for testing
- Comprehensive logging and error handling
- Real-time output display
- Timeout management

**Parameters**:
- `Nodes` - Array of node objects or names (required)
- `Command` - String command to execute
- `ScriptBlock` - PowerShell script block to execute
- `ArgumentList` - Arguments for script block
- `MaxParallel` - Parallel execution limit
- `DryRun` - Test mode without execution
- `TimeoutSeconds` - Per-operation timeout

#### Test-NodeConnection
**Purpose**: Comprehensive connectivity and service testing
```powershell
# Full connectivity test
Test-NodeConnection -Nodes $nodes

# Online-only test (ping only)
Test-NodeConnection -Nodes $nodes -OnlineOnly

# GUI mode with progress callback
$results = Test-NodeConnection -Nodes $nodes -PromptUser:$false -StatusCallback $callback
```
**Features**:
- Ping, WinRM, WSMan, and Win32PowerManagement testing
- Credential validation
- Last reboot and user information
- Parallel processing for performance
- Comprehensive error reporting

**Parameters**:
- `Nodes` - Array of node objects or names (required)
- `PromptUser` - CLI vs GUI mode control
- `OnlineOnly` - Skip WinRM/WSMan tests, ping only
- `Report` - Include in business reporting
- `StatusCallback` - GUI progress reporting

### Node & Credential Management

#### NodeList
**Purpose**: Safe manipulation of the global node list
```powershell
# Add nodes
NodeList -Action Add -Nodes @("PC1", "PC2") -PromptUser:$false

# Update existing nodes
NodeList -Action Update -Nodes @($updatedNode) -CreateIfMissing:$false

# Remove nodes
NodeList -Action Remove -Nodes @("PC3") -PromptUser:$false
```
**Features**:
- Safe global state management
- Create-if-missing option
- Import/export capabilities
- Preview and validation
- CLI and GUI compatible

**Critical**: Never manipulate `$global:nodeList` directly - always use NodeList function

#### New-NodeObject
**Purpose**: Create or update node objects with proper normalization
```powershell
# Create new node
$node = New-NodeObject "PC123"

# Update existing node with new properties
$updated = New-NodeObject @{ Node = "PC123"; Group = "LabA"; Status = "Complete" }

# Update from existing node object
$normalized = New-NodeObject $existingNode
```
**Features**:
- Automatic Passman status preservation
- Property normalization
- Default value assignment
- Type safety and validation

**Critical**: Always use New-NodeObject for node updates to preserve Passman status

#### Process-Parallel -UseCredentials
**Purpose**: Automatic credential management for parallel operations
```powershell
# Basic parallel execution with automatic credentials
$results = $nodes | Process-Parallel -ScriptBlock {
    param($node, $customParam, $credential, $fqdn)
    # $credential and $fqdn automatically available
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock {
        Get-ComputerInfo
    }
} -ArgumentList @($customParam) -UseCredentials

# With credential filtering
$results = $nodes | Process-Parallel -ScriptBlock $script -UseCredentials -RequireCredentials
```
**Features**:
- Automatic credential resolution and pre-caching
- Parallel job management with multiple completion detection methods
- Comprehensive error handling and timeout management
- Performance optimization for small datasets
- Real-time progress reporting

### Analysis & Reporting

#### Get-SoftwareSampleAnalysis
**Purpose**: OU-based software sampling with statistical analysis
```powershell
# Interactive OU selection with export
Get-SoftwareSampleAnalysis -SampleSize 5 -Export

# Specific OU with constraints
Get-SoftwareSampleAnalysis -BaseOU "Lab" -WindowsOnly -CredStoreOnly -SampleSize 3

# Analyze existing data
Get-SoftwareSampleAnalysis -Existing $reportData -Export -ExportPath "C:\Reports\Analysis.xlsx"
```
**Features**:
- Interactive OU computer selection
- Random sampling with configurable size
- AD group membership integration
- Statistical analysis and reporting
- Multi-sheet Excel export with summaries
- Support for existing data analysis

#### Export-ToExcel
**Purpose**: Excel export using COM objects (no external dependencies)
```powershell
# Single sheet export
$data | Export-ToExcel -Title "Report" -AutoOpen

# Multi-sheet export
$sheets = @{
    "NodeList" = $global:nodeList
    "SoftwareResults" = $softwareData
    "Errors" = $errorData
}
Export-ToExcel -Sheets $sheets -Title "Comprehensive Report"

# Column-specific export
Export-ToExcel -InputObject $data -Columns @("Node", "Status", "LastError")
```
**Features**:
- No external module dependencies (uses Excel COM)
- Multi-sheet support with custom column ordering
- Automatic file naming and path management
- User preference integration
- Pivot table integration via Invoke-Pivotizer

### Templates & Testing

#### Manage-Templates
**Purpose**: Built-in and user-defined templates for commands, tests, and code development
```powershell
# List available templates
Manage-Templates -Type Command -Action List
Manage-Templates -Type Test -Action Preview

# Get complete function template
Manage-Templates -Type Codebase -Action Preview  # Select "CheckIT Function Template"

# Add new user templates
Manage-Templates -Type Test -Action Add
```
**Features**:
- Built-in templates for common scenarios
- User template management (add, edit, remove)
- Code development templates with complete patterns
- Template copying and modification
- Integrated help and usage examples

#### Start-Test
**Purpose**: Dynamic test execution with CLI/GUI support
```powershell
# Run built-in test template
Start-Test -TemplateName "Default Functionality Test" -Nodes $nodes

# Test local machine
Start-Test -Self -TemplateName "System Health Check"

# GUI mode with progress callback
Start-Test -TemplateName "Custom Test" -Nodes $nodes -PromptUser:$false -GuiPromptCallback $callback
```
**Features**:
- Dynamic test step execution
- Manual and automated step support
- Resume capability for interrupted tests
- Real-time progress reporting
- Comprehensive result logging

## 🔧 Developer Integration Patterns

### CLI vs GUI Usage
```powershell
# CLI Mode (default)
Get-Software -Nodes $nodes -Mode All -PromptUser:$true

# GUI Mode
$results = Get-Software -Nodes $nodes -Mode All -PromptUser:$false -StatusCallback {
    param($status)
    # Update GUI progress bar
    $progressBar.Value = $status.PercentComplete
    $statusLabel.Text = $status.Status
}
```

### Error Handling Pattern
```powershell
# Standard error handling for CheckIT functions
try {
    $results = Get-Software -Nodes $nodes -Mode All -PromptUser:$false
    
    # Check for errors in results
    $errors = $results | Where-Object { $_.Error }
    if ($errors) {
        foreach ($error in $errors) {
            Write-Warning "Error on $($error.Node): $($error.Error)"
        }
    }
    
    # Process successful results
    $successful = $results | Where-Object { -not $_.Error }
    return $successful
    
} catch {
    Write-Error "Function execution failed: $($_.Exception.Message)"
    return @()
}
```

### Progress Reporting Integration
```powershell
# For long-running operations in GUI
$statusCallback = {
    param($progressInfo)
    $progressBar.Value = $progressInfo.PercentComplete
    $statusLabel.Text = $progressInfo.Status
    $activityLabel.Text = $progressInfo.Activity
    [System.Windows.Forms.Application]::DoEvents()
}

$results = Get-Software -Nodes $nodes -PromptUser:$false -StatusCallback $statusCallback
```

## 📋 Quick Reference Checklists

### Before Using Any Function
- [ ] Check implementation status (✅ Ready vs 🚧 Placeholder)
- [ ] Verify CLI vs GUI compatibility requirements
- [ ] Ensure credentials are available (run `Ensure-GlobalCredStore`)
- [ ] Check dependencies are met

### For Data Collection Functions
- [ ] Use appropriate Mode parameter (All, Specific, Interactive)
- [ ] Provide StatusCallback for GUI progress reporting
- [ ] Set PromptUser appropriately for your environment
- [ ] Consider Report parameter for automatic logging

### For Node Management
- [ ] Always use NodeList function (never manipulate $global:nodeList directly)
- [ ] Use New-NodeObject for all node creation/updates
- [ ] Set PromptUser:$false for GUI operations
- [ ] Check CreateIfMissing parameter behavior

### For Remote Operations
- [ ] Ensure credentials are valid before operations
- [ ] Use appropriate timeout values for network conditions
- [ ] Consider DryRun mode for testing
- [ ] Plan for error handling and retry logic

### For Reporting & Export
- [ ] Use Export-ToExcel (built-in) not Export-Excel (external dependency)
- [ ] Consider multi-sheet exports for complex data
- [ ] Plan column ordering for readability
- [ ] Use Invoke-Pivotizer for analysis enhancement

---

📖 **Documentation Index**
- [Developer Guide](developer-guide.md) - Core patterns and development workflow
- [Troubleshooting](troubleshooting.md) - Solutions and fixes for common issues
- [Implementation Status](implementation-status.md) - Current completion status
- [AI Assistant Guide](assistance-guide.md) - AI-specific development guidelines
- [Main README](../README.md) - Project overview and quick start

**Last Updated**: 2025-06-07 | **Next Review**: After major function additions or changes

