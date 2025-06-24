---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Invoke-TemplateCommand

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Invoke-TemplateCommand

## SYNOPSIS

Executes command templates against target nodes with parallel processing and comprehensive error handling.

## SYNTAX





Invoke-TemplateCommand [[-TemplateName] <String>] [[-Nodes] <Object[]>] [[-PromptUser] <Boolean>] [[-GenerateReport] <Boolean>] [[-DryRun] <Boolean>]





## DESCRIPTION

Executes command templates (PowerShell commands) against specified nodes using CheckIT's parallel processing engine. Supports both built-in and user-defined templates with automatic credential resolution, timeout management, and structured result reporting.

Key features:

- Parallel execution with configurable concurrency
- Automatic credential resolution per node
- Comprehensive error handling and timeout management
- Structured PSCustomObject output for reporting
- Support for dry-run validation
- Integration with CheckIT's reporting system

## PARAMETERS

### -TemplateName

Name of the command template to execute. Can be built-in or user-defined template.

```yaml
Type: String
Parameter Sets: (All)
Aliases:
Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Nodes

Target nodes for command execution. Accepts computer names, IP addresses, or node objects.

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases:
Required: False
Position: 2
Default value: $global:nodeList
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If $true (default), enables interactive prompts and colored output. If $false, runs silently for automation.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:
Required: False
Position: 3
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -GenerateReport

If $true (default), generates detailed reports of template execution. Set to $false for automation scenarios.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:
Required: False
Position: 4
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -DryRun

If $true, validates template and nodes without executing commands. Shows what would be executed.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:
Required: False
Position: 5
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

### String[]

Computer names or IP addresses

### Object[]

Node objects with ComputerName property

## OUTPUTS

### PSCustomObject[]

Structured results with Node, Status, Result, and Error properties for each target node.

## NOTES

- Uses Process-Parallel for concurrent execution
- Automatically resolves credentials using Get-NodeCredAndFQDN
- Supports timeout management and job cleanup
- Results are automatically added to CheckIT's reporting system
- Template validation occurs before execution
- Supports both CLI and GUI execution modes

## EXAMPLES

### Example 1





Invoke-TemplateCommand -TemplateName "Get OS Info"





Executes the "Get OS Info" template against all nodes in $global:nodeList.

### Example 2





Invoke-TemplateCommand -TemplateName "Check Disk Space" -Nodes @("Server01", "Server02") -DryRun $true





Validates the "Check Disk Space" template against specific servers without executing.

### Example 3





$results = Invoke-TemplateCommand -TemplateName "Query Service Status" -Nodes $myNodes -PromptUser $false





Executes service status template silently and returns structured results for automation.

### Example 4





Invoke-TemplateCommand -TemplateName "Force GPUpdate" -GenerateReport $true





Executes GPUpdate template with full reporting enabled.

## RELATED LINKS

[Manage-Templates](Manage-Templates.md)

[Invoke-TemplateWorkflow](Invoke-TemplateWorkflow.md)

[Process-Parallel](Process-Parallel.md)



