---
title: ℹ️ About
layout: docs-page
subtitle: Custom PowerShell toolkit for Windows environment management
---

> CheckIT is a comprehensive PowerShell module designed for IT professionals managing Windows computer environments at scale. It streamlines diagnostics, reporting, and management tasks with templated workflows and session automation capabilities, perfect for educational institutions and enterprise environments.

## 📚 Documentation

- **[ℹ️ About](README.md)** - Complete overview of CheckIT capabilities
- **[🚀 Get Started](/get-started.md)** - Installation and initial setup
- **[📘 API Reference](api-reference.md)** - Complete function library (75+ functions)
- **[⚡ Quick Reference](quick-reference.md)** - Essential patterns and workflows
- **[🧩 Template System](templateInfo.md)** - Detailed template capabilities (30+ templates)
- **[🔍 Troubleshooting](troubleshooting.md)** - Solutions for common issues
- **[🔧 Internal Helper Functions](internal-helpers.md)** - Non-exported utility functions
- **[📋 Changelog](../CHANGELOG.md)** - Version history and updates

## 🚀 Key Features

- **Template Workflow System**: Multi-template execution with Excel export and session automation
- **Centralized Node Management**: Domain computer inventory with seamless AD integration
- **Secure Authentication**: Passman integration with credential checkout and secure storage
- **Parallel Processing**: High-performance operations across multiple computers simultaneously
- **Session Persistence**: Save and restore work sessions, node lists, and preferences between sessions
- **Comprehensive Reporting**: Structured data collection with multi-sheet Excel export capabilities
- **Documentation Automation**: Changelog generation and cross-reference validation

## 🧩 Template System

CheckIT's modular template system provides standardized approaches to common tasks across three categories:

### Command Templates (20 built-in)

Execute standardized remote PowerShell commands across multiple systems:

```powershell
# Execute a command template
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info"
```

### Test Templates (5 built-in)

Interactive functionality tests to validate configurations and troubleshoot issues:

```powershell
# Run a test template
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Default Functionality Test"
```

### Codebase Templates (5 built-in)

Development patterns for extending functionality and maintaining code standards:

```powershell
# Get a development pattern
Manage-Templates -Type Codebase -Action Preview
```

## ⚡ Quick Start Guide

```powershell
# Add computers to your working list
NodeList -Action Add -Nodes @("LAB01-PC01", "LAB01-PC02")

# Get Administrator credentials
Passman -Nodes $global:nodeList

# Execute template workflow with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel
```

## 📊 Usage Examples

### Template Workflow

Combine multiple templates into a single workflow with automated Excel reporting:

```powershell
# Comprehensive system audit with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @(
    "Get OS Info", 
    "Check Disk Space", 
    "List Installed Apps"
) -WorkflowName "Complete_Audit" -ExportToExcel

# Session automation - prompts once, remembers choice
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
```

### Software Inventory

Multiple approaches for software inventory management:

```powershell
# Template approach - standardized
Invoke-TemplateCommand -Nodes $global:nodeList -TemplateName "List Installed Apps"

# Traditional approach - customizable
Get-Software -Nodes $global:nodeList -Mode Specific -SearchStrings @("Office", "Chrome")
```

### Session Management

Save and restore your complete working environment:

```powershell
# Save your session
Save-CheckITDataCore -Path "C:\CheckIT\Lab_Audit.json"

# Restore your session later
Load-CheckITDataCore -Path "C:\CheckIT\Lab_Audit.json"
```

## 🔧 Installation & Prerequisites

### System Requirements

- **PowerShell**: Windows PowerShell 5.1 or PowerShell 7+
- **Environment**: Domain environment with Active Directory access
- **Authentication**: Passman credential management system
- **Reporting**: Microsoft Excel (optional) for enhanced reporting features

### Installation

```powershell
# Install from directory
cd "CheckIT-Core-v1.5.0"
.\install.ps1

# Import the module
Import-Module CheckIT-Core
```

## 🛠️ Support & Resources

- **Version Status**: v1.5.0 Beta (open to feature requests)
- **Issues & Requests**: Contact KJA through internal ticketing system
- **Documentation**: Comprehensive guides available in the Documentation section above
- **Development**: Custom templates and workflows available upon request

## 📄 License & Acknowledgements

CheckIT is developed and maintained by KJA for institutional use. All rights reserved.
Special thanks to contributors from the IT department for testing and feedback.

---

## *Last updated: June 13, 2025*
