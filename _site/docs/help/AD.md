---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# AD

## SYNOPSIS
Updates node objects with OS and OU information from Active Directory with automatic NodeList integration.

## DESCRIPTION
Queries Active Directory for computer information and updates node objects with Operating System and Organizational Unit data. This function performs both exact name matching and wildcard searches to locate computers in AD, making it robust for finding systems with partial or modified names.

The function automatically updates the global NodeList with discovered information and manages node status tracking. Non-Windows systems are marked as "Non-PC" and systems not found in AD are automatically added to the SkipNodes list to prevent future processing attempts.

Key features:

- **Dual search strategy**: Exact name match followed by wildcard search
- **Automatic NodeList updates**: Discovered information is immediately saved
- **Status management**: TaskStatus tracking during processing
- **Error handling**: Graceful handling of AD connection issues
- **Skip list management**: Automatic exclusion of invalid systems

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
AD -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
