---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Process-Parallel

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Process-Parallel

## SYNOPSIS

Runs a scriptblock in parallel for each input object, collecting results with credential support and real-time progress reporting

## SYNTAX





Process-Parallel [[-InputObject] <Object[]>] [-ScriptBlock] <ScriptBlock> [[-MaxParallel] <Int32>]
 [[-ArgumentList] <Object[]>] [[-StatusCallback] <ScriptBlock>] [[-SkipFlagDirectory] <String>]
 [[-CoreModulePath] <String>] [-UseCredentials] [-RequireCredentials] [[-CredentialMap] <Hashtable>]
 [-ProgressAction <ActionPreference>] [<CommonParameters>]





## DESCRIPTION

Process-Parallel is the core parallel processing engine for CheckIT-Core, providing robust background job management with comprehensive credential support, intelligent error handling, and real-time progress reporting. It automatically handles credential pre-resolution, job lifecycle management, timeout protection, and result normalization.

The function serves as the foundation for most CheckIT operations that need to execute across multiple nodes simultaneously, ensuring consistent performance, reliability, and security across all parallel workflows.

### Key Features

- **Automatic credential management** with pre-resolution and secure passing to jobs
- **Intelligent performance optimization** with serial execution for small datasets
- **Robust job lifecycle management** with timeout protection and guaranteed cleanup
- **Comprehensive error detection** with CCM/WMI data recognition
- **Real-time progress reporting** compatible with both CLI and GUI scenarios
- **Skip flag support** for graceful user cancellation during execution
- **Resource leak prevention** with automatic job and temp file cleanup

### Execution Flow

1. **Pipeline accumulation** - Collects all input for accurate progress reporting
2. **Credential pre-resolution** - Resolves all credentials before job submission (if UseCredentials)
3. **Performance optimization** - Uses serial execution for small datasets (< 2 items)
4. **Parallel job management** - Submits and manages jobs within MaxParallel limits
5. **Result processing** - Normalizes results and applies intelligent error detection
6. **Cleanup and return** - Guarantees resource cleanup and returns structured results

## EXAMPLES

### Example 1: Basic Parallel Processing





PS C:\> $nodeArray | Process-Parallel -ScriptBlock { param($node) Test-Connection $node.Node }





Executes Test-Connection in parallel for each node in the array. Results are automatically normalized to PSCustomObjects for consistent handling.

### Example 2: With Credentials (Most Common CheckIT Pattern)





PS C:\> $nodeArray | Process-Parallel -ScriptBlock { 
    param($node, $param1, $credential, $fqdn)
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock { Get-Service }
} -ArgumentList @($someParameter) -UseCredentials





Demonstrates the standard CheckIT pattern with automatic credential resolution. The scriptblock receives the input object, any ArgumentList items, then credential and FQDN as final parameters.

### Example 3: Skip Flag for User Cancellation





PS C:\> # Create skip flag to cancel processing for specific node
PS C:\> New-Item -Path "$env:TEMP\checkit_skip_PC123.flag" -ItemType File
PS C:\> $nodes | Process-Parallel -ScriptBlock { param($node) Start-Sleep 10; "Processed $($node.Node)" }





Shows how users can create skip flag files to gracefully cancel processing for specific nodes during execution.

### Example 4: GUI Integration with Progress Callback





PS C:\> $progressCallback = { param($activity, $current, $total) Update-StatusBar "$activity ($current/$total)" }
PS C:\> $results = $nodes | Process-Parallel -ScriptBlock $script -StatusCallback $progressCallback





Demonstrates GUI integration with custom progress reporting. The callback receives activity description, current count, and total count for real-time status updates.

### Example 5: Credential Filtering with RequireCredentials





PS C:\> $results = $nodes | Process-Parallel -ScriptBlock $script -UseCredentials -RequireCredentials





Automatically filters out nodes without valid credentials before processing, preventing wasted job slots and improving overall performance.

## PARAMETERS

### -InputObject

The objects to process (accepts pipeline input). Can be node objects, strings, or any data type. Objects with a .Node property are automatically recognized for credential resolution.

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False





### -ScriptBlock

The scriptblock to run for each input object. When UseCredentials is set, receives additional $credential and $fqdn parameters automatically.

**Parameter Order**: InputObject, ArgumentList items, Credential (if UseCredentials), FQDN (if UseCredentials)

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -MaxParallel

Maximum number of parallel jobs to run simultaneously. Default is 8, which provides good balance between performance and resource usage.

**Performance Notes**:

- Higher values may improve throughput but increase resource usage
- Lower values reduce resource usage but may slow processing
- Network and target system capabilities should guide this setting

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: 8
Accept pipeline input: False
Accept wildcard characters: False





### -ArgumentList

Additional arguments to pass to the scriptblock after the input object. These arguments are passed before credential information (if UseCredentials is set).

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

Optional scriptblock for progress reporting in GUI scenarios. Receives activity description, current count, and total count parameters.

**Callback Signature**: `param($activity, $current, $total)


**Usage**: Ideal for updating progress bars, status labels, or logging progress in GUI applications.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -SkipFlagDirectory

Directory to check for per-node skip flags. Default is $env:TEMP. Create "checkit_skip_$NodeName.flag" files to skip processing for specific nodes.

**Skip Flag Format**: `checkit_skip_NODENAME.flag


