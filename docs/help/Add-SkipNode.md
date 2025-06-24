---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# Add-SkipNode

## SYNOPSIS
Adds a node to the global skip list for exclusion from operations.

## DESCRIPTION
Adds a node name to the global $SkipNodes array to prevent it from being processed
in future CheckIT operations.
Useful for temporarily excluding problematic nodes.

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
Add-SkipNode -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
