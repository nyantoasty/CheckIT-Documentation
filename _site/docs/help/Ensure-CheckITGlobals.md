---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version: 
schema: 2.0.0
---

# Ensure-CheckITGlobals

## SYNOPSIS
Ensures all global CheckIT stores and variables are properly initialized with correct types.

## DESCRIPTION
Initializes and validates all global CheckIT stores including CheckIT_Preferences, nodeList,
SkipNodes, CheckIT_StackDepth, CredStore, and Reports with their required structure.
Safe to call multiple times - only initializes missing stores and keys.
Ensures Reports hashtable contains all required keys (NodeList, TaskLog, ErrorLog, Reports,
Preferences, Templates) and that Templates has proper substructure (Command, Test, Codebase).

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
Ensure-CheckITGlobals -Nodes @("PC001")
```

Basic usage example.

## INPUTS

## OUTPUTS

## NOTES
