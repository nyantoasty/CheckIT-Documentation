---
title: Developer Guide
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

# CheckIT Developer Guide

> Comprehensive development patterns, rules, and workflows for CheckIT-Core

## 🎯 The Big 3 Patterns (Master These First)

### 1. Reporting Pattern: Separate Task Logging from Business Reporting

**The Problem:** Mixing task logging with business reporting causes double entries and -Task parameter errors.

**The Solution:** Always separate these concerns:

```powershell
# ✅ CORRECT - Two separate calls:
$results | Write-TaskLog -Function $function -TaskParams @{
    Mode = $Mode
    Filter = $Filter
    # Note: NO "Report = $true" - prevents automatic Set-Report call
} | Out-Null

# Determine groups for business report
$groups = $nodeObjects | ForEach-Object { $_.Group }
$uniqueGroups = $groups | Where-Object { $_ } | Sort-Object -Unique
$reportGroups = if ($uniqueGroups.Count -gt 1) { @('Assorted') } elseif ($uniqueGroups.Count -eq 1) { @($uniqueGroups[0]) } else { @() }

# Business report (separate, clean data) - NO -Task parameter
Set-Report -ReportName $ReportName `
    -Function $function `
    -Data $cleanResults `
    -Groups $reportGroups `
    -Errors $nodeErrors `
    -PromptUser:$PromptUser | Out-Null

# ❌ WRONG - Creates double reporting errors:
Set-Report -Task -TaskParams @{...}
```

### 2. Enhanced Confirmation Pattern: Automation-Friendly User Interaction

**The Problem:** Functions either block automation or don't provide user control.

**The Solution:** Three-tier confirmation system with session memory:

```powershell
# ✅ CORRECT - Enhanced confirmation parameter:
function My-CheckITFunction {
    param(
        [object]$Confirm = $true,  # $true, $false, or "Auto"
        [bool]$PromptUser = $true
    )
    
    # Implementation pattern:
    if ($Confirm -eq $false) {
        $shouldProceed = $true  # Skip confirmation entirely
    }
    elseif ($Confirm -eq "Auto") {
        # Check session-wide preferences, prompt once and remember
        if ($global:WorkflowAutoConfirm -and $global:WorkflowAutoConfirm.ContainsKey('*')) {
            $shouldProceed = $global:WorkflowAutoConfirm['*']
        } else {
            # Enhanced options: Y/N/YA/NA for session control
            $confirm = Read-Host "Proceed? (Y/N/YA=Yes to All/NA=No to All)"
            # Store choice for session-wide automation
        }
    }
    else {
        # Traditional confirmation with session-wide awareness
        if ($global:WorkflowAutoConfirm -and $global:WorkflowAutoConfirm.ContainsKey('*')) {
            $shouldProceed = $global:WorkflowAutoConfirm['*']
        } else {
            $confirm = Read-Host "Proceed? (Y/N)"
            $shouldProceed = ($confirm -match '^(y|yes)$')
        }
    }
}

# ❌ WRONG - No automation support:
Read-Host "Continue? (Y/N)"  # Blocks automation
```

### 3. Credential Pattern: Automatic Credential Management

**The Problem:** Manual credential handling blocks GUI and doesn't integrate with Passman.

**The Solution:** Use Process-Parallel -UseCredentials for automatic handling:

```powershell
# ✅ CORRECT - Automatic credential handling:
$parallelResults = $nodeObjects | Process-Parallel -ScriptBlock { 
    param($node, $customParam1, $customParam2, $credential, $fqdn)
    # $credential and $fqdn automatically available here
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock { 
        # Your remote operations here
    }
} -ArgumentList @($customParam1, $customParam2) -UseCredentials

# ❌ WRONG - Manual credential handling:
$cred = Get-Credential  # Blocks GUI, no Passman integration
foreach ($node in $nodes) {
    Invoke-Command -ComputerName $node -Credential $cred -ScriptBlock { }
}
```

## 🔄 Template-Driven Development Philosophy

### Core Principle: Templates First, Functions Second

**Always check existing capabilities before building new ones:**

```powershell
# ✅ CORRECT: Template-driven approach
# 1. Search existing templates
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search

