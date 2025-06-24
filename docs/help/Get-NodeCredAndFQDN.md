---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-NodeCredAndFQDN

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-NodeCredAndFQDN

## SYNOPSIS

Retrieves the credential and FQDN for a node object or node name with comprehensive credential validation and error handling.

## SYNTAX





Get-NodeCredAndFQDN [-Node] <Object> [[-PromptUser] <Boolean>] [-ProgressAction <ActionPreference>]
 [<CommonParameters>]





## DESCRIPTION

Provides a unified interface for retrieving both credentials and FQDN information for CheckIT nodes. This function serves as a bridge between node identification and credential resolution, handling various input formats and providing consistent output structure for downstream operations.

The function integrates with the CheckIT credential management system, leveraging Get-ValidCred for credential validation while providing additional FQDN construction and enhanced error handling specifically designed for CheckIT's standard patterns.

Key features:

- **Flexible input handling** supporting both strings and node objects
- **Automatic FQDN construction** using CheckIT's domain standards
- **Integrated credential validation** via Get-ValidCred integration
- **Comprehensive error handling** with detailed status reporting
- **Consistent output format** suitable for CheckIT function patterns

## EXAMPLES

### EXAMPLE 1: Basic Credential and FQDN Retrieval





$credInfo = Get-NodeCredAndFQDN -Node "PC123"
if ($credInfo.Status -eq "OK") {
    Write-Host "Node: $($credInfo.Node)"
    Write-Host "FQDN: $($credInfo.FQDN)"
    Write-Host "Username: $($credInfo.Credential.UserName)"
}





Retrieves credential and FQDN information for a single node with basic validation.

### EXAMPLE 2: Using with Node Objects from NodeList





$nodeObj = $global:nodeList | Where-Object { $_.Node -eq "LAB-PC-01" }
$credInfo = Get-NodeCredAndFQDN -Node $nodeObj -PromptUser $false





Demonstrates usage with node objects from the global NodeList, suitable for automation scenarios.

### EXAMPLE 3: Batch Processing with Error Handling





$nodes = @("PC1", "PC2", "INVALID-PC")
$credResults = @()

foreach ($node in $nodes) {
    $credInfo = Get-NodeCredAndFQDN -Node $node -PromptUser $false
    $credResults += $credInfo
    
    if ($credInfo.Status -ne "OK") {
        Write-Warning "Failed to get credentials for $($node): $($credInfo.ErrorMessage)"
    }
}

$validNodes = $credResults | Where-Object { $_.Status -eq "OK" }
Write-Host "Successfully processed $($validNodes.Count) of $($nodes.Count) nodes"





Shows batch processing with comprehensive error handling and result filtering.

### EXAMPLE 4: Integration with CheckIT Functions





# Standard CheckIT function pattern
$credInfo = Get-NodeCredAndFQDN -Node $nodeName -PromptUser:$false

if ($credInfo.Status -eq "OK" -and $credInfo.Credential) {
    $credential = $credInfo.Credential
    $fqdn = $credInfo.FQDN
    
    # Use credential for remote operations
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock {
        Get-ComputerInfo | Select-Object WindowsProductName, TotalPhysicalMemory
    }
} else {
    Write-Host "Credentials not available for $($nodeName): $($credInfo.ErrorMessage)"
}





Demonstrates the standard CheckIT pattern for credential resolution and usage.

### EXAMPLE 5: Credential Status Validation





$nodes = $global:nodeList | Select-Object -First 5
$credentialStatus = @()

foreach ($nodeObj in $nodes) {
    $credInfo = Get-NodeCredAndFQDN -Node $nodeObj -PromptUser $false
    $credentialStatus += [PSCustomObject]@{
        Node = $credInfo.Node
        FQDN = $credInfo.FQDN
        Status = $credInfo.Status
        HasCredential = $null -ne $credInfo.Credential
        ErrorMessage = $credInfo.ErrorMessage
    }
}

$credentialStatus | Format-Table -AutoSize





Shows how to create credential status reports for multiple nodes.

### EXAMPLE 6: Silent vs Interactive Modes





# Silent mode - no user interaction
$credInfo1 = Get-NodeCredAndFQDN -Node "PC123" -PromptUser $false

# Interactive mode - allows prompts for missing credentials
$credInfo2 = Get-NodeCredAndFQDN -Node "PC123" -PromptUser $true





Compares silent automation mode with interactive mode for different use cases.

## PARAMETERS

### -Node

The node object or node name for which to retrieve credentials and FQDN information. Supports flexible input formats for seamless integration with CheckIT workflows.

**Supported Input Types:**

- **String**: Simple node name (e.g., "PC123", "LAB-PC-01")
- **Node Object**: Any object with a `.Node` property from NodeList
- **PSCustomObject**: Custom objects containing node information

**Input Processing:**

- Strings are used directly as node names
- Objects are inspected for `.Node` property
- Invalid or empty inputs return appropriate error status
- Node names are normalized and validated