**Behavior**: When a skip flag is found, the node is marked as "Skipped" and the flag file is automatically removed.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: $env:TEMP
Accept pipeline input: False
Accept wildcard characters: False





### -CoreModulePath

Optional path to the CheckIT core module for importing into background jobs. Enables CheckIT functions to be used within the parallel scriptblock.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 7
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -UseCredentials

If set, automatically resolves and passes credentials from the CheckIT credential store to background jobs. Credentials are pre-resolved for performance and passed securely to each job.

**Credential Resolution**: Uses Get-NodeCredAndFQDN for each input object that has a .Node property or is a string representing a node name.

**Security**: Credentials are passed as secure PSCredential objects and automatically reconstructed in background jobs.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -RequireCredentials

If set with UseCredentials, automatically filters out input objects that don't have valid credentials available. This prevents wasted job slots and improves performance.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -CredentialMap

Pre-resolved credential mapping (hashtable with NodeName -> CredInfo). When provided, overrides the UseCredentials automatic resolution process.

**Format**: `@{ "NodeName" = @{ FQDN="node.domain"; Username="user"; SecurePassword=[SecureString]; Status="OK" } }


**Use Case**: Useful when credentials have already been resolved or when using custom credential sources.

```yaml
Type: Hashtable
Parameter Sets: (All)
Aliases:

Required: False
Position: 8
Default value: @{}
Accept pipeline input: False
Accept wildcard characters: False





### CommonParameters

This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### System.Object[]

Accepts any objects via pipeline. Objects with .Node properties are automatically recognized for credential resolution when UseCredentials is specified.

## OUTPUTS

### System.Collections.Hashtable

Returns hashtable with Results, Errors, and OverallDuration properties:

- **Results**: Array of processed results from all jobs, normalized to PSCustomObjects
- **Errors**: Array of error messages from failed jobs or system issues  
- **OverallDuration**: Total execution time in seconds for performance analysis

## NOTES

### Performance Optimization

- **Serial Execution**: Automatically uses serial execution for datasets with less than 2 items to avoid parallel overhead
- **Credential Pre-resolution**: Resolves all credentials before job submission to prevent delays during parallel execution
- **Job Lifecycle Management**: Efficiently manages job submission, completion detection, and cleanup to maximize throughput

### Error Handling and Detection

Process-Parallel includes sophisticated error detection logic that recognizes legitimate data vs. actual errors:

**Intelligent Error Classification**:

- Detects explicit error prefixes ("ERROR:", "Exception", etc.)
- Recognizes PowerShell error patterns and connection failures
- **Preserves legitimate data**: Specifically excludes CCM/WMI structured data that contains status words
- Handles timeout detection with appropriate thresholds

**CCM/WMI Data Protection**:

- Data containing "InstallState", "EvaluationState", "PSComputerName" is treated as valid
- Prevents false error classification of legitimate SCCM and system data
- Maintains data integrity for downstream processing

### Resource Management

- **Automatic Cleanup**: Guarantees removal of background jobs and temporary files
- **Timeout Protection**: 10-minute maximum per job with 15-minute absolute maximum for all jobs
- **Memory Management**: Efficient result collection and job cleanup prevents resource leaks
- **File System**: Automatic cleanup of temporary result files

### Security Features

- **Secure Credential Passing**: PSCredential objects are securely serialized and reconstructed in jobs
- **Credential Validation**: Validates credential availability before job submission
- **Safe Execution**: Background jobs run in isolated contexts with proper error boundaries

### Integration with CheckIT Ecosystem

- **Credential Store Integration**: Seamless integration with CheckIT credential management (Passman, CredStore)
- **Progress Reporting**: Compatible with both CLI Write-Progress and GUI StatusCallback patterns
- **Error Handling**: Follows CheckIT error handling patterns for consistent behavior
- **Node Support**: Automatic recognition of CheckIT node objects and string node names

### Best Practices

- Use UseCredentials for any operations requiring remote authentication
- Implement StatusCallback for long-running operations in GUI scenarios
- Consider RequireCredentials to improve performance when credential availability varies
- Monitor MaxParallel settings based on network and target system capabilities
- Use Verbose output for troubleshooting job execution and timing issues

## TROUBLESHOOTING

### Common Issues

**Jobs hanging or not completing**:

- Check network connectivity and target system responsiveness
- Reduce MaxParallel if overwhelming target systems or network
- Verify scriptblock doesn't contain blocking operations
- Monitor job timeouts (10 minutes per job, 15 minutes absolute maximum)

**Credential-related failures**:

- Ensure CheckIT credential store is properly initialized (run Passman)
- Verify credentials haven't expired using Get-ValidCred
- Check domain trust relationships and authentication requirements

**Performance issues**:

- Adjust MaxParallel based on network capacity and target system specifications
- Use RequireCredentials to avoid processing nodes without credentials
- Consider breaking large datasets into smaller batches for better resource management

**Memory or resource consumption**:

- Monitor job cleanup completion using Verbose output
- Ensure scriptblocks don't create large objects or memory leaks
- Reduce MaxParallel if system resources are constrained



