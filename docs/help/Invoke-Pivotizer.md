---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Invoke-Pivotizer

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Invoke-Pivotizer

## SYNOPSIS

Adds a pivot table and slicers to an Excel worksheet exported by Export-ToExcel.

## SYNTAX





Invoke-Pivotizer [-ExcelPath] <String> [-SourceSheet] <String> [[-PivotSheet] <String>]
 [[-PivotTableName] <String>] [[-RowFields] <String[]>] [[-ColumnFields] <String[]>] [[-DataFields] <String[]>]
 [[-SlicerFields] <String[]>] [[-PromptUser] <Boolean>] [-ProgressAction <ActionPreference>]
 [<CommonParameters>]





## DESCRIPTION

Creates an interactive pivot table with optional slicers in an Excel file, using data from a specified worksheet.
The function works in two modes:

1. Interactive mode (default): When PromptUser=$true, displays field list and prompts user to select:
   - Row fields (required): Categories to group data by (rows)
   - Column fields (optional): Secondary grouping (columns)
   - Data fields (required): Values to count/aggregate
   - Slicer fields (optional): Interactive filters displayed as buttons

2. Programmatic mode: When PromptUser=$false, uses provided field arrays without prompting

The function automatically handles field validation, error recovery, and slicer placement.
If slicers cannot be created due to Excel version limitations, filtering will still be available through pivot table dropdowns.

### Column Name Requirements:

For reliable pivot tables and slicers, column names should meet these requirements:
- Maximum of 31 characters
- No special characters (avoid symbols like *, %, $, #)
- No spaces (underscores are preferred)
- Unique names (duplicate names cause pivot errors)

CheckIT's `Export-ToExcel` function automatically handles these requirements via the `Clean-ExcelColumnName` function. 
For best results, use `Set-Report` with `-CleanData` before exporting to Excel.

## EXAMPLES

### EXAMPLE 1





Invoke-Pivotizer -ExcelPath "C:\Transcripts\Report.xlsx" -SourceSheet "SoftwareResults"





Opens the Excel file in interactive mode, displays field list, and prompts user to select fields for rows, columns, data, and slicers.

### EXAMPLE 2





Invoke-Pivotizer -ExcelPath $file -SourceSheet $sheet -RowFields @("OU") -DataFields @("ProductName")





Creates a pivot table showing product count by OU. Still prompts for column and slicer fields since PromptUser=$true by default.

### EXAMPLE 3





Invoke-Pivotizer -ExcelPath $report -SourceSheet "Data" -RowFields @("Department") 

  -ColumnFields @("Month") -DataFields @("Status") -SlicerFields @("Region", "Priority") -PromptUser $false





Creates a pivot table with departments as rows, months as columns, status as data fields, and region/priority slicers.
Runs completely non-interactively, suitable for automation.

### EXAMPLE 4





# Template workflow with Excel export and pivot table
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info") -WorkflowName "SystemAudit" -ExportToExcel
$excelFile = Get-ChildItem C:\Transcripts\*SystemAudit*.xlsx | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Invoke-Pivotizer -ExcelPath $excelFile -SourceSheet "Get_OS_Info" -RowFields @("OS") -SlicerFields @("Node")





Typical workflow scenario: Run template, export to Excel, then add interactive analysis with pivot table and slicers.

## PARAMETERS

### -ExcelPath

Path to the Excel file.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -SourceSheet

Name of the worksheet to use as the data source (required).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PivotSheet

Name for the new pivot worksheet (default: "Pivot").
If the sheet already exists, it will be cleared before creating the pivot table.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: Pivot
Accept pipeline input: False
Accept wildcard characters: False





### -PivotTableName

Name for the new pivot table (default: "MyPivot").

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: MyPivot
Accept pipeline input: False
Accept wildcard characters: False





### -RowFields

Array of field names for pivot rows (optional, prompts if not provided).
These are the main categories your data will be grouped by.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -ColumnFields

Array of field names for pivot columns (optional).
These create a matrix view when combined with row fields.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -DataFields

Array of field names for pivot data (optional, prompts if not provided).
These are the values that will be counted/summarized in the pivot table.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 7
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -SlicerFields

Array of field names for slicers (optional).
Slicers are interactive filter buttons that appear next to the pivot table.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 8
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If true (default), prompts for field selection.
If false, uses only parameters, suitable for automation.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 9
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

### System.String, System.String[]

The function accepts the Excel file path as a string and field names as string arrays. Field names can be provided either as parameters or via interactive selection.

## OUTPUTS

### System.String

Returns the Excel file path on successful completion.

## NOTES

- If slicers cannot be created (due to Excel version limitations), the function will continue without them and display a message
- When using interactive mode, you can enter either the field index number or the field name
- Multiple field selections should be separated by commas
- The function automatically positions slicers to the right of the pivot table
- For best results, ensure column names don't contain special characters

## RELATED LINKS

[Export-ToExcel](Export-ToExcel.md)
[Import-FromExcel](Import-FromExcel.md)
[Invoke-TemplateWorkflow](Invoke-TemplateWorkflow.md)



