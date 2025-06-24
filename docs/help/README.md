---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# README

# CheckIT-Core Help Documentation

This directory contains markdown-based help files for the CheckIT-Core PowerShell module.

## Documentation Structure

- **Markdown Help Files**: Individual `.md` files for each function (used as source files)
- **XML Help**: Generated XML help file in the `en-US` directory (used by PowerShell)
- **About Topics**: Conceptual help files (about_CheckIT-Core.md, etc.)

## Documentation Workflow

1. **Create/Edit** markdown help files in this directory
2. **Run** `Update-HelpFiles.ps1` to generate XML help
3. **Test** help with `Get-Help Function-Name -Full


## Markdown Help Format

Each function's markdown help file follows this structure:

```markdown
---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Function-Name

## SYNOPSIS
Brief one-line summary

## SYNTAX
Function syntax

## DESCRIPTION
Detailed description

## PARAMETERS
Parameter descriptions

## EXAMPLES
Usage examples

## INPUTS
Input types

## OUTPUTS
Output types

## NOTES
Additional notes

## RELATED LINKS

[](.md) functions





## Documentation Coverage Progress

| Category | Count | Percentage |
|----------|-------|------------|
| Functions with complete help | X | X% |
| Functions with partial help | X | X% |
| Functions without help | X | X% |

Use `Check-HelpFiles.ps1` to generate a current report.

## Documentation Priority

1. **High Priority**: Core functions used directly by end users
2. **Medium Priority**: Supporting functions referenced by other functions
3. **Low Priority**: Internal utility functions

## Recently Updated Functions

- Generate-DocumentationAnalysisPrompt
- Add-ChangelogEntry
- Convert-ReportData
- Export-ToExcel
- Clean-ExcelColumnName

## Functions Needing Documentation

- (Run Check-HelpFiles.ps1 for current list)

## Editing Guidelines

1. Keep SYNOPSIS to a single line
2. Include practical EXAMPLES
3. Document all PARAMETERS
4. Include RELATED LINKS to related functions
5. Fix any lint errors before generating XML



