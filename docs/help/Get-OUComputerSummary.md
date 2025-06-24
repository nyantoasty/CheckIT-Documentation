---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-OUComputerSummary

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-OUComputerSummary

## SYNOPSIS

Generates comprehensive organizational unit summaries with computer counts, OS distribution, and connectivity status from Active Directory.

## SYNTAX





Get-OUComputerSummary [[-BaseOU] <String>] [[-StringSearch] <String[]>] [[-WindowsOnly] <Boolean>]
 [[-OS] <String[]>] [[-StatusCallback] <ScriptBlock>] [<CommonParameters>]





## DESCRIPTION

Queries Active Directory to generate detailed summaries of organizational units and their computer memberships. This function provides comprehensive statistics including computer counts, operating system distribution, and real-time connectivity status for each OU.

The function supports both broad OU enumeration and targeted searches, making it suitable for both discovery and focused analysis scenarios. It includes built-in mappings for common OU structures and provides real-time connectivity testing with progress reporting.

Key features:

- **OU discovery and enumeration** with flexible search capabilities
- **Real-time connectivity testing** via Test-Connection for online/offline status
- **OS categorization** with intelligent Windows version grouping
- **Progress reporting** via callback functions for GUI integration
- **Filtering capabilities** for Windows-only systems and specific OS versions
- **Built-in OU mappings** for common organizational structures

## EXAMPLES

### EXAMPLE 1: Basic OU Summary for Lab Computers





$result = Get-OUComputerSummary -BaseOU "Lab"
$result.OUSummaries | Format-Table





Uses built-in mapping to query the Labs OU and returns summary statistics for all contained sub-OUs.

### EXAMPLE 2: Search for Specific OU Patterns





$result = Get-OUComputerSummary -StringSearch @("CIS", "Engineering", "Science")
$result.OUSummaries | Where-Object { $_.Members -gt 0 }





Searches for OUs containing "CIS", "Engineering", or "Science" and filters to show only populated OUs.

### EXAMPLE 3: Windows-Only Analysis with Progress Callback





$callback = { param($status, $current, $total) 
    Write-Progress -Activity "Scanning OUs" -Status $status -PercentComplete (($current/$total)*100)
}
$result = Get-OUComputerSummary -WindowsOnly:$true -StatusCallback $callback





Analyzes only Windows computers with real-time progress reporting for GUI applications.

### EXAMPLE 4: Specific OS Version Filtering





$result = Get-OUComputerSummary -OS @("Windows 11", "Windows 10") -BaseOU "Classroom"
$win11Count = ($result.OUComputersDict.Values | ForEach-Object { $_ } | Where-Object { $_.OS -like "*Windows 11*" }).Count
Write-Host "Windows 11 systems in classrooms: $win11Count"





Filters for specific Windows versions and calculates totals across all classroom OUs.

### EXAMPLE 5: Comprehensive Domain Analysis





$result = Get-OUComputerSummary
$totalSummary = $result.OUSummaries | Where-Object { $_.OU -eq "TOTAL" }
Write-Host "Domain Statistics:"
Write-Host "Total Computers: $($totalSummary.Members)"
Write-Host "Online: $($totalSummary.Online)"
Write-Host "Offline: $($totalSummary.Offline)"
Write-Host "OS Distribution: $($totalSummary.'OS Info')"





Performs domain-wide analysis and displays comprehensive statistics.

### EXAMPLE 6: Detailed Computer Inventory





$result = Get-OUComputerSummary -StringSearch @("Lab")
foreach ($ouIndex in $result.OUComputersDict.Keys) {
    $computers = $result.OUComputersDict[$ouIndex]
    $ouName = $result.OUSummaries[$ouIndex].OU
    Write-Host "`n$ouName Computers:"
    $computers | Select-Object Node, OS, Online | Format-Table -AutoSize
}





Demonstrates accessing detailed computer information for inventory purposes.

## PARAMETERS

### -BaseOU

Specifies the base organizational unit for the search. Supports built-in mappings for common OU structures.

**Built-in Mappings:**

- **"Lab"**: Maps to `OU=Labs,OU=Workstations,OU=Domain Computers,DC=SHSU,DC=EDU

- **"Classroom"**: Maps to `OU=Classroom,OU=Workstations,OU=Domain Computers,DC=SHSU,DC=EDU


**Custom Values:**

- Any valid Distinguished Name for custom OU targeting
- If not provided or not in built-in mappings, defaults to domain root

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 0
Default value: Domain root DN
Accept pipeline input: False
Accept wildcard characters: False





### -StringSearch

Array of search strings to filter organizational units by name. Uses wildcard matching to find OUs containing any of the specified strings.

**Search Behavior:**

- Case-insensitive wildcard matching
- Searches both the base OU and its immediate children
- Multiple strings create an OR condition (matches any)
- Results are deduplicated and sorted by Distinguished Name

