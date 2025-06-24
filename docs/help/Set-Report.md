---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Set-Report

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Set-Report

## SYNOPSIS

Adds or manages a report entry in the global Reports store for CheckIT.

## SYNTAX





Set-Report [-ReportName] <String> [-Function] <String> [-Data] <Array> [[-Groups] <String[]>]
 [[-Author] <String>] [[-Timestamp] <DateTime>] [[-PromptUser] <Boolean>] [[-Errors] <Object>] [-Task]
 [[-TaskParams] <Hashtable>] [[-Caller] <String>] [[-OnDuplicate] <String>] [-Full]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Adds a new report object to $global:Reports\['Reports'\], including metadata such as ReportName, Function, Groups, Author, Timestamp, and Data.
Handles duplicates with options to append, overwrite, rename, or cancel.
CLI prompts are suppressed in GUI mode.
Ensures $global:Reports is always a hashtable with all required keys for CLI/GUI safety.
Tracks creation and append history with CreatedTimestamp, LastAppendedTimestamp, AppendedValues, and TotalUpdates.

## EXAMPLES

### EXAMPLE 1





Set-Report -ReportName "LabA" -Function "Get-Software" -Data $results -Groups @("LabA")





### EXAMPLE 2





# Excel-optimized reporting workflow
$results = Get-InstalledSoftware -Nodes $computers
Set-Report -ReportName "Software Inventory" -Function "Get-Software" -Data $results -CleanData
$report = Get-CheckITStore -Store Reports | Where-Object { $_.ReportName -eq "Software Inventory" }
$report.Data | Export-ToExcel -Title "Software_Inventory"





Creates a report with Excel-optimized data and exports it with clean column names.

## PARAMETERS

### -ReportName

Name of the report.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Function

The function or context for the report.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Data

The main data array for the report.

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: True
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -CleanData

When specified, applies Convert-ReportData processing to clean and standardize data for better Excel export compatibility.

This parameter provides several important benefits:

- Converts WMI dates to readable Excel-friendly format
- Standardizes null values for consistent display
- Applies human-readable formatting for file sizes and memory values
- Ensures data types are compatible with Excel export
- Improves pivot table and slicer compatibility

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False

### -Groups

Array of group names for the report.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Author

Author of the report (default: current user).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: $env:USERNAME
Accept pipeline input: False
Accept wildcard characters: False





### -Timestamp

Timestamp for the report (default: now).

```yaml
Type: DateTime
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: (Get-Date)
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If true, enables CLI prompts and colored output.
If false, disables prompts for GUI/automation.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 7
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -Errors

Optional.
Array of error objects for the report.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: False
Position: 8
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Task

If set, triggers task log logic.

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

Hashtable of additional parameters for the report.

```yaml
Type: Hashtable
Parameter Sets: (All)
Aliases:

Required: False
Position: 9
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
Position: 10
Default value: $MyInvocation.MyCommand.Name
Accept pipeline input: False
Accept wildcard characters: False





### -OnDuplicate

How to handle duplicates: Append, Overwrite, Rename, or Prompt (default: Prompt).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 11
Default value: Prompt
Accept pipeline input: False
Accept wildcard characters: False





### -Full

If set, returns the full report object instead of a status hashtable.

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





### -CleanData

When specified, applies Convert-ReportData processing to clean and standardize the data for better Excel export formatting.

Converts WMI dates to readable format, standardizes null values, applies human-readable formatting for sizes, and ensures Excel compatibility. Original raw data is preserved in TaskLog for audit purposes.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### CommonParameters

This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

## OUTPUTS

## NOTES

## RELATED LINKS



