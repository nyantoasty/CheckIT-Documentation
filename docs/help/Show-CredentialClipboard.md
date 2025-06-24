---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Show-CredentialClipboard

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Show-CredentialClipboard

## SYNOPSIS

Interactively or programmatically retrieve and copy credentials for one or more nodes from the global credential store with secure clipboard integration.

## SYNTAX





Show-CredentialClipboard [-Node] <Object[]> [[-PromptUser] <Boolean>] [-ProgressAction <ActionPreference>]
 [<CommonParameters>]





## DESCRIPTION

Provides secure access to stored credentials with an interactive interface for copying usernames, passwords, or FQDNs to the clipboard. This function bridges the gap between credential storage and practical usage by offering both interactive CLI access and programmatic credential retrieval for automation scenarios.

The function validates credential availability, presents a user-friendly selection interface, and provides secure clipboard operations for manual credential usage. It supports both single-node and multi-node scenarios with flexible input handling and comprehensive error management.

Key features:

- **Interactive credential selection** with indexed node display
- **Secure clipboard operations** for usernames, passwords, and FQDNs
- **Dual-mode operation** supporting both interactive and programmatic access
- **Input validation** ensuring only valid credentials are accessible
- **Flexible input handling** supporting various node format inputs
- **Security-conscious design** with no persistent credential exposure

## EXAMPLES

### EXAMPLE 1: Interactive Credential Access for Single Node





Show-CredentialClipboard -Node "PC123"





Opens interactive menu for PC123, allowing user to copy username, password, or FQDN to clipboard.

### EXAMPLE 2: Multi-Node Interactive Selection





$labComputers = $global:nodeList | Where-Object { $_.Group -eq "Lab" }
Show-CredentialClipboard -Node $labComputers





Displays selection table for all lab computers with credentials, allows user to choose specific node and credential component.

### EXAMPLE 3: Programmatic Credential Retrieval





$credentials = Show-CredentialClipboard -Node @("SERVER01", "SERVER02") -PromptUser $false
foreach ($cred in $credentials) {
    Write-Host "Node: $($cred.Node), Username: $($cred.UserName)"
    # Password available in $cred.Password as plaintext string
}





Retrieves credential objects programmatically for automation scenarios without user interaction.

### EXAMPLE 4: Integration with Remote Desktop Workflow





function Connect-RemoteDesktop {
    param([string]$NodeName)
    
    $credInfo = Show-CredentialClipboard -Node $NodeName -PromptUser $false
    if ($credInfo) {
        Write-Host "Credentials copied for $($NodeName). Starting Remote Desktop..."
        Write-Host "Username: $($credInfo.UserName) (copied to clipboard)"
        
        # Copy username to clipboard for RDP
        Set-Clipboard -Value $credInfo.UserName
        
        # Launch RDP
        Start-Process "mstsc" -ArgumentList "/v:$($credInfo.FQDN)"
        
        # After user connects, copy password
        Read-Host "Press Enter when ready for password"
        Set-Clipboard -Value $credInfo.Password
        Write-Host "Password copied to clipboard"
    }
}

Connect-RemoteDesktop -NodeName "LAB-PC-05"





Demonstrates integration with remote desktop workflows for streamlined access.

### EXAMPLE 5: Credential Validation Before Operations





function Test-CredentialAvailability {
    param([string[]]$NodeList)
    
    $availableCreds = Show-CredentialClipboard -Node $NodeList -PromptUser $false
    
    Write-Host "Credential Availability Report:"
    Write-Host "Total Nodes Requested: $($NodeList.Count)"
    Write-Host "Nodes with Credentials: $($availableCreds.Count)"
    
    if ($availableCreds.Count -gt 0) {
        Write-Host "`nNodes Ready for Operations:"
        $availableCreds | ForEach-Object { Write-Host "  ✓ $($_.Node) ($($_.FQDN))" }
    }
    
    $missingCreds = $NodeList | Where-Object { $_ -notin $availableCreds.Node }
    if ($missingCreds.Count -gt 0) {
        Write-Host "`nNodes Missing Credentials:"
        $missingCreds | ForEach-Object { Write-Host "  ✗ $_" }
    }
    
    return $availableCreds.Count -eq $NodeList.Count
}

$allReady = Test-CredentialAvailability -NodeList @("PC1", "PC2", "PC3")





