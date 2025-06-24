---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# Convert-ReportData

## SYNOPSIS
Post-processes raw template data for clean reporting while preserving original audit data.

## DESCRIPTION
Applies intelligent data transformations to make reports more readable and Excel-friendly:

- Converts WMI datetime strings (20250607123045.000000+***) to readable formats (06/07/2025 12:30:45)
- Standardizes null/empty values to consistent display text ("N/A", "Never Used", "Unknown")
- Normalizes data types across different sources (WMI, CIM, Registry)
- Cleans up complex nested objects for Excel export compatibility
- Converts numeric file/memory sizes to human-readable formats
- Applies field-specific formatting rules based on property name patterns

This function is automatically called by Set-Report when the -CleanData parameter is specified, ensuring that business reports contain clean, user-friendly data while preserving the original raw data in the audit trail.

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
Convert-ReportData -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
