---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Open-RemoteSystemTools

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Open-RemoteSystemTools

## SYNOPSIS

Opens Computer Management and other MMC tools connected to a remote computer.

## SYNTAX





Open-RemoteSystemTools [-Node] <Object> [[-Tool] <String>] [[-PromptUser] <Boolean>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Opens Windows management tools that connect directly to the remote computer using the remote computer's Administrator account.
MMC tools will authenticate using the stored credentials from your CredStore for that computer.

## EXAMPLES

### EXAMPLE 1

powershell





Open-RemoteSystemTools -Node "D153021"





### EXAMPLE 2





Open-RemoteSystemTools -Node "D153021" -Tool ComputerMgmt





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





### -Tool

Which tool to open: ComputerMgmt, EventViewer, Services, Registry, DeviceManager, DiskMgmt, or Menu (default: Menu)

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: Menu
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

MMC tools connect using the remote computer's Administrator credentials stored in your CredStore.
Computer Management provides: Device Manager, Disk Management, Services, Event Viewer, Performance, etc.

## RELATED LINKS



