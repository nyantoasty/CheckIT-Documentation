---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-ADMembership

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-ADMembership

## SYNOPSIS

Retrieves comprehensive AD group membership and metadata for computers or users with detailed property information.

## SYNTAX

### Node (Default)





Get-ADMembership [-Node] <String[]> [-ProgressAction <ActionPreference>] [<CommonParameters>]





### User





Get-ADMembership [-User] <String[]> [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Queries Active Directory to retrieve detailed group membership information and metadata for specified computers or users. This function provides comprehensive AD object details including group memberships, creation dates, last logon information, and organizational data.

The function supports both individual object lookup and batch processing with flexible input formats. Results include all group memberships with one row per group assignment, making it easy to analyze group-based permissions and organizational structure.

Key features:

- **Dual object support**: Works with both computer and user objects
- **Comprehensive metadata**: Retrieves creation date, last logon, enabled status, and more
- **Group enumeration**: Lists all group memberships with detailed group information
- **Flexible input**: Supports comma-separated strings or arrays
- **Error handling**: Graceful handling of missing or inaccessible objects
- **Primary computer support**: Identifies primary computer owners for computer objects

## EXAMPLES

### EXAMPLE 1: Get User Group Membership





Get-ADMembership -User "jsmith"





Retrieves all group memberships and profile information for user jsmith.

### EXAMPLE 2: Multiple Users with Comma-Separated Input





Get-ADMembership -User "jsmith,adoe,bwilson"





Processes multiple users from a single comma-separated string.

### EXAMPLE 3: Computer Group Membership Analysis





Get-ADMembership -Node "LAB-PC-01,SERVER-01"





Retrieves group memberships and metadata for specified computers.

### EXAMPLE 4: Batch Processing with Arrays





$users = @("jsmith", "adoe", "bwilson", "tgonzales")
$membership = Get-ADMembership -User $users
$membership | Group-Object User | ForEach-Object {
    Write-Host "$($_.Name): $($_.Count) group memberships"
}





Processes multiple users and summarizes group membership counts.

### EXAMPLE 5: Computer Ownership Analysis





$computers = Get-ADMembership -Node "LAB-PC-01,LAB-PC-02,LAB-PC-03"
$computers | Where-Object PrimaryUser | Select-Object Node, PrimaryUser, OperatingSystem





Identifies primary computer owners and operating systems for lab computers.

### EXAMPLE 6: Department-Based Group Analysis





$userMembership = Get-ADMembership -User "jsmith,adoe,bwilson"
$userMembership | Group-Object Department | ForEach-Object {
    Write-Host "Department: $($_.Name)"
    $_.Group | Select-Object User, Group | Format-Table -AutoSize
}





Analyzes group memberships by department affiliation.

### EXAMPLE 7: Security Group Filtering





$membership = Get-ADMembership -User "jsmith"
$securityGroups = $membership | Where-Object { $_.Group -like "*Security*" -or $_.Group -like "*Admin*" }
$securityGroups | Select-Object User, Group, Department





Filters results to show only security-related group memberships.

### EXAMPLE 8: Error Handling and Validation





$results = Get-ADMembership -User "validuser,invaliduser,anothervalid"
$errors = $results | Where-Object Error
$valid = $results | Where-Object { -not $_.Error }

Write-Host "Valid results: $($valid.Count)"
Write-Host "Errors: $($errors.Count)"
$errors | Select-Object User, Error





Demonstrates error handling for mixed valid/invalid input.

## PARAMETERS

### -User

One or more usernames to query for group membership and profile information.

**Input Formats:**

- Single username: `"jsmith"

- Comma-separated string: `"jsmith,adoe,bwilson"

- Semicolon-separated string: `"jsmith;adoe;bwilson"

- String array: `@("jsmith", "adoe", "bwilson")


**Username Formats:**

- SamAccountName (preferred): `"jsmith"

- UserPrincipalName: `"jsmith@domain.com"

- DistinguishedName: `"CN=John Smith,OU=Users,DC=domain,DC=com"


```yaml
Type: String[]
Parameter Sets: User
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False





### -Node

One or more computer names to query for group membership and system information.

**Input Formats:**

- Single computer name: `"LAB-PC-01"

- Comma-separated string: `"LAB-PC-01,SERVER-01,OFFICE-PC"

- Semicolon-separated string: `"LAB-PC-01;SERVER-01;OFFICE-PC"

- String array: `@("LAB-PC-01", "SERVER-01", "OFFICE-PC")


**Computer Name Formats:**

- NetBIOS name (preferred): `"LAB-PC-01"

- FQDN: `"LAB-PC-01.domain.com"

- DistinguishedName: `"CN=LAB-PC-01,OU=Computers,DC=domain,DC=com"


```yaml
Type: String[]
Parameter Sets: Node
Aliases: Computer

Required: True
Position: 1
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False





### -ProgressAction

Standard PowerShell progress action preference for controlling progress display during batch operations.

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

### String[]

Array of usernames or computer names to process.

### String

Comma or semicolon-separated string of names to process.

## OUTPUTS

### PSCustomObject[]

Array of objects containing membership and metadata information.

**User Object Properties:**

- **User**: SamAccountName of the queried user
- **DisplayName**: Full display name from AD
- **Description**: User description field
- **Created**: Account creation timestamp
- **LastLogonDate**: Most recent logon timestamp
- **Enabled**: Account enabled status (True/False)
- **EmailAddress**: Primary email address
- **Department**: Organizational department
- **Title**: Job title or position
- **DistinguishedName**: Full AD distinguished name
- **Group**: Group name (one row per group membership)
- **Error**: Error message if lookup failed

**Computer Object Properties:**

- **Node**: Computer name that was queried
- **Description**: Computer description field
- **Created**: Computer object creation timestamp
- **LastLogonDate**: Most recent computer logon timestamp
- **Enabled**: Computer account enabled status (True/False)
- **OperatingSystem**: Operating system information from AD
- **DistinguishedName**: Full AD distinguished name
- **PrimaryUser**: Primary computer owner (if configured)
- **Group**: Group name (one row per group membership)
- **Error**: Error message if lookup failed

## NOTES

**Group Membership Handling:**

- Each group membership creates a separate result row
- Objects with no group memberships return one row with empty Group field
- Group names are extracted from CN= portion of DistinguishedName
- Nested group memberships are not expanded (shows direct memberships only)

**Primary Computer Owner Detection:**

- Uses msDS-PrimaryComputerOwnerSID attribute for computer objects
- Resolves SID to SamAccountName when possible
- Provides null value if no primary owner configured or SID resolution fails
- Useful for identifying computer assignments in lab/classroom environments

**Active Directory Requirements:**

- Requires ActiveDirectory PowerShell module
- Needs read permissions to query user and computer objects
- Requires access to group membership information
- Domain connectivity required for all operations

**Performance Characteristics:**

- Each object requires individual AD query
- Group membership enumeration adds processing time
- Large batch operations may take significant time
- Network latency affects overall performance

**Error Handling:**

- Individual object failures don't stop batch processing
- Error messages included in result objects
- Common errors: object not found, access denied, AD unavailable
- Graceful handling of invalid or malformed names

**Data Analysis Patterns:**

- Group results by User/Node for membership summaries
- Filter by Group field for specific group analysis
- Use Department/OU information for organizational analysis
- Combine with other CheckIT functions for comprehensive reporting

**Security Considerations:**

- Respects AD read permissions for querying user
- Sensitive information (like group memberships) follows AD security model
- Does not expose password or other sensitive authentication data
- Results should be handled according to organizational data policies

**Integration with CheckIT:**

- Output format compatible with CheckIT reporting functions
- Can be used with Export-ToExcel for comprehensive reports
- Integrates with NodeList data for computer management
- Supports CheckIT's standard error handling patterns

## RELATED LINKS

[AD](AD.md)

[Get-ADComputer](https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adcomputer)

[Get-ADUser](https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-aduser)

[NodeList](NodeList.md)

[Export-ToExcel](Export-ToExcel.md)



