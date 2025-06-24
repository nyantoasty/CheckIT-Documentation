---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Passman

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Passman

## SYNOPSIS

Retrieve administrator credentials from Passman for valid Active Directory nodes with comprehensive validation and security controls.

## SYNTAX





Passman [[-Nodes] <Array>] [[-PromptUser] <Boolean>] [[-WO] <String>] [[-Reason] <String>]
 [<CommonParameters>]





## DESCRIPTION

Securely retrieves administrator credentials from the SHSU Passman system for Windows computers in Active Directory. This function provides comprehensive validation, including Active Directory verification, user selection interfaces, and automatic credential storage with expiration management.

The function integrates with CheckIT's NodeList system and provides both interactive CLI and programmatic automation modes. It ensures only valid Windows systems receive credential requests and maintains audit trails through work order and reason tracking.

Key features:

- **Active Directory validation** before credential requests
- **Interactive node selection** for multi-node scenarios
- **Automatic credential storage** with expiration tracking
- **NodeList integration** with automatic node management
- **Security controls** with input validation and sanitization
- **Dual-mode operation** supporting both CLI and automation workflows

## EXAMPLES

### EXAMPLE 1: Basic Credential Retrieval for Single Node





$node = [PSCustomObject]@{ Node = "LAB-PC-01" }
$retrievedNodes = Passman -Nodes @($node)





Retrieves administrator credentials for LAB-PC-01 with interactive prompts for work order and reason.

### EXAMPLE 2: Multiple Node Selection with Interactive Interface





$nodes = $global:nodeList | Where-Object { $_.Group -eq "Lab Computers" }
$credentialNodes = Passman -Nodes $nodes -PromptUser $true





Displays selection interface for lab computers and allows user to choose specific nodes for credential retrieval.

### EXAMPLE 3: Automated Credential Retrieval for Scripts





$nodes = @("PC123", "PC124", "PC125")
$result = Passman -Nodes $nodes -PromptUser $false -WO "WO2024-001" -Reason "Software deployment automation"





Silently retrieves credentials for multiple nodes using predefined work order and reason for automation scenarios.

### EXAMPLE 4: NodeList Integration Workflow





# Add nodes to NodeList if not already present
NodeList -Action Add -Nodes @("NEW-PC-01", "NEW-PC-02")

# Retrieve credentials with automatic NodeList updates
$credNodes = Passman -Nodes @("NEW-PC-01", "NEW-PC-02")

# Verify credential status
$credStatus = Get-ValidCred -Nodes $credNodes





Demonstrates complete workflow with NodeList integration and credential verification.

### EXAMPLE 5: Error Handling and Node Validation





$mixedNodes = @("VALID-PC", "INVALID-PC", "NON-WINDOWS-DEVICE")
try {
    $result = Passman -Nodes $mixedNodes -PromptUser $true
    Write-Host "Successfully retrieved credentials for: $($result -join ', ')"
} catch {
    Write-Warning "Credential retrieval failed: $($_.Exception.Message)"
}





Shows handling of mixed valid/invalid nodes with appropriate error management.

### EXAMPLE 6: Credential Expiration Management





# Check current credential status
$credStatus = Get-ValidCred -Nodes $global:nodeList
$expired = $credStatus | Where-Object { $_.Status -eq "Expired" }

if ($expired.Count -gt 0) {
    Write-Host "Refreshing expired credentials for $($expired.Count) nodes..."
    $refreshed = Passman -Nodes $expired.Node -PromptUser $false -WO "WO2024-002" -Reason "Credential refresh"
}





Demonstrates proactive credential expiration management in automation scenarios.

## PARAMETERS

### -Nodes

Array of node objects or node names for credential retrieval. Supports multiple input formats and automatic resolution from the global NodeList.

**Supported Input Types:**

- **String arrays**: `@("PC1", "PC2", "PC3")

- **Node objects**: Objects with `.Node` property from NodeList
- **Mixed arrays**: Combination of strings and node objects

**Input Processing:**

- Strings are resolved against global NodeList when possible
- Missing nodes prompt for NodeList addition (interactive mode)
- Invalid or non-existent nodes are filtered out after AD validation
- Automatic conversion to standardized node objects

**Node Requirements:**

- Must exist in Active Directory
- Must be Windows-based systems (Non-PC systems excluded)
- Must have valid computer accounts in the domain

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False





### -PromptUser

Controls the interaction mode and user interface behavior for the credential retrieval process.

**When $true (Interactive Mode - Default):**

- Displays multi-node selection interface for choosing specific nodes
- Prompts for work order number with validation
- Prompts for reason with length and content validation
- Shows confirmation dialog before submitting Passman request
- Provides colored status output during AD verification
- Allows corrections to work order, reason, and node list
- Displays success/failure messages with detailed information

**When $false (Automation Mode):**

- Uses provided WO and Reason parameters without prompting
- Processes all provided nodes without selection interface
- Silent operation suitable for scripts and background automation
- No console output except warnings and errors
- Immediate processing without user confirmation

**Use Cases:**

- Interactive Mode: Manual credential retrieval, troubleshooting, ad-hoc operations
- Automation Mode: Scheduled scripts, GUI applications, batch processing

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -WO

Work order number for audit tracking and accountability. Required for automation mode, prompted in interactive mode.

**Format Requirements:**

- **Allowed characters**: Letters, numbers, dashes, underscores only
- **Pattern**: `^[A-Za-z0-9\-_]+$

