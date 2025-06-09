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

### 2. Progress Pattern: CLI/GUI Compatible Progress Reporting

**The Problem:** Progress reporting needs to work in both CLI and GUI environments without conflicts.

**The Solution:** Conditional progress reporting with StatusCallback support:

```powershell
# ✅ CORRECT - CLI/GUI compatible:
if ($StatusCallback) {
    & $StatusCallback @{
        Activity = "Processing items"
        Status = "Item $($i+1) of $($total): $($item.Name)"
        PercentComplete = [math]::Round(($i+1) / $total * 100, 1)
    }
} elseif ($PromptUser) {
    Write-Progress -Activity "Processing items" `
        -Status "Item $($i+1) of $($total): $($item.Name)" `
        -PercentComplete ([math]::Round(($i+1) / $total * 100, 1))
}

# ❌ WRONG - Duplicate parameters:
Update-Progress -Status "Processing..." -Current $i -Total $total `
    -Status "Different status..." -Current $i -Total $total  # Duplicate parameter
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

## 🚨 Critical Rules & Syntax

### Module Structure Rules

#### Module Load Order
```powershell
# ✅ CORRECT - At end of module:
Export-ModuleMember -Function @(
    'Function1', 'Function2', 'Function3'
)

# Initialize globals AFTER exports (LAST line of module)
Ensure-CheckITGlobals

# ❌ WRONG - Globals before exports:
Ensure-CheckITGlobals
Export-ModuleMember -Function @('Function1')
```

#### Function Export Requirements
```powershell
# ✅ CORRECT - Add ALL implemented functions:
Export-ModuleMember -Function @(
    'Get-Software', 'Get-CCMPackages', 'Test-NodeConnection',
    'Your-New-Function'  # Always add new functions here
)

# ❌ WRONG - Missing from exports:
function Your-New-Function { ... }
# No corresponding entry in Export-ModuleMember = function won't be available
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

## 🛠️ Development Workflow

### Step 1: Get the Complete Function Template

**Always start with the template system:**
```powershell
# Get the complete function template
Manage-Templates -Type Codebase -Action Preview
# Select "CheckIT Function Template"
```

**This provides you with:**
- Complete function structure with all required parameters
- Proper initialization and credential handling
- Process-Parallel integration with -UseCredentials
- Correct reporting pattern implementation
- Error handling and status updates
- CLI/GUI compatibility

### Step 2: Function Structure Template

**Every CheckIT function follows this pattern:**
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
        - Any special considerations
    .PARAMETER Nodes
        Array of node objects or names
    .PARAMETER PromptUser
        CLI vs GUI mode control
    .PARAMETER StatusCallback
        GUI progress reporting
    .EXAMPLE
        # CLI usage
        New-CheckITFunction -Nodes $nodes -PromptUser:$true
    .EXAMPLE  
        # GUI usage
        $results = New-CheckITFunction -Nodes $nodes -PromptUser:$false -StatusCallback $callback
    #>
    param(
        [Parameter(Mandatory)]
        [object[]]$Nodes,
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

### Step 3: Testing Checklist

**Before submitting your function:**
- [ ] Use `Manage-Templates -Type Codebase` for complete function template
- [ ] Use `Process-Parallel -UseCredentials` (handles ALL credential magic automatically)
- [ ] Separate task logging from business reporting (see Big 3 patterns)
- [ ] Use `New-NodeObject` for node updates (preserves Passman status)
- [ ] Test both CLI (`-PromptUser:$true`) and GUI (`-PromptUser:$false`)
- [ ] Add StatusCallback parameter for GUI progress reporting
- [ ] Avoid duplicate Update-Progress calls
- [ ] Export functions in Export-ModuleMember when complete
- [ ] Update implementation status when complete

### Step 4: Testing Procedures

#### CLI Testing
```powershell
# Test with sample nodes
$testNodes = @("PC001", "PC002")
$results = Your-Function -Nodes $testNodes -PromptUser:$true

# Verify output format
$results | Format-Table
$results | Export-ToExcel -Title "Test Results"
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

#### Integration Testing
```powershell
# Test with real NodeList
NodeList -Action Add -Nodes $testNodes
$results = Your-Function -Nodes $global:nodeList

# Verify NodeList updates
$global:nodeList | Where-Object { $testNodes -contains $_.Node } | Format-Table
```

## 📝 Code Documentation Standards

### Comment Architecture Levels

#### 1. Major Section Headers (80-character width)
```powershell
# ====================================================================
# INITIALIZATION & SETUP PHASE
# ====================================================================
```

#### 2. Subsection Headers (60-character width) 
```powershell
# ========================================================
# ENHANCED PROGRESS REPORTING WITH NODE TRACKING
# ========================================================
```

