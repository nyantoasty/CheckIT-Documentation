---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-FriendlySize

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-FriendlySize

## SYNOPSIS

Converts byte values to human-readable size strings.

## SYNTAX





Get-FriendlySize [-bytes] <Double> [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Converts numeric byte values to formatted strings with appropriate units (Bytes, KB, MB, GB, TB, PB).
Automatically selects the most appropriate unit and formats with 2 decimal places.

## EXAMPLES

### EXAMPLE 1





Get-FriendlySize -bytes 1073741824
# Returns: "1.00 GB"





### EXAMPLE 2





Get-FriendlySize -bytes 1536
# Returns: "1.50 KB"





## PARAMETERS

### -bytes

The number of bytes to convert to a friendly format.

```yaml
Type: Double
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: 0
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

### [string] Formatted size string with appropriate unit (e.g., "1.50 GB", "256.00 MB")

## NOTES

Returns "N/A" for null or non-numeric input values.
Uses binary units (1024-based) for calculations.

## RELATED LINKS



