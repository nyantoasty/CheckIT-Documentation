---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-ValidCred

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-ValidCred

## SYNOPSIS

Checks for valid credentials for one or more nodes, and optionally retrieves them via Passman if missing or expired with comprehensive validation and automatic management.

## SYNTAX





Get-ValidCred [-Nodes] <Object[]> [-Silent] [-AutoPassman] [[-StatusCallback] <ScriptBlock>]
 [-ReturnCredential] [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Core credential validation function for the CheckIT system that provides comprehensive credential status checking, automatic expiration handling, and optional credential retrieval integration. This function serves as the foundation for all credential-dependent operations in CheckIT.

The function performs intelligent credential validation against the global credential store, handles expiration scenarios gracefully, and provides flexible output formats for both interactive and programmatic use. It integrates seamlessly with Passman for automatic credential retrieval when credentials are missing or expired.

Key features:

- **Comprehensive credential validation** with expiration checking
- **Automatic credential store management** with expiration handling
- **Flexible input processing** supporting various node formats
- **Optional Passman integration** for automatic credential retrieval
- **Multiple output formats** for different use case requirements
- **Status callback support** for progress reporting and GUI integration

## EXAMPLES

### EXAMPLE 1: Basic Credential Status Check





$credStatus = Get-ValidCred -Nodes @("PC123", "PC124", "PC125")
$credStatus | Format-Table Node, Status, FQDN





Checks credential status for multiple nodes and displays results in table format.

### EXAMPLE 2: Credential Retrieval with Full Objects





$nodes = $global:nodeList | Where-Object { $_.Group -eq "Lab Computers" }
$credResults = Get-ValidCred -Nodes $nodes -ReturnCredential
foreach ($result in $credResults) {
    if ($result.Status -eq "OK") {
        Write-Host "✓ $($result.Node): Credentials available"
        Write-Host "  Username: $($result.Credential.UserName)"
        Write-Host "  Expires: $($result.Expiration)"
    }
}





Retrieves full credential objects for lab computers with detailed status reporting.

### EXAMPLE 3: Automatic Credential Retrieval via Passman





$nodes = @("NEW-PC-01", "NEW-PC-02")
$credResults = Get-ValidCred -Nodes $nodes -AutoPassman
$readyNodes = $credResults | Where-Object { $_.Status -eq "OK" }
Write-Host "Ready for operations: $($readyNodes.Count) of $($nodes.Count) nodes"





Automatically retrieves missing credentials via Passman and reports ready nodes.

### EXAMPLE 4: Silent Mode for Automation





$credCheck = Get-ValidCred -Nodes $global:nodeList -Silent -ReturnCredential
$validCreds = $credCheck | Where-Object { $_.Status -eq "OK" }
$expiredCreds = $credCheck | Where-Object { $_.Status -eq "Expired" }
$missingCreds = $credCheck | Where-Object { $_.Status -eq "Missing" }

Write-Host "Credential Summary:"
Write-Host "  Valid: $($validCreds.Count)"
Write-Host "  Expired: $($expiredCreds.Count)"
Write-Host "  Missing: $($missingCreds.Count)"





Silent credential audit for the entire NodeList with comprehensive reporting.

### EXAMPLE 5: Progress Callback for GUI Integration





$callback = { 
    param($status, $current, $total)
    Write-Progress -Activity "Validating Credentials" -Status $status -PercentComplete (($current/$total)*100)
    [System.Windows.Forms.Application]::DoEvents()  # For WinForms GUI
}

$credResults = Get-ValidCred -Nodes $largeNodeList -StatusCallback $callback -Silent





Demonstrates progress reporting for GUI applications processing large node lists.

### EXAMPLE 6: Credential Store Validation and Maintenance





# Check global credential store status
$allNodes = $global:nodeList | Select-Object -ExpandProperty Node
$credStatus = Get-ValidCred -Nodes $allNodes -Silent

# Identify nodes needing credential refresh
$needsRefresh = $credStatus | Where-Object { $_.Status -in @("Missing", "Expired") }

if ($needsRefresh.Count -gt 0) {
    Write-Host "Found $($needsRefresh.Count) nodes needing credential refresh"
    $refreshed = Get-ValidCred -Nodes $needsRefresh.Node -AutoPassman
}





Demonstrates proactive credential store maintenance and refresh workflows.

### EXAMPLE 7: Error Handling and Retry Logic





$nodes = @("PC1", "PC2", "INVALID")
$maxRetries = 3
$retryCount = 0

do {
    $credResults = Get-ValidCred -Nodes $nodes -Silent
    $failedNodes = $credResults | Where-Object { $_.Status -eq "Missing" }
    
    if ($failedNodes.Count -gt 0 -and $retryCount -lt $maxRetries) {
        Write-Host "Retry $($retryCount + 1): Attempting Passman for $($failedNodes.Count) nodes"
        $retryNodes = $failedNodes | Select-Object -ExpandProperty Node
        Get-ValidCred -Nodes $retryNodes -AutoPassman | Out-Null
        $retryCount++
    } else {
        break
    }
} while ($retryCount -lt $maxRetries)





Shows robust error handling with retry logic for credential retrieval failures.

## PARAMETERS

### -Nodes

Array of node names or node objects for credential validation. Supports flexible input formats for seamless integration with CheckIT workflows.

**Supported Input Types:**

- **String arrays**: `@("PC1", "PC2", "PC3")

- **Node objects**: Objects with `.Node` property from NodeList
- **Mixed arrays**: Combination of strings and node objects
- **Pipeline input**: Via ValueFromPipeline support

**Input Processing:**

- Strings are processed directly as node names
- Objects are inspected for `.Node` property
- Case-insensitive node name normalization
- Automatic trimming and validation
- Empty or invalid entries are filtered out

**Batch Processing:**

- Optimized for large node lists
- Parallel credential lookups where possible
- Efficient memory usage for extensive operations
- Progress reporting support for long-running validations

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False





### -Silent

Suppresses user prompts and interactive output for automation and GUI scenarios.

**When Present:**

- No console output except critical errors
- No user prompts or confirmations
- Suppresses colored output and progress messages
- Returns structured data only
- Suitable for background processing and automation

**When Not Present (Default):**

- Allows user interaction and prompts
- Shows colored status output
- Displays progress information
- Enables interactive credential retrieval
- Suitable for manual operations and troubleshooting

**Impact on Operations:**

- Controls Passman integration behavior with AutoPassman
- Affects error reporting verbosity
- Influences progress callback activation
- Determines GUI vs CLI operation mode

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -AutoPassman

Automatically invokes Passman for nodes with missing or expired credentials.

**When Present:**

- Automatically calls Passman for credential retrieval
- Processes only nodes with missing/expired credentials
- Updates credential store with retrieved credentials
- Re-validates credentials after Passman completion
- Returns updated status information

**When Not Present (Default):**

- Only performs credential validation
- Does not attempt credential retrieval
- Returns current credential status only
- Suitable for status checking without modification

**Interaction with Silent:**

- Silent:$false + AutoPassman:$true = Interactive Passman prompts
- Silent:$true + AutoPassman:$true = No Passman interaction (disabled)
- AutoPassman only works in interactive mode for security

**Use Cases:**

- Automated credential refresh workflows
- Pre-operation credential validation with auto-fix
- Maintenance scripts requiring credential availability
- Interactive troubleshooting with automatic resolution

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

ScriptBlock for progress reporting during credential validation operations.

**Callback Signature:**





$callback = { 
    param($status, $current, $total)
    # Your progress handling code here
}





**Parameters Provided:**

- **$status** (string): Current operation description
- **$current** (int): Current item being processed (0-based)
- **$total** (int): Total number of items to process

**Common Implementations:**





# Console progress bar
$callback = { param($status, $current, $total)
    Write-Progress -Activity "Validating Credentials" -Status $status -PercentComplete (($current/$total)*100)
}

# GUI progress update
$callback = { param($status, $current, $total)
    $global:ProgressBar.Value = ($current / $total) * 100
    $global:StatusLabel.Text = $status
    [System.Windows.Forms.Application]::DoEvents()
}





```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -ReturnCredential

Includes the actual PSCredential objects in the return data for immediate use.

**When Present:**

- Returns full PSCredential objects in results
- Enables immediate credential usage
- Increases memory usage for large node lists
- Provides complete credential information

**When Not Present (Default):**

- Returns credential status information only
- Lighter memory footprint
- Suitable for status checking without credential usage
- Can retrieve credentials later as needed

**Security Implications:**

- PSCredential objects contain SecureString passwords
- Credentials remain in memory until garbage collection
- Consider memory cleanup for security-sensitive operations
- Suitable for immediate use scenarios

**Output Impact:**

- Adds `Credential` property to each result object
- Contains `[System.Management.Automation.PSCredential]` object
- Username format: `NODENAME.shsu.edu\Administrator

- Password as SecureString for security

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -ProgressAction

Standard PowerShell progress action preference for controlling built-in progress display.

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

### IN System.Object[]

Array of node names (strings) or node objects with Node properties.

### System.String[]

Array of computer names for credential validation.

## OUTPUTS

### OUT System.Object[]

Array of PSCustomObjects containing comprehensive credential validation results:

**Result Object Structure:**





[PSCustomObject]@{
    Node       = "PC123"                     # Node name (normalized)
    Status     = "OK"                        # Credential status
    FQDN       = "PC123.shsu.edu"           # Fully qualified domain name
    Credential = [PSCredential]              # Credential object (if ReturnCredential)
    Expiration = [DateTime]                  # Credential expiration time
    Passman    = $true                       # Whether node has Passman credentials
}





**Status Values:**

- **"OK"**: Valid credentials available in credential store
- **"Missing"**: No credentials found for the node
- **"Expired"**: Credentials exist but have expired

**Additional Properties:**

- **Node**: Normalized node name (uppercase)
- **FQDN**: Standard CheckIT FQDN format
- **Expiration**: Global credential store expiration time
- **Passman**: Boolean indicating if node has Passman-retrieved credentials
- **Credential**: PSCredential object (only if ReturnCredential specified)

## NOTES

**Credential Store Integration:**

- Automatically initializes global credential store if needed
- Handles credential store expiration gracefully
- Maintains case-insensitive credential lookups
- Updates NodeList Passman status flags automatically
- Integrates with Ensure-GlobalCredStore for consistency

**Expiration Handling:**

- Checks global credential store expiration automatically
- Clears expired credentials from memory
- Updates all NodeList entries to reflect expiration
- Provides clear status indication for expired credentials
- Supports automatic refresh via AutoPassman parameter

**Performance Optimization:**

- Efficient batch processing for large node lists
- Case-insensitive credential key lookups
- Minimal memory allocation for status-only checks
- Optimized object creation and property access
- Suitable for high-frequency validation scenarios

**AutoPassman Integration:**

- Only activates in interactive mode (Silent:$false)
- Processes only nodes with missing/expired credentials
- Updates results after successful credential retrieval
- Maintains result consistency after Passman operations
- Provides seamless credential acquisition workflow

**Error Handling:**

- Never throws exceptions; returns status information
- Handles invalid node names gracefully
- Manages credential store corruption scenarios
- Provides meaningful error context in results
- Maintains operation continuity for batch processing

**Thread Safety:**

- Safe for concurrent access to credential store
- Handles global variable access appropriately
- Suitable for parallel processing scenarios
- Maintains data consistency during updates

**Memory Management:**

- Efficient object creation for large result sets
- PSCredential objects use SecureString internally
- Automatic garbage collection for unused credentials
- Memory-conscious processing for extensive node lists

**Integration Patterns:**





# Standard CheckIT credential validation
$credResults = Get-ValidCred -Nodes $nodeList -Silent
$validNodes = $credResults | Where-Object { $_.Status -eq "OK" }

# Pre-operation credential check with auto-fix
$credResults = Get-ValidCred -Nodes $nodes -AutoPassman
if ($credResults | Where-Object { $_.Status -ne "OK" }) {
    Write-Warning "Some nodes still lack credentials after Passman"
}

# Credential audit and reporting
$auditResults = Get-ValidCred -Nodes $allNodes -Silent -ReturnCredential
$report = $auditResults | Group-Object Status | ForEach-Object {
    "$($_.Name): $($_.Count) nodes"
}





**Best Practices:**

- Use Silent mode for automation and batch processing
- Implement progress callbacks for long-running operations
- Check Status before using Credential objects
- Use AutoPassman judiciously to avoid unnecessary prompts
- Cache results when performing multiple operations
- Handle expiration scenarios in long-running applications

**Common Troubleshooting:**

- Verify global credential store initialization
- Check NodeList for correct node names
- Validate Passman connectivity and authentication
- Review credential store expiration settings
- Ensure proper case handling for node names

## RELATED LINKS

[Get-NodeCredAndFQDN](Get-NodeCredAndFQDN.md)

[Passman](Passman.md)

[Show-CredentialClipboard](Show-CredentialClipboard.md)

[Get-ValidCredStatus](Get-ValidCredStatus.md)

[Ensure-GlobalCredStore](Ensure-GlobalCredStore.md)

[NodeList](NodeList.md)



