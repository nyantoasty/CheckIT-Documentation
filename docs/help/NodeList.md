---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# NodeList

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# NodeList

## SYNOPSIS

Manage and manipulate the global CheckIT node list with comprehensive CRUD operations and advanced features.

## SYNTAX





NodeList [-Action] <String> [[-Nodes] <Array>] [[-FilePath] <String>] [[-CreateIfMissing] <Boolean>]
 [[-PromptUser] <Boolean>] [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Comprehensive node list management supporting Add, Remove, Clear, Preview, Update, Upload, and SyncWithCredStore operations. The NodeList is the central repository for all computer/node information in CheckIT, providing standardized node objects with automatic property normalization and credential synchronization.

Features include:

- **Automatic deduplication** by node name with conflict resolution
- **Property standardization** using New-NodeObject for consistent structure
- **Credential synchronization** with automatic Passman status updates
- **Active Directory integration** for metadata enhancement
- **File import/export** supporting CSV, TXT, and Excel formats
- **Selective updates** preserving existing data while adding new information
- **Error handling** with comprehensive logging and recovery

Node objects include standardized properties: Node, Group, OU, OS, Skip, Online, WinRM, WSManAuth, LastCheck, Passman, UserName, IdleTime, ID, State, LogonTime, LastError, Win32PM, TaskStatus, and LastReboot.

## EXAMPLES

### EXAMPLE 1: Basic Node Addition





NodeList -Action Add -Nodes @("PC123", "SERVER01", "LAB-PC-05")





Adds multiple nodes to the NodeList with automatic standardization and deduplication.

### EXAMPLE 2: Advanced Node Addition with Properties





$nodesToAdd = @(
    [PSCustomObject]@{ Node = "PC123"; Group = "Lab Computers"; Description = "Student workstation" },
    [PSCustomObject]@{ Node = "SERVER01"; Group = "Servers"; OU = "OU=Servers,DC=domain,DC=com" }
)
NodeList -Action Add -Nodes $nodesToAdd





Adds nodes with comprehensive metadata that will be preserved and enhanced.

### EXAMPLE 3: Selective Node Removal





# Remove specific nodes
$nodesToRemove = $global:nodeList | Where-Object { $_.Group -eq "Decommissioned" }
NodeList -Action Remove -Nodes $nodesToRemove

# Remove by name
NodeList -Action Remove -Nodes @("OLD-PC", "BROKEN-SERVER")





Removes nodes based on criteria or specific names with automatic cleanup.

### EXAMPLE 4: File Import Operations





# Import from CSV with standard columns
NodeList -Action Upload -FilePath "C:\Data\computers.csv"

# Import from Excel with automatic column mapping
NodeList -Action Upload -FilePath "C:\Inventory\node_inventory.xlsx"

# Import from plain text file (one node per line)
NodeList -Action Upload -FilePath "C:\Lists\computer_names.txt"





Supports multiple file formats with intelligent column mapping and data normalization.

### EXAMPLE 5: Selective Property Updates





# Update specific properties without affecting others
$updates = @(
    [PSCustomObject]@{ Node = "PC123"; OS = "Windows 11 Pro"; LastCheck = Get-Date },
    [PSCustomObject]@{ Node = "SERVER01"; Online = "Online"; WinRM = $true }
)
NodeList -Action Update -Nodes $updates -CreateIfMissing:$false





Updates only specified properties while preserving all other existing node data.

### EXAMPLE 6: Credential Store Synchronization





# Sync with credential store and enhance with AD data
NodeList -Action SyncWithCredStore





Automatically adds missing nodes from the credential store, retrieves AD metadata, and tests connectivity.

### EXAMPLE 7: GUI/Automation Usage





# Get structured data for GUI applications
$nodeData = NodeList -Action Preview -PromptUser:$false

# Batch updates without prompts
$batchUpdates = @(
    @{ Node = "PC001"; Group = "Updated"; LastCheck = Get-Date },
    @{ Node = "PC002"; Group = "Updated"; LastCheck = Get-Date }
)
NodeList -Action Update -Nodes $batchUpdates -PromptUser:$false -CreateIfMissing:$true





Demonstrates silent operation for GUI integration and automation scenarios.

### EXAMPLE 8: Conditional Node Creation





# Update with automatic creation of missing nodes
$discoveredNodes = @(
    [PSCustomObject]@{ Node = "NEW-PC"; Group = "Discovered"; OS = "Windows 10" }
)
NodeList -Action Update -Nodes $discoveredNodes -CreateIfMissing:$true

# Update with user confirmation for missing nodes
NodeList -Action Update -Nodes $discoveredNodes -CreateIfMissing:$null -PromptUser:$true





Shows different approaches for handling nodes that don't exist in the current list.

## PARAMETERS

### -Action

The operation to perform on the NodeList.

**Available Actions:**

- **Add**: Adds new nodes with automatic deduplication and standardization
- **Remove**: Removes specified nodes from the list with cleanup
- **Clear**: Empties the entire NodeList (use with caution)
- **Preview**: Displays or returns the current NodeList for viewing
- **Update**: Modifies existing nodes or optionally creates missing ones
- **Upload**: Imports nodes from external files (CSV, TXT, Excel)
- **SyncWithCredStore**: Synchronizes with credential store and enhances with AD data

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Nodes

Array of node objects, hashtables, or strings to process. The format depends on the action:

**For Add/Update/Remove:**

- Strings: Node names only (e.g., @("PC1", "PC2"))
- Objects: Full node objects with properties
- Hashtables: Property-value pairs for node data

**Node Object Properties:**
All properties are optional except 'Node':

- **Node**: Computer/device name (required)
- **Group**: Logical grouping (e.g., "Lab Computers", "Servers")
- **OU**: Active Directory Organizational Unit
- **OS**: Operating System information
- **Description**: Free-text description
- **Online**: Connection status ("Online", "Offline", "Unknown")
- **WinRM**: PowerShell remoting capability (true/false)
- **LastCheck**: Last connectivity test timestamp
- **Passman**: Credential availability status (auto-managed)

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False





### -FilePath

File path for Upload operations. Supports multiple formats:

**Supported File Types:**

- **.csv**: Comma-separated values with headers
- **.txt**: Plain text (one node per line or delimited)
- **.xlsx**: Excel workbook (first sheet used)

**Column Mapping:**
The function automatically maps common column names:

- Node, ComputerName, HostName → Node property
- Group, GroupName → Group property
- OU, OrganizationalUnit → OU property
- Description, Desc → Description property

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -CreateIfMissing

Controls behavior when updating nodes that don't exist in the NodeList:

- **$true**: Automatically creates missing nodes
- **$false**: Skips missing nodes (update existing only)
- **$null** (default): Prompts user if PromptUser is true, otherwise skips

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

Controls interactive behavior and output formatting:

- **$true** (default): CLI mode with colored output, prompts, and formatted display
- **$false**: Silent mode returning structured objects for GUI/automation use

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

### String[]

Array of node names for simple addition or removal operations.

### IN PSCustomObject[]

Array of node objects with comprehensive property sets for advanced operations.

### Hashtable[]

Array of property-value hashtables for flexible node data specification.

## OUTPUTS

### OUT PSCustomObject[]

Array of standardized node objects representing the updated NodeList. All objects include the complete set of NodeList properties with proper typing and formatting.

**Return Object Properties:**
Each returned object includes all standardized NodeList columns:

- Node, Group, OU, OS, Skip, Online, WinRM, WSManAuth
- LastCheck, Passman, UserName, IdleTime, ID, State
- LogonTime, LastError, Win32PM, TaskStatus, LastReboot

## NOTES

**Global NodeList Management:**

- Stored in `$global:nodeList` for session-wide access
- Automatically persisted when using Save-CheckITDataCore
- Synchronized with credential store via Passman integration
- Enhanced with Active Directory metadata when available

**Deduplication and Standardization:**

- Automatic deduplication by Node name (case-sensitive)
- Conflict resolution keeps the most recent/complete record
- All objects standardized via New-NodeObject for consistency
- Property validation ensures data integrity

**File Import Features:**

- Intelligent column mapping for various naming conventions
- Support for delimited text files (comma, semicolon, tab, pipe)
- Excel import via Import-FromExcel for module independence
- Automatic data type conversion and validation

**Credential Integration:**

- Automatic Passman status updates based on credential store
- SyncWithCredStore action for comprehensive credential alignment
- Integration with Get-ValidCredStatus for accurate status reporting

**Active Directory Enhancement:**

- Automatic OS and OU population via AD function integration
- SyncWithCredStore includes AD metadata retrieval
- Supports both exact and partial name matching for AD lookup

**Error Handling and Recovery:**

- Comprehensive error logging via New-ErrorRecord
- Graceful handling of file import failures
- Automatic cleanup of invalid or empty node entries
- Detailed error messages for troubleshooting

**Performance Considerations:**

- Efficient deduplication using Group-Object operations
- Batch processing for large node sets
- Minimal AD queries through intelligent caching
- Optimized property updates preserve existing data

**Best Practices:**

- Use Preview with PromptUser:$false for GUI data retrieval
- Implement error handling when calling from automation scripts
- Regular SyncWithCredStore to maintain credential alignment
- Use descriptive Group names for logical organization
- Test file imports with small datasets before large operations

## RELATED LINKS

[New-NodeObject](New-NodeObject.md)

[Update-NodeFromResult](Update-NodeFromResult.md)

[Resolve-NodeObjects](Resolve-NodeObjects.md)

[Get-CheckITColumns](Get-CheckITColumns.md)

[Save-CheckITDataCore](Save-CheckITDataCore.md)

[Load-CheckITDataCore](Load-CheckITDataCore.md)



