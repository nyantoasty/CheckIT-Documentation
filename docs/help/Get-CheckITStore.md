---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-CheckITStore

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-CheckITStore

## SYNOPSIS

Safely retrieves or clears a CheckIT store (NodeList, Reports, TaskLog, ErrorLog, Preferences, CredStore).

## SYNTAX





Get-CheckITStore [-Store] <String> [-Clear] [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Returns a reference to the requested store, with safety guards and normalization.
Can also clear or reset the store if -Clear is specified.

## EXAMPLES

### EXAMPLE 1





$reports = Get-CheckITStore -Store Reports





### EXAMPLE 2





Get-CheckITStore -Store Preferences -Clear





### EXAMPLE 3





$templates = Get-CheckITStore -Store Templates
# Returns the Templates store with Command, Test, and Codebase substores





### EXAMPLE 4





Get-CheckITStore -Store Templates -Clear
# Resets Templates store to default structure with empty Command/Test/Codebase hashtables





## PARAMETERS

### -Store

The store to retrieve: NodeList, Reports, TaskLog, ErrorLog, Preferences, CredStore.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Clear

If set, clears or resets the store to its default value.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
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

Usage Patterns:
Templates store contains Command, Test, and Codebase substores.
All stores support both CLI (interactive) and GUI (programmatic) access modes.

## RELATED LINKS



