---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Update-NodeFromResult

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Update-NodeFromResult

## SYNOPSIS

Updates node properties in the global NodeList from function execution results with selective property updates.

## SYNTAX





Update-NodeFromResult [-result] <PSCustomObject>





## DESCRIPTION

Intelligently updates node objects in the global NodeList based on results from CheckIT function executions. Only updates properties that exist in the result object and have non-null values, preserving existing node data while adding new information.

This function is designed to be called by CheckIT functions after executing operations that return node-specific information such as OS details, connection status, or other system properties. It ensures the NodeList stays current with the latest discovered information about each node.

The function performs selective updates - only modifying properties that are present and non-null in the result object, which prevents overwriting existing valuable data with empty or null values.

## EXAMPLES

### EXAMPLE 1: Update from System Information Results





# After getting OS information from a node
$result = [PSCustomObject]@{
    Node = "PC123"
    OS = "Windows 11 Pro"
    LastBootTime = "2024-01-15 08:30:00"
    Online = "Online"
}

Update-NodeFromResult -result $result





Updates PC123 with OS information and connection status while preserving other existing properties.

### EXAMPLE 2: Update from Connection Test Results





# After testing node connectivity
$result = [PSCustomObject]@{
    Node = "SERVER01"
    Online = "Online"
    WinRM = $true
    LastCheck = Get-Date
}

Update-NodeFromResult -result $result





Updates connection-related properties for SERVER01 without affecting other node metadata.

### EXAMPLE 3: Update from Process-Parallel Results





# In a CheckIT function using Process-Parallel
$parallelResults = $nodeObjects | Process-Parallel -ScriptBlock {
    param($node, $credential, $fqdn)
    
    # ... remote operations ...
    
    return [PSCustomObject]@{
        Node = $node.Node
        Status = "Success"
        LastReboot = (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
        Online = "Online"
    }
} -UseCredentials

# Update NodeList with results
foreach ($result in $parallelResults.Results) {
    if ($result.Status -eq "Success") {
        Update-NodeFromResult -result $result
    }
}





Batch updates multiple nodes from parallel operation results.

### EXAMPLE 4: Partial Property Updates





# Result with only some properties
$result = [PSCustomObject]@{
    Node = "LAB-PC-05"
    Group = "Lab Computers"
    # Note: No OS, OU, or other properties
}

Update-NodeFromResult -result $result





Only updates the Group property, leaving all other existing properties unchanged.

## PARAMETERS

### -result

The result object containing node information to update. Must have a 'Node' property with a valid node name. Only properties that exist in this object and have non-null values will be updated in the NodeList.

```yaml
Type: PSCustomObject
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False





## INPUTS

### PSCustomObject

Result objects from CheckIT function executions containing node information to update.

## OUTPUTS

### None

This function does not return any output. It updates the global NodeList in place.

## NOTES

**Update Logic:**

- Only updates properties that exist in the result object
- Only updates properties with non-null values
- Preserves existing node data not present in the result
- Requires a valid 'Node' property to identify the target node

**Property Handling:**

- Uses Get-CheckITColumns to determine valid NodeList properties
- Skips the 'Node' property itself during updates (used only for identification)
- Maintains property consistency with NodeList schema

**Error Handling:**

- Validates that result object has a valid Node property
- Warns if Node property is missing or invalid
- Gracefully handles cases where node doesn't exist in NodeList
- Uses New-NodeObject for proper object structure

**Integration with CheckIT Functions:**

- Commonly called within Process-Parallel result processing loops
- Used by diagnostic and information gathering functions
- Supports the standard CheckIT pattern of updating NodeList with discovered information
- Works with both single node and batch update scenarios

**Best Practices:**

- Always check result.Status before calling for error results
- Include Node property in all result objects
- Use consistent property names matching NodeList schema
- Consider using this in finally blocks to ensure updates occur

## RELATED LINKS

[NodeList](NodeList.md)

[New-NodeObject](New-NodeObject.md)

[Process-Parallel](Process-Parallel.md)

[Get-CheckITColumns](Get-CheckITColumns.md)



