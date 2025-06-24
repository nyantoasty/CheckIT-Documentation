---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# ConvertTo-PSCustomObject

## SYNOPSIS
Recursively converts hashtables to PSCustomObjects with deep conversion support.

## DESCRIPTION
Converts hashtables and nested hashtables to PSCustomObjects while preserving structure.
Handles arrays, nested hashtables, and mixed data types.
Useful for ensuring consistent
object types throughout CheckIT operations.

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
ConvertTo-PSCustomObject -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