Uses programmatic mode to validate credential availability before batch operations.

### EXAMPLE 6: Secure Password Access Workflow





function Get-SecureNodePassword {
    param([string]$NodeName, [switch]$CopyToClipboard)
    
    $credInfo = Show-CredentialClipboard -Node $NodeName -PromptUser $false
    if (-not $credInfo) {
        Write-Warning "No credentials available for $NodeName"
        return $null
    }
    
    if ($CopyToClipboard) {
        Set-Clipboard -Value $credInfo.Password
        Write-Host "Password for $NodeName copied to clipboard" -ForegroundColor Green
        
        # Auto-clear clipboard after 60 seconds for security
        Start-Job -ScriptBlock {
            Start-Sleep -Seconds 60
            Set-Clipboard -Value ""
        } | Out-Null
        
        Write-Host "Clipboard will be cleared automatically in 60 seconds" -ForegroundColor Yellow
    }
    
    return $credInfo.Password
}

Get-SecureNodePassword -NodeName "SECURE-SERVER" -CopyToClipboard





Demonstrates secure password handling with automatic clipboard clearing for enhanced security.

### EXAMPLE 7: Bulk Credential Export for Documentation





function Export-CredentialSummary {
    param([string[]]$NodeList, [string]$OutputPath = "credential-summary.csv")
    
    $credSummary = Show-CredentialClipboard -Node $NodeList -PromptUser $false
    
    $export = $credSummary | Select-Object Node, UserName, FQDN | ForEach-Object {
        [PSCustomObject]@{
            ComputerName = $_.Node
            Username = $_.UserName
            FQDN = $_.FQDN
            PasswordStatus = "Available in credential store"
            LastVerified = Get-Date
        }
    }
    
    $export | Export-Csv -Path $OutputPath -NoTypeInformation
    Write-Host "Credential summary exported to $OutputPath" -ForegroundColor Green
    Write-Host "Note: Passwords are not included in export for security" -ForegroundColor Yellow
}

Export-CredentialSummary -NodeList ($global:nodeList | Select-Object -First 10).Node





Creates secure credential documentation without exposing passwords.

## PARAMETERS

### -Node

Array of node names or node objects for credential retrieval and clipboard operations. Supports flexible input formats consistent with CheckIT patterns.

**Supported Input Types:**