# 2. Use template workflows for complex operations
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# 3. Only create new functions when templates can't solve the need
```

### Template Workflow Integration Pattern

**How enhanced workflows inherit confirmation settings:**

```powershell
# ✅ CORRECT: Workflow confirmation inheritance
foreach ($templateName in $Templates) {
    if ($isCommandTemplate) {
        # Inherit workflow confirmation settings to prevent double-prompting
        $templateConfirm = if ($Confirm -eq $false -or $global:WorkflowAutoConfirm.ContainsKey('*')) { 
            $false  # Inherit automation setting
        } else { 
            $true   # Use standard confirmation
        }
        $result = Invoke-TemplateCommand -TemplateName $templateName -Confirm:$templateConfirm
    }
}

# User selects "Yes to All" at workflow level → individual templates auto-execute
# No double-prompting, seamless automation
```

### Excel Integration Strategy

**How workflows create comprehensive reports:**

```powershell
# ✅ CORRECT: Use actual report data, not intermediate batching
if ($ExportToExcel -and $executedTemplates.Count -gt 0) {
    $sheets = @{}
    
    # Individual template sheets from actual reports
    foreach ($templateName in $executedTemplates) {
        $cleanSheetName = $templateName -replace '[^A-Za-z0-9_\-]', '_'
        $sheets[$cleanSheetName] = $workflowResults[$templateName]
    }
    
    # Summary sheet with all results combined
    $sheets["Summary"] = $allResults
    Export-ToExcel -Sheets $sheets -Title $WorkflowName
}

# ❌ WRONG: Artificial batching/combining
Build-Report -Batch $WorkflowName -Result $result  # Don't do this
```

## 🚨 Critical Rules & Syntax

### Module Structure Rules

#### Function Export Requirements
```powershell
# ✅ CORRECT - Add ALL implemented functions:
Export-ModuleMember -Function @(
    'Get-Software', 'Get-CCMPackages', 'Test-NodeConnection',
    'Invoke-TemplateWorkflow', 'Invoke-TemplateCommand',  # Template functions
    'Your-New-Function'  # Always add new functions here
)

# ❌ WRONG - Missing from exports:
function Your-New-Function { ... }
# No corresponding entry in Export-ModuleMember = function won't be available
```

#### Module Load Order
```powershell
# ✅ CORRECT - At end of module:
Export-ModuleMember -Function @(
    'Function1', 'Function2', 'Function3'
)

# Initialize globals AFTER exports (LAST lines of module)
Ensure-CheckITGlobals
Ensure-Templates  # NEW: Load all built-in templates

# ❌ WRONG - Globals before exports:
Ensure-CheckITGlobals
Export-ModuleMember -Function @('Function1')
```

### Enhanced Confirmation Implementation Rules

#### Parameter Declaration Pattern
```powershell
# ✅ CORRECT - Enhanced confirmation parameter:
function My-CheckITFunction {
    param(
        [array]$Nodes,
        [object]$Confirm = $true,  # $true, $false, or "Auto"
        [bool]$PromptUser = $true
    )
}

# ❌ WRONG - Boolean only:
[bool]$Confirm = $true  # Limits automation flexibility
```

#### Session State Management
```powershell
# ✅ CORRECT - Check and update session state:
if (-not $global:WorkflowAutoConfirm) {
    $global:WorkflowAutoConfirm = @{}
}

# Check for existing session-wide choice
if ($global:WorkflowAutoConfirm.ContainsKey('*')) {
    $shouldProceed = $global:WorkflowAutoConfirm['*']
}

# ❌ WRONG - No session awareness:
$confirm = Read-Host "Proceed? (Y/N)"  # Asks every time, no automation
```

### Data Handling Rules

#### String Interpolation
```powershell
# ✅ CORRECT - Always use $($variable):
"Processing node: $($node.Name) in group: $($node.Group)"
"Status: $($result.Status) at $((Get-Date).ToString('HH:mm:ss'))"

# ❌ WRONG - Direct variable reference:
"Processing node: $node.Name in group: $node.Group"
"Status: $result.Status at $(Get-Date -Format 'HH:mm:ss')"
```

#### DateTime Formatting
```powershell
# ✅ CORRECT - Use .ToString() method:
$timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
$dateStamp = (Get-Date).ToString("yyyy-MM-dd")

# ❌ WRONG - Get-Date -Format:
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
```

#### Null Comparisons
```powershell
# ✅ CORRECT - Null on left:
if ($null -eq $variable) { }
if ($null -ne $result) { }

# ❌ WRONG - Variable on left:
if ($variable -eq $null) { }
if ($result -ne $null) { }
```

#### Array Safety
```powershell
# ✅ CORRECT - Ensure array output:
$results = @(SomeFunction)
$nodeNames = @($nodes | ForEach-Object { $_.Node })

