---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Manage-Store

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Manage-Store

## SYNOPSIS

View, preview, drill down, and clear CheckIT virtual stores including NodeList, Reports, TaskLog, ErrorLog, Preferences, Templates, and CredStore.

## SYNTAX





Manage-Store [-Store] <String> [[-Action] <String>] [[-PageSize] <Int32>] [[-PromptUser] <Boolean>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Provides comprehensive management of all CheckIT data stores with interactive preview, drilling capabilities, and clearing functions.
Honors user preferences for default page size and prompt behavior if set via Set-UserPreference.
Dynamically displays all columns/properties for each store with proper normalization.

Special Store Behaviors:

- Preferences: Shows both $global:CheckIT_Preferences and $global:Reports\['Preferences'\]
- Templates: Displays Command, Test, and Codebase templates with descriptions
- CredStore: Shows node list with credential status and expiration info
- Reports/TaskLog/ErrorLog: Supports interactive drilldown to view detailed data

## EXAMPLES

### EXAMPLE 1





Manage-Store -Store NodeList -Action Preview
# Shows paginated view of all nodes with interactive navigation (N=Next, P=Prev, D=Drilldown, Q=Quit)





### EXAMPLE 2





Manage-Store -Store Reports -Action Clear
# Clears all business reports from the Reports store





### EXAMPLE 3





Manage-Store -Store Preferences -Action Preview
# Shows both global preferences and Reports['Preferences'] side by side





### EXAMPLE 4





Manage-Store -Store Templates -Action Summary
# Shows count of Command, Test, and Codebase templates





### EXAMPLE 5





Manage-Store -Store TaskLog -Action Preview -PageSize 10
# Shows TaskLog with 10 items per page instead of default 20





### EXAMPLE 6





$credData = Manage-Store -Store CredStore -Action Preview -PromptUser:$false
# Returns credential store data as objects for GUI processing





### EXAMPLE 7





Manage-Store -Store ErrorLog -Action Preview
# Interactive view with drilldown capability - use 'D' to view detailed error information





## PARAMETERS

### -Store

Which store to manage.
Valid values:

- NodeList: Computer inventory with status tracking
- Reports: Business reporting with versioning and export capabilities
- TaskLog: Comprehensive audit trail for all operations
- ErrorLog: Centralized error tracking and analysis
- Preferences: User configuration and customization settings
- Templates: Reusable command, test, and codebase templates
- CredStore: Secure credential management with expiration handling

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Action

What to do with the store:

- Summary: Show count and basic information (default)
- Preview: Interactive paginated view with navigation options
- Clear: Reset store to empty/default state

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: Summary
Accept pipeline input: False
Accept wildcard characters: False





### -PageSize

How many items to show per preview page.
Defaults to 20, or user preference if set via Set-UserPreference.

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: $(Get-UserPreference -Function 'Manage-Store' -Key 'PageSize' -Default 20)
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

Controls interactive behavior:

- $true (default): Enables CLI prompts, colored output, and interactive navigation
- $false: Returns structured objects for GUI/automation use
Can be overridden by user preference if set.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: $(Get-UserPreference -Function 'Manage-Store' -Key 'PromptUser' -Default $true)
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

### Depends on Action and PromptUser parameters

### Summary Action

### - PromptUser=$true: Displays colored summary to console

### - PromptUser=$false: Returns hashtable with Store and Count properties

### Preview Action

### - PromptUser=$true: Interactive paginated display with navigation

### - PromptUser=$false: Returns normalized data objects

### Clear Action

### - PromptUser=$true: Shows colored confirmation message

### - PromptUser=$false: No output (silent operation)

## NOTES

Interactive Navigation (Preview Action with PromptUser=$true):

- N: Next page
- P: Previous page  
- D: Drilldown (detailed view for Reports/TaskLog/ErrorLog/CredStore)
- Q: Quit preview mode

User Preferences:
Default PageSize and PromptUser behavior can be customized:
Set-UserPreference -Function 'Manage-Store' -Key 'PageSize' -Value 10
Set-UserPreference -Function 'Manage-Store' -Key 'PromptUser' -Value $false

Security Notes:

- CredStore credentials are never persisted to disk (session-only)
- Clear action for CredStore only clears in-memory credentials
- Credential expiration is displayed when available

Data Normalization:

- All null values are replaced with empty strings for consistent display
- Arrays and complex objects are properly formatted for table output
- Column sets are dynamically determined or use predefined schemas

Store Dependencies:

- All stores are automatically initialized via Ensure-CheckITGlobals
- Uses Get-CheckITColumns for consistent column definitions
- Integrates with Save-CheckITDataCore/Load-CheckITDataCore for persistence



