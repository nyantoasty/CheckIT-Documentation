---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-Users

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-Users

## SYNOPSIS

Retrieves all user sessions and session details for each remote node.

## SYNTAX





Get-Users [-Nodes] <Array> [[-PromptUser] <Boolean>] [-Report] [[-TaskParams] <Hashtable>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Uses quser.exe remotely (with credentials) to determine all logged-in users and their session details on each node.
Handles credential errors, updates NodeList records, and is robust for both CLI and GUI use.

## EXAMPLES

### EXAMPLE 1





Get-Users -Nodes $global:nodeList





### EXAMPLE 2





$results = Get-Users -Nodes @("PC123","PC124") -PromptUser:$false -Report





## PARAMETERS

### -Nodes

Array of node objects or node names.

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If $true, outputs a table and uses Write-Color for errors.
If $false, returns results for GUI/automation.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -Report

If set, writes results to the task log and (if TaskLog is configured) triggers reporting.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -TaskParams

{{ Fill TaskParams Description }}

```yaml
Type: Hashtable
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

### Array of objects with Node, UserName, SessionName, ID, State, IdleTime, LogonTime, and Error

## NOTES

Updates NodeList records for each node processed.
Uses Get-NodeCredAndFQDN for credential and FQDN resolution.

## RELATED LINKS



