---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Generate-DocumentationAnalysisPrompt

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Generate-DocumentationAnalysisPrompt

## SYNOPSIS

Generates an intelligent AI assistant prompt for documentation analysis and follow-up tasks.

## SYNTAX





Generate-DocumentationAnalysisPrompt [[-Summary] <String>] [[-Type] <String>] [[-Impact] <String>]
 [[-FilesChanged] <String[]>] [[-FunctionsAdded] <String[]>] [[-FunctionsCompleted] <String[]>]
 [[-KeyChanges] <String[]>] [[-PromptUser] <Boolean>]





## DESCRIPTION

Creates a structured prompt for AI assistants to analyze CheckIT documentation and suggest improvements.
The prompt includes recent code changes, documentation structure, and specific analysis requests.
This function helps bridge development tasks with documentation updates to ensure comprehensive,
accurate documentation is maintained alongside code changes.

## PARAMETERS

### -Summary

A summary of recent code changes or feature additions that need documentation.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Type

Type of change. Common values include "Enhancement," "Feature," "Bugfix," "Documentation," or "Refactor."

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Impact

A summary of how these changes impact users or the system.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -FilesChanged

Array of file paths that were modified as part of this change.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: @()
Accept pipeline input: False
Accept wildcard characters: False





### -FunctionsAdded

Array of function names that were added (optional).

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: @()
Accept pipeline input: False
Accept wildcard characters: False





### -FunctionsCompleted

Array of function names that were completed or significantly updated (optional).

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: @()
Accept pipeline input: False
Accept wildcard characters: False





### -KeyChanges

Array of bullet points describing the main changes made.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: @()
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If true, displays the generated prompt and asks for confirmation before proceeding.
If false, returns the prompt string directly.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 7
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





## EXAMPLES

### Example 1: Generate a documentation analysis prompt for a new feature





Generate-DocumentationAnalysisPrompt -Summary "Added Excel pivot table functionality" -Type "Feature" 

    -FilesChanged @("checkit-core.psm1", "docs/help/Invoke-Pivotizer.md") 

    -FunctionsAdded @("Invoke-Pivotizer") 

    -KeyChanges @("Added pivot table creation", "Added interactive slicers") 

    -Impact "Users can now create Excel pivot tables directly from CheckIT"





Creates a detailed prompt that includes the recent changes to Excel pivot functionality and requests a full documentation analysis.

### Example 2: Generate a documentation prompt for bug fixes





$prompt = Generate-DocumentationAnalysisPrompt -Summary "Fixed Excel export issues" -Type "Fix" 

    -FilesChanged @("checkit-core.psm1") 

    -KeyChanges @("Fixed column name handling", "Added error recovery") 

    -Impact "Excel exports now handle special characters correctly" 

    -PromptUser $false

Send-ToAIAssistant -Prompt $prompt





Creates a documentation analysis prompt for bug fixes without displaying it to the user and sends it directly to an AI assistant.

## INPUTS

### None

This function does not accept pipeline input.

## OUTPUTS

### System.String

Returns the generated analysis prompt as a string.

## NOTES

This function is intended for developer use and documentation maintenance.
The prompt includes standard sections for consistent AI responses:

- Current module structure
- Documentation elements to analyze
- Recent changes
- Specific analysis requests
- Expected output format

## RELATED LINKS

[Add-ChangelogEntry](Add-ChangelogEntry.md)



