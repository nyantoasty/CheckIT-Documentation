---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-AllColumns

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-AllColumns

## SYNOPSIS

Gets all unique column names from an array of objects.

## SYNTAX





Get-AllColumns [[-Data] <Object[]>]





## DESCRIPTION

Examines all objects in the array and returns a list of all unique property names.

## EXAMPLES

### EXAMPLE 1





$columns = Get-AllColumns $dataArray





## PARAMETERS

### -Data

Array of objects to examine.

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

## NOTES

## RELATED LINKS



