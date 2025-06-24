---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Show-PreferenceHelp

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Show-PreferenceHelp

## SYNOPSIS

Displays an explanation for a user preference key from the help of a specified function.

## SYNTAX





Show-PreferenceHelp [-Function] <String> [-Key] <String> [-ProgressAction <ActionPreference>]
 [<CommonParameters>]





## DESCRIPTION

Looks up the comment-based help for a function and extracts the description for the specified parameter/key.
Handles case-insensitive matches and normalizes output for CLI/GUI.

## EXAMPLES

### EXAMPLE 1





Show-PreferenceHelp -Function Set-Report -Key OnDuplicate





## PARAMETERS

### -Function

The name of the function whose help should be searched.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Key

The name of the preference or parameter to explain.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
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

## RELATED LINKS



