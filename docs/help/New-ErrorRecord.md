---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# New-ErrorRecord

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# New-ErrorRecord

## SYNOPSIS

Creates a standardized error record object for CheckIT error logging and reporting.

## SYNTAX





New-ErrorRecord [[-Node] <String>] [[-OU] <String>] [[-Group] <String>] [[-tmpError] <String>]
 [[-Function] <String>] [[-ReportName] <String>] [[-ErrorType] <String>] [[-Exception] <String>]





## DESCRIPTION

Accepts details about the error context and returns a PSCustomObject with all standard error log fields.

## EXAMPLES

### EXAMPLE 1





$err = New-ErrorRecord -Node "PC123" -Error "WinRM failed" -Function "Test-NodeConnection"





## PARAMETERS

### -Node

The node name related to the error (optional).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -OU

The OU related to the error (optional).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Group

The group related to the error (optional).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -tmpError

{{ Fill tmpError Description }}

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Function

The function or context where the error occurred.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -ReportName

The report or batch name (optional).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -ErrorType

The type/category of error (optional).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 7
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Exception

The exception object or message (optional).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 8
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

## NOTES

## RELATED LINKS