#### 3. Inline Documentation (40-character width)
```powershell
# ================================================================
# JOB SLOT MANAGEMENT - Wait for available slots
# ================================================================
```

#### 4. Code Block Comments (Explain the "Why")
```powershell
# Pre-resolve all credentials if requested and no map provided
# This prevents credential lookup delays during parallel execution
if ($UseCredentials -and $CredentialMap.Count -eq 0) {
    # Build credential map for all nodes
    foreach ($obj in $allInput) {
        # Extract node name from input object (supports strings and objects)
        $nodeName = if ($obj -is [string]) { $obj } else { $obj.Node }
```

#### 5. Developer Guidance Comments
```powershell
# ========================================================================
# PIPELINE PROCESSING BLOCKS (PowerShell Pattern)
# ========================================================================
begin {
    # Initialize collections for job management and result aggregation
    $jobs = @()              # Active job tracking with metadata
    $results = @()           # Successful results collection
    $errors = @()            # Error collection for troubleshooting
    $allInput = @()          # Accumulated pipeline input
}
```

### Variable Documentation Patterns

#### Variable Purpose Documentation
```powershell
# Collection Management
$jobs = @()              # Active job tracking with metadata
$results = @()           # Successful results collection  
$errors = @()            # Error collection for troubleshooting
$allInput = @()          # Accumulated pipeline input

# State Tracking
$completedCount = $results.Count + $errors.Count + 1    # Current progress counter
$nodeNameFromJob = "Node $($completedCount)"            # Display name for progress
$wasValid = $true        # Tracks if credential store was initially valid

# Configuration
$maxRetries = 3          # Maximum connection retry attempts
$timeoutSeconds = 30     # Per-operation timeout limit
```

#### Algorithm Documentation
```powershell
# ============================================================
# INTELLIGENT ERROR DETECTION & CLASSIFICATION
# ============================================================
# Determine if output represents an actual error or just non-JSON data
$isError = $false

if ([string]::IsNullOrWhiteSpace($output)) {
    $isError = $true
    Write-Verbose "Process-Parallel: Empty output detected - treating as error"
} elseif ($output -match '(?i)(error|exception|failed|cannot|unable|timeout|access.*denied)') {
    $isError = $true
    Write-Verbose "Process-Parallel: Error keywords detected in output"
}
```

## 🏗️ Module Structure & Organization

### Region Organization
The module is organized into logical regions for maintainability:

```powershell
#region Global Variables
# Module-level state and preferences
#endregion

#region Utility Functions  
# General helpers used by multiple functions
#endregion

#region Global Store Management
# NodeList, Reports, CredStore access functions
#endregion

#region CheckIT Data Management
# Save/load all CheckIT data to/from disk
#endregion

#region Node Management
# Add, remove, update, preview, and sync nodes
#endregion

#region Active Directory Tools
# AD integration, OU selection, membership
#endregion

#region Passman Credential Retrieval
# Credential management and Passman integration
#endregion

#region Main Tools
# Core user-facing functionality
#endregion

#region SCCM Functions
# Package management and deployment
#endregion

#region Testing
# Dynamic test templates and execution
#endregion

#region Diagnostics
# System tools, connectivity tests, hardware stats
#endregion

#region Analysis
# Software sampling and statistical analysis
#endregion

#region Logging
# Task logging, error handling, report building
#endregion

#region Excel Functions
# Excel export/import, pivot tables
#endregion

# Export ALL implemented functions
Export-ModuleMember -Function @(
    'Function1', 'Function2', 'Function3'
)

# Initialize globals AFTER exports (LAST line of module)
Ensure-CheckITGlobals
```

### Function Placement Guidelines

#### Where to Put New Functions
- **Data Collection**: #region Main Tools
- **Remote Management**: #region Main Tools or #region Diagnostics
- **SCCM Integration**: #region SCCM Functions
- **Reporting/Export**: #region Logging or #region Excel Functions
- **Node Management**: #region Node Management
- **Helper Functions**: #region Utility Functions

#### Naming Conventions
- **Verb-Noun**: Follow PowerShell conventions
- **Get-**: Data retrieval functions
- **Set-**: Data modification functions  
- **Test-**: Validation/connectivity functions
- **Invoke-**: Action/execution functions
- **New-**: Object creation functions
- **Export-/Import-**: Data transfer functions

---

📖 **Documentation Index**
- [AI Assistant Guide](assistance-guide.md) - AI-specific development guidelines
- [Troubleshooting](troubleshooting.md) - Technical solutions and anti-patterns
- [API Reference](api-reference.md) - Function status and usage examples
- [Implementation Status](implementation-status.md) - Current completion status
- [Main README](../README.md) - Project overview and quick start

---
