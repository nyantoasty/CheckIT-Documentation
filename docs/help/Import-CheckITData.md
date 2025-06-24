---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Import-CheckITData

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Import-CheckITData

## SYNOPSIS

Imports Excel data and routes it to the appropriate CheckIT global store (NodeList, Reports, TaskLog, ErrorLog, Templates, Preferences, CredStore).

## SYNTAX





Import-CheckITData [-Path] <String> [[-Worksheet] <Object>] [[-PromptUser] <Boolean>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Uses Import-FromExcel to read an .xlsx file, inspects the columns and/or sheet names, and determines the best target store.
If ambiguous, prompts the user to select the destination.
Handles PSCustomObject/hashtable normalization for CLI/GUI.

## EXAMPLES

### EXAMPLE 1





Import-CheckITData -Path "C:\Transcripts\NodeList.xlsx"





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
Worksheet name or index to import.

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

If true (default), shows prompts and dialogs; if false, routes automatically or returns info.

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



