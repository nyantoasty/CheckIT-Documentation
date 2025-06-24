---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Is-TaskLogError

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Is-TaskLogError

## SYNOPSIS

Determines if a task log row represents an error or failure.

## SYNTAX





Is-TaskLogError [-Row] <Object> [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Checks the Status and error-related fields of a log row for known error patterns or non-empty error fields.
Used by Get-TaskLogErrors to robustly filter error rows for reporting and analysis.

## EXAMPLES

### EXAMPLE 1





$isError = Is-TaskLogError -Row $row





## PARAMETERS

### -Row

The log row object to check.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -ProgressAction

{{ Fill ProgressAction Description }}

```yaml
Type: ActionPreference
Parameter Sets: (All)
Aliases: proga

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### CommonParameters

This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

## OUTPUTS

## NOTES

Update $errorPatterns as needed to match new error/failure status values.

## RELATED LINKS



