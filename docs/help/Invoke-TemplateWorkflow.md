---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Invoke-TemplateWorkflow

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Invoke-TemplateWorkflow

## SYNOPSIS

Executes multiple templates in sequence with optional Excel export.

## SYNTAX





Invoke-TemplateWorkflow [-Nodes] <Array> [-Templates] <String[]> [-WorkflowName] <String>
 [[-PromptUser] <Boolean>] [[-Confirm] <Object>] [-ExportToExcel] [[-StatusCallback] <ScriptBlock>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Orchestrates the execution of multiple CheckIT templates in a defined sequence, providing:

- **Sequential template execution** with comprehensive error handling
- **Excel reporting** with separate data and audit sheets
- **Flexible confirmation modes** (Auto, Manual, Disabled) with session persistence
- **Progress tracking** and status callbacks for GUI integration
- **Automatic error aggregation** and reporting
- **Mixed template support** (Command and Test templates in same workflow)

Perfect for system maintenance workflows, comprehensive system checks,
standardized deployment procedures, and automated compliance reporting.

## EXAMPLES

### EXAMPLE 1





# Execute templates - each creates its own report
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit"





### EXAMPLE 2





# Execute and combine into Excel
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel





### EXAMPLE 3





# Auto-execute without confirmation and export to Excel
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -Confirm:$false -ExportToExcel





### EXAMPLE 4: Mixed Template Workflow





$mixedTemplates = @("Get OS Info", "Default Functionality Test", "Check Disk Space")
$nodes = Get-CheckITStore -Store NodeList | Where-Object Group -eq "Servers"

Invoke-TemplateWorkflow -Nodes $nodes -Templates $mixedTemplates -WorkflowName "Monthly_Compliance_Check" -ExportToExcel -Confirm "Auto"





Combines Command and Test templates in a single workflow with automatic confirmation.

### EXAMPLE 5: Error Handling and Resume





# Initial run with some failures
$result = Invoke-TemplateWorkflow -Nodes $allNodes -Templates $templates -WorkflowName "Deployment_Check" -ExportToExcel

# Resume with only failed nodes
$failedNodes = $result.TemplateResults.Values | Where-Object Status -eq "Error" | Select-Object -ExpandProperty Node
Invoke-TemplateWorkflow -Nodes $failedNodes -Templates $templates -WorkflowName "Deployment_Check_Retry" -ExportToExcel





### EXAMPLE 6: GUI Integration





$statusCallback = {
    param($activity, $current, $total)
    # Update GUI progress bar
    $progressBar.Value = ($current / $total) * 100
    $statusLabel.Text = $activity
}

$result = Invoke-TemplateWorkflow -Nodes $selectedNodes -Templates $templateList -WorkflowName $workflowName -PromptUser:$false -StatusCallback $statusCallback -ExportToExcel





## EXCEL OUTPUT STRUCTURE

When `-ExportToExcel` is specified, the function creates a comprehensive Excel workbook with:

### Individual Template Sheets

- **Sheet Names**: Cleaned template names (max 31 chars, special chars removed)
- **Content**: Clean business data only (OS info, disk space, test results, etc.)
- **Format**: User-friendly columns without CheckIT metadata
- **Purpose**: For business analysis and reporting

### Summary Sheet

- **Content**: Complete CheckIT execution metadata and audit trail
- **Includes**: All execution details, errors, timing, credentials used, etc.
- **Format**: Full CheckIT result objects with all tracking properties
- **Purpose**: For technical analysis, debugging, and compliance auditing

## CONFIRMATION MODES

### Manual Mode (Default: Confirm = $true)

- Prompts for each workflow execution
- Supports "Yes to All" and "No to All" options
- Session-wide choices are remembered

### Auto Mode (Confirm = "Auto")

- Prompts once, remembers choice for entire session
- Perfect for multiple workflows in sequence
- Clear indication of auto-proceed/auto-cancel status

### Disabled Mode (Confirm = $false)

- No confirmation prompts
- Immediate execution
- Suitable for automated scripts

## WORKFLOW EXECUTION BEHAVIOR

### Template Type Detection

The function automatically detects template types:

- **Command Templates**: Executed via [`Invoke-TemplateCommand`](Invoke-TemplateCommand.md)
- **Test Templates**: Executed via [`Start-Test`](Start-Test.md)
- **Mixed Workflows**: Supports both types in same workflow

### Error Handling

- Individual template failures don't stop the workflow
- Comprehensive error collection and reporting
- Failed templates are excluded from Excel export
- Detailed error information in console and logs

### Progress Reporting

- Real-time progress updates for CLI mode
- StatusCallback support for GUI integration
- Template-by-template execution tracking
- Overall workflow completion status

## PARAMETERS

### -Nodes

Target nodes for all templates.

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Templates

Array of template names to execute in sequence.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -WorkflowName

Name for the Excel file (only used when -ExportToExcel is specified).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If true (default), enables CLI prompts and colored output.
If false, operates silently for GUI use.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -Confirm

Controls execution confirmation:

- $true (default): Prompts for confirmation before execution with enhanced options
- $false: Executes immediately without confirmation
- "Auto": Prompts once, then remembers choice for session

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -ExportToExcel

If set, exports all template results to Excel with separate sheets named by template.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

Optional scriptblock for progress reporting in GUI scenarios.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
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

**Performance Considerations:**

- Each template creates its own individual report
- Excel export combines all successful template results
- Large workflows may take significant time for Excel generation
- Progress callbacks help track long-running operations

**Session Management:**

- Confirmation choices persist across multiple workflow executions
- Template execution inherits workflow confirmation settings
- Session state reset requires PowerShell session restart

**Integration Patterns:**

- Works seamlessly with CheckIT's parallel processing engine
- Leverages existing credential management and node handling
- Follows CheckIT's standard reporting and audit patterns
- Compatible with all CheckIT store management functions

**Best Practices:**

- Use descriptive workflow names for Excel file identification
- Test individual templates before including in workflows
- Monitor disk space when exporting large datasets to Excel
- Use Auto confirmation mode for batch operations

## RELATED LINKS



