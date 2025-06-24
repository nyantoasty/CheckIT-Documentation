---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Manage-Templates

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Manage-Templates

## SYNOPSIS

Manage built-in and user-defined templates for remote commands, functionality tests, and code patterns.

## SYNTAX





Manage-Templates [[-Type] <String>] [[-Action] <String>] [[-PromptUser] <Boolean>] [[-GenerateReport] <Boolean>]





## DESCRIPTION

Provides comprehensive template management for CheckIT's three template types:

- **Command Templates**: Remote PowerShell commands for system administration
- **Test Templates**: Multi-step functional testing workflows with manual and automated steps  
- **Codebase Templates**: Reusable code patterns and development guidelines

Supports full CRUD operations (Create, Read, Update, Delete) with built-in validation, search capabilities, and preview functionality. Templates are stored in the global Reports['Templates'] store and persist across sessions.

## PARAMETERS

### -Type

The template type: Command, Test, or Codebase.

```yaml
Type: String
Parameter Sets: (All)
Aliases:
Required: False
Position: 1
Default value: Command
Accept pipeline input: False
Accept wildcard characters: False





### -Action

The action to perform: List, Add, Edit, Remove, Select, Preview, Copy, or Search.

```yaml
Type: String
Parameter Sets: (All)
Aliases:
Required: False
Position: 2
Default value: List
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If $true (default), enables CLI prompts and colored output. If $false, returns objects for GUI/automation use.

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

If $true (default), generates reports for template actions. Set to $false to disable reporting for automation scenarios.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:
Required: False
Position: 4
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

### PSObject

Returns template objects in GUI mode or displays formatted output in CLI mode.

## NOTES

All user templates are stored as PSCustomObject for consistency. Built-in templates are loaded via Ensure-Templates and are read-only. Template actions are logged and reported for audit trail and usage analysis.

## EXAMPLES

### Example 1





Manage-Templates -Type Command -Action List





Shows all built-in and user-created command templates with descriptions.

### Example 2





Manage-Templates -Type Command -Action Add -PromptUser $true





Interactive creation of a new command template with guided prompts.

### Example 3





$allTemplates = Manage-Templates -Type Command -Action List -PromptUser $false





Returns structured data for programmatic use.

## RELATED LINKS