# ❌ WRONG - Unsafe array assumptions:
$results = SomeFunction
$results[0]  # May fail if $results is null or single object
```

### Node Management Rules

#### Global Variables
```powershell
# ✅ CORRECT - Use NodeList function:
NodeList -Action Add -Nodes $newNodes -PromptUser:$false
NodeList -Action Update -Nodes @($updatedNode) -PromptUser:$false

# ❌ WRONG - Direct manipulation:
$global:nodeList += $newNode
$global:nodeList | Where-Object { $_.Node -eq "PC123" } | ForEach-Object { $_.Status = "Complete" }
```

#### Node Updates
```powershell
# ✅ CORRECT - Use New-NodeObject (preserves Passman status):
$updatedNode = New-NodeObject @{ Node = "PC123"; Group = "LabA"; Status = "Complete" }
NodeList -Action Update -Nodes @($updatedNode) -PromptUser:$false

# ❌ WRONG - Direct property assignment:
$node.Passman = $false  # Loses existing Passman status
$node.Status = "Complete"  # Not normalized
```

#### Case Sensitivity
```powershell
# ✅ CORRECT - Case-insensitive comparisons:
$existingNode = $global:nodeList | Where-Object { $_.Node.ToUpper() -eq $targetNode.ToUpper() }

# ❌ WRONG - Case-sensitive comparison:
$existingNode = $global:nodeList | Where-Object { $_.Node -eq $targetNode }
```

### GUI Compatibility Rules

#### JSON Import
```powershell
# ✅ CORRECT - Use -AsHashtable for GUI compatibility:
$data = Get-Content "file.json" | ConvertFrom-Json -AsHashtable

# ❌ WRONG - Default JSON import:
$data = Get-Content "file.json" | ConvertFrom-Json  # Creates PSCustomObject, not hashtable
```

#### Progress Reporting
```powershell
# ✅ CORRECT - No duplicate parameters:
Write-Progress -Activity "Processing" -Status "Working..." -PercentComplete 50

# ❌ WRONG - Duplicate parameters:
Write-Progress -Activity "Processing" -Status "Working..." -Status "Different status..."
```

#### CLI vs GUI Calls
```powershell
# ✅ CORRECT - GUI-safe function calls:
$results = Get-Software -Nodes $nodes -PromptUser:$false
NodeList -Action Add -Nodes $newNodes -PromptUser:$false

# ❌ WRONG - Blocks GUI:
Read-Host "Enter value"  # Use: if ($PromptUser) { Read-Host "Enter value" }
```

### Code Quality Rules

#### Line Continuation
```powershell
# ✅ CORRECT - Single line or parameter splatting:
$results = SomeFunction -Parameter1 $value1 -Parameter2 $value2 -Parameter3 $value3

# ✅ CORRECT - Parameter splatting for complex calls:
$params = @{
    Parameter1 = $value1
    Parameter2 = $value2
    Parameter3 = $value3
}
$results = SomeFunction @params

# ❌ WRONG - Fragile backtick continuation:
$results = SomeFunction `
    -Parameter1 $value1 `
    -Parameter2 $value2 `  # Breaks with trailing whitespace
    -Parameter3 $value3
```

#### Automatic Variables
```powershell
# ✅ CORRECT - Use custom variables:
$customError = "Custom error message"
$userInput = Read-Host "Enter value"
$matchResults = $text -match $pattern

# ❌ WRONG - Using PowerShell automatic variables:
$error = "Custom error"      # Use $customError
$input = "User input"        # Use $userInput  
$matches = $customMatches    # Use $matchResults
```

#### Excel Dependencies
```powershell
# ✅ CORRECT - Use CheckIT built-in:
Export-ToExcel -Sheets $data -Title "Report"

# ❌ WRONG - External module dependency:
Export-Excel -Path $file  # Requires ImportExcel module
```

## 🛠️ Enhanced Development Workflow

### Step 1: Template-Driven Analysis

**Before writing ANY new function:**

```powershell
# 1. Check existing command templates
Manage-Templates -Type Command -Action List

# 2. Search for development patterns
Manage-Templates -Type Codebase -Action Search

# 3. Test existing workflow capabilities
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Test" -ExportToExcel

# 4. Only proceed if templates can't solve the requirement
```

### Step 2: Get the Complete Function Template

**Always start with the proven template:**

