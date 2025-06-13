---
title: 🧩 Template System
layout: docs-page
---

<link rel="stylesheet" href="../assets/style.css">

---

## 🎯 Template Design Philosophy

CheckIT templates follow a **"simple commands, powerful workflows"** approach that maximizes flexibility while maintaining ease of use:

### ✅ Simple Commands

- Each command template does ONE thing well
- Pure PowerShell commands that return structured data
- Automatic credential management via Process-Parallel
- Consistent error handling and timeout management

### ✅ Powerful Workflows 

- Combine multiple templates using `Invoke-TemplateWorkflow`
- Automatic Excel export with separate sheets per template
- Parallel execution across all target nodes
- Comprehensive logging and reporting

### ✅ Integration with CheckIT Functions

Templates can leverage existing CheckIT functions for consistency:

{% highlight powershell linenos %}# Template can call CheckIT functions for enhanced functionality
$userResults = Get-Users -Nodes $env:COMPUTERNAME -PromptUser:$false
{% endhighlight %}

### 🆕 Advanced Template Workflows

#### System Audit Workflow

{% highlight powershell linenos %}Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @(
    "Get OS Info",
    "Get System Specs", 
    "Check Disk Space",
    "List Logged-On Users"
) -WorkflowName "Complete_System_Audit" -ExportToExcel
{% endhighlight %}

#### SCCM Analysis Workflow

{% highlight powershell linenos %}Invoke-TemplateWorkflow -Nodes $labNodes -Templates @(
    "Get SCCM Client Info",
    "Get CCM Packages",
    "Get SMS Installed Software",
    "Get CCM Software Metering"
) -WorkflowName "SCCM_Analysis" -ExportToExcel
{% endhighlight %}

## 🆕 Enhanced Software Discovery (v1.4.0)

CheckIT now provides the most comprehensive SCCM software discovery available:

### Three Complementary Approaches

1. **SMS_InstalledSoftware** - Official software inventory with metering correlation
2. **CCM_Application + CCM_Program** - Available packages with deployment status
3. **CCM_RecentlyUsedApps** - Individual application usage tracking

### Why Three Templates?

- **Different data sources** provide different insights
- **Combine in workflows** for complete software landscape
- **Individual templates** remain simple and focused
- **Process-Parallel execution** makes it fast across many nodes

### Real-World Usage

{% highlight powershell linenos %}# Quick software inventory
Invoke-TemplateCommand -TemplateName "Get SMS Installed Software" -Nodes $nodes

# Complete software analysis workflow
Invoke-TemplateWorkflow -Templates @(
    "Get SMS Installed Software", 
    "Get CCM Packages", 
    "Get CCM Software Metering"
) -WorkflowName "Software_Analysis" -ExportToExcel
{% endhighlight %}

## 🚀 Creating Your Own Templates

### Why Create Custom Templates?

The built-in templates cover common IT operations, but every environment has unique needs. Custom templates allow you to:

- **Standardize repetitive tasks** specific to your environment
- **Create organization-specific workflows** (e.g., lab imaging validation, department-specific software checks)
- **Build comprehensive test suites** for your hardware/software configurations
- **Develop reusable code patterns** for consistent CheckIT function development

### How to Create Templates

CheckIT supports three template types, each serving different purposes:

#### 🔧 Command Templates

**Purpose**: Remote PowerShell commands for data collection or system operations

{% highlight powershell linenos %}# Create a new command template
Manage-Templates -Type Command -Action Add

# Example: Custom software audit for your department
# Template Name: "Department Software Audit"
# Command: Get-WmiObject -Class Win32_Product | Where-Object { $_.Name -match "YourDeptSoftware" } | Select-Object Name, Version
{% endhighlight %}

#### 🧪 Test Templates  

**Purpose**: Interactive validation workflows with manual and automated steps

{% highlight powershell linenos %}# Create a new test template
Manage-Templates -Type Test -Action Add

# Example: Lab computer checkout procedure
# - Automated: Check network connectivity, services
# - Manual: Verify peripherals, user login test
# - Documentation: Issues found, technician notes
{% endhighlight %}

#### 💻 Codebase Templates

**Purpose**: Development patterns and function templates for building new CheckIT functions

{% highlight powershell linenos %}# Browse development patterns
Manage-Templates -Type Codebase -Action Search

# Copy and modify existing patterns for your needs
Manage-Templates -Type Codebase -Action Copy
{% endhighlight %}

### Template Management Commands

{% highlight powershell linenos %}# List available templates by type
Manage-Templates -Type Command -Action List
Manage-Templates -Type Test -Action List
Manage-Templates -Type Codebase -Action List

# Preview a template before using
Manage-Templates -Type Command -Action Preview

# Copy and modify existing templates
Manage-Templates -Type Command -Action Copy

# Edit your user templates
Manage-Templates -Type Test -Action Edit
{% endhighlight %}

### Integration with Workflows

Once created, your templates integrate seamlessly with CheckIT workflows:

{% highlight powershell linenos %}# Use custom templates in workflows
Invoke-TemplateWorkflow -Templates @("Your Custom Template", "Get OS Info") -WorkflowName "Custom_Audit" -ExportToExcel

# Execute individual custom templates
Invoke-TemplateCommand -TemplateName "Your Custom Template" -Nodes $global:nodeList
{% endhighlight %}

