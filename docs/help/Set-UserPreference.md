---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Set-UserPreference

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Set-UserPreference

## SYNOPSIS

Sets or interactively configures user preferences for CheckIT functions.

## SYNTAX





Set-UserPreference [[-Function] <String>] [[-Key] <String>] [[-Value] <Object>] [[-PromptUser] <Boolean>]





## DESCRIPTION

If PromptUser is $true, runs interactively (like Configure-UserPreferences).
If PromptUser is $false, sets a preference directly (like Set-UserPreference).

## EXAMPLES

### EXAMPLE 1





Set-UserPreference -Function 'Set-Report' -Key 'OnDuplicate' -Value 'Append' -PromptUser:$false





### EXAMPLE 2





Set-UserPreference -PromptUser





## PARAMETERS

### -Function

The function/context for the preference.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Key

The preference key.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Value

The value to assign.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If $true (default), runs interactively.
If $false, sets preference directly.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

## NOTES

## RELATED LINKS