```powershell
# Get the complete function template
Manage-Templates -Type Codebase -Action Preview
# Select "CheckIT Function Template"
```

**This template provides:**
- Enhanced confirmation pattern implementation
- Process-Parallel integration with -UseCredentials
- Correct reporting pattern (separate task logging and business reporting)
- Error handling and status updates
- CLI/GUI compatibility
- All required CheckIT patterns

### Step 3: Enhanced Function Structure Template

```powershell
function New-CheckITFunction {
    <#
    .SYNOPSIS
        Brief one-line description of what the function does.
    .DESCRIPTION
        Detailed explanation including:
        - What it accomplishes
        - How it integrates with CheckIT patterns
        - CLI vs GUI compatibility notes
        - Enhanced confirmation behavior
    .PARAMETER Nodes
        Array of node objects or names
    .PARAMETER Confirm
        Controls execution confirmation:
        - $true (default): Prompts for confirmation before execution
        - $false: Executes immediately without confirmation
        - "Auto": Uses session-wide confirmation preferences
    .PARAMETER PromptUser
        CLI vs GUI mode control
    .PARAMETER StatusCallback
        GUI progress reporting
    .EXAMPLE
        # CLI usage with standard confirmation
        New-CheckITFunction -Nodes $nodes -PromptUser:$true
    .EXAMPLE  
        # Automation usage
        New-CheckITFunction -Nodes $nodes -Confirm:$false -PromptUser:$false
    .EXAMPLE
        # Smart session automation
        New-CheckITFunction -Nodes $nodes -Confirm "Auto"
    #>
    param(
        [Parameter(Mandatory)]
        [object[]]$Nodes,
        [object]$Confirm = $true,  # Enhanced confirmation pattern
        [bool]$PromptUser = $true,
        [scriptblock]$StatusCallback
    )

    # ====================================================================
    # INITIALIZATION & VALIDATION PHASE
    # ====================================================================
    $user = $env:USERNAME
    $timestamp = Get-Date
    $function = "New-CheckITFunction"
    
    # 1. ✅ ALWAYS: Ensure credentials
    Ensure-GlobalCredStore -PromptUser:$PromptUser
    
    # 2. ✅ ALWAYS: Normalize nodes using standard pattern
    $nodeObjects = @()
    foreach ($node in $Nodes) {
        if ($node -is [string]) {
            $nodeObjects += New-NodeObject $node
        } else {
            $nodeObjects += New-NodeObject $node
        }
    }
    
    if ($nodeObjects.Count -eq 0) {
        if ($PromptUser) { Write-Color "No valid nodes provided." -Color Red }
        return @()
    }
    
    # ====================================================================
    # ENHANCED CONFIRMATION PATTERN IMPLEMENTATION
    # ====================================================================
    if ($PromptUser) {
        Write-Color "`n=== FUNCTION EXECUTION: $($function) ===" -Color Green
        Write-Color "Target Nodes: $($nodeObjects.Count)" -Color White
        
        $shouldProceed = $false
        
        if ($Confirm -eq $false) {
            $shouldProceed = $true
            Write-Color "Auto-executing (confirmation disabled)..." -Color Yellow
        }
        elseif ($Confirm -eq "Auto") {
            # Check for session-wide workflow preferences
            if (-not $global:WorkflowAutoConfirm) {
                $global:WorkflowAutoConfirm = @{}
            }
            
            if ($global:WorkflowAutoConfirm.ContainsKey('*')) {
                $shouldProceed = $global:WorkflowAutoConfirm['*']
                if ($shouldProceed) {
                    Write-Color "Auto-proceeding (session-wide Yes to All)..." -Color Yellow
                } else {
                    Write-Color "Auto-cancelled (session-wide No to All)." -Color Yellow
                    return
                }
            } else {
                # Standard confirmation for Auto mode
                $confirm = Read-Host "`nProceed with execution? (Y/N/YA=Yes to All/NA=No to All)"
                
                switch ($confirm.ToUpper()) {
                    { $_ -match '^(Y|YES)$' } { $shouldProceed = $true }
                    { $_ -match '^(YA|YESALL|YES.*ALL)$' } {
                        $shouldProceed = $true
                        $global:WorkflowAutoConfirm['*'] = $true
                        Write-Color "Will auto-proceed with all functions for this session." -Color Green
                    }
                    { $_ -match '^(NA|NOALL|NO.*ALL)$' } {
                        $shouldProceed = $false
                        $global:WorkflowAutoConfirm['*'] = $false
                        Write-Color "Will auto-cancel all functions for this session." -Color Yellow
                    }
                    default {
                        $shouldProceed = $false
                    }
                }
            }
        }
        else {
            # Traditional confirmation with session-wide awareness
            if ($global:WorkflowAutoConfirm -and $global:WorkflowAutoConfirm.ContainsKey('*')) {
                $shouldProceed = $global:WorkflowAutoConfirm['*']
                if ($shouldProceed) {
                    Write-Color "Auto-proceeding (session-wide Yes to All)..." -Color Yellow
                } else {
                    Write-Color "Auto-cancelled (session-wide No to All)." -Color Yellow
                    return
                }
            } else {
                $confirm = Read-Host "`nProceed with execution? (Y/N)"
                $shouldProceed = ($confirm -match '^(y|yes)$')
            }
        }
        
        if (-not $shouldProceed) {
            Write-Color "Function execution cancelled." -Color Yellow
            return
        }
    } else {
        # GUI mode: respect Confirm parameter directly
        if ($Confirm -eq $false) {
            # Proceed without confirmation
        } else {
            # For GUI, assume confirmation handled by calling code
        }
    }
    
    # 3. ✅ ALWAYS: Set TaskStatus for progress tracking
    $nodeNames = $nodeObjects | ForEach-Object { $_.Node }
    foreach ($node in $global:nodeList) {
        if ($nodeNames -contains $node.Node) {
            $node.TaskStatus = "Processing"
        }
    }
    
    # ====================================================================
    # MAIN PROCESSING PHASE
    # ====================================================================
    
    # 4. ✅ YOUR PROCESS-PARALLEL SCRIPTBLOCK
    $yourScriptBlock = {
        param($node, $customParam1, $customParam2, $credential, $fqdn)
        
        $startTime = Get-Date
        $nodeName = if ($node -is [string]) { $node } else { $node.Node }
        
        try {
            # Your core logic here
            # $credential and $fqdn are automatically available
            
            $result = [PSCustomObject]@{
                Node = $nodeName
                # Your result properties
                Status = "Success"
                StartTime = $startTime
                EndTime = Get-Date
            }
            
            return $result
            
        } catch {
            return [PSCustomObject]@{
                Node = $nodeName
                Status = "Failed"
                Error = $_.Exception.Message
                StartTime = $startTime
                EndTime = Get-Date
            }
        }
    }
    
    # 5. ✅ ALWAYS: Use Process-Parallel with -UseCredentials
    $parallelResults = $nodeObjects | Process-Parallel -ScriptBlock $yourScriptBlock -ArgumentList @($param1, $param2) -MaxParallel 8 -StatusCallback $StatusCallback -UseCredentials
    
    # ====================================================================
    # RESULTS & CLEANUP PHASE
    # ====================================================================
    
    # 6. ✅ ALWAYS: Process results and separate errors
    $allResults = @()
    $nodeErrors = @()
    
    foreach ($result in $parallelResults.Results) {
        if ($result -and $result.PSObject.Properties['Node']) {
            if ($result.PSObject.Properties['Error'] -and $result.Error) {
                $nodeErrors += New-ErrorRecord -Node $result.Node -Error $result.Error -Function $function
            } else {
                $allResults += $result
            }
        }
    }
    
    # 7. ✅ ALWAYS: Update NodeList status
    foreach ($nodeObj in $nodeObjects) {
        $nodeName = $nodeObj.Node
        $nodeResults = $allResults | Where-Object { $_.Node -eq $nodeName }
        $nodeError = $nodeErrors | Where-Object { $_.Node -eq $nodeName }
        
        if ($nodeError) {
            $updateObj = New-NodeObject @{ Node = $nodeName; TaskStatus = 'Error'; LastError = $nodeError.Error }
        } elseif ($nodeResults.Count -gt 0) {
            $updateObj = New-NodeObject @{ Node = $nodeName; TaskStatus = 'Complete'; LastError = $null }
        } else {
            $updateObj = New-NodeObject @{ Node = $nodeName; TaskStatus = 'No Data'; LastError = $null }
        }
        
        NodeList -Action Update -Nodes @($updateObj) -CreateIfMissing:$false -PromptUser:$false | Out-Null
    }
    
    # 8. ✅ ALWAYS: Clear TaskStatus when done
    foreach ($node in $global:nodeList) {
        if ($nodeNames -contains $node.Node) {
            $node.TaskStatus = $null
        }
    }
    
    # 9. ✅ CRITICAL: SEPARATE Task Logging and Business Reporting
    
    # Task logging (audit trail) - NO automatic Set-Report
    $allResults | Write-TaskLog -Function $function -TaskParams @{ 
        # Your task parameters here
        # Note: NO "Report = $true" - prevents automatic Set-Report call
    } | Out-Null
    
    # Determine groups for business report
    $groups = $nodeObjects | ForEach-Object { $_.Group }
    $uniqueGroups = $groups | Where-Object { $_ } | Sort-Object -Unique
    $reportGroups = if ($uniqueGroups.Count -gt 1) { @('Assorted') } elseif ($uniqueGroups.Count -eq 1) { @($uniqueGroups[0]) } else { @() }
    
    # Business report (separate, clean data) - NO -Task parameter
    Set-Report -ReportName $ReportName `
        -Function $function `
        -Data $allResults `
        -Groups $reportGroups `
        -Errors $nodeErrors `
        -PromptUser:$PromptUser | Out-Null
    
    # 10. ✅ Return results
    return $allResults
}
```

