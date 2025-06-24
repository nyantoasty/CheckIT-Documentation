---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Open-RemoteExplorer

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Open-RemoteExplorer

## SYNOPSIS

Opens Windows Explorer to a remote computer's C$ share using stored credentials.

## SYNTAX





Open-RemoteExplorer [-Node] <Object> [[-PromptUser] <Boolean>] [[-StatusCallback] <ScriptBlock>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Establishes network connection with explicit credentials first, then opens Explorer.
Automatically cleans up the network connection when Explorer closes.
Only accepts one node at a time for simplicity.

## EXAMPLES

### EXAMPLE 1





Open-RemoteExplorer -Node "PC123"





### EXAMPLE 2





Open-RemoteExplorer -Node $nodeObject -PromptUser:$false





## PARAMETERS

### -Node

Single node name (string) or node object with .Node property.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If true (default), shows status messages.
If false, operates silently for GUI use.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

Optional scriptblock for progress reporting in GUI scenarios.

```yaml
Type: ScriptBlock
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

- Only accepts ONE node at a time
- Uses net use for reliable network connection establishment
- Automatically cleans up network connection when Explorer window closes
- No manual cleanup required - fully automatic

## RELATED LINKS



