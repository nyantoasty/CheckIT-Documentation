---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Invoke-CCMPackageDeployment

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Invoke-CCMPackageDeployment

## SYNOPSIS

SCCM package deployment with package discovery and selection using All/Specific search modes.

## SYNTAX





Invoke-CCMPackageDeployment [-Nodes] <Array> [[-Mode] <String>] [[-SearchStrings] <Array>]
 [[-PackageID] <String>] [[-Method] <String>] [-AuditSoftware] [-DryRun] [[-PromptUser] <Boolean>]
 [[-StatusCallback] <ScriptBlock>] [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Leverages existing CheckIT infrastructure with consistent search patterns matching Get-Software.

## EXAMPLES

### EXAMPLE 1





Invoke-CCMPackageDeployment -Nodes $nodes -Mode All





### EXAMPLE 2





Invoke-CCMPackageDeployment -Nodes $nodes -Mode Specific -SearchStrings @("Office", "Chrome") -AuditSoftware





### EXAMPLE 3





Invoke-CCMPackageDeployment -Nodes $nodes -PackageID "ABC00123" -DryRun





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





### -Mode

'All' to show all available packages, 'Specific' to search for specific packages by name.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: All
Accept pipeline input: False
Accept wildcard characters: False





### -SearchStrings

Array of package names to search for (used when Mode is 'Specific').

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PackageID

Specific Package ID if known (bypasses discovery).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Method

Deployment method: TriggerEvaluation, TriggerInstall, PowerShellMethod, ScheduleInstall.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: TriggerEvaluation
Accept pipeline input: False
Accept wildcard characters: False





### -AuditSoftware

If set, runs Get-Software before and after deployment for comparison.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -DryRun

If set, shows what would be executed without running commands.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

CLI vs GUI mode control.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

{{ Fill StatusCallback Description }}

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 7
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



