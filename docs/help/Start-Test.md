---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Start-Test

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Start-Test

## SYNOPSIS

Runs a dynamic test template (manual and automated steps) against local or remote nodes, supporting CLI and GUI, resuming, and parallel unattended execution.

## SYNTAX





Start-Test [[-TemplateName] <String>] [[-Template] <Object>] [[-Nodes] <Array>] [-Self]
 [[-PromptUser] <Boolean>] [-Unattended] [[-Existing] <Array>] [[-GuiPromptCallback] <ScriptBlock>]
 [[-StatusCallback] <ScriptBlock>]





## DESCRIPTION

Loads a test template (by name or object), runs all steps using Invoke-TestStep, supports resuming incomplete runs, and exporting results.

## EXAMPLES

### EXAMPLE 1





Start-Test -TemplateName "Default Functionality Test" -Nodes @("PC123","PC124")





### EXAMPLE 2





Start-Test -Self -TemplateName "Custom Test"





### EXAMPLE 3: Unattended Execution





# Run only automated steps (CanUnattend = $true)
Start-Test -TemplateName "System Health Check" -Nodes $serverList -Unattended -PromptUser $false





### EXAMPLE 4: Resume/Fill Existing Results





# Get previous results
$existingResults = Get-CheckITStore -Store Reports | Where-Object ReportName -like "*TestRun*" | Select-Object -Last 1

# Resume testing, filling in missing steps
Start-Test -TemplateName "Comprehensive Test" -Nodes $nodes -Existing $existingResults.Data





### EXAMPLE 5: GUI Integration with Callbacks





$guiCallback = {
    param($step, $node)
    # Custom GUI prompt handling
    return Show-CustomTestDialog -Step $step -Node $node
}

$statusCallback = {
    param($activity, $current, $total)
    Update-ProgressBar -Activity $activity -Current $current -Total $total
}

Start-Test -TemplateName "Interactive Test" -Nodes $nodes -PromptUser $false -GuiPromptCallback $guiCallback -StatusCallback $statusCallback





## PARAMETERS

### -TemplateName

Name of the test template to use (from $global:Reports\['Templates'\]\['Test'\]).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Template

Pass a template object directly.

```yaml
Type: Object
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Nodes

Array of node names or objects to test.

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Self

If set, runs the test on the local computer.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

If $true (default), prompts for manual steps.
If $false, runs in GUI/automation mode.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -Unattended

If set, only runs steps that can be unattended.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





### -Existing

Existing results to review/fill or resume.

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: False
Position: 5
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -GuiPromptCallback

Optional.
Scriptblock to call for GUI input.
Receives ($Step, $Node) as arguments.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 6
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -StatusCallback

Optional.
Scriptblock for progress/status updates.

```yaml
Type: ScriptBlock
Parameter Sets: (All)
Aliases:

Required: False
Position: 7
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

## NOTES

## EXECUTION MODES

### Attended Mode (Default)

- All template steps execute in sequence
- Manual steps prompt for user interaction
- Screenshots and file uploads are supported
- Full interactive testing capability

### Unattended Mode (-Unattended)

- Only executes steps with `CanUnattend = $true

- Skips manual verification steps
- Automated validation only
- Perfect for scheduled testing scenarios

### Resume/Fill Mode (-Existing)

- Reviews existing test results
- Only executes missing or failed steps
- Preserves successful step results
- Enables interrupted test continuation

## STEP EXECUTION BEHAVIOR

### Parallel Node Processing

Tests execute against multiple nodes simultaneously using CheckIT's parallel processing engine:

- Each node processes all steps sequentially
- Multiple nodes are processed in parallel
- Progress tracking across all nodes and steps
- Comprehensive error handling per node

### Step Result Tracking

Each step execution generates detailed results:





@{
    Node = "ComputerName"
    StepName = "StepKey"
    StepType = "Manual|Invoke|Screenshot|FileUpload"
    Result = "Step execution result"
    StartTime = "Execution start timestamp"
    EndTime = "Execution end timestamp"
    Duration = "Seconds"
    Status = "OK|Error|NoCreds|UnknownStepType"
    Error = "Error message if applicable"
}





## CREDENTIAL HANDLING

### Automatic Credential Resolution

- Uses CheckIT's centralized credential store
- Automatic FQDN resolution for remote connections
- Invoke steps authenticate using stored Administrator credentials
- Manual steps execute in user context

### Error Handling

- "NoCreds" status when credentials unavailable
- Graceful degradation for credential failures
- Clear error messages for troubleshooting
- Automatic credential validation before execution

## REPORTING AND AUDIT TRAIL

### Automatic Report Generation

- Creates timestamped test run reports
- Both task logging and business reporting
- Excel export capability for analysis
- Comprehensive audit trail maintenance

### Result Structure

Test results are stored with complete metadata:

- Node identification and grouping
- Step-by-step execution details
- Timing and performance metrics
- Error classification and troubleshooting data

## GUI INTEGRATION FEATURES

### Callback Support

- **GuiPromptCallback**: Custom UI for manual steps
- **StatusCallback**: Progress reporting for GUI applications
- **Return Values**: Structured objects for programmatic processing

### Automation Compatibility

- Silent operation with PromptUser = $false
- Structured error objects for programmatic handling
- Export capabilities for data integration
- Session management for large-scale testing

## NOTES (Additional)

**Performance Considerations:**

- Large node sets benefit from parallel execution
- Unattended mode significantly faster than attended
- Network latency affects remote step execution
- Excel export time scales with result set size

**Template Compatibility:**

- Works with all templates created by [`New-TestTemplate`](New-TestTemplate.md)
- Compatible with built-in system test templates
- Supports mixed step types in single template
- Template validation ensures execution compatibility

**Error Recovery:**

- Individual step failures don't halt entire test
- Node-specific error isolation
- Resume capability for interrupted tests
- Comprehensive error classification for troubleshooting

## RELATED LINKS

[New-TestTemplate](New-TestTemplate.md)

[Invoke-TestStep](Invoke-TestStep.md)

[Manage-Templates](Manage-Templates.md)

[New-SystemTestTemplate](New-SystemTestTemplate.md)



