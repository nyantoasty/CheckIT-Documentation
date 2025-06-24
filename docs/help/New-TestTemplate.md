---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# New-TestTemplate

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# New-TestTemplate

## SYNOPSIS

Interactive or programmatic generator for dynamic test templates.

## SYNTAX





New-TestTemplate [[-PromptUser] <Boolean>] [[-Steps] <Array>] [[-TemplateName] <String>] [-Save]





## DESCRIPTION

Interactive and programmatic generator for dynamic test templates supporting CheckIT's
comprehensive testing framework. Creates structured test workflows that combine:

- **Manual verification steps** for human validation
- **Automated command execution** via PowerShell remoting
- **Screenshot capture** for visual documentation
- **File upload capabilities** for evidence collection
- **Flexible execution modes** (attended/unattended)

All templates are validated, sanitized, and can be saved to the global template store
for reuse across testing scenarios.

## EXAMPLES

### EXAMPLE 1





New-TestTemplate -PromptUser





### EXAMPLE 2





New-TestTemplate -Steps $steps -TemplateName "MyTest" -Save





### EXAMPLE 3: Programmatic Template Creation





$steps = @(
    @{
        Name = "ServiceCheck"
        Type = "Invoke"
        Command = "Get-Service -Name 'Spooler' | Select-Object Name, Status"
        CanUnattend = $true
        CanAttend = $true
        ResponseType = "Status"
    },
    @{
        Name = "UserConfirmation"
        Type = "Manual"
        Question = "Did the print spooler restart successfully?"
        CanUnattend = $false
        CanAttend = $true
        ResponseType = "YesNo"
    }
)

$template = New-TestTemplate -PromptUser $false -Steps $steps -TemplateName "Print Spooler Test" -Save





### EXAMPLE 4: Screenshot and File Upload Template





New-TestTemplate -PromptUser $true
# Interactive creation including:
# - Screenshot step for desktop capture
# - File upload step for log collection
# - Manual verification questions
# - Mixed attended/unattended capabilities





### EXAMPLE 5: Complex Multi-Step Validation





$complexSteps = @(
    @{ Name = "PreCheck"; Type = "Invoke"; Command = "Get-Process -Name 'explorer'"; CanUnattend = $true },
    @{ Name = "Screenshot"; Type = "Screenshot"; Question = "Take screenshot of desktop"; CanUnattend = $false },
    @{ Name = "UserTest"; Type = "Manual"; Question = "Can you access the Start Menu?"; ResponseType = "YesNo" },
    @{ Name = "PostCheck"; Type = "Invoke"; Command = "Get-EventLog -LogName System -Newest 5"; CanUnattend = $true },
    @{ Name = "LogUpload"; Type = "FileUpload"; Question = "Upload any relevant log files"; CanUnattend = $false }
)

New-TestTemplate -Steps $complexSteps -TemplateName "Desktop Functionality Test" -Save -PromptUser $false





## PARAMETERS

### -PromptUser

If $true (default), prompts the user for each step.
If $false, expects -Steps input.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





### -Steps

Optional.
Array of hashtables defining steps (for automation or GUI).

```yaml
Type: Array
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -TemplateName

Optional.
Name for the template (used for saving).

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





### -Save

If set, saves the template to $global:Reports\['Templates'\].

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

## NOTES

## STEP TYPES AND CAPABILITIES

### Manual Steps

- **Purpose**: Human verification and interaction
- **CanUnattend**: Always $false (requires human input)
- **ResponseTypes**: YesNo, Text, Status, Other
- **Use Cases**: Visual verification, subjective assessment, user interaction testing

### Invoke Steps  

- **Purpose**: Automated PowerShell command execution
- **CanUnattend**: Typically $true (fully automated)
- **Execution**: Via CheckIT's credential management and remoting
- **Use Cases**: System queries, service checks, automated validation

### Screenshot Steps

- **Purpose**: Visual evidence capture
- **CanUnattend**: Always $false (requires human interaction)
- **Implementation**: Prompts for file path or GUI integration
- **Use Cases**: Before/after comparisons, issue documentation, compliance evidence

### FileUpload Steps

- **Purpose**: Evidence and log file collection
- **CanUnattend**: Always $false (requires file selection)
- **Implementation**: File path prompting or GUI file dialogs
- **Use Cases**: Log collection, configuration backup, evidence preservation

## RESPONSE TYPES

### YesNo

Simple boolean responses for pass/fail scenarios

### Text

Free-form text input for detailed descriptions or observations

### Status

Structured status responses (OK, Warning, Error, etc.)

### File

File path responses for screenshot and upload steps

### Other

Custom response formats for specialized validation

## EXECUTION MODES

### Attended Mode

- All steps can execute with user present
- Manual steps require human interaction
- Screenshots and file uploads are supported
- Full interactive capability

### Unattended Mode

- Only steps with `CanUnattend = $true` execute
- Automated validation only
- Skips manual verification steps
- Perfect for automated testing scenarios

## TEMPLATE VALIDATION

### Input Sanitization

- Step names limited to alphanumeric, underscore, dash, space
- Commands and questions sanitized for security
- Length limits prevent excessive content
- Special character filtering prevents injection attacks

### Structure Validation

- Required properties validated for each step type
- Response types checked against allowed values
- Execution capabilities verified for consistency
- Dependencies between steps validated

## INTEGRATION WITH START-TEST

Templates created with New-TestTemplate are fully compatible with [`Start-Test`](Start-Test.md):





# Create template
$template = New-TestTemplate -TemplateName "My Test" -Save

# Execute template
Start-Test -TemplateName "My Test" -Nodes $targetNodes -PromptUser $true

# Or execute unattended
Start-Test -TemplateName "My Test" -Nodes $targetNodes -Unattended





**Template Storage:**

- Saved templates persist in `$global:Reports['Templates']['Test']

- Templates are included in CheckIT data saves/loads
- Author attribution tracks template creators
- Template modifications are audit-logged

**Best Practices:**

- Use descriptive step names for clear identification
- Balance automated and manual steps based on testing needs
- Consider unattended execution when designing step capabilities
- Test templates with small node sets before large deployments

**GUI Integration:**

- Templates work seamlessly with CheckIT GUI applications
- GuiPromptCallback support for custom UI interactions
- StatusCallback integration for progress reporting
- Structured return objects for programmatic processing

## RELATED LINKS

[Start-Test](Start-Test.md)

[Invoke-TestStep](Invoke-TestStep.md)

[New-SystemTestTemplate](New-SystemTestTemplate.md)

[Manage-Templates](Manage-Templates.md)