**Validation Rules:**

- Node name cannot be null, empty, or whitespace-only
- Must be compatible with FQDN construction
- Case-insensitive processing for consistency

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

Controls the interaction mode for credential retrieval and error reporting.

**When $true (Interactive Mode - Default):**

- Enables user prompts for missing credentials
- Shows colored output for status messages
- Provides detailed error information to console
- Allows integration with Passman for credential retrieval
- Suitable for manual operations and troubleshooting

**When $false (Silent Mode):**

- Suppresses all user interaction and prompts
- No console output except for critical errors
- Returns status information in structured format only
- Suitable for automation, scripts, and GUI applications
- Prevents blocking operations in unattended scenarios

**Impact on Get-ValidCred Integration:**

- Passed through to underlying Get-ValidCred calls
- Controls whether credential retrieval prompts are shown
- Affects debug output and status reporting verbosity

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -ProgressAction

Standard PowerShell progress action preference for controlling built-in progress display behavior.

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

### System.Object

Accepts any object that can be resolved to a node name, including strings and objects with Node properties.

### System.String

Direct node name input for simple scenarios.

## OUTPUTS

### System.Collections.Hashtable

Returns a hashtable with comprehensive node credential and connection information:

**Hashtable Structure:**





@{
    Node         = "PC123"                    # Normalized node name
    FQDN         = "PC123.shsu.edu"          # Fully qualified domain name
    Credential   = [PSCredential]            # PowerShell credential object (if available)
    Status       = "OK"                      # Status: "OK", "Missing", "Error"
    ErrorMessage = ""                        # Error description (empty if successful)
}





**Status Values:**

- **"OK"**: Credentials found and available for use
- **"Missing"**: No credentials available in credential store
- **"Error"**: Processing error occurred (invalid input, lookup failure, etc.)

**Credential Object:**

- **Type**: `[System.Management.Automation.PSCredential]

- **UserName**: Always in format `NODENAME.shsu.edu\Administrator

- **Password**: SecureString containing the administrator password
- **Null**: When status is not "OK" or credentials unavailable

**FQDN Construction:**

- **Format**: Always `NODENAME.shsu.edu

- **Consistency**: Standardized domain suffix for all CheckIT operations
- **Usage**: Ready for PowerShell remoting and network operations

## NOTES

**Integration with CheckIT Credential System:**

- Uses Get-ValidCred for underlying credential validation
- Respects global credential store expiration settings
- Handles credential store initialization automatically
- Supports both interactive and automated credential retrieval workflows

**Error Handling Philosophy:**

- Never throws exceptions; always returns status information
- Provides detailed error messages for troubleshooting
- Differentiates between input errors and credential lookup failures
- Maintains consistent return structure regardless of success or failure

**FQDN Standards:**

- Always constructs FQDN as `NODENAME.shsu.edu

- Consistent with CheckIT's domain infrastructure requirements
- Compatible with PowerShell remoting, WinRM, and network share access
- Case-insensitive node name handling with proper domain suffix

**Performance Characteristics:**

- Lightweight wrapper around Get-ValidCred
- Minimal processing overhead for FQDN construction
- Cached credential lookups through global credential store
- Fast execution suitable for batch processing scenarios

**Return Type Handling:**
The function handles various return formats from Get-ValidCred:

- **PSCustomObject**: Standard Get-ValidCred return format
- **Boolean**: Legacy compatibility mode
- **Hashtable**: Alternative format handling
- **Null/Empty**: Error condition processing

**Common Usage Patterns:**





# Standard CheckIT pattern
$credInfo = Get-NodeCredAndFQDN -Node $nodeName -PromptUser:$false
if ($credInfo.Status -eq "OK" -and $credInfo.Credential) {
    # Use $credInfo.Credential and $credInfo.FQDN for remote operations
}

# Batch validation
$nodes | ForEach-Object {
    $credInfo = Get-NodeCredAndFQDN -Node $_ -PromptUser:$false
    # Process based on $credInfo.Status
}





**Security Considerations:**

- Returns PSCredential objects with SecureString passwords
- No plaintext password exposure in normal operations
- Respects credential store security boundaries
- Maintains audit trail through underlying Get-ValidCred calls

**Troubleshooting Tips:**

- Check credential store status with `Get-ValidCred

- Verify node exists in global NodeList
- Ensure Passman credentials have been retrieved
- Validate network connectivity to target FQDN
- Review CheckIT global variables initialization

**Best Practices:**

- Always check Status before using Credential
- Use PromptUser:$false for automation scenarios
- Implement proper error handling for missing credentials
- Cache results when processing multiple operations on same node
- Combine with Get-ValidCred for advanced credential management

## RELATED LINKS

[Get-ValidCred](Get-ValidCred.md)

[Passman](Passman.md)

[Show-CredentialClipboard](Show-CredentialClipboard.md)

[Ensure-GlobalCredStore](Ensure-GlobalCredStore.md)

[NodeList](NodeList.md)



