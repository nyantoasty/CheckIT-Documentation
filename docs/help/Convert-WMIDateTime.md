---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# Convert-WMIDateTime

## SYNOPSIS
Converts WMI datetime format to readable date string

## DESCRIPTION
Converts WMI datetime strings in formats like `20250607000000.000000+***` to readable date/time strings.
Handles both full datetime stamps and date-only formats.
Returns properly formatted strings for display and logging.

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
Convert-WMIDateTime -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
