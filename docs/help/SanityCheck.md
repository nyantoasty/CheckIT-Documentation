---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# SanityCheck

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# SanityCheck

## SYNOPSIS

Checks for common configuration issues for CLI/GUI.

## SYNTAX





SanityCheck [[-PromptUser] <Boolean>]





## DESCRIPTION

Checks username, execution policy, and WSMan TrustedHosts for common issues.
Returns a PSCustomObject for GUI, and outputs warnings for CLI.

## EXAMPLES

### EXAMPLE 1





$result = SanityCheck





## PARAMETERS

### -PromptUser

{{ Fill PromptUser Description }}

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

### [pscustomobject] with issue details

## NOTES

## RELATED LINKS



