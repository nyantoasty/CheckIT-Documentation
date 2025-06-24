---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Ensure-Templates

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Ensure-Templates

## SYNOPSIS

Ensures all built-in templates are loaded into the global template store.

## SYNTAX





Ensure-Templates [-Force]





## DESCRIPTION

Loads Command, Test, and Codebase templates from their built-in definitions into $global:Reports\['Templates'\].
Safe to call multiple times - only adds missing templates.

## EXAMPLES

### EXAMPLE 1





Ensure-Templates





### EXAMPLE 2





Ensure-Templates -Force





## PARAMETERS

### -Force

If set, overwrites existing templates with built-in versions.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

## NOTES

## RELATED LINKS



