---
title: ℹ️ About
layout: docs-page
---

<link rel="stylesheet" href="../assets/style.css">

---

> Custom PowerShell module for Windows computer management, diagnostics, and reporting in domain environments. Designed for IT departments managing labs, classrooms, and departmental computers.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Key Features](#key-features)
- [Template System](#template-system)
- [Usage Examples](#usage-examples)
- [Installation](#installation)
- [Support](#support)

## 📚 Documentation

- **[API Reference](api-reference.md)** - Complete function library
- **[Troubleshooting](troubleshooting.md)** - Solutions for common issues
- **[Quick Reference](quick-reference.md)** - Essential patterns and workflows
- **[Template System](template-info.md)** - Detailed information about current template capabilities
- **[Internal Helper Functions](internal-helpers.md)** - Details about crucial functions that are not exported

## 🚀 Key Features

- **Template Workflow System**: Multi-template execution with Excel export and session automation
- **Centralized Node Management**: Domain computer inventory with AD integration
- **Secure Authentication**: Passman integration with credential checkout
- **Parallel Processing**: High-performance operations across multiple computers
- **Session Persistence**: Save and restore work sessions, node lists, and preferences
- **Comprehensive Reporting**: Structured data collection with multi-sheet Excel export
- **Documentation Automation**: Changelog generation and cross-reference validation

## 🔄 Template System

**Command Templates**: Remote PowerShell commands (20 built-in templates)
{% highlight powershell linenos %}# Execute a command template
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info"
{% endhighlight %}

**Test Templates**: Interactive functionality tests (5 built-in templates)
{% highlight powershell linenos %}# Run a test template
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Default Functionality Test"
{% endhighlight %}

**Codebase Templates**: Development patterns (5 built-in templates)
{% highlight powershell linenos %}# Get a development pattern
Manage-Templates -Type Codebase -Action Preview
{% endhighlight %}

## 🚀 Quick Start

{% highlight powershell linenos %}# Add computers to your working list
NodeList -Action Add -Nodes @("LAB01-PC01", "LAB01-PC02")

# Get Administrator credentials
Passman -Nodes $global:nodeList

# Execute template workflow with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel
{% endhighlight %}

## 📖 Usage Examples

### Template Workflow Example

{% highlight powershell linenos %}# Comprehensive system audit with Excel export
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space", "List Installed Apps") -WorkflowName "Complete_Audit" -ExportToExcel

# Session automation - prompts once, remembers choice
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -Confirm "Auto"
{% endhighlight %}

### Software Inventory Example

{% highlight powershell linenos %}# Template approach
Invoke-TemplateCommand -Nodes $global:nodeList -TemplateName "List Installed Apps"

# Traditional approach
Get-Software -Nodes $global:nodeList -Mode Specific -SearchStrings @("Office", "Chrome")
{% endhighlight %}

### Session Management Example

{% highlight powershell linenos %}# Save your session
Save-CheckITDataCore -Path "C:\CheckIT\Lab_Audit.json"

# Restore your session later
Load-CheckITDataCore -Path "C:\CheckIT\Lab_Audit.json"
{% endhighlight %}

## 🔧 Installation

### Prerequisites

- Windows PowerShell 5.1 or PowerShell 7+
- Domain Environment (Active Directory)
- Passman credential management system
- Excel (optional) for reporting features

### Quick Install

{% highlight powershell linenos %}# Install from directory
cd "CheckIT-Core-v1.5.0"
.\install.ps1
{% endhighlight %}

## 📞 Support

- **Issues**: Contact KJA
- **Documentation**: See API Reference, Quick Reference and Troubleshooting Guide

---