- **No spaces or special characters** (except dash and underscore)
- **Cannot be empty** or whitespace-only

**Common Formats:**

- `WO2024-001` - Standard work order format
- `TICKET_12345` - Ticket system reference
- `MAINT-2024-Q1` - Maintenance window identifier
- `DEPLOY_APP_V2` - Deployment project reference

**Security and Audit:**

- Logged with Passman request for accountability
- Included in credential retrieval audit trail
- Used for tracking credential usage patterns
- Required for organizational compliance

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None (prompted in interactive mode)
Accept pipeline input: False
Accept wildcard characters: False





### -Reason

Description of why credentials are needed. Required for audit tracking and organizational compliance.

**Content Requirements:**

- **Length**: 1-100 characters (enforced)
- **Content filtering**: Removes potentially dangerous characters
- **Sanitization**: Strips HTML/script characters (`<>;&"'\`)
- **Normalization**: Converts line breaks to spaces
- **Trimming**: Removes leading/trailing whitespace

**Good Reason Examples:**

- `"Software deployment and configuration"

- `"Troubleshooting network connectivity issues"

- `"Installing security updates"

- `"Hardware diagnostics and repair"

- `"User profile cleanup and maintenance"


**Security Considerations:**

- Sanitized to prevent injection attacks
- Logged for audit and compliance tracking
- Reviewed for organizational policy compliance
- Used in credential usage reporting

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None (prompted in interactive mode)
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

### IN System.Object[]

Array of node names (strings) or node objects with Node property.

### System.String[]

Array of computer names for credential retrieval.

## OUTPUTS

### OUT System.String[]

Array of node names for which credentials were successfully retrieved and stored. These nodes can be used with other CheckIT functions that require credentials.

Returns empty array if:

- No valid nodes found in Active Directory
- Authentication to Passman fails
- User cancels the operation
- All requested nodes are filtered out

## NOTES

**Authentication Requirements:**

- Must be logged in with regular user profile (not Technician/Administrator accounts)
- Requires network connectivity to passman.shsu.edu
- Uses Windows integrated authentication (no separate login required)
- Passman portal must be accessible and functional

**Active Directory Integration:**

- Automatically verifies all nodes exist in AD before credential requests
- Filters out non-Windows systems and non-existent computers
- Updates NodeList with AD verification results
- Skips nodes marked as "Not in AD" or "Non-PC"

**Node Processing Workflow:**

1. **Input Normalization**: Convert strings to node objects from NodeList
2. **Missing Node Handling**: Prompt to add unknown nodes to NodeList (interactive mode)
3. **Task Status Tracking**: Set nodes to 'Pending' status during processing
4. **Node Selection**: Interactive selection interface for multiple nodes
5. **Configuration Check**: Run SanityCheck for common issues
6. **AD Verification**: Verify each node exists in Active Directory
7. **Node Filtering**: Remove invalid nodes from credential request
8. **Credential Request**: Submit validated nodes to Passman
9. **Credential Storage**: Store retrieved credentials in global CredStore
10. **NodeList Updates**: Update node Passman status indicators

**Credential Storage:**

- Stored in global `$CredStore` with automatic expiration tracking
- Credentials include full FQDN usernames (`NODENAME.shsu.edu\Administrator`)
- SecureString passwords for memory protection
- Automatic NodeList Passman status updates
- Thread-safe storage for concurrent access

**Security Features:**

- Input validation and sanitization for work orders and reasons
- HTML decoding of passwords from Passman response
- Secure credential storage with PSCredential objects
- Automatic cleanup of expired credentials
- No persistent credential storage (session-only)

**Error Handling:**

- Graceful handling of authentication failures
- Network connectivity error management
- Individual node processing errors don't stop batch operations
- Clear error messages for troubleshooting
- Automatic retry capabilities for network timeouts

**Integration with CheckIT Functions:**

- Used by all functions requiring remote computer access
- Integrated with Process-Parallel for credential injection
- Compatible with Get-ValidCred for credential status checking
- Supports Show-CredentialClipboard for password access

**Performance Considerations:**

- AD verification adds processing time but prevents failed requests
- Large node lists may take significant time for AD validation
- Passman portal response parsing scales with node count
- Network latency affects overall completion time

**Best Practices:**

- Use descriptive work orders and reasons for audit trails
- Verify node existence in AD before calling function
- Use automation mode for scripted operations
- Implement error handling for production scripts
- Regularly check credential expiration status
- Use appropriate node filtering to minimize invalid requests

**Common Issues and Solutions:**

- **Authentication Failed**: Ensure logged in with regular profile, not admin account
- **Nodes Not Found**: Verify computer names and AD connectivity
- **Network Errors**: Check passman.shsu.edu accessibility
- **Invalid Input**: Review work order format and reason length requirements
- **Credential Expiration**: Use Get-ValidCred to check status before operations

## RELATED LINKS

[Get-PassManInfo](Get-PassManInfo.md)

[Get-ValidCred](Get-ValidCred.md)

[Show-CredentialClipboard](Show-CredentialClipboard.md)

[Ensure-GlobalCredStore](Ensure-GlobalCredStore.md)

[NodeList](NodeList.md)

[AD](AD.md)

[SanityCheck](SanityCheck.md)



