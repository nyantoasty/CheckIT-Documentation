---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Get-PassManInfo

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Get-PassManInfo

## SYNOPSIS

Interactively collects and validates work order number and reason for Passman credential requests with comprehensive input sanitization.

## SYNTAX





Get-PassManInfo [[-TargetNodes] <String[]>] [<CommonParameters>]





## DESCRIPTION

Internal utility function that provides secure, interactive collection of work order numbers and reasons required for Passman credential requests. Implements comprehensive input validation, sanitization, and user-friendly error handling to ensure compliance with organizational audit requirements.

This function is primarily called by the Passman function during interactive operations but can be used independently for testing validation logic or building custom credential management workflows.

Key features:

- **Rigorous input validation** with format enforcement
- **Content sanitization** to prevent injection attacks
- **User-friendly error messages** with clear requirements
- **Retry logic** for invalid inputs with guidance
- **Security-focused design** with dangerous character removal

## EXAMPLES

### EXAMPLE 1: Basic Interactive Collection





$info = Get-PassManInfo -TargetNodes @("PC123", "PC124")
Write-Host "Work Order: $($info.WO)"
Write-Host "Reason: $($info.Reason)"
Write-Host "Target Nodes: $($info.TargetNodes -join ', ')"





Interactively collects work order and reason information for the specified target nodes.

### EXAMPLE 2: Validation Testing





# Test various work order formats
$testNodes = @("TEST-PC")
$info = Get-PassManInfo -TargetNodes $testNodes

# Function will prompt and validate:
# Valid: "WO2024-001", "TICKET_12345", "MAINT-SYSTEM"
# Invalid: "WO 2024-001" (spaces), "WO@2024" (special chars)





Demonstrates the validation process for different work order formats.

### EXAMPLE 3: Integration in Custom Workflows





function Custom-CredentialWorkflow {
    param([string[]]$ComputerNames)
    
    try {
        $passmanInfo = Get-PassManInfo -TargetNodes $ComputerNames
        Write-Host "Collected valid Passman information:"
        Write-Host "  WO: $($passmanInfo.WO)"
        Write-Host "  Reason: $($passmanInfo.Reason)"
        Write-Host "  Targets: $($passmanInfo.TargetNodes.Count) nodes"
        
        # Use the validated information for custom processing
        return $passmanInfo
    } catch {
        Write-Error "Failed to collect Passman information: $($_.Exception.Message)"
    }
}





Shows integration in custom credential management workflows.

### EXAMPLE 4: Error Handling and Retry Logic





$nodes = @("SERVER01", "SERVER02")
try {
    $info = Get-PassManInfo -TargetNodes $nodes
    # Function automatically retries on invalid input
    # User sees helpful error messages like:
    # "Invalid WO: Only letters, numbers, dashes, and underscores allowed."
    # "Reason must be 1-100 characters."
} catch {
    Write-Warning "User cancelled or persistent validation failure"
}





Demonstrates the built-in retry logic and user guidance for invalid inputs.

### EXAMPLE 5: Security Testing and Sanitization





# The function will automatically sanitize dangerous content:
# Input: "Software install <script>alert('test')</script> and config"
# Sanitized: "Software install  and config"
# 
# Input: "Troubleshooting\r\nMultiple\r\nLines"
# Sanitized: "Troubleshooting Multiple Lines"

$info = Get-PassManInfo -TargetNodes @("SECURE-PC")
# All dangerous characters are automatically removed





Shows how the function protects against potentially dangerous input content.

## PARAMETERS

### -TargetNodes

Array of target computer names that will receive the credential request. Used for context and included in the returned information but does not affect validation logic.

**Purpose:**

- Provides context for the credential request
- Included in returned hashtable for downstream processing
- Used by calling functions to maintain node association
- Does not influence validation rules or processing logic

**Format:**

- Array of strings representing computer names
- Typically NetBIOS names or FQDNs
- No validation performed on node names by this function
- Passed through unchanged to returned data structure

```yaml
Type: String[]
Parameter Sets: (All)
Aliases:

Required: False
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

### None

This function does not accept pipeline input. All data is collected through interactive prompts.

## OUTPUTS

### System.Collections.Hashtable

Returns a hashtable containing validated work order, reason, and target node information:

**Hashtable Structure:**





@{
    WO = "WO2024-001"                    # Validated work order number
    Reason = "Software deployment"       # Sanitized reason description  
    TargetNodes = @("PC1", "PC2")      # Pass-through target nodes array
}





**Key Properties:**

- **WO**: Work order number that passed format validation
- **Reason**: Reason text that passed length and content validation
- **TargetNodes**: Original target nodes array (unchanged)

## NOTES

**Work Order Validation Rules:**

- **Required**: Cannot be empty or whitespace-only
- **Format**: Must match pattern `^[A-Za-z0-9\-_]+$

- **Allowed Characters**: Letters (a-z, A-Z), numbers (0-9), hyphens (-), underscores (_)
- **Prohibited**: Spaces, special characters, punctuation (except - and _)
- **Examples of Valid WO**: `WO2024-001`, `TICKET_12345`, `MAINT-Q1`, `DEPLOY_APP

- **Examples of Invalid WO**: `WO 2024-001`, `WO@2024`, `WO.2024`, `WO#123


**Reason Validation and Sanitization:**

- **Length Requirements**: 1-100 characters (enforced strictly)
- **Content Sanitization**: Removes dangerous characters `[<>;&"'\\]

- **Normalization**: Converts line breaks (`\r\n`) to single spaces
- **Trimming**: Removes leading and trailing whitespace
- **Empty Check**: Rejects empty strings after trimming and sanitization

**Security Features:**

- **Injection Prevention**: Removes HTML/script characters that could be dangerous
- **Content Filtering**: Strips potentially malicious character sequences
- **Input Validation**: Enforces strict format requirements for audit compliance
- **Sanitization**: Cleans input while preserving legitimate content

**User Experience Design:**

- **Clear Error Messages**: Specific guidance for each validation failure
- **Retry Logic**: Allows users to correct invalid input without restarting
- **Progressive Validation**: Checks each field completely before moving to next
- **Helpful Prompts**: Clear instructions for required format and content

**Integration Patterns:**

- **Called by Passman**: Primary use case for interactive credential requests
- **Custom Workflows**: Can be used in custom credential management functions
- **Testing Utilities**: Useful for testing validation logic independently
- **GUI Integration**: Results can be used to populate form fields

**Performance Characteristics:**

- **Blocking Operation**: Waits for user input (not suitable for automation)
- **Lightweight Processing**: Minimal CPU usage during validation
- **Memory Efficient**: Small memory footprint for validation operations
- **Fast Validation**: Regular expression matching is very fast

**Error Conditions:**

- **User Cancellation**: If user provides invalid input repeatedly
- **Terminal Errors**: If console input is not available
- **Validation Failures**: When input cannot be sanitized to valid format

**Best Practices:**

- Use only in interactive scenarios where user input is required
- Implement timeout handling for automated environments
- Validate returned data before using in sensitive operations
- Consider using predefined values for automation scenarios
- Test validation logic with edge cases and security inputs

**Common Use Cases:**

- Interactive credential request workflows
- Manual troubleshooting operations requiring audit trails
- Testing and validation of organizational compliance requirements
- Custom applications requiring validated work order information

## RELATED LINKS

[Passman](Passman.md)

[Get-ValidCred](Get-ValidCred.md)

[Ensure-GlobalCredStore](Ensure-GlobalCredStore.md)

[Write-Color](Write-Color.md)



