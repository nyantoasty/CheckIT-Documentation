---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# Clean-ExcelColumnName

## SYNOPSIS
Sanitizes column names for Excel compatibility, especially for pivot tables and slicers.

## DESCRIPTION
Transforms column names to ensure compatibility with Excel, particularly for features like
pivot tables and slicers that have strict naming requirements. This function applies several
transformations to make column names Excel-friendly:

1. Removes special characters that cause Excel issues
2. Replaces spaces with underscores for better slicer compatibility
3. Trims names to 31 characters (Excel's column name limit)
4. Ensures names aren't empty after cleaning

This function is automatically used by Export-ToExcel when processing column headers.
It can also be used directly when preparing data for Excel export in other contexts.

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
Clean-ExcelColumnName -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
