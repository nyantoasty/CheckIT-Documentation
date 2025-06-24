---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-AvailablePackages

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-AvailablePackages

## SYNOPSIS

Discovers available SCCM packages from a sample node.

## SYNTAX





Get-AvailablePackages [[-SearchPattern] <String>] [[-SampleNode] <String>] [[-PromptUser] <Boolean>]





## DESCRIPTION

Uses existing credential infrastructure to query CCM for available packages.

## EXAMPLES

### Example 1





PS C:\> {{ Add example code here }}





{{ Add example description here }}

## PARAMETERS

### -SearchPattern

Wildcard pattern to filter packages (default: "*").

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: *
Accept pipeline input: False
Accept wildcard characters: False





### -SampleNode

Node to query for packages (uses first node from NodeList if not specified).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

CLI vs GUI mode control.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

## NOTES

## RELATED LINKS



