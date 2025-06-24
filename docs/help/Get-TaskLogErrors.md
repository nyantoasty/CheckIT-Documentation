---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-TaskLogErrors

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-TaskLogErrors

## SYNOPSIS

Filters task log rows for error or failure conditions.

## SYNTAX





Get-TaskLogErrors [[-LogRows] <Object[]>]





## DESCRIPTION

Returns only log rows where Status or error fields indicate a failure, error, or missing condition.
Uses Is-TaskLogError for robust detection.

## EXAMPLES

### EXAMPLE 1





$errors = Get-TaskLogErrors -LogRows $logRows





## PARAMETERS

### -LogRows

Array of log row objects to filter.

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



