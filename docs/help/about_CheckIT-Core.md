---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# about_CheckIT-Core

---
Module Name: CheckIT-Core
Module Guid: [your-module-guid]
Download Help Link: https://checkit.shsu.edu/help/
Help Version: 1.4.0
Locale: en-US
---

# CheckIT-Core Module

## SYNOPSIS

Core module for CheckIT: comprehensive node management, credential handling, diagnostics, reporting, and automation.

## DESCRIPTION

The CheckIT-Core module provides foundational logic and utilities for the CheckIT system, supporting both CLI and GUI workflows.
It enables robust management of nodes, credentials, reporting, diagnostics, Active Directory integration, parallel processing,
SCCM package management, testing frameworks, and advanced Excel export capabilities including pivot tables and slicers.
All functions are designed for extensibility, automation, and safe use in both interactive and automated environments.

## VERSION

1.4.0

## TABLE OF CONTENTS

### 1. Global Variables & Initialization

- Stores user preferences, node lists, credential store, and other global state
- Automatic initialization and safety checks for all global stores

### 2. Utility Functions

- General helpers for colored output, progress reporting, object conversion, and sanity checks
- Template management and workflow orchestration
- Documentation generation and changelog management

### 3. Global Store Management

- Functions to get, clear, and manage global stores (NodeList, Reports, TaskLog, ErrorLog, Preferences, CredStore, Templates)
- Safe store access with automatic initialization and type checking

[... continue with all sections from the original comment block ...]

## ARCHITECTURE & COOPERATION

- Utility and global store functions provide foundation for all other operations
- Node management and AD tools work together for comprehensive computer lifecycle management
- Passman and credential helpers ensure secure, centralized authentication for all remote operations
- Main tools and diagnostics rely on parallel processing engine for scalable, robust execution

## USAGE PATTERNS

### CLI Mode (Interactive)

- All functions support rich colored output, progress bars, and user prompts
- Interactive selection menus for OUs, packages, tests, and configuration options
- Real-time status updates and comprehensive error reporting

### GUI Mode (Automation)

- Use `-PromptUser:$false` for silent operation with structured object returns
- StatusCallback support for progress reporting in GUI applications
- Structured error objects for programmatic error handling

## EXAMPLES

### Node Management





NodeList -Action Add -Nodes @("PC1","PC2","PC3")
NodeList -Action Upload -FilePath "C:\Data\computers.xlsx"
$nodes = NodeList -Action Preview -PromptUser:$false





### Credential Management





Passman -Nodes $global:nodeList
$credStatus = Get-ValidCred -Nodes @("PC1","PC2") -ReturnCredential
Show-CredentialClipboard -Node "PC1"





[... continue with all examples ...]

## SECURITY FEATURES

- Credentials are never saved to disk - session-only storage
- Input sanitization for all user-provided data
- Secure credential passing to background jobs
- Audit trail for all operations and credential access
- Safe execution with timeout handling and resource cleanup

## CONFIGURATION

### Initial Setup

1. Set execution policy: `Set-ExecutionPolicy RemoteSigned

2. Configure WSMan trusted hosts: `Set-Item WSMan:\localhost\Client\TrustedHosts -Value "*.shsu.edu"

3. Import module: `Import-Module CheckIT-Core

4. Configure preferences: `Set-UserPreference

5. Load initial data: `Load-CheckITDataCore -Path "your_data.json"


## TROUBLESHOOTING

### Common Issues

- **Credential errors**: Run Passman to refresh credentials
- **Connection failures**: Check network connectivity and WinRM configuration
- **Excel export errors**: Ensure Excel is installed and COM objects are accessible
- **Performance issues**: Reduce MaxParallel parameter for slower networks

### Diagnostic Commands

- `SanityCheck`: Validates common configuration issues
- `Test-NodeConnection`: Comprehensive connectivity testing
- `Get-ValidCred`: Credential validation and status checking
- `Manage-Store -Store ErrorLog`: Review error history

## NOTES

- All global stores are managed for CLI/GUI safety
- Bracket notation is used for hashtable property access
- Always use `$($var)` in double-quoted strings for safe interpolation
- Functions are robust for both CLI and GUI (PromptUser parameter)



