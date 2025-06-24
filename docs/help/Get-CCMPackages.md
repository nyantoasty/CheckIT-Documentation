---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-CCMPackages

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-CCMPackages

## SYNOPSIS

Retrieves CCM package status from all specified nodes with per-node state tracking and deployment readiness analysis

## SYNTAX





Get-CCMPackages [-Nodes] <Array> [[-Mode] <String>] [[-PackageFilter] <String>] [[-ReportName] <String>] 
[[-PromptUser] <Boolean>] [[-StatusCallback] <ScriptBlock>] [<CommonParameters>]





## DESCRIPTION

Get-CCMPackages is a comprehensive SCCM package management function that provides three distinct operational modes for different use cases. It queries CCM_Application data from multiple nodes in parallel, performs deployment readiness analysis, and offers interactive package management capabilities.

The function uses robust fallback query methods (CIM → Invoke-Command → WMI) to ensure maximum compatibility across different environments and PowerShell versions. It integrates seamlessly with CheckIT's credential management, parallel processing, and reporting systems.

### Key Capabilities

- **Multi-node parallel processing** with automatic credential management
- **Three operational modes** for different workflows (Discovery, Interactive, List)
- **Deployment readiness analysis** with per-package status summaries
- **Interactive package management** with command generation and remote execution
- **Comprehensive error handling** with detailed troubleshooting information
- **Robust query fallbacks** for maximum environment compatibility

## MODES

### Discovery Mode (Default)

Comprehensive analysis and reporting mode that displays detailed package deployment status across all nodes. Ideal for administrative review and planning.

### Interactive Mode  

Interactive package management interface that allows administrators to select packages, generate deployment commands, and execute them remotely. Perfect for hands-on package management.

### List Mode

Programmatic data retrieval mode that returns structured objects for GUI applications or automation scripts.

## EXAMPLES

### Example 1: Basic Discovery Analysis





PS C:\> Get-CCMPackages -Nodes $global:nodeList -Mode Discovery





Performs comprehensive CCM package discovery across all nodes in the global node list. Displays detailed deployment status analysis including per-package statistics, node-by-node status, and deployment readiness metrics.

### Example 2: Filtered Package Discovery





PS C:\> Get-CCMPackages -Nodes @("PC1", "PC2", "PC3") -Mode Discovery -PackageFilter "Office"





Discovers only packages containing "Office" in their name across the specified nodes. Useful for focused analysis of specific software deployments.

### Example 3: Interactive Package Management





PS C:\> Get-CCMPackages -Nodes $selectedNodes -Mode Interactive





Launches interactive package management interface allowing administrators to:

- Browse available packages with deployment statistics
- Generate install/uninstall/evaluate commands
- Execute commands remotely with real-time progress tracking
- View detailed per-node status information

### Example 4: Programmatic Data Retrieval for GUI





PS C:\> $packageData = Get-CCMPackages -Nodes $nodes -Mode List -PromptUser:$false
PS C:\> $packageData.AllPackages | Format-Table Node, PackageName, InstallState





Returns structured data objects for programmatic use in GUI applications or automation scripts. No interactive prompts or CLI output.

### Example 5: Custom Report Generation





PS C:\> Get-CCMPackages -Nodes $labComputers -Mode Discovery -ReportName "Lab_SCCM_Audit_$(Get-Date -Format 'yyyyMMdd')" -PackageFilter "*"





Generates a comprehensive SCCM package audit report for lab computers with automatic report naming and date stamping.

## PARAMETERS

### -Nodes

Array of node names or node objects to query for CCM package information. Accepts both string arrays and CheckIT node objects from the global node list.

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Mode

Operational mode determining the function's behavior and output format.

**Discovery**: Comprehensive analysis with detailed CLI output and deployment readiness reporting
**Interactive**: Interactive package management interface with command generation and remote execution
**List**: Programmatic data retrieval returning structured objects for automation

