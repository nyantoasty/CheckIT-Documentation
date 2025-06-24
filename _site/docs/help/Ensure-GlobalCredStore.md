---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# Ensure-GlobalCredStore

## SYNOPSIS
Ensures the global credential store exists, is initialized, and is not expired with optional NodeList synchronization and missing credential management.

## DESCRIPTION
Core infrastructure function that validates and maintains the CheckIT global credential store ($global:CredStore). This function ensures proper initialization of all CheckIT global variables, checks credential store validity and expiration status, and optionally synchronizes with the NodeList to identify and resolve missing credentials.

The function serves as a critical dependency for all credential-dependent operations in CheckIT, providing automated credential store management with both interactive and programmatic operation modes.

Key features:

- **Global variable initialization** via Ensure-CheckITGlobals integration
- **Credential expiration checking** with automatic cleanup of expired credentials
- **NodeList synchronization** with missing credential identification
- **Dual-mode operation** supporting both CLI prompts and GUI automation
- **Automatic Passman integration** for missing credential resolution
- **Comprehensive error handling** with detailed status reporting

## PARAMETERS

### -Nodes
Array of node objects or node names.

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

## EXAMPLES

### EXAMPLE 1
```
Ensure-GlobalCredStore -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