**Examples:**

- `@("Lab", "Computer")` - Finds OUs with "Lab" OR "Computer" in the name
- `@("CIS-")` - Finds department-specific OUs like "CIS-Faculty", "CIS-Students"

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None (returns all OUs)
Accept pipeline input: False
Accept wildcard characters: True





### -WindowsOnly

Filters results to include only computers with Windows operating systems.

**When $true:**

- Excludes non-Windows systems (Linux, macOS, etc.)
- Only includes computers where `OperatingSystem -like "*Windows*"

- Useful for Windows-specific management and reporting

**When $false (default):**

- Includes all computer objects regardless of OS
- Provides complete inventory including mixed environments

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -OS

Array of operating system filters for more granular OS-based filtering. Works in conjunction with WindowsOnly parameter.

**Filter Behavior:**

- Uses wildcard matching against the OperatingSystem property
- Multiple values create an OR condition
- Case-insensitive matching
- Applied after WindowsOnly filtering if both are specified

**Common Examples:**

- `@("Windows 10", "Windows 11")` - Modern Windows versions only
- `@("Server 2019", "Server 2022")` - Server operating systems
- `@("Windows 11")` - Specific version targeting

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None (includes all OS types)
Accept pipeline input: False
Accept wildcard characters: True





### -StatusCallback

ScriptBlock for progress reporting during OU enumeration and connectivity testing. Essential for GUI integration and long-running operations.

**Callback Parameters:**

- **$status** (string): Current operation description
- **$current** (int): Current item number being processed
- **$total** (int): Total number of items to process

**Example Implementation:**





$callback = { 
    param($status, $current, $total)
    $percent = if ($total -gt 0) { ($current / $total) * 100 } else { 0 }
    Write-Progress -Activity "OU Analysis" -Status $status -PercentComplete $percent
}





```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

### None

This function does not accept pipeline input.

## OUTPUTS

### System.Collections.Hashtable

Returns a hashtable with two keys containing comprehensive OU and computer data:

**OUSummaries** (Array of PSCustomObject):
Each summary object contains:

- **Index**: Formatted index number (e.g., "01", "02", "--" for totals)
- **OU**: Display name of the organizational unit
- **Members**: Total number of computers in the OU
- **OS Info**: Formatted string showing OS distribution (e.g., "Windows 10: 15; Windows 11: 8")
- **Online**: Count of computers responding to ping
- **Offline**: Count of computers not responding to ping

**OUComputersDict** (Hashtable):
Dictionary indexed by OU number containing arrays of computer objects:

- **Node**: Computer name
- **Group**: OU name (used as group identifier)
- **OS**: Operating system from Active Directory
- **OU**: OU name for organizational reference
- **Online**: "Online" or "Offline" based on connectivity test

## NOTES

**Performance Considerations:**

- Each computer requires a Test-Connection operation for online/offline status
- Large OUs may take significant time to process due to connectivity testing
- Progress callbacks help manage user expectations during long operations
- Consider using filtering parameters to reduce scope for better performance

**Active Directory Requirements:**

- Requires ActiveDirectory PowerShell module
- Needs read permissions to query computer objects and OU structure
- Uses Get-ADOrganizationalUnit and Get-ADComputer cmdlets
- Network connectivity to domain controllers required

**Operating System Categorization:**
The function intelligently categorizes operating systems:

- **Windows 10**: Systems matching "Windows 10" pattern
- **Windows 11**: Systems matching "Windows 11" pattern  
- **Other Windows**: Windows systems not matching specific versions
- **[Actual OS Name]**: Non-Windows systems show their actual OS
- **Unknown**: Systems with no OS information

**Connectivity Testing:**

- Uses `Test-Connection -Count 1 -TimeoutSeconds 1 -Quiet

- Quick timeout for responsive testing in large environments
- Results cached per execution (not persistent)
- Network conditions affect accuracy of online/offline status

**Built-in OU Mappings:**
Designed for SHSU domain structure but easily customizable:

- Lab mapping targets student computer areas
- Classroom mapping targets instructional computers
- Mappings can be modified in the function source for other environments

**Error Handling:**

- Graceful handling of AD connection failures
- Empty OU results return appropriate empty structures
- Individual computer query failures don't stop overall processing
- Missing or inaccessible OUs are skipped with appropriate logging

**Integration Patterns:**

- Commonly used with Select-OUComputers for interactive selection
- Output format designed for GUI consumption and CLI display
- Results suitable for further analysis and reporting
- Compatible with CheckIT's standard object patterns

## RELATED LINKS

[Select-OUComputers](Select-OUComputers.md)

[Get-ADComputer](https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adcomputer)

[Get-ADOrganizationalUnit](https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adorganizationalunit)

[NodeList](NodeList.md)

[Update-Progress](Update-Progress.md)



