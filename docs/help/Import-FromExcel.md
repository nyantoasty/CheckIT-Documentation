---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Import-FromExcel

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Import-FromExcel

## SYNOPSIS

Imports data from an Excel file using COM objects.

## SYNTAX





Import-FromExcel [-Path] <String> [[-Worksheet] <Object>] [[-PromptUser] <Boolean>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Reads data from an Excel worksheet and returns it as an array of PSCustomObjects.
Supports specifying worksheet by name or index.

## EXAMPLES

### EXAMPLE 1





Import-FromExcel -Path "C:\Data\Report.xlsx" -Worksheet "Sheet1"





## PARAMETERS

### -Path

Path to the Excel file to import.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Worksheet

Optional.
Worksheet name or index to import from.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If true, shows status messages.
If false, silent operation.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: True
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

## RELATED LINKS



