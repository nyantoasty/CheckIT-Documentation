---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-UserPreference

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-UserPreference

## SYNOPSIS

Retrieves a user preference for a specific function in CheckIT.

## SYNTAX





Get-UserPreference [-Function] <String> [-Key] <String> [[-Default] <Object>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Looks up a user preference value for a given function and key in the global CheckIT_Preferences hashtable.
Returns the stored value if found, or the provided default value if not set.

## EXAMPLES

### EXAMPLE 1





$onDup = Get-UserPreference -Function 'Set-Report' -Key 'OnDuplicate' -Default 'Prompt'





## PARAMETERS

### -Function

The name of the function or context for which the preference is being retrieved.

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

The name of the preference to retrieve (e.g., "OnDuplicate", "PromptUser").

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Default

The value to return if the preference is not set.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
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

Preferences are stored in $global:CheckIT_Preferences\[Function\]\[Key\].
Use Set-UserPreference to set preferences.

## RELATED LINKS