- **String arrays**: `@("PC1", "PC2", "PC3")

- **Node objects**: Objects with `.Node` property from NodeList  
- **Single strings**: `"PC123"` for single-node access
- **Mixed arrays**: Combination of strings and node objects

**Input Processing:**

- Strings are used directly as node names
- Objects are inspected for `.Node` property
- Invalid or empty entries are filtered out
- Only nodes with valid credentials are included in results
- Automatic deduplication of node names

**Interactive Mode Behavior:**

- Single node: Direct access to credential selection menu
- Multiple nodes: Displays indexed table for node selection
- Empty results: Shows appropriate warning message

**Programmatic Mode Behavior:**

- Returns credential objects only for nodes with valid credentials
- Empty results indicate no valid credentials found
- No user interaction or prompts

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases: Nodes

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

Controls the interaction mode determining whether to show interactive menus or return credential objects directly.

**When $true (Interactive Mode - Default):**

- **Node Selection**: Shows indexed table for multiple nodes
- **Credential Menu**: Interactive menu with options for Username (U), Password (P), Node FQDN (N), Back (B), Quit (Q)
- **Clipboard Operations**: Automatically copies selected items to clipboard
- **User Feedback**: Displays confirmation messages for clipboard operations
- **Navigation**: Allows user to select different nodes and credential components
- **Graceful Exit**: Supports quit options at any menu level

**When $false (Programmatic Mode):**

- **Direct Return**: Returns array of credential objects immediately
- **No Interaction**: No prompts, menus, or user input
- **Structured Output**: Returns consistent object format suitable for automation
- **Silent Operation**: No console output except warnings/errors
- **Batch Processing**: Efficient for processing multiple nodes programmatically

**Use Cases:**

- Interactive Mode: Manual credential access, troubleshooting, ad-hoc operations
- Programmatic Mode: Automation scripts, credential validation, bulk processing

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

### System.Object[]

Array of node names (strings) or node objects with Node properties.

### System.String[]

Array of computer names for credential clipboard access.

## OUTPUTS

### System.Object[] (Programmatic Mode Only)

Array of PSCustomObjects containing credential information with plaintext passwords:

**Programmatic Output Structure:**





[PSCustomObject]@{
    Node     = "PC123"                     # Node name
    UserName = ".\Administrator"           # Local administrator username format
    Password = "SecurePassword123"         # Plaintext password string
    FQDN     = "PC123.shsu.edu"           # Fully qualified domain name
}





**Interactive Mode Output:**

- No return value (void)
- All operations performed through clipboard and console interaction
- User experience focused on menu navigation and clipboard operations

**Security Considerations:**

- Plaintext passwords only available in programmatic mode
- Interactive mode uses clipboard for secure password handling
- No persistent storage of credential objects
- Memory cleanup handled by PowerShell garbage collection

## NOTES

**Interactive Menu System:**

- **Node Selection Table**: Shows Index, Node, UserName, FQDN for all available nodes
- **Credential Selection Menu**:
  - **(U)sername**: Copies `.\Administrator` to clipboard
  - **(P)assword**: Copies plaintext password to clipboard  
  - **(N)odename**: Copies FQDN (e.g., `PC123.shsu.edu`) to clipboard
  - **(B)ack**: Return to node selection
  - **(Q)uit**: Exit function
- **Input Validation**: Handles invalid selections gracefully with helpful error messages
- **Navigation**: Seamless movement between node selection and credential access

**Security Features:**

- **No Persistent Storage**: Credentials exist only in memory during function execution
- **Clipboard Security**: Manual password copying allows user control over clipboard timing
- **Session Isolation**: Each function call operates independently
- **Memory Protection**: PSCredential objects use SecureString internally until final extraction

**Credential Format Standards:**

- **Username**: Always formatted as `.\Administrator` for local account access
- **FQDN**: Always formatted as `NODENAME.shsu.edu` for network operations
- **Password**: Extracted as plaintext string for clipboard or programmatic use
- **Case Handling**: Node names normalized to consistent case format

**Integration with CheckIT Ecosystem:**

- **Credential Store**: Uses global credential store managed by Ensure-GlobalCredStore
- **Validation**: Leverages Get-ValidCred for credential status verification
- **Node Compatibility**: Supports same node input formats as other CheckIT functions
- **Error Handling**: Consistent with CheckIT error reporting patterns

**Performance Characteristics:**

- **Lightweight**: Only processes nodes with valid credentials
- **Efficient**: No unnecessary credential object creation in interactive mode
- **Responsive**: Fast menu navigation and clipboard operations
- **Scalable**: Handles both single nodes and large node lists effectively

**Common Use Cases:**

- **Manual RDP Access**: Copy credentials for Remote Desktop connections
- **Administrative Tasks**: Quick access to admin credentials for manual operations
- **Troubleshooting**: Interactive credential verification and testing
- **Documentation**: Programmatic credential inventory without password exposure
- **Automation**: Credential retrieval for custom scripts and workflows

**Error Conditions:**

- **No Valid Credentials**: Function shows warning if no nodes have valid credentials
- **Invalid Input**: Graceful handling of malformed node names or objects
- **Clipboard Errors**: Fallback messaging if clipboard operations fail
- **User Cancellation**: Clean exit when user chooses to quit

**Best Practices:**

- Use interactive mode for manual, ad-hoc credential access
- Use programmatic mode for automation and batch processing
- Clear clipboard manually after password operations for enhanced security
- Combine with credential validation functions for robust workflows
- Implement proper error handling in automation scenarios

**Security Recommendations:**

- Avoid storing programmatic output in variables longer than necessary
- Use interactive mode when possible to leverage clipboard security
- Consider automatic clipboard clearing for sensitive environments
- Implement session timeouts for long-running interactive sessions
- Monitor credential access for audit and compliance requirements

## RELATED LINKS

[Get-ValidCred](Get-ValidCred.md)

[Get-NodeCredAndFQDN](Get-NodeCredAndFQDN.md)

[Get-ValidCredStatus](Get-ValidCredStatus.md)

[Passman](Passman.md)

[Ensure-GlobalCredStore](Ensure-GlobalCredStore.md)

[Open-RemoteExplorer](Open-RemoteExplorer.md)