### Step 4: Enhanced Testing Checklist

**Before submitting your function:**

#### Template System Integration
- [ ] Use `Manage-Templates -Type Codebase` for complete function template
- [ ] Check if existing templates can solve the requirement first
- [ ] Consider if the function should be a template instead of a full function

#### Enhanced Confirmation Implementation
- [ ] Implement three-tier confirmation: `$true`, `$false`, `"Auto"`
- [ ] Use `$global:WorkflowAutoConfirm` for session-wide automation
- [ ] Test all confirmation modes: standard, auto-execute, and smart automation
- [ ] Verify inheritance from workflow functions (no double-prompting)

#### Core CheckIT Patterns
- [ ] Use `Process-Parallel -UseCredentials` (handles ALL credential magic automatically)
- [ ] Separate task logging from business reporting (see Big 3 patterns)
- [ ] Use `New-NodeObject` for node updates (preserves Passman status)
- [ ] Test both CLI (`-PromptUser:$true`) and GUI (`-PromptUser:$false`)
- [ ] Add StatusCallback parameter for GUI progress reporting

#### Integration Testing
- [ ] Test standalone function execution
- [ ] Test integration with template workflows
- [ ] Test session-wide automation (YA/NA options)
- [ ] Verify Excel export compatibility
- [ ] Test error handling and NodeList updates

