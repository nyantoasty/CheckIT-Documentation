---
layout: default
title: CheckIT Out
---

<link rel="stylesheet" href="../assets/style.css">

## Getting Started with CheckIT-Core

This guide provides instructions on how to request access to CheckIT-Core, install it, update to a new version, and uninstall if needed.

## 📋 Requesting Access

CheckIT-Core is currently in beta status and available by request.

**To request access:**

1. Contact KJA directly
2. Provide your department/team name and intended use case
3. You'll receive installation files and access instructions if approved

## ⚠️ Important PowerShell Compatibility Note

> **Warning:** CheckIT-Core requires PowerShell 7 or higher and is **not compatible with Windows PowerShell 5.1**. 
>
> If you encounter installation or module loading errors with Windows PowerShell, please install the latest PowerShell version from the Microsoft Store.

To check your current PowerShell version:

```powershell
$PSVersionTable.PSVersion
```

To install PowerShell 7+:
1. Open Microsoft Store
2. Search for "PowerShell"
3. Select and install "PowerShell" (not "Windows PowerShell")
4. Launch PowerShell 7 and proceed with the installation

## 🔧 Installation

Once you have received the CheckIT-Core files and installed PowerShell 7+, installation is straightforward:

```powershell
# Navigate to the CheckIT-Core directory
cd "CheckIT-Core-v1.5.0"

# Run the installer script
.\install.ps1
```

### Installation Options

The installer supports several parameters for customization:

```powershell
# Install to a custom location
.\install.ps1 -InstallPath "C:\CustomPath\CheckIT-Core"

# Install without help files (minimal installation)
.\install.ps1 -SkipHelp

# Force installation (overwrite existing installation)
.\install.ps1 -Force
```

### What Gets Installed

- Core module files (checkit-core.psd1, checkit-core.psm1)
- Help files in the en-US directory
- Documentation in the docs directory

The installer will automatically:
- Create necessary directories
- Copy all required files
- Import the module to verify it works
- Perform basic functionality tests
- Show quick-start examples for immediate use

## 🔄 Updating to a New Version

To update to a newer version of CheckIT-Core:

1. Uninstall the current version (see uninstallation instructions below)
2. Install the new version following the regular installation steps
3. Test key functionality after update

```powershell
# Uninstall current version but keep your documentation
.\uninstall.ps1 -KeepDocs

# Install new version
cd "CheckIT-Core-v1.5.0"
.\install.ps1
```

## 🗑️ Uninstallation

If you need to remove CheckIT-Core:

```powershell
# Navigate to the CheckIT-Core directory
cd "CheckIT-Core-v1.5.0"

# Run the uninstaller script
.\uninstall.ps1
```

### Uninstallation Options

```powershell
# Uninstall but keep your documentation
.\uninstall.ps1 -KeepDocs

# Uninstall from a custom location
.\uninstall.ps1 -InstallPath "C:\CustomPath\CheckIT-Core"
```

## 🚀 After Installation

Once installed, you can start using CheckIT-Core:

```powershell
# Import the module
Import-Module CheckIT-Core

# Create your first node
$node = New-NodeObject 'PC001'
NodeList -Action Add -Nodes $node

# Try a simple template
Invoke-TemplateCommand -Nodes @('PC001') -TemplateName 'Get OS Info'
```

For more detailed documentation:
- API Reference
- Quick Reference
- Troubleshooting

---

**Need help?** Contact KJA for assistance with installation or usage questions.
