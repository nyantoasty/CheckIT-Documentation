---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Select-OUComputers

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Select-OUComputers

## SYNOPSIS

Interactive organizational unit computer selection with automatic NodeList integration and comprehensive filtering options.

## SYNTAX





Select-OUComputers [[-BaseOU] <String>] [[-StringSearch] <String[]>] [[-PromptUser] <Boolean>]
 [[-AddToNodeList] <Boolean>] [[-WindowsOnly] <Boolean>] [[-OS] <String[]>] [[-StatusCallback] <ScriptBlock>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Provides interactive selection capabilities for computers within Active Directory organizational units. This function combines the discovery power of Get-OUComputerSummary with user-friendly selection interfaces and automatic CheckIT NodeList integration.

Supports both interactive CLI mode with rich selection options and programmatic mode for GUI and automation scenarios. The function handles complex selection patterns including ranges, multiple selections, and bulk operations with comprehensive validation and error handling.

Key features:

- **Interactive OU selection** with flexible input patterns (ranges, lists, wildcards)
- **Automatic NodeList integration** with optional group assignment
- **Real-time filtering** by OS, connectivity status, and OU characteristics
- **Dual-mode operation** supporting both CLI and GUI usage patterns
- **Progress reporting** for long-running discovery operations
- **Comprehensive validation** with user-friendly error messages

## EXAMPLES

### EXAMPLE 1: Interactive Lab Computer Selection





Select-OUComputers -BaseOU "Lab" -PromptUser $true





Displays an interactive table of lab OUs with computer counts and allows user selection for NodeList addition.

### EXAMPLE 2: Automated Classroom Computer Addition





$computers = Select-OUComputers -BaseOU "Classroom" -WindowsOnly:$true -PromptUser:$false -AddToNodeList:$true
Write-Host "Added $($computers.OUSummaries.Count) classroom OUs to NodeList"





Automatically adds all Windows computers from classroom OUs to the NodeList without user interaction.

### EXAMPLE 3: Filtered Computer Discovery with Progress





$callback = { param($status, $current, $total) 
    Write-Progress -Activity "Discovering Computers" -Status $status -PercentComplete (($current/$total)*100)
}
$result = Select-OUComputers -StringSearch @("CIS", "Engineering") -OS @("Windows 11") -StatusCallback $callback -PromptUser:$false





Searches for Windows 11 computers in CIS and Engineering OUs with progress reporting for GUI integration.

### EXAMPLE 4: Interactive Multi-Selection Workflow





# Example of interactive session:
# User sees:
# Index  OU              Members  OS Info                Online  Offline
# 01     CIS-Faculty     12       Windows 11: 8; Win10: 4    10      2
# 02     CIS-Students    25       Windows 11: 15; Win10: 10   20      5
# 03     CIS-Lab         30       Windows 11: 25; Win10: 5    28      2
#
# User enters: 1,3 or 1..3 or 1-3
# Function processes selection and prompts for group name

Select-OUComputers -StringSearch @("CIS") -PromptUser:$true





Demonstrates the interactive selection interface with multiple selection patterns.

### EXAMPLE 5: Bulk Processing with Custom Groups





$labComputers = Select-OUComputers -BaseOU "Lab" -PromptUser:$false -AddToNodeList:$false
foreach ($ouIndex in $labComputers.OUComputersDict.Keys) {
    $computers = $labComputers.OUComputersDict[$ouIndex]
    $ouName = $labComputers.OUSummaries[$ouIndex].OU
    
    # Assign custom group names based on OU
    $computers | ForEach-Object { $_.Group = "Lab-$ouName" }
    NodeList -Action Add -Nodes $computers -PromptUser:$false
}





Demonstrates programmatic processing with custom group assignment logic.

### EXAMPLE 6: Connectivity-Based Selection





$result = Select-OUComputers -StringSearch @("Student") -PromptUser:$false
$onlineComputers = $result.OUComputersDict.Values | ForEach-Object { $_ } | Where-Object { $_.Online -eq "Online" }
NodeList -Action Add -Nodes $onlineComputers -PromptUser:$false
Write-Host "Added $($onlineComputers.Count) online student computers to NodeList"





Filters for online computers only and adds them to NodeList for immediate management.

## PARAMETERS

### -BaseOU

Specifies the base organizational unit for computer discovery. Supports built-in mappings for common organizational structures.

**Built-in Mappings:**

- **"Lab"**: Student computer labs and learning spaces
- **"Classroom"**: Instructional computers and presentation systems

**Usage Patterns:**

- Use built-in mappings for quick access to common areas
- Provide custom Distinguished Names for specific organizational targeting
- Leave empty to search entire domain (may be slow in large environments)

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 0
Default value: Domain root
Accept pipeline input: False
Accept wildcard characters: False





### -StringSearch

Array of search strings for filtering organizational units by name pattern. Enables targeted discovery of specific departments or areas.

**Search Capabilities:**

- Case-insensitive wildcard matching
- Multiple strings create inclusive OR conditions
- Matches both OU names and descriptions
- Supports partial name matching for flexible discovery

**Common Patterns:**

- Department codes: `@("CIS", "MATH", "ENGR")

- Functional areas: `@("Faculty", "Student", "Admin")

- Location indicators: `@("Building-A", "Library", "Lab")


```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None (discovers all OUs)
Accept pipeline input: False
Accept wildcard characters: True





### -PromptUser

Controls the interaction mode and determines CLI vs. programmatic behavior.

**When $true (Interactive CLI Mode):**

- Displays formatted OU selection table with statistics
- Provides interactive selection with range and pattern support
- Prompts for group name assignment to selected computers
- Confirms NodeList addition with user approval
- Shows hide/show options for empty OUs
- Supports export functionality

**When $false (Programmatic Mode):**

- Returns structured data without user interaction
- Suitable for GUI applications and automation scripts
- Automatic processing based on AddToNodeList parameter
- No console output or user prompts

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -AddToNodeList

Controls automatic NodeList integration behavior.

**When $true:**

- Automatically adds discovered computers to CheckIT NodeList
- Applies standardization via New-NodeObject for consistency
- Updates existing NodeList entries or creates new ones
- Triggers NodeList deduplication and validation

**When $false:**

- Returns computer data without NodeList modification
- Suitable for analysis and custom processing scenarios
- Allows manual control over NodeList operations

**Interaction with PromptUser:**

- PromptUser:$true + AddToNodeList:$true = User confirmation required
- PromptUser:$false + AddToNodeList:$true = Automatic addition
- AddToNodeList:$false = Never adds regardless of PromptUser setting

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -WindowsOnly

Filters discovery to include only Windows-based computer systems.

**Filtering Behavior:**

- Excludes Linux, macOS, and other non-Windows systems
- Uses Active Directory OperatingSystem attribute for determination
- Reduces noise in Windows-focused environments
- Improves performance by reducing connectivity tests

**Use Cases:**

- Windows patch management preparation
- Windows-specific software deployment
- License compliance and inventory
- Security policy application

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -OS

Array of specific operating system filters for granular targeting.

**Advanced Filtering:**

- Supports wildcard patterns for flexible matching
- Multiple values create inclusive OR conditions
- Case-insensitive matching against AD OperatingSystem attribute
- Works in combination with WindowsOnly parameter

**Strategic Applications:**

- Target specific Windows versions for updates
- Identify legacy systems requiring attention
- Support phased migration planning
- Compliance reporting for specific OS versions

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: None (includes all OS types)
Accept pipeline input: False
Accept wildcard characters: True





### -StatusCallback

ScriptBlock for progress reporting during discovery and connectivity testing operations.

**Callback Parameters:**

- **$status**: Descriptive text of current operation
- **$current**: Current item being processed (0-based)
- **$total**: Total number of items to process

**GUI Integration Example:**





$callback = { 
    param($status, $current, $total)
    [System.Windows.Forms.Application]::DoEvents()
    $global:ProgressBar.Value = ($current / $total) * 100
    $global:StatusLabel.Text = $status
}





```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: None
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





## INPUTS

### None

This function does not accept pipeline input.

## OUTPUTS

### System.Object[]

Output varies based on PromptUser parameter:

**Interactive Mode (PromptUser:$true):**
Returns array of selected computer objects with properties:

- **Node**: Computer name for CheckIT operations
- **Group**: Assigned group name (user-specified or OU-based)
- **OS**: Operating system from Active Directory
- **OU**: Source organizational unit name
- **Online**: Connectivity status ("Online" or "Offline")

**Programmatic Mode (PromptUser:$false):**
Returns hashtable with two keys:

- **OUSummaries**: Array of OU summary objects with statistics
- **OUComputersDict**: Dictionary of computer arrays indexed by OU

## NOTES

**Interactive Selection Patterns:**
The CLI mode supports sophisticated selection syntax:

- **Single selection**: `1` (selects OU index 1)
- **Multiple selection**: `1,3,5` (selects specific OUs)
- **Range selection**: `1..5` or `1-5` (selects OUs 1 through 5)
- **All selection**: `*` or `all` (selects all available OUs)
- **Commands**: `H` (hide empty), `S` (show all), `E` (export), `Q` (quit)

**Group Assignment Logic:**

- Interactive mode prompts for custom group names
- Default group assignment uses OU name for identification
- Group names are used for NodeList organization and reporting
- Empty group names preserve original OU-based grouping

**Performance Optimization:**

- Large OU discovery operations may take significant time
- Connectivity testing adds overhead but provides valuable status
- Use filtering parameters to reduce scope and improve performance
- StatusCallback helps manage user expectations during long operations

**Error Handling and Validation:**

- Invalid OU selections are rejected with helpful messages
- Empty result sets provide appropriate user feedback
- Network connectivity issues are handled gracefully
- AD permission problems are reported clearly

**NodeList Integration:**

- Uses New-NodeObject for standardization and consistency
- Triggers automatic deduplication in NodeList
- Updates Passman status based on credential availability
- Maintains referential integrity with existing NodeList data

**GUI Application Support:**

- PromptUser:$false mode designed for GUI consumption
- StatusCallback enables real-time progress updates
- Structured return data supports complex GUI operations
- No console dependencies when running in programmatic mode

**Security Considerations:**

- Respects Active Directory read permissions
- No modification of AD objects or structure
- Read-only discovery operations only
- Honors organizational security boundaries

**Best Practices:**

- Use StringSearch to limit scope in large environments
- Implement progress callbacks for long-running operations
- Validate user selections before bulk NodeList operations
- Consider using WindowsOnly in homogeneous Windows environments
- Test connectivity requirements in network-restricted environments

## RELATED LINKS

[Get-OUComputerSummary](Get-OUComputerSummary.md)

[NodeList](NodeList.md)

[New-NodeObject](New-NodeObject.md)

[Get-ADOrganizationalUnit](https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adorganizationalunit)

[Get-ADComputer](https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adcomputer)