#### Module Integration
- [ ] Export functions in Export-ModuleMember when complete
- [ ] Update Ensure-Templates if adding built-in templates
- [ ] Update implementation status documentation

### Step 5: Testing Procedures

#### CLI Testing
```powershell
# Test standard confirmation
$testNodes = @("PC001", "PC002")
$results = Your-Function -Nodes $testNodes -PromptUser:$true

# Test auto-execute mode
$results = Your-Function -Nodes $testNodes -Confirm:$false

# Test smart automation mode
$results = Your-Function -Nodes $testNodes -Confirm "Auto"
```

#### GUI Testing  
```powershell
# Test GUI compatibility
$results = Your-Function -Nodes $testNodes -PromptUser:$false -StatusCallback {
    param($status) 
    Write-Host "GUI Progress: $($status.Activity) - $($status.Status)"
}

# Test data binding compatibility
$results | ConvertTo-Json -Depth 3
```

#### Template Workflow Integration Testing
```powershell
# Test workflow integration (if applicable)
Invoke-TemplateWorkflow -Templates @("Your-Function") -Nodes $testNodes -Confirm "Auto"

# Verify no double-prompting occurs
# Verify session-wide automation works correctly
```

## 📝 Enhanced Code Documentation Standards

### Comment Architecture Levels

#### 1. Major Section Headers (80-character width)
```powershell
# ====================================================================
# ENHANCED CONFIRMATION PATTERN IMPLEMENTATION
# ====================================================================
```

#### 2. Subsection Headers (60-character width) 
```powershell
# ========================================================
# SESSION-WIDE AUTOMATION STATE MANAGEMENT
# ========================================================
```

#### 3. Code Block Comments (Explain the "Why")
```powershell
# Check for session-wide workflow automation preferences
# This prevents double-prompting when user selects "Yes to All"
if ($global:WorkflowAutoConfirm -and $global:WorkflowAutoConfirm.ContainsKey('*')) {
    $shouldProceed = $global:WorkflowAutoConfirm['*']
    Write-Color "Auto-proceeding (session-wide Yes to All)..." -Color Yellow
}
```

