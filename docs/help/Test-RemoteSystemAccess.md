---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Test-RemoteSystemAccess

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Test-RemoteSystemAccess

## SYNOPSIS

Tests if the stored Administrator credentials can access remote system management tools.

## SYNTAX





Test-RemoteSystemAccess [-Node] <String> [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Verifies that the Administrator credentials stored in CredStore have the necessary permissions for remote administration.
Uses non-intrusive tests that don't modify or start services on the remote computer.

Tests performed include:

- **WMI Access**: Verifies WMI connectivity and permissions
- **PowerShell Remoting**: Tests PSRemoting capabilities
- **Service Enumeration**: Checks ability to query system services
- **Registry Access**: Validates registry read permissions
- **File System Access**: Tests administrative file system access

Returns detailed results including specific failure points for troubleshooting credential or network issues.

## EXAMPLES

### EXAMPLE 1: Basic Access Test





Test-RemoteSystemAccess -Node "PC123"





Tests if stored Administrator credentials can access basic management tools on PC123.

### EXAMPLE 2: Multiple Node Testing





$nodes = Get-CheckITStore -Store NodeList | Where-Object Group -eq "Servers"
$nodes | ForEach-Object { Test-RemoteSystemAccess -Node $_.Name }





Tests credential access across multiple nodes from the node list.

### EXAMPLE 3: GUI Integration





$result = Test-RemoteSystemAccess -Node $selectedNode -ProgressAction SilentlyContinue
if ($result.Status -eq "Success") {
    Write-Host "Credentials validated successfully" -ForegroundColor Green
} else {
    Write-Host "Credential validation failed: $($result.Error)" -ForegroundColor Red
}





## PARAMETERS

### -Node

The target node to test access against.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
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

## NOTES

## RELATED LINKS



