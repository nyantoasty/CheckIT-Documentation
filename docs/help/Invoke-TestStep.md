---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Invoke-TestStep

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Invoke-TestStep

## SYNOPSIS

Executes a single test step for a node, supporting all step types and both CLI and GUI workflows.

## SYNTAX





Invoke-TestStep [-Step] <Object> [-Node] <Object> [[-PromptUser] <Boolean>]
 [[-GuiPromptCallback] <ScriptBlock>] [[-StatusCallback] <ScriptBlock>] [-ProgressAction <ActionPreference>]
 [<CommonParameters>]





## DESCRIPTION

Handles Manual, Invoke/Auto, Screenshot, and FileUpload steps.
Prompts the user or calls a GUI callback as appropriate.
Tracks timing, errors, and returns a standardized result object for reporting/logging.

## EXAMPLES

### EXAMPLE 1





$result = Invoke-TestStep -Step $step -Node $node -PromptUser





### EXAMPLE 2





$result = Invoke-TestStep -Step $step -Node $node -PromptUser:$false -GuiPromptCallback $guiCallback





## PARAMETERS

### -Step

The test step object (from a template), must include .Name, .Type, and other relevant properties.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Node

The node object or node name to run the step against.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If $true (default), uses CLI prompts.
If $false, expects GUI/automation or uses $GuiPromptCallback if provided.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -GuiPromptCallback

Optional.
Scriptblock to call for GUI input.
Receives ($Step, $Node) as arguments.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

Optional.
Scriptblock for progress/status updates.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
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

### PSCustomObject with Node, StepName, StepType, Result, StartTime, EndTime, Duration, Status, Error, and any step-specific fields

## NOTES

## RELATED LINKS



