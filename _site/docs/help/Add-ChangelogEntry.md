---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# Add-ChangelogEntry

## SYNOPSIS
Creates and adds a standardized entry to the project's CHANGELOG.md file.

## DESCRIPTION
Adds a structured changelog entry with consistent formatting to the project's CHANGELOG.md file.
Each entry includes metadata like change type, version, impact, and lists of affected files and functions.
The function ensures entries are properly formatted according to the project's changelog standards
and places them in chronological order.

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
Add-ChangelogEntry -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
