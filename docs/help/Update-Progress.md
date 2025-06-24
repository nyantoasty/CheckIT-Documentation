---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Update-Progress

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Update-Progress

## SYNOPSIS

Updates progress indicators for both CLI and GUI scenarios.

## SYNTAX





Update-Progress [[-Activity] <String>] [[-Status] <String>] [[-Current] <Int32>] [[-Total] <Int32>]
 [[-StatusCallback] <ScriptBlock>] [[-PromptUser] <Boolean>]





## DESCRIPTION

Provides unified progress reporting that works in both CLI (Write-Progress) and GUI
(StatusCallback) contexts.
Automatically calculates percentages and handles different output modes.

## EXAMPLES

### EXAMPLE 1





Update-Progress -Activity "Processing Nodes" -Status "PC123" -Current 5 -Total 10





### EXAMPLE 2





Update-Progress -Activity "Collecting Data" -Status "Gathering info" -Current 1 -Total 1 -StatusCallback $guiCallback





## PARAMETERS

### -Activity

The name of the activity being performed.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Status

Current status message describing the operation.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Current

Current item number being processed.

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: 0
Accept pipeline input: False
Accept wildcard characters: False





### -Total

Total number of items to process.

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: 0
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

Optional scriptblock for GUI progress updates.
If provided, CLI progress is suppressed.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If true, shows CLI progress bars.
If false, operates silently unless StatusCallback is provided.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

## NOTES

## RELATED LINKS