```yaml
Type: String
Parameter Sets: (All)
Aliases:
Accepted values: Discovery, Interactive, List

Required: False
Position: 2
Default value: Discovery
Accept pipeline input: False
Accept wildcard characters: False





### -PackageFilter

Filter pattern for package names. Supports wildcards. Use "*" for all packages or specific terms like "Office" to filter results.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: *
Accept pipeline input: False
Accept wildcard characters: True





### -ReportName

Custom name for the generated report. If not specified, automatically generates a timestamped report name following CheckIT conventions.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: CCM_Packages_[timestamp]
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

Controls interactive prompts and CLI output formatting. Set to $false for silent operation in GUI applications.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

ScriptBlock for progress reporting in GUI applications. Receives activity descriptions and progress counts for real-time status updates.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### CommonParameters

This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### System.Array

Accepts arrays of node names (strings) or CheckIT node objects for processing.

## OUTPUTS

### Discovery Mode: System.Object[]

Returns array of package objects with comprehensive metadata for each node-package combination.

### Interactive Mode: System.Object[] or Deployment Results

In CLI mode, returns package objects after user interaction. In GUI mode, returns enhanced package objects with deployment commands.

### List Mode: System.Collections.Hashtable

Returns hashtable with structured data:

- **AllPackages**: All discovered package objects
- **PackageSummary**: Per-package deployment statistics
- **NodesWithoutPackage**: Nodes missing the package
- **NodeErrors**: Query errors encountered

## NOTES

### Query Methods and Reliability

The function employs a three-tier fallback strategy for maximum compatibility:

1. **CIM Session (Primary)**: Modern, efficient method using New-CimSession
2. **Invoke-Command (Secondary)**: Remote PowerShell execution with nested CIM/WMI fallbacks
3. **Direct WMI (Tertiary)**: Legacy compatibility using Get-WmiObject

This approach ensures successful queries across diverse environments, PowerShell versions, and network configurations.

### Interactive Mode Features

Interactive mode provides a comprehensive package management interface:

**Package Selection**:

- Indexed package browser with deployment statistics
- Per-package status breakdown (Installed, NotInstalled, etc.)
- Publisher, version, and node availability information

**Command Generation**:

- Install commands using proven CCM_Application static class methods
- Uninstall commands with proper error handling
- Evaluate commands with CIM/WMI fallbacks for application reevaluation

**Remote Execution**:

- Integration with Invoke-NodeCommand for reliable remote execution
- Real-time progress reporting with per-node status updates
- Comprehensive error handling and troubleshooting guidance
- Execution targeting options (All nodes, NotInstalled only, Installed only)

### Deployment Readiness Analysis

The function performs sophisticated deployment readiness analysis:

**Per-Package Statistics**:

- Total nodes with package available
- Installation status breakdown by count
- Version and revision information
- Publisher and metadata details

**Targeting Analysis**:

- Identification of nodes without package availability
- Group and OU analysis for deployment targeting
- Deployment recommendation based on status distribution

**Error Classification**:

- Intelligent separation of query errors vs. legitimate "no packages" states
- Detailed error reporting with troubleshooting context
- Credential vs. connectivity vs. system error categorization

### Performance and Scalability

- **Parallel Processing**: Uses Process-Parallel for concurrent node queries
- **Credential Pre-resolution**: Resolves all credentials before parallel execution
- **Timeout Management**: 30-second CIM sessions, 45-second query timeouts
- **Resource Cleanup**: Automatic CIM session cleanup prevents resource leaks
- **Progress Reporting**: Real-time progress updates for large-scale operations

### Security and Error Handling

- **Credential Integration**: Seamless integration with CheckIT credential management
- **Input Validation**: Comprehensive node normalization and validation
- **Safe Command Generation**: SQL injection prevention in generated commands
- **Audit Logging**: Complete task logging with execution metadata
- **Error Recovery**: Graceful handling of credential, network, and system errors

### Integration with CheckIT Ecosystem

- **NodeList Integration**: Automatic node status updates and error tracking
- **Reporting System**: Integration with Set-Report for business reporting
- **Task Logging**: Separate audit trail logging via Write-TaskLog
- **Template System**: Generated commands compatible with template workflows
- **Excel Export**: Report data optimized for Excel export and analysis

## TROUBLESHOOTING

### Common Issues and Solutions

**"Query Error" or "All query methods failed"**:

- Verify WinRM configuration on target nodes
- Check firewall settings for CIM/WMI traffic
- Ensure SCCM client is installed and running on target nodes
- Validate domain membership and trust relationships

**"Credential Error" messages**:

- Run Passman to refresh credentials for affected nodes
- Verify administrative rights on target nodes
- Check credential expiration in the global credential store

**"No packages found" or "NotAvailable" status**:

- Verify SCCM application deployment targeting
- Check collection membership for target nodes
- Confirm application deployment status in SCCM console
- Review application requirements and dependencies

**Interactive mode deployment failures**:

- Ensure Software Center is installed and functional
- Verify network connectivity between nodes and SCCM infrastructure
- Check SCCM client policy refresh status
- Review Windows Event Logs for detailed error information

### Performance Optimization

- Use specific PackageFilter to reduce query scope
- Limit node count for large-scale operations
- Monitor parallel processing performance with StatusCallback
- Consider segmenting large deployments across multiple sessions

### Best Practices

- Always test with Discovery mode before Interactive deployments
- Use List mode for programmatic integration with other tools
- Regular credential refresh for optimal reliability
- Filter packages appropriately to focus analysis efforts



