---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-ValidCredStatus

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-ValidCredStatus

## SYNOPSIS

Lightweight wrapper for Get-ValidCred that returns only node names and credential status for quick credential validation across multiple nodes.

## SYNTAX





Get-ValidCredStatus [-Nodes] <Object[]> [-Silent] [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Provides a simplified interface to Get-ValidCred that returns only essential credential status information (Node and Status) without the overhead of full credential objects or additional metadata. This function is optimized for scenarios where you need to quickly check credential availability across many nodes without retrieving the actual credentials.

The function leverages the full Get-ValidCred functionality internally while providing a streamlined output format ideal for status checks, batch validation, and integration with other CheckIT functions that need to determine credential readiness.

Key features:

- **Lightweight output** with only Node and Status properties
- **Batch credential validation** across multiple nodes efficiently  
- **Silent operation support** for automation and background processing
- **Pipeline compatibility** with standard CheckIT node processing patterns
- **Performance optimized** for large-scale credential status checks

## EXAMPLES

### EXAMPLE 1: Basic Credential Status Check





$credStatus = Get-ValidCredStatus -Nodes $global:nodeList
$credStatus | Format-Table Node, Status -AutoSize





Checks credential status for all nodes in the NodeList and displays results in a clean table format.

### EXAMPLE 2: Filter Nodes by Credential Status





$allNodes = $global:nodeList | Select-Object -ExpandProperty Node
$credStatus = Get-ValidCredStatus -Nodes $allNodes -Silent

$readyNodes = $credStatus | Where-Object { $_.Status -eq "OK" } | Select-Object -ExpandProperty Node
$missingCreds = $credStatus | Where-Object { $_.Status -eq "Missing" } | Select-Object -ExpandProperty Node
$expiredCreds = $credStatus | Where-Object { $_.Status -eq "Expired" } | Select-Object -ExpandProperty Node

Write-Host "Ready for operations: $($readyNodes.Count) nodes"
Write-Host "Missing credentials: $($missingCreds.Count) nodes"  
Write-Host "Expired credentials: $($expiredCreds.Count) nodes"





Demonstrates filtering nodes based on credential status for batch operations and reporting.

### EXAMPLE 3: Pre-operation Credential Validation





function Invoke-BatchOperation {
    param([string[]]$NodeNames, [scriptblock]$Operation)
    
    # Quick credential check before proceeding
    $credCheck = Get-ValidCredStatus -Nodes $NodeNames -Silent
    $validNodes = $credCheck | Where-Object { $_.Status -eq "OK" } | Select-Object -ExpandProperty Node
    
    if ($validNodes.Count -eq 0) {
        Write-Warning "No nodes have valid credentials. Operation cancelled."
        return
    }
    
    if ($validNodes.Count -lt $NodeNames.Count) {
        $missing = $NodeNames.Count - $validNodes.Count
        Write-Warning "Proceeding with $($validNodes.Count) nodes. $missing nodes lack credentials."
    }
    
    # Proceed with operation using only nodes with valid credentials
    & $Operation $validNodes
}





Shows integration pattern for pre-validating credentials before expensive operations.

### EXAMPLE 4: Credential Status Monitoring





# Create a credential monitoring dashboard
$monitoringNodes = @("CRITICAL-SERVER-01", "CRITICAL-SERVER-02", "LAB-PC-01", "LAB-PC-02")

while ($true) {
    Clear-Host
    Write-Host "=== CheckIT Credential Status Monitor ===" -ForegroundColor Cyan
    Write-Host "Last Updated: $(Get-Date)" -ForegroundColor Gray
    Write-Host ""
    
    $status = Get-ValidCredStatus -Nodes $monitoringNodes -Silent
    $status | Format-Table Node, Status -AutoSize
    
    $summary = $status | Group-Object Status | ForEach-Object {
        "$($_.Name): $($_.Count)"
    }
    Write-Host "Summary: $($summary -join ' | ')" -ForegroundColor Yellow
    
    Start-Sleep -Seconds 30
}





Demonstrates real-time credential status monitoring for critical systems.

### EXAMPLE 5: Pipeline Integration with Other CheckIT Functions





# Get nodes that need credential refresh and process them
$global:nodeList | 
    Get-ValidCredStatus -Silent | 
    Where-Object { $_.Status -in @("Missing", "Expired") } |
    ForEach-Object {
        Write-Host "Node $($_.Node) needs credential refresh (Status: $($_.Status))"
        # Could integrate with Passman here for automatic refresh
    }





Shows pipeline usage for identifying and processing nodes that need credential attention.

### EXAMPLE 6: Automated Credential Health Report





function New-CredentialHealthReport {
    param([string[]]$NodeList = $global:nodeList.Node)
    
    $credStatus = Get-ValidCredStatus -Nodes $NodeList -Silent
    $report = [PSCustomObject]@{
        TotalNodes = $NodeList.Count
        ValidCredentials = ($credStatus | Where-Object Status -eq "OK").Count
        MissingCredentials = ($credStatus | Where-Object Status -eq "Missing").Count  
        ExpiredCredentials = ($credStatus | Where-Object Status -eq "Expired").Count
        HealthPercentage = [math]::Round((($credStatus | Where-Object Status -eq "OK").Count / $NodeList.Count) * 100, 1)
        Timestamp = Get-Date
        Details = $credStatus
    }
    
    return $report
}

$healthReport = New-CredentialHealthReport
Write-Host "Credential Health: $($healthReport.HealthPercentage)% ($($healthReport.ValidCredentials)/$($healthReport.TotalNodes) nodes ready)"





Creates comprehensive credential health reporting for management dashboards.

## PARAMETERS

### -Nodes

Array of node names or node objects for credential status validation. Supports the same flexible input formats as Get-ValidCred.

**Supported Input Types:**

- **String arrays**: `@("PC1", "PC2", "PC3")`  
- **Node objects**: Objects with `.Node` property from NodeList
- **Mixed arrays**: Combination of strings and node objects
- **Pipeline input**: Via ValueFromPipeline support

**Input Processing:**

- Strings are processed directly as node names
- Objects are inspected for `.Node` property  
- Case-insensitive node name handling
- Automatic trimming and normalization
- Empty or invalid entries are filtered out

**Performance Considerations:**

- Optimized for large node lists
- Efficient memory usage with status-only output
- No credential object creation overhead
- Suitable for frequent status polling

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

Suppresses console output and user prompts for automation and background processing scenarios.

**When Present:**

- No console output except critical errors
- No user interaction or prompts
- Suppresses progress indicators and status messages
- Returns structured data only
- Suitable for background monitoring and automation

**When Not Present (Default):**

- Allows standard Get-ValidCred console output
- Shows progress for large node lists
- Displays status messages and warnings
- Suitable for interactive troubleshooting

**Impact on Performance:**

- Silent mode provides better performance for large batches
- Reduces console I/O overhead
- Enables background processing without user interruption
- Ideal for scheduled monitoring and health checks

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

### IN System.String[]

Array of computer names for credential status validation.

## OUTPUTS

### OUT System.Object[]

Array of PSCustomObjects containing only Node and Status information:

**Output Object Structure:**





[PSCustomObject]@{
    Node   = "PC123"        # Node name (normalized to uppercase)
    Status = "OK"           # Credential status: "OK", "Missing", or "Expired"
}





**Status Values:**

- **"OK"**: Valid credentials available in credential store
- **"Missing"**: No credentials found for the node
- **"Expired"**: Credentials exist but have expired (store-wide expiration)

**Output Characteristics:**

- **Lightweight**: Only essential properties included
- **Consistent**: Standardized format across all nodes
- **Filterable**: Easy to filter and group by status
- **Sortable**: Can be sorted by Node or Status for reporting

## NOTES

**Relationship to Get-ValidCred:**

- Internally calls Get-ValidCred with identical validation logic
- Strips out all properties except Node and Status
- Maintains the same credential validation accuracy
- Provides identical expiration handling and store management

**Performance Optimizations:**

- No PSCredential object creation overhead
- Reduced memory footprint for large node lists
- Faster processing when credential objects aren't needed
- Efficient for repeated status polling scenarios

**Use Cases:**

- **Batch Validation**: Check credential status before expensive operations
- **Health Monitoring**: Regular credential availability monitoring
- **Status Dashboards**: Real-time credential health displays
- **Pre-flight Checks**: Validate credentials before automated workflows
- **Reporting**: Generate credential status reports for management
- **Pipeline Filtering**: Filter nodes by credential availability

**Integration Patterns:**





# Common usage patterns
$credStatus = Get-ValidCredStatus -Nodes $nodeList -Silent

# Filter for ready nodes
$readyNodes = $credStatus | Where-Object Status -eq "OK" | Select-Object -ExpandProperty Node

# Group by status for reporting  
$statusSummary = $credStatus | Group-Object Status | ForEach-Object { "$($_.Name): $($_.Count)" }

# Find problem nodes
$problemNodes = $credStatus | Where-Object Status -ne "OK"





**Comparison with Get-ValidCred:**

- **Get-ValidCredStatus**: Fast, lightweight, status-only information
- **Get-ValidCred**: Full credential objects, expiration details, FQDN, Passman flags
- Use Get-ValidCredStatus for status checks and filtering
- Use Get-ValidCred when you need the actual credentials or detailed information

**Best Practices:**

- Use for pre-operation credential validation
- Implement in monitoring and health check scripts
- Cache results when processing multiple operations on same nodes  
- Combine with Get-ValidCred for two-stage credential workflows
- Use Silent mode for background and automated processes

**Troubleshooting:**

- Results reflect the same credential store state as Get-ValidCred
- Empty results indicate no valid node names provided
- All "Missing" status may indicate credential store needs initialization
- All "Expired" status indicates global credential store expiration

## RELATED LINKS

[Get-ValidCred](Get-ValidCred.md)

[Get-NodeCredAndFQDN](Get-NodeCredAndFQDN.md)

[Passman](Passman.md)

[Show-CredentialClipboard](Show-CredentialClipboard.md)

[Ensure-GlobalCredStore](Ensure-GlobalCredStore.md)



