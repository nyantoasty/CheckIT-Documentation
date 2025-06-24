---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Write-TaskLog

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Write-TaskLog

## SYNOPSIS

Logs task results as a report entry in the global Reports\['TaskLog'\] store.

## SYNTAX





Write-TaskLog [[-InputObject] <Object[]>] [[-Function] <String>] [[-StatusProperty] <String>]
 [[-Author] <String>] [[-Timestamp] <DateTime>] [-Append] [[-TaskParams] <Hashtable>] [[-Caller] <String>]
 [[-Groups] <String[]>] [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Converts input objects to standardized log rows and adds them to a Task-Log report in $global:Reports\['TaskLog'\].
Supports session-based appending or unique-per-call logs.
Does NOT call Set-Report (task logs are kept separate).
Adds robust error and metadata fields for filtering and analysis in both CLI and GUI.
Handles both CLI and GUI/automation scenarios.

## EXAMPLES

### EXAMPLE 1





$results | Write-TaskLog -Function "Get-Software"





## PARAMETERS

### -InputObject

The objects to log (accepts pipeline input).

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False





### -Function

The function or context for which the log is being written.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -StatusProperty

The property to use for status (default: "TaskStatus", fallback to "Status").

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: TaskStatus
Accept pipeline input: False
Accept wildcard characters: False





### -Author

The author of the log entry (default: current user).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: $env:USERNAME
Accept pipeline input: False
Accept wildcard characters: False





### -Timestamp

The timestamp for the log entry (default: now).

```yaml
Type: DateTime
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: (Get-Date)
Accept pipeline input: False
Accept wildcard characters: False





### -Append

If set, appends to the current session's TaskLog report.

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

Hashtable of additional parameters to log.
If TaskParams\['Report'\] is $true, will also call Set-Report for the main function.

```yaml
Type: Hashtable
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: @{}
Accept pipeline input: False
Accept wildcard characters: False





### -Caller

The calling function (default: current function).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 7
Default value: $MyInvocation.MyCommand.Name
Accept pipeline input: False
Accept wildcard characters: False





### -Groups

Optional.
Array of group names for the report.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 8
Default value: @()
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

- Always uses $global:Reports\['TaskLog'\] for task logs.
- If TaskParams\['Report'\] is set, also calls Set-Report for the main function.
- Robust for both CLI and GUI/automation.

## RELATED LINKS



