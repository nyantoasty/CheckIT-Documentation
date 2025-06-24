---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Ensure-NodeADInfo

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Ensure-NodeADInfo

## SYNOPSIS

Ensures a node object has complete Active Directory information (OS and OU) by querying AD if needed.

## SYNTAX





Ensure-NodeADInfo [-Node] <Object> [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Utility function that checks if a node object has complete Active Directory information (Operating System and Organizational Unit). If either property is missing or empty, the function automatically queries Active Directory to populate the missing information.

This function is designed to be called internally by other CheckIT functions to ensure node objects have complete metadata before processing. It provides a lightweight way to enrich node data without requiring explicit AD queries in calling functions.

Key features:

- **Conditional querying**: Only queries AD if OS or OU information is missing
- **Automatic enrichment**: Updates the node object with discovered information
- **Error resilience**: Sets default values if AD queries fail
- **NodeList integration**: Retrieves updated information from the global NodeList after AD updates
- **Non-disruptive**: Returns the node object whether AD information was needed or not

## EXAMPLES

### EXAMPLE 1: Basic Node Enrichment





$node = [PSCustomObject]@{ Node = "LAB-PC-01"; Group = "Lab Computers" }
$enrichedNode = Ensure-NodeADInfo -Node $node





Queries AD for OS and OU information since the node object is missing these properties.

### EXAMPLE 2: Node with Partial Information





$node = [PSCustomObject]@{ 
    Node = "PC123"
    OS = "Windows 11 Pro"
    # OU is missing
}
$enrichedNode = Ensure-NodeADInfo -Node $node





Only queries AD for the missing OU information since OS is already present.

### EXAMPLE 3: Node with Complete Information





$node = [PSCustomObject]@{ 
    Node = "SERVER01"
    OS = "Windows Server 2022"
    OU = "Servers"
}
$enrichedNode = Ensure-NodeADInfo -Node $node





Returns immediately without AD queries since both OS and OU are already populated.

### EXAMPLE 4: Integration in Workflow Functions





function Process-NodeWorkflow {
    param([array]$Nodes)
    
    foreach ($node in $Nodes) {
        # Ensure AD information is complete before processing
        $enrichedNode = Ensure-NodeADInfo -Node $node
        
        # Now proceed with workflow using complete node information
        if ($enrichedNode.OS -eq "Not in AD") {
            Write-Warning "Skipping $($enrichedNode.Node) - not found in AD"
            continue
        }
        
        # Process the enriched node...
    }
}





Demonstrates typical usage pattern in CheckIT workflow functions.

### EXAMPLE 5: Batch Processing with Error Handling





$nodes = $global:nodeList | Where-Object { -not $_.OS }
foreach ($node in $nodes) {
    try {
        $enrichedNode = Ensure-NodeADInfo -Node $node
        if ($enrichedNode.OS -ne "Unknown") {
            Write-Host "Enriched $($enrichedNode.Node): OS=$($enrichedNode.OS), OU=$($enrichedNode.OU)"
        }
    } catch {
        Write-Warning "Failed to enrich node $($node.Node): $($_.Exception.Message)"
    }
}





Shows error handling when processing multiple nodes with potential AD issues.

## PARAMETERS

### -Node

The node object to check and potentially enrich with Active Directory information. The object must have a 'Node' property containing the computer name.

**Required Properties:**

- **Node**: Computer name for AD lookup (required)

**Optional Properties:**

- **OS**: Operating System (will be populated if missing)
- **OU**: Organizational Unit (will be populated if missing)
- Any other node properties (preserved unchanged)

**Object Types Supported:**

- PSCustomObject with Node property
- Node objects from global NodeList
- Hashtables with Node key

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: True
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -ProgressAction

Standard PowerShell progress action preference for controlling progress display during AD operations.

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

Node objects or any object with a 'Node' property containing a computer name.

## OUTPUTS

### System.Object

Returns the input node object, potentially enriched with Active Directory information:

- **OS**: Operating System from AD or "Unknown" if AD query fails
- **OU**: Organizational Unit from AD or "Unknown" if AD query fails
- **All other properties**: Preserved unchanged from input object

## NOTES

**When AD Queries Occur:**

- OS property is null, empty, or whitespace
- OU property is null, empty, or whitespace
- Both conditions must be false to skip AD queries

**Active Directory Integration:**

- Uses the `AD` function for consistent AD querying behavior
- Supports both exact name matching and wildcard searches
- Handles AD connection failures gracefully

**NodeList Integration:**

- After AD queries, retrieves updated information from global NodeList
- Ensures consistency between the returned object and global NodeList
- Updates are automatically persisted via the AD function

**Error Handling:**

- Sets OS and OU to "Unknown" if AD queries fail
- Does not throw exceptions - always returns a node object
- Preserves all original properties even if AD queries fail

**Performance Considerations:**

- Lightweight check avoids unnecessary AD queries
- Only queries AD when information is actually missing
- Uses existing NodeList data when available
- Single AD query updates both OS and OU simultaneously

**Usage Patterns:**

- Call before processing nodes that require complete metadata
- Use in functions that need to ensure data completeness
- Safe to call multiple times on the same node (idempotent)
- Suitable for both individual nodes and batch processing

**Thread Safety:**

- Safe for concurrent use with different node objects
- NodeList updates are handled by underlying thread-safe functions
- No shared state between function calls

**Integration with CheckIT Functions:**

- Commonly used in workflow functions before node processing
- Called by functions that require complete node metadata
- Supports the CheckIT pattern of progressive data enrichment
- Compatible with all CheckIT node management functions

## RELATED LINKS

[AD](AD.md)

[NodeList](NodeList.md)

[New-NodeObject](New-NodeObject.md)

[Get-ADMembership](Get-ADMembership.md)



