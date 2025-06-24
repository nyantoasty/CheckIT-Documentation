---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Write-Color

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Write-Color

## SYNOPSIS

Writes colored text to the console, supporting multiple colors per message.

## SYNTAX





Write-Color [-Text] <String[]> [[-Color] <String[]>] [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Outputs one or more strings to the console, each in the specified color.
Useful for CLI feedback and status messages.

## EXAMPLES

### EXAMPLE 1





Write-Color "Success!" -Color Green





### EXAMPLE 2





Write-Color @("Warning: ", "Disk space low") -Color @("Yellow", "Red")





## PARAMETERS

### -Text

Array of strings to write.
Each string can have its own color.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Color

Array of colors corresponding to each string in Text.
If fewer colors than strings are provided, the first color is used for remaining strings.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: @("White")
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

This function is intended for CLI output only.
It does not support GUI or file output.

## RELATED LINKS