#### 4. Enhanced Confirmation Documentation
```powershell
# Three-tier confirmation system for automation-friendly workflows:
# - $true: Standard confirmation (prompts every time)
# - $false: Auto-execute (no prompts, immediate execution)
# - "Auto": Smart automation (prompts once, remembers choice for session)

switch ($confirm.ToUpper()) {
    { $_ -match '^(YA|YESALL|YES.*ALL)$' } {
        $shouldProceed = $true
        $global:WorkflowAutoConfirm['*'] = $true
        Write-Color "Will auto-proceed with all functions for this session." -Color Green
    }
    # ... other cases
}
```

### Variable Documentation Patterns

#### Enhanced Confirmation Variables
```powershell
# Enhanced Confirmation State Management
$shouldProceed = $false                    # Execution gate for confirmation system
$global:WorkflowAutoConfirm = @{}         # Session-wide automation preferences
$confirm = ""                             # User input for confirmation prompts

# Template Workflow Integration
$templateConfirm = $false                 # Inherited confirmation setting from workflow
$executedTemplates = @()                  # Successfully executed template names
$workflowResults = @{}                    # Template results for Excel export
```

## 🏗️ Enhanced Module Structure & Organization

### Template System Integration

**New Template-Related Regions:**
```powershell
#region Template System & Workflows
# Template command execution, workflow orchestration, template management
# Includes: Invoke-TemplateCommand, Invoke-TemplateWorkflow, Manage-Templates, Ensure-Templates
#endregion

#region Enhanced User Interaction
# Enhanced confirmation patterns, user preferences, automation support
# Includes: Enhanced confirmation implementation, session automation
#endregion
```

### Function Placement Guidelines

#### Where to Put New Functions
- **Template Functions**: #region Template System & Workflows
- **Enhanced Confirmation Functions**: #region Enhanced User Interaction  
- **Data Collection**: #region Main Tools
- **Remote Management**: #region Main Tools or #region Diagnostics
- **SCCM Integration**: #region SCCM Functions
- **Reporting/Export**: #region Logging or #region Excel Functions
- **Node Management**: #region Node Management
- **Helper Functions**: #region Utility Functions

#### Enhanced Naming Conventions
- **Template Functions**: `Invoke-Template*`, `Manage-Templates`
- **Workflow Functions**: `*-Workflow`, `*-TemplateWorkflow`
- **Enhanced Confirmation**: Include `-Confirm` parameter where appropriate
- **Verb-Noun**: Follow PowerShell conventions
- **Get-**: Data retrieval functions
- **Set-**: Data modification functions  
- **Test-**: Validation/connectivity functions
- **Invoke-**: Action/execution functions
- **New-**: Object creation functions
- **Export-/Import-**: Data transfer functions

## 💡 Advanced Development Patterns

### Template vs Function Decision Matrix

```powershell
# Use Templates When:
# - Standard remote commands that can be reused
# - Testing procedures with manual/automated steps
# - Code patterns for development guidance
# - Operations that benefit from workflow orchestration

# Use Functions When:
# - Complex logic that can't be expressed in templates
# - Integration with CheckIT infrastructure (NodeList, CredStore, etc.)
# - Multi-step operations requiring state management
# - GUI integration requiring sophisticated data binding
```

### Enhanced Error Handling Pattern

```powershell
# Session-aware error handling for template workflows
try {
    $result = Invoke-TemplateCommand -TemplateName $templateName -Confirm:$templateConfirm
    if ($result -and $result.CleanResults) {
        $executedTemplates += $templateName
        $workflowResults[$templateName] = $result.CleanResults
    } else {
        Write-Color "Template '$templateName' execution failed or returned no results." -Color Yellow
    }
} catch {
    $errorMsg = "Template '$templateName' error: $($_.Exception.Message)"
    Write-Color $errorMsg -Color Red
    
    # Check if session-wide automation should continue or stop
    if ($global:WorkflowAutoConfirm -and $global:WorkflowAutoConfirm.ContainsKey('*')) {
        if ($global:WorkflowAutoConfirm['*']) {
            Write-Color "Continuing with remaining templates (session automation)..." -Color Yellow
        } else {
            Write-Color "Stopping workflow (session automation: No to All)." -Color Yellow
            break
        }
    }
}
```

### Progressive Enhancement Pattern

