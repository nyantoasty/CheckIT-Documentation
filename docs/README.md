# CheckIT-Core

> Professional PowerShell module for Windows computer management, diagnostics, and reporting in domain environments. Designed for IT departments managing labs, classrooms, and departmental computers.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [Documentation](#documentation)

## 📚 Documentation

- **[Developer Guide](docs/developer-guide.md)** - Core patterns, rules, and Big 3 patterns
- **[Troubleshooting](docs/troubleshooting.md)** - Technical solutions and anti-patterns  
- **[API Reference](docs/api-reference.md)** - Function status and usage examples
- **[Assistance Guide](docs/assistance-guide.md)** - Development guidelines intended for AI and/or human collaboration
- **[Implementation Status](docs/implementation-status.md)** - Current completion status

## 🚀 Features

- **Centralized Node Management**: Domain computer inventory with AD integration
- **Secure Authentication**: Passman integration with Windows profile-based credential checkout
- **Parallel Processing**: High-performance operations across multiple computers (with resilience for offline nodes)
- **Session Persistence**: Save and restore your work sessions, node lists, and preferences
- **Password Security**: Passwords are never in plain text or stored on disk; please note that credentials will need to be checked out again if you end your powershell session
- **Comprehensive Reporting**: Structured data collection with Excel export capabilities
- **Template System**: Reusable patterns for common IT operations (Command, Test, and Codebase templates)
- **Automated Documentation**: Changelog generation and cross-reference validation
- **GUI & CLI Support**: Works in both interactive console and Windows Forms interface

## � Session Management (Key Feature!)

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

### Basic Session Workflow

```powershell
# 1. Add computers to your working list
NodeList -Action Add -Nodes @("LAB01-PC01", "LAB01-PC02", "LAB01-PC03")

# 2. Get Administrator credentials via Passman
Passman -Nodes $global:nodeList

# 3. Test what's online (quick check)
Test-NodeConnection -Nodes $global:nodeList -OnlineOnly

# 4. Full connectivity and service test
Test-NodeConnection -Nodes $global:nodeList
```

### Data Collection Examples

```powershell
# Software inventory across all nodes
Get-Software -Nodes $global:nodeList -Mode All -ReportName "Lab Software Audit"

# SCCM package management
Get-CCMPackages -Nodes $global:nodeList -Mode Interactive

# Statistical analysis of software across OUs
Get-SoftwareSampleAnalysis -BaseOU "Lab" -SampleSize 10 -Export
```

### Save Your Work

```powershell
# Save session for tomorrow
Save-CheckITDataCore -Path "C:\CheckIT\Lab_Refresh_2025.json"
```

## 🔧 Development & Maintenance

### Automated Documentation Updates
```powershell
# When completing a new function, update all documentation automatically
Add-ChangelogEntry -Summary "Implemented Get-NewFunction" -Type "Feature" -FunctionsAdded @("Get-NewFunction")
```

### Template-Driven Development
```powershell
# Get complete function template with CheckIT patterns
Manage-Templates -Type Codebase -Action Preview
```

## ⚠️ Implementation Notes

While this module exports 67 functions, they are all fully implemented and production-ready. Use `Get-Command -Module CheckIT-Core` to verify function availability in your environment.

For the most current implementation status, see [Implementation Status](docs/implementation-status.md).

## 💡 Tool Context & Comparison

**CheckIT fills the gap between:**
- **Manual tools** (Remote Desktop, individual MMC consoles)
- **Enterprise tools** (System Center Configuration Manager, Collection Commander)

**Similar to Collection Commander/Client Center for Configuration Manager, but:**
- Focuses on departmental/lab environments
- Integrates with institutional credential management (Passman)
- Emphasizes session persistence and workflow continuity
- Designed for mixed GUI/CLI workflows

**When to use CheckIT vs Enterprise tools:**
- **CheckIT**: Departmental labs, classrooms, ad-hoc management tasks
- **SCCM/Enterprise**: Large-scale deployments, policy management, enterprise reporting

## 🔄 Parallel Processing & Resilience

**Strengths:**
- Processes multiple computers simultaneously (default: 8 parallel operations)
- Continues working even when some computers are offline
- Automatic timeout handling prevents hanging on unresponsive systems

**Limitations to understand:**
- Reports may be incomplete if many nodes are offline
- Some operations require majority of nodes to be accessible for meaningful results
- Best results when >80% of target nodes are online and accessible

**Resilience features:**
```powershell
# Skip problematic nodes for this session
Add-SkipNode -Node "BROKEN-PC01"

# Test connectivity first to identify issues
$online = Test-NodeConnection -Nodes $global:nodeList -OnlineOnly
$workingNodes = $online | Where-Object { $_.Online -eq $true }
```

## 📖 Usage Examples

### Example 1: Quick Lab Health Check

```powershell
# Fast online check
$status = Test-NodeConnection -Nodes $global:nodeList -OnlineOnly
$online = $status | Where-Object { $_.Online -eq $true }

# Full diagnostic for online computers only  
$fullCheck = Test-NodeConnection -Nodes $online.Node
```

### Example 2: Software Compliance Check

```powershell
# Check what's installed
Get-Software -Nodes $global:nodeList -Mode Specific -SearchStrings @("Office", "Chrome") -ReportName "Compliance Check"

# Export results
Export-ToExcel -Sheets @{
    'Online_Status' = $status
    'Software_Results' = $complianceResults
} -Title "Lab Compliance Report"
```

## 📚 Function Reference

### Node & Session Management
- `NodeList` - Manage your working computer list
- `Save-CheckITDataCore` / `Load-CheckITDataCore` - Session persistence
- `Test-NodeConnection` - Connectivity and service validation

### Authentication & Security  
- `Passman` - Credential checkout from credential management system
- `Get-ValidCred` - Check credential availability
- `Show-CredentialClipboard` - Secure credential access for manual tasks

### Data Collection
- `Get-Software` - Software inventory and compliance checking
- `Get-CCMPackages` - SCCM package discovery and management
- `Get-NodeStats` - Hardware and system information

### Analysis & Reporting
- `Get-SoftwareSampleAnalysis` - Statistical software analysis across OUs
- `Export-ToExcel` - Structured Excel reports with multiple worksheets
- `Set-Report` - Store and manage generated reports

## ⚙️ Configuration & Limitations

### Current Capabilities
- **Core Functions**: ✅ Node management, credential handling, software inventory
- **SCCM Integration**: ✅ Package discovery and basic management  
- **Reporting**: ✅ Excel export with multiple worksheets
- **Session Management**: ✅ Full save/load capability

### Known Limitations
- **Pivot Tables**: 🚧 Basic functionality available, advanced features in development
- **Interactive Analysis**: 🚧 Limited compared to enterprise tools
- **Offline Resilience**: ⚠️ Reports may be incomplete with many offline nodes
- **Scale**: Designed for batches of <100 computers, not enterprise-scale deployments

### User Preferences

```powershell
# Customize default behaviors
Set-UserPreference -Function 'Export-ToExcel' -Key 'AutoOpen' -Value $true
Set-UserPreference -Function 'Test-NodeConnection' -Key 'MaxParallel' -Value 4

# Save preferences with your session
Save-CheckITDataCore -Path "C:\CheckIT\MyPreferences.json"
```

## 🔍 Troubleshooting

### Authentication Issues
```powershell
# Check credential status
Get-ValidCredStatus -Nodes $global:nodeList

# Verify Passman connectivity
SanityCheck  # Checks configuration and permissions
```

### Connectivity Problems  
```powershell
# Quick online check first
Test-NodeConnection -Nodes @("PROBLEM-PC") -OnlineOnly

# Then full diagnostic
Test-NodeConnection -Nodes @("PROBLEM-PC") -Verbose
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

We welcome contributions! Please see our [Developer Guide](docs/developer-guide.md) for patterns and standards.

### Development Notes
- Uses proven PowerShell patterns for reliability
- Extensive error handling and timeout management
- Both CLI and GUI compatible design
- Template system for consistent development

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- **Documentation**: [Developer Guide](docs/developer-guide.md)
- **Issues**: Contact IT Department
- **Training**: Available for departmental staff

---

**Current Version**: 1.3.0 | **Functions Implemented**: 67 | **Completion**: 98%