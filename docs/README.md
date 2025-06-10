---
title: CheckIT-Core Project Overview
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

# CheckIT-Core

> Professional PowerShell module for Windows computer management, diagnostics, and reporting in domain environments. Designed for IT departments managing labs, classrooms, and departmental computers.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [Documentation](#documentation)

## 📚 Documentation

- **[Developer Guide](docs/developer-guide.md)** - Enhanced patterns, template-driven development, and The Big 3 patterns
- **[Troubleshooting](docs/troubleshooting.md)** - Solutions including template system troubleshooting and session automation
- **[API Reference](docs/api-reference.md)** - Complete function library with enhanced template workflow system
- **[Assistance Guide](docs/assistance-guide.md)** - Human-AI collaboration patterns for CheckIT development
- **[Implementation Status](docs/implementation-status.md)** - Current completion status (100% complete - all 71 functions operational)
- **[Quick Reference](docs/quick-reference.md)** - Essential patterns and rapid development guide

## 🚀 Features

- **Enhanced Template Workflow System**: Multi-template execution with Excel export and session automation
- **Advanced Automation**: Three-tier confirmation system ($true, $false, "Auto") with session memory
- **Centralized Node Management**: Domain computer inventory with AD integration and Passman status preservation
- **Secure Authentication**: Passman integration with Windows profile-based credential checkout
- **Parallel Processing**: High-performance operations across multiple computers with enhanced job management
- **Session Persistence**: Save and restore your work sessions, node lists, and preferences
- **Password Security**: Passwords are never in plain text or stored on disk; credentials checked out per session
- **Comprehensive Reporting**: Structured data collection with multi-sheet Excel export capabilities
- **Template System**: Command, Test, and Codebase templates for common IT operations and development
- **Documentation Automation**: Changelog generation, cross-reference validation, and AI-assisted analysis
- **GUI & CLI Support**: Works in both interactive console and Windows Forms interface with enhanced confirmation patterns

## 💫 Enhanced Template Workflow System (Key Feature!)

**Execute multiple templates with seamless automation and Excel export:**

```powershell
# Multi-template execution with comprehensive Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Enhanced session automation - prompts once, remembers choice
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
# User selects "Yes to All" → all subsequent templates auto-execute

# Individual template execution
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info" -Confirm:$false

# Template management and development
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search  # Find development patterns
```

**Template Categories:**
- **Command Templates**: Remote PowerShell commands (Get OS Info, Check Disk Space, List Services, etc.)
- **Test Templates**: Interactive functionality tests with manual/automated steps
- **Codebase Templates**: Function development templates and patterns for rapid development

## 🎯 Session Management (Key Feature!)

**Save your work and pick up where you left off:**

```powershell
# Save everything: node lists, reports, preferences, credentials info
Save-CheckITDataCore -Path "C:\CheckIT\MyLabWork.json"

# Later: restore your entire session
Load-CheckITDataCore -Path "C:\CheckIT\MyLabWork.json"

# Your node list, preferences, and all reports are back!
$global:nodeList  # Restored with all metadata
Manage-Store -Store Reports -Action Preview  # All your reports
```

## 🔧 Installation

### Prerequisites & Authentication Model

- **Domain Environment**: Active Directory domain membership required
- **Passman Integration**: Uses your Windows profile to authenticate and checkout Administrator credentials
- **Permissions Required**: Must have rights to checkout Administrator accounts for target computers
- **PowerShell**: Windows PowerShell 5.1 or PowerShell 7+
- **Excel** (optional): For advanced reporting features

### Authentication Flow
1. CheckIT uses your logged-in Windows profile
2. Authenticates with Passman credential management system  
3. Checks out Administrator credentials for target computers
4. **Important**: If you can't checkout Administrator, remote operations won't work

## 🚀 Quick Start

### Enhanced Template Workflow

```powershell
# 1. Add computers to your working list
NodeList -Action Add -Nodes @("LAB01-PC01", "LAB01-PC02", "LAB01-PC03")

# 2. Get Administrator credentials via Passman
Passman -Nodes $global:nodeList

# 3. Execute template workflow with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Lab_Audit" -ExportToExcel

# 4. Review results in Excel with individual sheets per template + summary
```

### Traditional Data Collection Workflow

```powershell
# Test what's online (quick check)
Test-NodeConnection -Nodes $global:nodeList -OnlineOnly

# Full connectivity and service test
Test-NodeConnection -Nodes $global:nodeList

# Software inventory across all nodes
Get-Software -Nodes $global:nodeList -Mode All -ReportName "Lab Software Audit"

# SCCM package management
Get-CCMPackages -Nodes $global:nodeList -Mode Interactive
```

### Save Your Work

```powershell
# Save session for tomorrow
Save-CheckITDataCore -Path "C:\CheckIT\Lab_Refresh_2025.json"
```

## 🔧 Development & Maintenance

### Enhanced Template-Driven Development
```powershell
# Get complete function template with all CheckIT patterns
Manage-Templates -Type Codebase -Action Preview
# Select "CheckIT Function Template" for complete development template

# Search for existing patterns before building new functions
Manage-Templates -Type Codebase -Action Search

# Use template workflows for complex operations
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Test" -ExportToExcel
```

### Automated Documentation Updates
```powershell
# When completing a new function, update all documentation automatically
Add-ChangelogEntry -Summary "Enhanced Template Workflow System" -Type "Enhancement" -GenerateAIPrompt:$true

# Generate AI assistant prompt for comprehensive documentation analysis
Generate-DocumentationAnalysisPrompt -Summary "Template System Updates" -Type "Enhancement"
```

## ⚠️ Implementation Notes

This module exports **71 functions** that are all fully implemented and production-ready. CheckIT-Core is now **100% complete** with comprehensive template workflow system, enhanced automation, and enterprise-grade capabilities.

**Current Status**: Version 1.3.0 - Feature Complete
- All 71 planned functions implemented and operational
- Enhanced template workflow system fully functional
- Advanced automation with session memory
- Comprehensive Excel reporting with multi-sheet support
- Complete documentation with AI-assisted maintenance

For detailed implementation status, see [Implementation Status](docs/implementation-status.md).

## 💡 Tool Context & Comparison

**CheckIT fills the gap between:**
- **Manual tools** (Remote Desktop, individual MMC consoles)
- **Enterprise tools** (System Center Configuration Manager, Collection Commander)

**Similar to Collection Commander/Client Center for Configuration Manager, but:**
- Focuses on departmental/lab environments with enhanced template workflows
- Integrates with institutional credential management (Passman)
- Emphasizes session persistence and workflow continuity
- Designed for mixed GUI/CLI workflows with advanced automation
- Provides template-driven development for rapid capability extension

**When to use CheckIT vs Enterprise tools:**
- **CheckIT**: Departmental labs, classrooms, ad-hoc management tasks, template-driven workflows
- **SCCM/Enterprise**: Large-scale deployments, policy management, enterprise reporting

## 🔄 Parallel Processing & Resilience

**Enhanced Strengths:**
- Processes multiple computers simultaneously (default: 8 parallel operations)
- Enhanced job completion detection prevents hanging at partial completion
- Automatic timeout handling with comprehensive safety checks
- Continues working even when some computers are offline
- Session-wide automation with "Yes to All" / "No to All" support

**Optimizations:**
- Robust job management eliminates the 8/47 node hanging issue
- Enhanced credential resolution with automatic Passman integration
- Template workflows optimize batch operations with confirmation inheritance
- Multi-method job completion detection ensures reliable processing

**Resilience features:**
```powershell
# Skip problematic nodes for this session
Add-SkipNode -Node "BROKEN-PC01"

# Test connectivity first to identify issues
$online = Test-NodeConnection -Nodes $global:nodeList -OnlineOnly
$workingNodes = $online | Where-Object { $_.Online -eq $true }

# Use template workflows for comprehensive operations
Invoke-TemplateWorkflow -Nodes $workingNodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Filtered_Audit" -ExportToExcel
```

## 📖 Usage Examples

### Example 1: Enhanced Template Workflow

```powershell
# Comprehensive system audit with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space", "List Installed Apps") -WorkflowName "Complete_System_Audit" -ExportToExcel

# Smart session automation - prompts once, remembers choice
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
# Select "YA" (Yes to All) → all subsequent operations auto-proceed

# Results: Excel file with individual sheets per template + summary sheet
```

### Example 2: Software Compliance with Template Integration

```powershell
# Use template for software inventory
Invoke-TemplateCommand -Nodes $global:nodeList -TemplateName "List Installed Apps" -Confirm:$false

# Or traditional approach
Get-Software -Nodes $global:nodeList -Mode Specific -SearchStrings @("Office", "Chrome") -ReportName "Compliance Check"

# Export with multi-sheet support
Export-ToExcel -Sheets @{
    'Template_Results' = $templateResults
    'Traditional_Results' = $traditionalResults
} -Title "Software Compliance Report"
```

### Example 3: Template-Driven Development

```powershell
# Search for existing capabilities before building new functions
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search

# Get complete function development template
Manage-Templates -Type Codebase -Action Preview
# Select "CheckIT Function Template"

# Test new function with template workflow
Invoke-TemplateWorkflow -Templates @("Your New Template") -Confirm "Auto" -ExportToExcel
```

## 📚 Function Reference

### Enhanced Template System
- `Invoke-TemplateWorkflow` - Multi-template execution with Excel export and session automation
- `Invoke-TemplateCommand` - Individual template execution with enhanced confirmation
- `Manage-Templates` - Complete template management (Command, Test, Codebase)
- `Ensure-Templates` - Built-in template loading and initialization

### Node & Session Management
- `NodeList` - Manage your working computer list with Passman status preservation
- `Save-CheckITDataCore` / `Load-CheckITDataCore` - Complete session persistence
- `Test-NodeConnection` - Enhanced connectivity and service validation

### Authentication & Security  
- `Passman` - Credential checkout from credential management system
- `Get-ValidCred` / `Get-ValidCredStatus` - Enhanced credential availability checking
- `Show-CredentialClipboard` - Secure credential access for manual tasks

### Data Collection & Analysis
- `Get-Software` - Software inventory with parallel processing and comprehensive reporting
- `Get-CCMPackages` - SCCM package discovery and interactive management
- `Get-SoftwareSampleAnalysis` - Statistical software analysis across OUs with Excel export

### Reporting & Export
- `Export-ToExcel` - Multi-sheet Excel reports with no external dependencies
- `Invoke-Pivotizer` - Dynamic pivot table and slicer generation
- `Set-Report` - Comprehensive report management and storage

### Documentation Automation (New)
- `Add-ChangelogEntry` - Automated changelog maintenance with cross-reference updates
- `Generate-DocumentationAnalysisPrompt` - AI-assisted documentation analysis and review

## ⚙️ Configuration & Capabilities

### Current Capabilities (100% Complete)
- **Enhanced Template System**: ✅ Multi-template workflows with Excel export and session automation
- **Core Functions**: ✅ Node management, credential handling, software inventory
- **SCCM Integration**: ✅ Package discovery, interactive management, and deployment commands
- **Advanced Reporting**: ✅ Multi-sheet Excel export, pivot tables, comprehensive analytics
- **Session Management**: ✅ Complete save/load capability with preference preservation
- **Documentation Automation**: ✅ Automated changelog and AI-assisted documentation analysis

### Enhanced Features
- **Session Automation**: Three-tier confirmation system with "Yes to All" / "No to All" support
- **Template Categories**: Command templates for operations, Test templates for validation, Codebase templates for development
- **Robust Job Management**: Enhanced parallel processing eliminates hanging job issues
- **Credential Integration**: Seamless Passman integration with status preservation
- **Multi-Sheet Excel**: Individual template sheets plus summary sheet for comprehensive reporting

### User Preferences

```powershell
# Customize default behaviors
Set-UserPreference -Function 'Export-ToExcel' -Key 'AutoOpen' -Value $true
Set-UserPreference -Function 'Invoke-TemplateWorkflow' -Key 'DefaultConfirm' -Value "Auto"

# Save preferences with your session
Save-CheckITDataCore -Path "C:\CheckIT\MyPreferences.json"
```

## 🔍 Troubleshooting

### Template System Issues
```powershell
# Verify templates are loaded
Ensure-Templates -Force
Manage-Templates -Type Command -Action List

# Test template execution
Invoke-TemplateCommand -TemplateName "Get OS Info" -Confirm:$false -PromptUser:$false

# Debug template workflow
Test-TemplateWorkflowExecution  # From troubleshooting guide
```

### Authentication Issues
```powershell
# Check credential status
Get-ValidCredStatus -Nodes $global:nodeList

# Verify Passman connectivity
SanityCheck  # Checks configuration and permissions

# Reset credential store if needed
Ensure-GlobalCredStore -SyncNodeList
```

### Session & Automation Issues
```powershell
# Check session automation state
$global:WorkflowAutoConfirm

# Reset session automation
$global:WorkflowAutoConfirm = @{}

# Test enhanced confirmation
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm "Auto"
```

### Session Recovery
```powershell
# Load previous session
Load-CheckITDataCore -Path "C:\CheckIT\LastSession.json"

# Check what was preserved
Manage-Store -Store NodeList -Action Preview
Manage-Store -Store Reports -Action Preview
```

## 🤝 Contributing

We welcome contributions! Please see our [Developer Guide](docs/developer-guide.md) for enhanced patterns and template-driven development standards.

### Development Notes
- Uses template-driven development for rapid, consistent function creation
- Enhanced automation patterns for GUI and CLI integration
- Comprehensive error handling and timeout management
- Template system enables rapid capability extension
- Documentation automation with AI-assisted analysis

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- **Documentation**: [Developer Guide](docs/developer-guide.md)
- **Template System**: [API Reference](docs/api-reference.md)
- **Troubleshooting**: [Troubleshooting Guide](docs/troubleshooting.md)
- **Issues**: Contact IT Department
- **Training**: Available for departmental staff

---

**Current Version**: 1.3.0 | **Functions Implemented**: 71 | **Completion**: 100% | **Status**: Production Ready

**Key Achievements**: Enhanced template workflow system, advanced automation with session memory, comprehensive multi-sheet Excel reporting, complete documentation automation, and enterprise-grade reliability.