```powershell
# ✅ CORRECT: Small, targeted enhancements
# Start with basic functionality, add enhanced confirmation later

# Version 1: Basic function
function Get-NodeInfo {
    param($Nodes, [bool]$PromptUser = $true)
    # Basic implementation
}

# Version 2: Add enhanced confirmation
function Get-NodeInfo {
    param($Nodes, [object]$Confirm = $true, [bool]$PromptUser = $true)
    # Add confirmation logic while preserving all existing functionality
}

# Version 3: Add template integration
# Move core logic to template, make function a wrapper

# ❌ WRONG: Large refactors
# Rewriting entire function architecture
# Changing fundamental behavior
# Breaking existing integrations
```

## 🧪 Comprehensive Testing & Validation

### Template Integration Testing
```powershell
# Test template command execution
Invoke-TemplateCommand -Nodes @("PC001") -TemplateName "Get OS Info" -Confirm:$false

# Test template workflow with multiple templates
Invoke-TemplateWorkflow -Nodes @("PC001") -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Test" -ExportToExcel

# Test session automation
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm "Auto"
# Select "YA" (Yes to All)
Invoke-TemplateCommand -TemplateName "Check Disk Space" -Confirm "Auto"
# Should auto-proceed without prompting
```

### Enhanced Confirmation Testing
```powershell
# Test all confirmation modes
Your-Function -Nodes $nodes -Confirm:$true    # Standard prompting
Your-Function -Nodes $nodes -Confirm:$false   # Auto-execute
Your-Function -Nodes $nodes -Confirm "Auto"   # Smart automation

# Test session inheritance
Invoke-TemplateWorkflow -Confirm "Auto"  # Select "YA"
Your-Function -Nodes $nodes -Confirm "Auto"  # Should auto-proceed
```

### Regression Testing Checklist
```powershell
# After any enhancement, verify:

# 1. Original functionality still works
Get-Software -Nodes $nodes -Mode All

# 2. Enhanced functionality works  
Get-Software -Nodes $nodes -Mode All -Confirm:$false

# 3. Template integration works
Invoke-TemplateWorkflow -Templates @("List Installed Apps") -Confirm "Auto"

# 4. Session automation works
# (Set session to "Yes to All", verify subsequent calls auto-proceed)

# 5. GUI compatibility maintained
$results = Get-Software -Nodes $nodes -PromptUser:$false

# 6. Excel export still works
Export-ToExcel -InputObject $results -Title "Test"
```

## 📋 Development Anti-Patterns to Avoid

### ❌ Template Anti-Patterns
```powershell
# ❌ WRONG: Building functions without checking templates first
function Get-SystemInfo {
    # Don't build this - use existing "Get OS Info" template
}

# ❌ WRONG: Bypassing template workflows for multiple operations
Invoke-TemplateCommand -TemplateName "Get OS Info"
Invoke-TemplateCommand -TemplateName "Check Disk Space"
# Use: Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -ExportToExcel

# ❌ WRONG: Manual Excel sheet creation
$sheets = @{}
$sheets["OSInfo"] = $osResults
$sheets["DiskInfo"] = $diskResults
# Use: Template workflow with -ExportToExcel (handles sheet creation automatically)
```

### ❌ Confirmation Anti-Patterns
```powershell
# ❌ WRONG: Boolean-only confirmation
[bool]$Confirm = $true

# ❌ WRONG: No session awareness
Read-Host "Proceed? (Y/N)"  # Asks every time, no automation

# ❌ WRONG: Inconsistent confirmation inheritance
# Workflow sets automation, but individual functions ignore it
```

### ❌ Integration Anti-Patterns
```powershell
# ❌ WRONG: Direct global manipulation
$global:nodeList += $newNode
$global:Reports['Reports'] += $result

# ❌ WRONG: Mixed reporting concerns
Set-Report -Task -TaskParams @{...}  # Causes double reporting

# ❌ WRONG: Manual credential handling in new functions
$cred = Get-Credential  # Use Process-Parallel -UseCredentials
```

---

📖 **Documentation Index**
- [AI Assistant Guide](assistance-guide.md) - AI-specific development guidelines and collaboration patterns
- [API Reference](api-reference.md) - Complete function library with enhanced template system
- [Troubleshooting](troubleshooting.md) - Technical solutions and anti-patterns
- [Implementation Status](implementation-status.md) - Current completion status including template system
- [Main README](../README.md) - Project overview and quick start

**Last Updated**: 2025-06-09 | **Enhanced**: Template workflow system and enhanced confirmation patterns

---