## 📋 Built-in Command Templates (20 total)

### System Information Commands (4 templates)

1. **"Get OS Info"** - Comprehensive OS and system information including computer name, OS version, memory, manufacturer, model, serial number, and domain
2. **"Get System Specs"** - Detailed hardware specifications with processor, memory, and disk information
3. **"Get System Uptime"** - System boot time and uptime analysis with recommendations for long uptimes
4. **"Get Event Log Errors"** - Recent error events from System and Application logs (last 24 hours)

### Disk and Storage Commands (2 templates)

1. **"Check Disk Space"** - Disk space analysis for all drives with usage percentages and status alerts
2. **"Get Disk Health"** - Physical disk health and SMART status information

### User and Session Commands (2 templates)

1. **"List Logged-On Users"** - Active user sessions using CheckIT's Get-Users function with fallback
2. **"Get User Sessions"** - Detailed user session information with process counts

### Network and Connectivity Commands (2 templates)

1. **"Test Network Connectivity"** - Test connectivity to domain controller, Google DNS, and local gateway
2. **"Get Network Info"** - Network adapter and IP configuration details

### System Maintenance Commands (3 templates)

1. **"Force GPUpdate"** - Force Group Policy update with execution timing and results
2. **"Clear Print Queue"** - Clear all print jobs from all printers with summary statistics
3. **"Check Pending Reboot"** - Check for pending reboots from Windows Update, CBS, SCCM, and file operations

### SCCM & Software Discovery Commands (6 templates) 🆕

1. **"SCCM Client Actions"** - Trigger multiple SCCM client actions (Policy, Inventory, Updates)
2. **"Get SCCM Client Info"** - SCCM client version, configuration, and status information
3. **"Get SMS Installed Software"** - Comprehensive SMS software inventory with metering correlation
4. **"Get CCM Packages"** - Available CCM applications and legacy packages with deployment status
5. **"Get CCM Software Metering"** - Individual application usage and metering data

### System Control Commands (2 templates)

1. **"Reboot Computer"** - Schedule system reboot with 60-second user warning
2. **"Cancel Reboot"** - Cancel a pending system reboot

### Diagnostic Commands (3 templates)

1. **"Get System Uptime"** - System boot time and uptime analysis
2. **"Get Event Log Errors"** - Recent error events from system logs
3. **"Get Network Info"** - Network adapter and configuration details

## 🧪 Built-in Test Templates (5 total)

### Functionality Tests (5 templates)

1. **"Default Functionality Test"** - Comprehensive system functionality check including:
   - Win32PM service status
   - User login verification
   - Start Menu functionality (manual)
   - Calculator and Windows Apps (manual)
   - Office applications (manual)
   - Office licensing and installation
   - Software Center installation
   - General notes field

2. **"CCM Health Check"** - SCCM/Configuration Manager health assessment:
   - CCM summary information
   - Pending Windows updates count
   - Reboot requirement status
   - SCCM-specific issues notes

3. **"Network & Drive Check"** - Network and storage validation:
   - Node connectivity testing
   - Mapped drives verification
   - Network drive accessibility (manual)
   - Printer status
   - Network/drive issues notes

4. **"Profile & Login Troubleshooting"** - User profile and login diagnostics:
   - Profile loading verification (manual)
   - Login status verification
   - Start Menu functionality (manual)
   - Browser functionality (manual)
   - Login/profile issues documentation

5. **"Office & Apps Validation"** - Application functionality verification:
   - Office applications functionality (manual)
   - Office licensing status
   - Office installation verification
   - Software Center installation check
   - Calculator and Windows Apps (manual)
   - Application issues documentation

## 💻 Built-in Codebase Templates (5 total)

### Development Patterns (5 templates)

1. **"CheckIT Function Template"** - Complete template for new CheckIT functions with all required patterns:
   - Credential management
   - Node normalization
   - Progress tracking
   - Process-Parallel execution
   - Error handling
   - Reporting separation

2. **"Credential Resolution Pattern"** - Standard credential resolution workflow using Get-NodeCredAndFQDN

3. **"Process-Parallel Template"** - Template for parallel execution with credential support

4. **"Reporting Pattern"** - Correct separation of task logging and business reporting to avoid double reporting

5. **"Error Handling Pattern"** - Standard error handling and node status updates with NodeList integration

## 📊 Template Summary Statistics

- **Total Built-in Templates: 30**
  - Command Templates: 20 (70%)
  - Test Templates: 5 (15%)
  - Codebase Templates: 5 (15%)

## 🔧 Template Integration Features

### Command Templates

- All integrate with CheckIT's parallel processing (`Process-Parallel`)
- Support both CLI and GUI modes via `PromptUser` parameter
- Include comprehensive error handling and timeout management
- Generate structured PSCustomObject output for reporting
- Support dry-run mode for validation
- **Software inventory now uses command template approach** with three specialized SCCM templates

### Test Templates

- Support both attended and unattended execution modes
- Include manual verification steps and automated checks
- Provide structured response types (YesNo, Text, Status, File)
- Enable comprehensive system validation workflows

### Codebase Templates

- Provide development patterns and best practices
- Include complete function templates with all required CheckIT patterns
- Support credential management and parallel processing
- Demonstrate proper separation of concerns (logging vs. reporting)

---

