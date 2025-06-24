---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# New-NodeObject

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# New-NodeObject

## SYNOPSIS

Creates a standardized node object for the CheckIT NodeList with all required properties and automatic status management.

## SYNTAX





New-NodeObject [[-inputObj] <Object>]





## DESCRIPTION

Accepts a string (node name) or an object with node properties, and returns a PSCustomObject with all standard NodeList columns.
This function is the cornerstone of CheckIT's node management system, ensuring all node objects have consistent structure
and properties regardless of their source or creation method.

The function performs comprehensive normalization and standardization:

- Uses central column definitions from Get-CheckITColumns -Store NodeList for consistency
- Handles both hashtable and PSCustomObject inputs with case-insensitive property matching
- Sets intelligent defaults for missing properties based on CheckIT requirements
- Automatically manages Passman credential status based on global credential store
- Updates Skip status based on global skip list ($global:SkipNodes)
- Performs robust null and empty key validation to prevent corruption

Key Features:

- Case-insensitive property lookup for maximum compatibility
- Preserves existing Passman status during updates (critical for credential workflows)
- Automatic credential store synchronization for new nodes
- Comprehensive input validation and sanitization
- Deep copy return to prevent reference issues

This function ensures that all node objects throughout CheckIT maintain the same structure,
making them compatible with all reporting, export, and processing functions.

## EXAMPLES

### EXAMPLE 1





# Basic string input - creates standardized node
$node = New-NodeObject "PC123"
# Returns: PSCustomObject with Node="PC123" and all standard properties initialized





### EXAMPLE 2





# Hashtable input with multiple properties
$nodeData = @{ 
    Node = "LAB-PC456"
    Group = "LabA" 
    OU = "Labs"
    OS = "Windows 11"
}
$node = New-NodeObject $nodeData
# Returns: Standardized node with specified properties plus defaults for missing ones





### EXAMPLE 3





# Import from CSV and normalize
$importedNodes = Import-Csv "computers.csv" | ForEach-Object { New-NodeObject $_ }
# Ensures all imported nodes have consistent CheckIT structure





### EXAMPLE 4





# Update existing node while preserving credential status
$existingNode = $global:nodeList | Where-Object { $_.Node -eq "PC789" }
$existingNode.Passman = $true  # Preserve credential status
$updatedNode = New-NodeObject @{ 
    Node = "PC789"
    Group = "NewGroup" 
    OS = "Windows 11"
    Passman = $existingNode.Passman  # Explicitly preserve
}
# Returns: Updated node with new properties but preserved Passman status





### EXAMPLE 5





# Handle mixed case and null key validation
$messyData = @{
    "node" = "PC999"      # lowercase key
    "GROUP" = "TestLab"   # uppercase key  
    $null = "ignored"     # null key (safely ignored)
    "" = "ignored"        # empty key (safely ignored)
    "Description" = ""    # empty value (gets default)
}
$cleanNode = New-NodeObject $messyData
# Returns: Clean, standardized node object with case-insensitive property matching





### EXAMPLE 6





# Array processing for bulk operations
$nodeNames = @("PC001", "PC002", "PC003")
$standardizedNodes = $nodeNames | ForEach-Object { New-NodeObject $_ }
# Creates array of standardized node objects for bulk NodeList operations





### EXAMPLE 7





# Integration with credential management
# First, ensure credentials exist
Passman -Nodes @("PC555")
# Then create/update node - Passman status will be automatically set
$node = New-NodeObject "PC555"
# $node.Passman will be $true since credentials were retrieved





## PARAMETERS

### -inputObj

The node data to standardize.
Accepts multiple input formats:

String Input:

- Simple node name (e.g., "PC123")
- Automatically converted to object with Node property

Hashtable Input:

- Case-insensitive key matching (e.g., "node", "Node", "NODE" all work)
- Robust null key validation to prevent corruption
- All standard NodeList properties supported

PSCustomObject Input:

- Direct property access using PSObject.Properties
- Preserves existing property values while adding missing ones
- Compatible with imported data from Excel, CSV, JSON

Mixed Properties Supported:

- Node: Computer name (required)
- Group: Logical grouping (Lab, Classroom, etc.)
- OU: Active Directory organizational unit
- OS: Operating system information
- Description: Computer description from AD
- Online, WinRM, WSManAuth: Connectivity status
- UserName, IdleTime, ID, State, LogonTime: User session data
- Win32PM, TaskStatus, LastReboot: System status information
- LastError, LastCheck: Error tracking and timestamps

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

### [string] - Node name

### [hashtable] - Properties hashtable with case-insensitive key matching

### [PSCustomObject] - Object with node properties

### [object] - Any object with a Node property

## OUTPUTS

### [PSCustomObject] - Standardized node object with all CheckIT NodeList properties

### Standard Properties Always Present

### - Node: Computer name (required, never null)

### - Group: Logical grouping for organization

### - OU: Active Directory organizational unit

### - OS: Operating system from AD lookup

### - Description: Computer description (defaults to empty string)

### - Skip: Whether node is in global skip list

### - Online: Last known connectivity status

### - WinRM: Windows Remote Management status

### - WSManAuth: WSMan authentication status

### - LastCheck: Timestamp of last connectivity check

### - Passman: Credential availability status

### - UserName: Last logged-on user

### - IdleTime: User session idle time

### - ID: User session ID

### - State: User session state

### - LogonTime: User logon timestamp

### - LastError: Last error encountered

### - Win32PM: Service status indicator

### - TaskStatus: Current operation status (temporary)

### - LastReboot: Last system reboot time

### All properties are properly typed and initialized with appropriate defaults

### The returned object uses PSObject.Copy() to prevent reference issues

## NOTES

Critical Design Features:

- Thread-safe operation with no shared state modification
- Null and empty key validation prevents hashtable corruption
- Case-insensitive property matching for maximum compatibility
- Preserves existing Passman status during updates (prevents credential loss)
- Automatic credential store synchronization for new nodes
- Deep copy return prevents unintended reference modifications

Passman Status Logic:
The function implements intelligent Passman status preservation:
1.
If input has existing Passman property with valid value: PRESERVE IT
2.
If new node without Passman: Check global credential store
3.
Updates are non-destructive to existing credential workflows

Integration Points:

- NodeList function: Uses this for all node standardization
- AD function: Creates standardized nodes with AD data
- Import functions: Normalizes external data to CheckIT format
- Credential functions: Maintains Passman status consistency
- Export functions: Ensures consistent column structure

Column Definition Source:
Uses Get-CheckITColumns -Store NodeList for authoritative column list.
This ensures consistency across all CheckIT functions and prevents
schema drift between different parts of the system.

Input Validation:

- Comprehensive null checking for hashtable keys
- Trim and validation for string inputs
- Graceful handling of malformed or incomplete data
- Robust property lookup with fallbacks

Error Prevention:

- Null key filtering prevents hashtable enumeration errors
- Empty string defaults prevent null reference exceptions
- Type checking ensures proper object construction
- Copy() method prevents reference-based mutations

Performance Considerations:

- Single-pass property enumeration for efficiency
- Minimal object creation and copying
- Fast hashtable and PSObject property access
- Optimized for bulk processing scenarios

Usage Patterns:

- ALWAYS use this function when creating or updating node objects
- Required for all NodeList operations (Add, Update, etc.)
- Essential for data import/export compatibility
- Critical for maintaining data integrity across CheckIT

Best Practices:

- Use for all node object creation and modification
- Don't bypass this function for "simple" node creation
- Preserve existing objects when updating: New-NodeObject $existingNode
- Always validate Node property is not null before using result



