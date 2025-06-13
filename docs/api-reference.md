---
title: API Reference
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

---

> Complete function library with usage examples, status, and dependencies

## 📋 Table of Contents

- [🚀 Quick Function Reference](#-quick-function-reference)
  - [Core Functions and Utilities](#core-functions-and-utilities)
  - [Documentation & Maintenance](#documentation--maintenance)
  - [Store Management Functions](#store-management)
  - [Template System](#template-system)
  - [Node Management](#node-management-functions)
  - [Credential Management](#credential-management)
  - [Remote Operations](#remote-operations)
  - [Active Directory Functions](#active-directory-functions)
  - [SCCM Functions](#sccm-functions)
  - [Reporting & Logging](#reporting--logging)
  - [Utility & Support Functions](#utility--support-functions)
- [📊 Function Status Matrix](#-function-status-matrix)
- [📊 Usage Examples](#-usage-examples)
  - [Template System & Workflows](#template-system--workflows)
  - [Node and Credential Management](#node-and-credential-management)
  - [Remote Operations and Diagnostics](#remote-operations-and-diagnostics)
  - [SCCM Integration](#sccm-integration)
  - [Active Directory Integration](#active-directory-integration)
  - [Reporting and Data Management](#reporting-and-data-management)
- [🔍 Function Details](#-function-details)

## 📊 Function Status Matrix

| Need This? | Function | Status | CLI | GUI | Dependencies |
|------------|----------|--------|-----|-----|-------------|
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
| **Package deployment** | Invoke-CCMPackageDeployment | ✅ Ready | ✅ | ✅ | Process-Parallel, SCCM |

### Implementation Status Summary

- **Core Module**: 100% complete - 75+ functions fully implemented and beta access is requestable
- **Template System**: Enhanced with multi-template workflows, session confirmation memory, and Excel integration
- **Node Management**: Complete with Passman status preservation and AD integration
- **Authentication**: Enhanced credential security with session-only storage and Passman integration
- **Data Collection**: Comprehensive software inventory, SCCM package discovery, and user session tracking
- **Reporting**: Multi-sheet Excel export with pivot tables, slicers, and task/business reporting separation
- **Session Management**: Full save/load capability with preference preservation and template store memory
- **Documentation Automation**: Changelog generation and AI-assisted documentation analysis

## 🚀 Quick Function Reference

### By Category

#### Core Functions and Utilities

- **Convert-ReportData** - Post-processes raw template data for clean reporting
- **Convert-WMIDateTime** - Converts WMI datetime format to readable date string
- **Get-AllColumns** - Gets all unique column names from an array of objects
- **Get-CheckITColumns** - Retrieves standard column definitions for CheckIT stores
- **Get-FriendlySize** - Converts byte values to human-readable size strings
- **Write-Color** - Writes colored console output with enhanced formatting
- **Get-UserPreference** - Retrieves a user preference for a specific function
- **Set-UserPreference** - Sets user preference values with validation
- **Show-PreferenceHelp** - Displays help text for available preferences

#### Documentation & Maintenance

- **Add-ChangelogEntry** - Adds a new entry to CHANGELOG with preview and clipboard support
- **Generate-DocumentationAnalysisPrompt** - Creates analysis prompts for documentation reviews

#### Store Management

- **Ensure-CheckITGlobals** - Initializes and validates global state variables
- **Get-CheckITStore** - Safely retrieves or clears a CheckIT data store
- **Manage-Store** - View, preview, and manage CheckIT virtual stores
- **Save-CheckITDataCore** - Saves CheckIT data to disk as JSON with security controls
- **Load-CheckITDataCore** - Loads CheckIT data from disk with validation
- **Normalize-CheckITData** - Normalizes data structure from older versions

#### Template System

- **Ensure-Templates** - Loads built-in templates into the global template store
- **Invoke-TemplateCommand** - Executes a command template on one or more nodes
- **Invoke-TemplateWorkflow** - Executes multiple templates in sequence with reporting
- **Manage-Templates** - Complete template management for Command, Test, and Codebase templates
- **New-SystemTestTemplate** - Creates common system test templates
- **New-TestTemplate** - Creates a test template with multiple steps
- **Start-Test** - Runs interactive test steps on a remote machine
- **Invoke-TestStep** - Executes a single test step with response handling

#### Node Management

- **Add-SkipNode** - Adds a node to the global skip list to bypass processing
- **New-NodeObject** - Creates a standardized node object with consistent properties
- **NodeList** - Comprehensive node list management (add/update/remove/synchronize)
- **Resolve-NodeObjects** - Resolves node names or objects to valid node objects
- **Update-NodeFromResult** - Updates node status from command results

#### Credential Management

- **Ensure-GlobalCredStore** - Initializes and maintains the global credential store
- **Get-NodeCredAndFQDN** - Gets credentials and FQDN for a node with caching
- **Get-PassManInfo** - Collects and validates work order information for credential requests
- **Get-ValidCred** - Obtains valid credentials for a node with status
- **Get-ValidCredStatus** - Tests credential validity status
- **Passman** - Retrieves credentials from Passman credential manager
- **Show-CredentialClipboard** - Displays credential information with clipboard support

#### Remote Operations

- **Invoke-NodeCommand** - Executes commands on remote nodes with comprehensive error handling
- **Process-Parallel** - Parallel execution engine with credential support and job management
- **Get-Users** - Retrieves active user sessions from remote computers
- **Open-RemoteExplorer** - Opens File Explorer to a remote computer share
- **Open-RemoteSystemTools** - Opens remote management tools connected to a computer
- **Test-AlternativeShares** - Tests alternative share paths for a remote computer
- **Test-NodeConnection** - Tests comprehensive connectivity to remote nodes
- **Test-RemoteSystemAccess** - Tests multiple remote access methods for diagnostics

#### Active Directory Functions

- **AD** - Updates OS and OU information for nodes from Active Directory
- **Get-ADMembership** - Retrieves AD group membership for a computer or user
- **Ensure-NodeADInfo** - Ensures nodes have AD information populated
- **Get-OUComputerSummary** - Generates OU summaries with computer counts
- **Select-OUComputers** - Interactive selection of computers from Active Directory OUs

#### SCCM Functions

- **Get-AvailablePackages** - Discovers available SCCM packages from sample nodes
- **Get-CCMPackages** - Comprehensive SCCM package discovery and analysis
- **Invoke-CCMPackageDeployment** - Interactive package deployment with pre/post auditing
- **Select-PackageForDeployment** - Interactive package selection interface
- **Get-DeploymentPackage** - Helper to retrieve package information for deployment
- **Get-DeploymentCommand** - Helper to generate deployment commands
- **New-PackageAuditCommand** - Creates audit commands for package verification

#### Reporting & Logging

- **Build-Report** - Builds a structured report object for CheckIT
- **Clean-ExcelColumnName** - Ensures Excel column names are valid
- **Export-ToExcel** - Exports data to Excel with formatting and multi-sheet support
- **Get-SafeReportFilename** - Generates safe filenames for reports
- **Get-TaskLogErrors** - Filters task log rows for error conditions
- **Get-WorklogBatchName** - Gets unique batch names for worklog reports
- **Import-CheckITData** - Imports data from Excel to appropriate CheckIT stores
- **Import-FromExcel** - Imports data from Excel with worksheet selection
- **Invoke-Pivotizer** - Creates pivot tables in Excel workbooks
- **Is-TaskLogError** - Tests if a task log entry contains an error
- **New-ErrorRecord** - Creates standardized error records for reporting
- **Set-Report** - Adds data to the global report store with validation
- **Write-TaskLog** - Writes entries to the task log with standardized format

#### Utility & Support Functions

- **ConvertTo-PSCustomObject** - Converts hashtables to PSCustomObjects recursively
- **SanityCheck** - Checks for common configuration issues
- **Update-Progress** - Updates progress indicators for long-running operations

## 📊 Usage Examples

### Template System & Workflows

```powershell
# List available templates
Manage-Templates -Type Command -Action List

# Execute a single template
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info"

# Execute multiple templates with Excel output
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Create a new test template
New-TestTemplate -TemplateName "Office Validation"

# Run a test on a remote system
Start-Test -Node "ComputerName" -TemplateName "Office Validation"

# Search codebase templates for patterns
Manage-Templates -Type Codebase -Action Search
```

### Node and Credential Management

```powershell
# Add computers to NodeList
NodeList -Action Add -Nodes @("PC1", "PC2", "PC3")

# Create a node object with properties
$node = New-NodeObject @{ Node = "PC123"; Group = "Lab"; Description = "Test machine" }

# Update node properties
NodeList -Action Update -Nodes @($node) -PromptUser:$false

# Get credentials for a node
$credInfo = Get-NodeCredAndFQDN -Node "PC123"

# Get credential status for multiple nodes
Get-ValidCredStatus -Nodes $nodes

# Initialize credential store
Ensure-GlobalCredStore

# Get credentials from Passman
Passman -Nodes $nodes -WorkOrder "WO12345" -Reason "Software deployment"
```

### Remote Operations and Diagnostics

```powershell
# Execute a command on multiple nodes
Invoke-NodeCommand -Nodes $nodes -Command "Get-Service | Where-Object { $_.Status -eq 'Running' }"

# Run code with parallel execution
$results = $nodes | Process-Parallel -ScriptBlock {
    param($node)
    Get-WmiObject -Class Win32_OperatingSystem -ComputerName $node
}

# Test connectivity to nodes
Test-NodeConnection -Nodes $nodes -OnlineOnly

# Get user sessions
Get-Users -Nodes $nodes -Report

# Open remote management tools
Open-RemoteSystemTools -Node "PC123" -Tool ComputerMgmt

# Open explorer to a remote share
Open-RemoteExplorer -Node "PC123"

# Test various connection methods
Test-RemoteSystemAccess -Node "PC123"
```

### SCCM Integration

```powershell
# Discover available packages
Get-AvailablePackages -SearchPattern "Office*"

# Get package status across multiple machines
Get-CCMPackages -Nodes $nodes -PackageFilter "Microsoft Office*" -Mode Discovery

# Interactive package management
Get-CCMPackages -Nodes $nodes -Mode Interactive

# Deploy a package to multiple machines
Invoke-CCMPackageDeployment -Nodes $nodes -PackageName "Office 365" -Action Install
```

### Active Directory Integration

```powershell
# Update node information from AD
AD -Nodes $nodes

# Get computer group memberships
Get-ADMembership -Node "PC123"

# Select computers from specific OUs
$computers = Select-OUComputers -BaseOU "OU=Labs,DC=domain,DC=com"

# Get OU summaries with computer counts
Get-OUComputerSummary -BaseOU "OU=Department,DC=domain,DC=com"
```

### Reporting and Data Management

```powershell
# Export data to Excel with multiple sheets
Export-ToExcel -Sheets @{ "Hardware" = $hardwareData; "Software" = $softwareData } -Title "System Audit"

# Create pivot tables in an Excel file
Invoke-Pivotizer -ExcelPath "C:\Reports\Audit.xlsx" -SourceSheet "Data" -RowFields @("Department", "OS")

# Write to task log
$results | Write-TaskLog -Function "AuditSoftware" -TaskParams @{ Source = "Manual Audit" }

# Create a report
Set-Report -ReportName "Software Audit" -Function "Get-Software" -Data $results

# Save all CheckIT data
Save-CheckITDataCore -Path "C:\Reports\CheckIT_Data.json"

# Load previously saved data
Load-CheckITDataCore -Path "C:\Reports\CheckIT_Data.json"

# Import data from Excel
Import-CheckITData -Path "C:\Reports\Computers.xlsx"
```

## 🔍 Function Details

### Template System Details

#### Invoke-TemplateCommand Function

Executes a command template on one or more nodes with parallel processing.

```powershell
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info"
Invoke-TemplateCommand -TemplateName "List"  # Shows available templates
```

**Parameters:**

- `Nodes`: Target computers to execute the command on
- `TemplateName`: Name of the template to execute (or "List" to show available templates)
- `Template`: Direct template object to execute (alternative to TemplateName)
- `Confirm`: Control confirmation behavior ($true, $false, or "Auto")
- `ReportName`: Custom name for the generated report
- `MaxParallel`: Maximum number of parallel executions (default: 10)
- `TimeoutSeconds`: Execution timeout in seconds
- `DryRun`: Validate without executing
- `PromptUser`: Show interactive output

**Returns:** Command execution results with detailed status information

#### Invoke-TemplateWorkflow Function

Executes multiple templates in sequence with consolidated reporting and Excel export.

```powershell
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -ExportToExcel
```

**Parameters:**

- `Nodes`: Target computers to execute the templates on
- `Templates`: Array of template names to execute in sequence
- `WorkflowName`: Name for the workflow and generated reports
- `ExportToExcel`: Export all results to a single Excel file with multiple sheets
- `Confirm`: Control confirmation behavior ($true, $false, or "Auto")
- `PromptUser`: Show interactive output

**Returns:** Workflow execution summary with consolidated results

#### Manage-Templates Function

Complete template management for Command, Test, and Codebase templates.

```powershell
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search -SearchTerm "credential"
Manage-Templates -Type Test -Action Add
```

**Parameters:**

- `Type`: Template type (Command, Test, or Codebase)
- `Action`: Action to perform (List, Add, Edit, Remove, Select, Preview, Copy, Search)
- `PromptUser`: Show interactive output
- `GenerateReport`: Generate a report of the operation

**Returns:** Template operation results or selected templates

### Node Management Functions

#### NodeList Function

Central function for node list management with comprehensive operations.

```powershell
NodeList -Action Add -Nodes @("PC1", "PC2", "PC3")
NodeList -Action Update -Nodes $updatedNodes
NodeList -Action Remove -Nodes @("PC3")
NodeList -Action SyncWithCredStore  # Synchronizes with credential store
```

**Parameters:**

- `Action`: Operation to perform (Add, Update, Remove, Upload, Export, SyncWithCredStore)
- `Nodes`: Nodes to operate on
- `FilePath`: File path for Upload/Export operations
- `PromptUser`: Show interactive output

**Returns:** Updated node list with standardized properties

#### New-NodeObject Function

Creates a standardized node object with consistent properties.

```powershell
$node = New-NodeObject @{ Node = "PC123"; Group = "Lab"; Description = "Test machine" }
```

**Parameters:**

- `InputObj`: Input object with node properties

**Returns:** Standardized node object with consistent properties

### Remote Operations Functions

#### Process-Parallel Function

Enterprise-grade parallel processing engine with credential support and job management.

```powershell
$results = $nodes | Process-Parallel -ScriptBlock {
    param($node, $credential, $fqdn)
    # Remote commands using $credential and $fqdn
}
```

**Parameters:**

- `InputObject`: Objects to process in parallel
- `ScriptBlock`: Code to execute for each input object
- `ArgumentList`: Additional arguments to pass to the script block
- `MaxParallel`: Maximum concurrent jobs
- `TimeoutSeconds`: Operation timeout in seconds
- `UseCredentials`: Automatically provide credentials to the script block
- `PromptUser`: Show interactive output
- `StatusCallback`: Function to call for status updates (GUI integration)

**Returns:** Results from parallel execution with error details and statistics

#### Invoke-NodeCommand Function

Executes commands on remote nodes with comprehensive error handling and reporting.

```powershell
Invoke-NodeCommand -Nodes $nodes -Command "Get-Service | Where-Object { $_.Status -eq 'Running' }"
```

**Parameters:**

- `Nodes`: Target nodes to run the command on
- `Command`: Command string to execute
- `ScriptBlock`: Alternative to Command - code block to execute
- `MaxParallel`: Maximum concurrent executions
- `TimeoutSeconds`: Command timeout in seconds
- `DryRun`: Validate without executing
- `PromptUser`: Show interactive output
- `StatusCallback`: Function to call for status updates (GUI integration)

**Returns:** Command execution results with detailed status information

### SCCM Integration Function

#### Get-CCMPackages Function

Comprehensive SCCM package discovery and analysis with multiple execution modes.

```powershell
Get-CCMPackages -Nodes $nodes -Mode Interactive
Get-CCMPackages -Nodes $nodes -PackageFilter "Office*" -Mode Discovery
```

**Parameters:**

- `Nodes`: Target computers to query for packages
- `Mode`: Operation mode (Discovery, Interactive, or List)
- `PackageFilter`: Filter pattern for package names
- `ReportName`: Custom name for the generated report
- `PromptUser`: Show interactive output

**Returns:** Detailed package information with deployment readiness analysis

#### Invoke-CCMPackageDeployment Function

Interactive package deployment with pre/post auditing and multiple deployment methods.

```powershell
Invoke-CCMPackageDeployment -Nodes $nodes -PackageName "Office 365" -Action Install
```

**Parameters:**

- `Nodes`: Target computers for deployment
- `PackageName`: Name of the package to deploy
- `PackageID`: Alternative to PackageName - direct package ID
- `Action`: Deployment action (Install, Uninstall, or Evaluate)
- `Mode`: Deployment mode (Interactive or Batch)
- `PreAudit`: Perform pre-deployment audit
- `PostAudit`: Perform post-deployment audit
- `PromptUser`: Show interactive output

**Returns:** Deployment results with success/failure details

### Credential Management Functions

#### Get-NodeCredAndFQDN Function

Gets credentials and FQDN for a node with automatic caching and validation.

```powershell
$credInfo = Get-NodeCredAndFQDN -Node "PC123"
if ($credInfo.Status -eq "OK") {
    $credential = $credInfo.Credential
    $fqdn = $credInfo.FQDN
}
```

**Parameters:**

- `Node`: Target node name
- `PromptUser`: Show interactive prompts

**Returns:** Credential object with FQDN and status information

#### Passman Function

Retrieves credentials from Passman credential manager with work order validation.

```powershell
Passman -Nodes $nodes -WorkOrder "WO12345" -Reason "Software deployment"
```

**Parameters:**

- `Nodes`: Target nodes to get credentials for
- `WorkOrder`: Work order number for audit trail
- `Reason`: Reason for credential request
- `Force`: Force credential refresh
- `PromptUser`: Show interactive output

**Returns:** Credential retrieval results with status information

### Reporting and Data Management Functions

#### Export-ToExcel Function

Exports data to Excel with formatting and multi-sheet support.

```powershell
Export-ToExcel -InputObject $data -Title "Audit Report"
Export-ToExcel -Sheets @{ "Hardware" = $hwData; "Software" = $swData } -Path "C:\Reports\Audit.xlsx"
```

**Parameters:**

- `InputObject`: Data to export
- `Sheets`: Multiple named data sets to export as separate sheets
- `Title`: Report title (used for filename if Path not specified)
- `Path`: Full path to Excel file
- `AutoSize`: Auto-size columns to fit content
- `PromptUser`: Show interactive output
- `Columns`: Specific columns to include

**Returns:** Path to the created Excel file

#### Set-Report Function

Adds or updates a report in the global report store with validation.

```powershell
Set-Report -ReportName "Software Audit" -Function "Get-Software" -Data $results -Groups @("Lab Computers")
```

**Parameters:**

- `ReportName`: Name of the report
- `Function`: Function that generated the data
- `Data`: Report data
- `Groups`: Group categories for the report
- `Errors`: Error records to include
- `Task`: Generate from task parameters
- `TaskParams`: Task parameters for reporting
- `OnDuplicate`: Behavior for duplicate report names
- `CleanData`: Clean data before storing
- `PromptUser`: Show interactive output

**Returns:** Report operation status and details

#### Write-TaskLog Function

Writes entries to the task log with standardized format and metadata.

```powershell
$results | Write-TaskLog -Function "AuditSoftware" -TaskParams @{ Source = "Manual Audit" }
```

**Parameters:**

- `InputObject`: Objects to log
- `Function`: Function that generated the entries
- `Author`: Author of the entries
- `Timestamp`: Entry timestamp
- `Append`: Append to existing log
- `TaskParams`: Additional parameters to record
- `Caller`: Calling function name
- `Groups`: Group categories for the entries

**Returns:** Task log entries created
