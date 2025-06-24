---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Test-NodeConnection

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Test-NodeConnection

## SYNOPSIS

Tests connectivity, WinRM, WSMan authentication, and Win32PowerManagement service for nodes, with robust parallel and reporting support.

## SYNTAX





Test-NodeConnection [-Nodes] <Array> [[-PromptUser] <Boolean>] [-OnlineOnly] [[-Report] <Boolean>]
 [[-StatusCallback] <ScriptBlock>] [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

For each node, checks network connectivity (ping), WinRM, and WSMan authentication, and optionally the Win32PowerManagement service.
Handles credentials using Get-NodeCredAndFQDN, supports robust error and task logging, and is safe for both CLI and GUI/automation.
Uses Process-Parallel for batch processing, but handles single-node gracefully.

## EXAMPLES

### EXAMPLE 1





Test-NodeConnection -Nodes $global:nodeList -PromptUser:$false





### EXAMPLE 2





# Run in GUI, skip report generation:
Test-NodeConnection -Nodes $global:nodeList -PromptUser:$false -Report:$false





### EXAMPLE 3





# Only check if nodes are online (ping):
Test-NodeConnection -Nodes $global:nodeList -OnlineOnly





## PARAMETERS

### -Nodes

Array of node objects or node names to test.

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

If set, enables CLI prompts and colored output.
Set to $false for GUI use.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -OnlineOnly

If set, only tests if the node is online (ping), skipping WinRM, WSMan, and Win32PM checks.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -Report

If set (default), writes results to the task log and report.
If $false, only logs tasks/errors.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

Optional scriptblock for progress reporting.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
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

### Array of result objects for each node tested, with properties such as Node, Online, WinRM, WSManAuth, UserName, LogonTime, Win32PM, TaskStatus, LastReboot, LastError

## NOTES

- Uses Process-Parallel for robust batch processing.
- Uses enhanced credential pre-resolution for secure parallel execution.
- Always logs tasks/errors; report generation is optional.
- Returns PSCustomObjects with "" for missing/null values for GUI/CLI safety.

## RELATED LINKS



