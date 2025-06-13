---
title: Troubleshooting Guide
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

# CheckIT Troubleshooting Guide

> Solutions, fixes, and anti-patterns for CheckIT-Core development and deployment

## 🔥 Instant Troubleshooting Table

| Problem | Solution | Common Cause |
|---------|----------|--------------|
| "Function not found" | Check Export-ModuleMember, reload module | Function not exported |
| **Command syntax errors** | **Check for backticks with trailing whitespace - use single line or splatting** | **Fragile line continuation** |
| **Template workflow double-prompting** | **Check confirmation inheritance in workflow functions** | **Missing confirmation parameter passing** |
| **Excel export creates empty sheets** | **Verify template results have actual data, not just status messages** | **Template returns verbose output instead of clean data** |
| **Session automation not working** | **Check $global:WorkflowAutoConfirm state and "Auto" parameter usage** | **Mixed confirmation patterns or missing session state** |
| Progress bar issues | Look for duplicate Update-Progress calls | Mixed progress approaches |
| Excel export fails | Use Export-ToExcel not Export-Excel | Wrong module dependency |
| Credential problems | Use Process-Parallel -UseCredentials | Manual credential handling |
| GUI hangs | Add `if ($PromptUser)` around Read-Host calls | CLI-only code in GUI |
| Double reporting | Separate Write-TaskLog and Set-Report calls | Mixing task and business reporting |
| Node properties lost | Use New-NodeObject for updates | Direct property assignment |
| Array errors | Wrap uncertain results in @() | Unsafe array assumptions |
| String interpolation fails | Use $($variable) not $variable | Direct variable reference |
| DateTime formatting issues | Use (Get-Date).ToString() not Get-Date -Format | Wrong DateTime method |
| Jobs hanging at 8/47 nodes | Use robust job completion detection | Simple HasExited check only |

## 🆕 Enhanced Template System Troubleshooting

### Template Workflow Issues

#### Problem: Templates Not Found in Workflow
```powershell
# ❌ Error: "Template 'Get OS Info' not found in Command or Test templates..."
Invoke-TemplateWorkflow -Templates @("Get OS Info") -WorkflowName "Test"

# ✅ Solution: Check template availability first
Manage-Templates -Type Command -Action List
Manage-Templates -Type Test -Action List

# ✅ Verify template names match exactly (case-sensitive)
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Test"
```

#### Problem: Double-Prompting in Template Workflows
```powershell
# ❌ Wrong: User gets prompted twice (workflow + individual template)
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm:$true
# User selects "Yes to All" but still gets prompted for individual template

# ✅ Solution: Check confirmation inheritance
if ($isCommandTemplate) {
    # Inherit workflow confirmation settings to prevent double-prompting
    $templateConfirm = if ($Confirm -eq $false -or $global:WorkflowAutoConfirm.ContainsKey('*')) { 
        $false  # Inherit automation setting
    } else { 
        $true   # Use standard confirmation
    }
    $result = Invoke-TemplateCommand -TemplateName $templateName -Confirm:$templateConfirm
}
```

#### Problem: Excel Export Creates Empty Sheets
```powershell
# ❌ Problem: Template returns verbose output instead of clean data
# Results in Excel sheets with command output rather than structured data

# ✅ Solution: Verify template execution returns clean results
$templateResult = Invoke-TemplateCommand -TemplateName "Get OS Info" -Confirm:$false
Write-Host "Result type: $($templateResult.GetType().Name)"
Write-Host "Has CleanResults: $($templateResult.PSObject.Properties['CleanResults'] -ne $null)"

# ✅ Check that workflowResults contains actual data
if ($result -and $result.CleanResults) {
    $workflowResults[$templateName] = $result.CleanResults
} else {
    Write-Color "Template '$templateName' returned no clean results" -Color Yellow
}
```

### Enhanced Confirmation System Issues

#### Problem: Session Automation Not Working
```powershell
# ❌ Problem: User selects "Yes to All" but subsequent operations still prompt

# ✅ Diagnostic: Check global workflow state
if ($global:WorkflowAutoConfirm) {
    Write-Host "Session state: $($global:WorkflowAutoConfirm | ConvertTo-Json)"
} else {
    Write-Host "No global workflow confirmation state found"
}

# ✅ Solution: Initialize session state properly
if (-not $global:WorkflowAutoConfirm) {
    $global:WorkflowAutoConfirm = @{}
}

# ✅ Check for session-wide automation
if ($global:WorkflowAutoConfirm.ContainsKey('*')) {
    $shouldProceed = $global:WorkflowAutoConfirm['*']
    Write-Host "Using session-wide setting: $shouldProceed"
}
```

#### Problem: Mixed Confirmation Patterns
```powershell
# ❌ Wrong: Inconsistent confirmation parameter types
function My-Function {
    param([bool]$Confirm = $true)  # Only supports true/false
}

# ✅ Correct: Enhanced confirmation pattern
function My-Function {
    param([object]$Confirm = $true)  # Supports $true, $false, "Auto"
    
    if ($Confirm -eq $false) {
        $shouldProceed = $true
    } elseif ($Confirm -eq "Auto") {
        # Check session-wide preferences
    } else {
        # Traditional confirmation
    }
}
```

### Template Management Issues

#### Problem: Built-in Templates Missing
```powershell
# ❌ Error: Manage-Templates shows empty lists

# ✅ Diagnostic: Check if templates are loaded
Ensure-Templates -Force
Write-Host "Command templates: $($global:Reports['Templates']['Command'].Count)"
Write-Host "Test templates: $($global:Reports['Templates']['Test'].Count)"
Write-Host "Codebase templates: $($global:Reports['Templates']['Codebase'].Count)"

# ✅ Solution: Reload module if templates are missing
Remove-Module CheckIT-Core -Force -ErrorAction SilentlyContinue
Import-Module CheckIT-Core -Force
Ensure-Templates
```

#### Problem: Template Execution Fails with Credential Errors
```powershell
# ❌ Problem: Template uses Invoke-Command but credentials aren't available

# ✅ Diagnostic: Check credential status
Ensure-GlobalCredStore
Get-ValidCredStatus -Nodes @("PC123")

# ✅ Solution: Use Process-Parallel -UseCredentials pattern in templates
$scriptBlock = {
    param($node, $customParam, $credential, $fqdn)
    # $credential and $fqdn automatically available
    Invoke-Command -ComputerName $fqdn -Credential $credential -ScriptBlock {
        # Your template logic here
    }
}

$results = $nodes | Process-Parallel -ScriptBlock $scriptBlock -UseCredentials
```

## 🛠️ Working Solutions (Production-Tested)

### Enhanced Template Workflow Integration
**Problem:** Templates execute but Excel export combines wrong data or creates malformed sheets.

**Working Solution:**
```powershell
# ✅ Correct template workflow pattern with clean data separation:
foreach ($templateName in $Templates) {
    if ($PromptUser) {
        Write-Color "Executing template: $($templateName)" -Color Yellow
    }
    
    # Auto-detect template type
    Ensure-Templates
    $isCommandTemplate = $global:Reports['Templates']['Command'].ContainsKey($templateName)
    $isTestTemplate = $global:Reports['Templates']['Test'].ContainsKey($templateName)
    
    if ($isCommandTemplate) {
        # Execute Command template with inherited confirmation
        $templateConfirm = if ($Confirm -eq $false -or $global:WorkflowAutoConfirm.ContainsKey('*')) { 
            $false 
        } else { 
            $true 
        }
        $result = Invoke-TemplateCommand -Nodes $Nodes -TemplateName $templateName -PromptUser:$PromptUser -Confirm:$templateConfirm
        
        # Store CLEAN results for Excel export
        if ($result -and $result.CleanResults) {
            $executedTemplates += $templateName
            $workflowResults[$templateName] = $result.CleanResults
        }
    } elseif ($isTestTemplate) {
        # Execute Test template
        $result = Start-Test -TemplateName $templateName -Nodes $Nodes -PromptUser:$PromptUser
        
        if ($result) {
            # Convert test results to clean format for Excel
            $cleanResults = $result | ForEach-Object {
                [PSCustomObject]@{
                    Node = $_.Node
                    TemplateName = $templateName
                    StepName = $_.StepName
                    Status = $_.Status
                    Result = $_.Result
                    Duration = $_.Duration
                    Timestamp = $_.StartTime
                }
            }
            
            $executedTemplates += $templateName
            $workflowResults[$templateName] = $cleanResults
        }
    }
}
```

**Why This Works:**
- **Clean data separation**: Only stores CleanResults, not verbose command output
- **Confirmation inheritance**: Prevents double-prompting when "Yes to All" is selected
- **Template auto-detection**: Automatically handles Command vs Test templates
- **Excel-ready format**: Each template creates properly structured data for Excel sheets

### Session-Wide Automation Pattern
**Problem:** User selections don't persist across function calls within a workflow.

**Working Solution:**
```powershell
# ✅ Correct session automation implementation:
if ($Confirm -eq "Auto") {
    # Check for existing session-wide preferences
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
        # First time - prompt with enhanced options
        $confirm = Read-Host "Proceed? (Y/N/YA=Yes to All/NA=No to All)"
        
        switch ($confirm.ToUpper()) {
            { $_ -match '^(YA|YESALL|YES.*ALL)$' } {
                $shouldProceed = $true
                $global:WorkflowAutoConfirm['*'] = $true
                Write-Color "Will auto-proceed with all operations for this session." -Color Green
            }
            { $_ -match '^(NA|NOALL|NO.*ALL)$' } {
                $shouldProceed = $false
                $global:WorkflowAutoConfirm['*'] = $false
                Write-Color "Will auto-cancel all operations for this session." -Color Yellow
            }
            { $_ -match '^(Y|YES)$' } {
                $shouldProceed = $true
            }
            default {
                $shouldProceed = $false
            }
        }
    }
}
```

**Key Insights:**
- **Session state persistence**: `$global:WorkflowAutoConfirm` stores user choice across function calls
- **Enhanced options**: YA/NA provide session-wide automation control
- **Inheritance**: Individual functions check global state before prompting
- **Clear feedback**: User knows when automation is active

### Excel Multi-Sheet Export Strategy
**Problem:** Template workflow creates Excel files with empty sheets or mixed data types.

**Working Solution:**
```powershell
# ✅ Correct Excel export with individual template sheets + summary:
if ($ExportToExcel -and $executedTemplates.Count -gt 0) {
    if ($PromptUser) {
        Write-Color "Combining template results for Excel export..." -Color Cyan
    }
    
    # Create sheets - each template gets its own sheet
    $sheets = @{}
    
    # Individual template sheets from CLEAN data
    foreach ($templateName in $executedTemplates) {
        if ($workflowResults.ContainsKey($templateName)) {
            # Clean sheet name for Excel (max 31 chars, no special chars)
            $cleanSheetName = $templateName -replace '[^A-Za-z0-9_\-]', '_'
            if ($cleanSheetName.Length -gt 31) { 
                $cleanSheetName = $cleanSheetName.Substring(0, 31) 
            }
            
            # Use ACTUAL REPORT DATA - not intermediate processing results
            $sheets[$cleanSheetName] = $workflowResults[$templateName]
        }
    }
    
    # Summary sheet with ALL results combined
    $allResults = @()
    foreach ($templateName in $executedTemplates) {
        if ($workflowResults.ContainsKey($templateName)) {
            $allResults += $workflowResults[$templateName]
        }
    }
    if ($allResults.Count -gt 0) {
        $sheets["Summary"] = $allResults
    }
    
    # Export to Excel with multiple sheets
    $excelFile = Export-ToExcel -Sheets $sheets -Title $WorkflowName -PromptUser:$PromptUser
    
    if ($PromptUser) {
        Write-Color "📊 Workflow results exported to Excel: $($excelFile)" -Color Green
        Write-Color "Sheets created: $($sheets.Keys -join ', ')" -Color Cyan
    }
}
```

**Why This Works:**
- **Individual sheet per template**: Clear separation of template results
- **Summary sheet**: Combined view of all template data
- **Clean data only**: No verbose command output or processing messages
- **Excel-safe naming**: Sheet names comply with Excel limitations
- **Actual report data**: Uses the same data that creates individual reports

### Process-Parallel Job Management (Enhanced for Template Usage)
**Problem:** Jobs hanging during template execution with credential resolution failures.

**Working Solution:**
```powershell
# ✅ Enhanced job completion detection for template workflows:
foreach ($j in $jobs) {
    $isComplete = $false
    try {
        # Method 1: Check job state (most reliable for template execution)
        if ($j.Job.State -in @("Completed", "Failed", "Stopped")) {
            $isComplete = $true
        }
        # Method 2: Template-specific timeout (templates may take longer)
        elseif ($jobAge.TotalMinutes -gt 15) {  # Increased from 10 for templates
            Stop-Job -Job $j.Job -Force
            $isComplete = $true
            Write-Verbose "Template job timed out after 15 minutes"
        }
        # Method 3: Check if job has exited (backup)
        elseif ($j.Job.HasExited) {
            $isComplete = $true
        }
    } catch {
        # If we can't check status, assume complete for template workflow
        $isComplete = $true
        Write-Verbose "Template job status check failed, assuming complete"
    }
}

# ✅ Template-specific safety checks:
if ($done.Count -eq 0 -and $runningJobs.Count -gt 0) {
    # Template workflows may need more time for credential resolution
    Start-Sleep -Milliseconds 1000  # Increased from 500
    $forceCheck = $true
    
    # Ultimate timeout for template workflows (longer than standard operations)
    if ($overallDuration.TotalMinutes -gt 45) {  # Increased from 30
        Write-Warning "Template workflow timeout reached, forcing completion"
        break
    }
}
```

## ❌ Enhanced Anti-Patterns & Fixes

### Template System Anti-Patterns

#### Mixed Template Types in Single Function
```powershell
# ❌ WRONG: Trying to handle Command and Test templates in the same execution path
function Execute-Templates {
    foreach ($template in $templates) {
        # This doesn't work - needs type detection
        $result = Invoke-Command -ScriptBlock $template
    }
}

# ✅ CORRECT: Proper template type detection and handling
foreach ($templateName in $Templates) {
    Ensure-Templates
    $isCommandTemplate = $global:Reports['Templates']['Command'].ContainsKey($templateName)
    $isTestTemplate = $global:Reports['Templates']['Test'].ContainsKey($templateName)
    
    if ($isCommandTemplate) {
        $result = Invoke-TemplateCommand -TemplateName $templateName
    } elseif ($isTestTemplate) {
        $result = Start-Test -TemplateName $templateName
    } else {
        Write-Color "Template '$templateName' not found" -Color Red
    }
}
```

#### Confirmation Pattern Inconsistencies
```powershell
# ❌ WRONG: Mixed confirmation patterns in workflow
function Invoke-TemplateWorkflow {
    # Workflow uses enhanced confirmation
    if ($Confirm -eq "Auto") { /* session automation */ }
    
    foreach ($template in $templates) {
        # But individual templates use old confirmation - BREAKS INHERITANCE
        $result = Invoke-TemplateCommand -TemplateName $template -Confirm:$true
    }
}

# ✅ CORRECT: Consistent confirmation inheritance
foreach ($templateName in $Templates) {
    # Pass inherited confirmation setting
    $templateConfirm = if ($Confirm -eq $false -or $global:WorkflowAutoConfirm.ContainsKey('*')) { 
        $false 
    } else { 
        $true 
    }
    $result = Invoke-TemplateCommand -TemplateName $templateName -Confirm:$templateConfirm
}
```

#### Excel Export Data Mixing
```powershell
# ❌ WRONG: Mixing verbose output with business data
$workflowResults[$templateName] = $result  # Includes all verbose output

# ❌ WRONG: Artificial data batching
Build-Report -Batch $WorkflowName -Result $result

# ✅ CORRECT: Clean data separation
if ($result -and $result.CleanResults) {
    $workflowResults[$templateName] = $result.CleanResults  # Only clean business data
}

# ✅ CORRECT: Use actual report data for Excel
$sheets[$cleanSheetName] = $workflowResults[$templateName]
```

### Enhanced Confirmation Anti-Patterns
```powershell
# ❌ WRONG: Boolean-only confirmation (limits automation)
[bool]$Confirm = $true

# ❌ WRONG: No session awareness (prompts every time)
$confirm = Read-Host "Proceed? (Y/N)"
$shouldProceed = ($confirm -match '^(y|yes)$')

# ❌ WRONG: Inconsistent parameter types across functions
function Function1 { param([bool]$Confirm) }      # Boolean only
function Function2 { param([object]$Confirm) }    # Enhanced support
function Function3 { param([string]$Confirm) }    # String only

# ✅ CORRECT: Consistent enhanced confirmation pattern
function All-Functions { 
    param([object]$Confirm = $true)  # $true, $false, or "Auto"
    
    # Consistent session-aware implementation
    if ($Confirm -eq $false) {
        $shouldProceed = $true
    } elseif ($Confirm -eq "Auto") {
        # Check session state
    } else {
        # Traditional with session awareness
    }
}
```

## 🔍 Enhanced Diagnostic Techniques

### Template System Diagnostics
```powershell
# Check template availability and structure
Ensure-Templates
Write-Host "Available Command Templates:"
$global:Reports['Templates']['Command'].Keys | Sort-Object

Write-Host "Available Test Templates:"
$global:Reports['Templates']['Test'].Keys | Sort-Object

Write-Host "Available Codebase Templates:"
$global:Reports['Templates']['Codebase'].Keys | Sort-Object

# Verify specific template structure
$templateName = "Get OS Info"
if ($global:Reports['Templates']['Command'].ContainsKey($templateName)) {
    $template = $global:Reports['Templates']['Command'][$templateName]
    Write-Host "Template Command Length: $($template.Command.Length)"
    Write-Host "Template Command Preview: $($template.Command.Substring(0, [Math]::Min(100, $template.Command.Length)))"
}
```

### Enhanced Confirmation Diagnostics
```powershell
# Check session automation state
Write-Host "Global WorkflowAutoConfirm Status:"
if ($global:WorkflowAutoConfirm) {
    $global:WorkflowAutoConfirm | ConvertTo-Json
} else {
    Write-Host "Not initialized"
}

# Test confirmation inheritance
function Test-ConfirmationInheritance {
    param([object]$Confirm = $true)
    
    Write-Host "Input Confirm parameter: $Confirm (Type: $($Confirm.GetType().Name))"
    
    if ($Confirm -eq $false) {
        Write-Host "Result: Auto-execute"
    } elseif ($Confirm -eq "Auto") {
        Write-Host "Result: Check session state"
        if ($global:WorkflowAutoConfirm -and $global:WorkflowAutoConfirm.ContainsKey('*')) {
            Write-Host "Session state: $($global:WorkflowAutoConfirm['*'])"
        } else {
            Write-Host "Session state: Not set"
        }
    } else {
        Write-Host "Result: Traditional confirmation"
    }
}

# Test with different values
Test-ConfirmationInheritance -Confirm:$true
Test-ConfirmationInheritance -Confirm:$false  
Test-ConfirmationInheritance -Confirm "Auto"
```

### Template Workflow Diagnostics
```powershell
# Test complete template workflow execution
function Test-TemplateWorkflowExecution {
    param($TestNodes = @("localhost"))
    
    Write-Host "=== Template Workflow Diagnostic ===" -ForegroundColor Cyan
    
    # 1. Check templates are loaded
    Ensure-Templates
    Write-Host "Templates loaded: $($global:Reports['Templates']['Command'].Count) Command, $($global:Reports['Templates']['Test'].Count) Test"
    
    # 2. Test individual template execution
    Write-Host "`nTesting individual template execution..." -ForegroundColor Yellow
    try {
        $result = Invoke-TemplateCommand -Nodes $TestNodes -TemplateName "Get OS Info" -Confirm:$false -PromptUser:$false
        Write-Host "Individual template result type: $($result.GetType().Name)"
        Write-Host "Has CleanResults: $($result.PSObject.Properties['CleanResults'] -ne $null)"
        if ($result.CleanResults) {
            Write-Host "CleanResults count: $($result.CleanResults.Count)"
        }
    } catch {
        Write-Host "Individual template error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # 3. Test workflow execution
    Write-Host "`nTesting workflow execution..." -ForegroundColor Yellow
    try {
        $workflowResult = Invoke-TemplateWorkflow -Nodes $TestNodes -Templates @("Get OS Info") -WorkflowName "Test_Workflow" -Confirm:$false -PromptUser:$false
        Write-Host "Workflow result type: $($workflowResult.GetType().Name)"
        Write-Host "Executed templates: $($workflowResult.ExecutedTemplates -join ', ')"
        Write-Host "Template results keys: $($workflowResult.TemplateResults.Keys -join ', ')"
    } catch {
        Write-Host "Workflow error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Run the diagnostic
Test-TemplateWorkflowExecution
```

## 🚨 Emergency Fixes

### Template System Recovery
```powershell
# Emergency template system reset
Remove-Module CheckIT-Core -Force -ErrorAction SilentlyContinue

# Clear template cache if corrupted
if ($global:Reports -and $global:Reports['Templates']) {
    $global:Reports['Templates'] = @{
        'Command' = @{}
        'Test' = @{}
        'Codebase' = @{}
    }
}

# Force reload and template initialization
Import-Module CheckIT-Core -Force
Ensure-Templates -Force

# Verify templates loaded
Write-Host "Templates recovered:"
Write-Host "Command: $($global:Reports['Templates']['Command'].Count)"
Write-Host "Test: $($global:Reports['Templates']['Test'].Count)"
Write-Host "Codebase: $($global:Reports['Templates']['Codebase'].Count)"
```

### Session Automation Recovery
```powershell
# Reset session automation state
$global:WorkflowAutoConfirm = @{}
Write-Host "Session automation state reset"

# Test session automation
$global:WorkflowAutoConfirm['*'] = $true
Write-Host "Testing session automation: $($global:WorkflowAutoConfirm['*'])"

# Clear session automation
$global:WorkflowAutoConfirm.Remove('*')
Write-Host "Session automation cleared"
```

### Excel Export Recovery
```powershell
# Diagnose Excel export issues
$testData = @(
    [PSCustomObject]@{ Node = "Test1"; Status = "OK"; Result = "Success" }
    [PSCustomObject]@{ Node = "Test2"; Status = "OK"; Result = "Success" }
)

# Test single sheet export
try {
    $singleFile = Export-ToExcel -InputObject $testData -Title "Test_Single" -PromptUser:$false
    Write-Host "Single sheet export: SUCCESS - $singleFile"
} catch {
    Write-Host "Single sheet export: FAILED - $($_.Exception.Message)"
}

# Test multi-sheet export
try {
    $sheets = @{
        "Sheet1" = $testData
        "Sheet2" = $testData
    }
    $multiFile = Export-ToExcel -Sheets $sheets -Title "Test_Multi" -PromptUser:$false
    Write-Host "Multi-sheet export: SUCCESS - $multiFile"
} catch {
    Write-Host "Multi-sheet export: FAILED - $($_.Exception.Message)"
}
```

## 📋 Enhanced Troubleshooting Checklist

### Before Reporting Template Issues
- [ ] **Module reload** - Remove and re-import CheckIT-Core module with `Ensure-Templates -Force`
- [ ] **Template availability** - Run `Manage-Templates -Type Command -Action List` to verify templates exist
- [ ] **Template structure** - Check that template commands are properly formatted PowerShell
- [ ] **Confirmation inheritance** - Verify enhanced confirmation parameters are passed correctly
- [ ] **Session state** - Check `$global:WorkflowAutoConfirm` for automation state
- [ ] **Excel data** - Verify templates return CleanResults, not verbose output
- [ ] **Sheet naming** - Ensure template names are Excel-compatible (≤31 chars, no special chars)

### For Template Workflow Development
- [ ] **Template detection** - Use `Ensure-Templates` before checking template existence
- [ ] **Confirmation patterns** - Implement enhanced confirmation with session inheritance
- [ ] **Data separation** - Store only CleanResults in workflowResults for Excel export
- [ ] **Error handling** - Handle missing templates gracefully with user feedback
- [ ] **Progress reporting** - Use StatusCallback for GUI compatibility
- [ ] **Testing matrix** - Test with CLI, GUI, and automation scenarios
- [ ] **Session testing** - Test YA/NA automation across multiple function calls

### For Enhanced Confirmation Implementation
- [ ] **Parameter type** - Use `[object]$Confirm = $true` not `[bool]$Confirm`
- [ ] **Session initialization** - Initialize `$global:WorkflowAutoConfirm = @{}` at function start
- [ ] **State checking** - Check for existing session-wide choices before prompting
- [ ] **Inheritance** - Pass confirmation settings from workflow to individual functions
- [ ] **Clear feedback** - Inform user when session automation is active
- [ ] **Option validation** - Handle Y/N/YA/NA input patterns correctly

## 📖 Enhanced Error Message Directory

### Template System Error Messages

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Template 'Name' not found in Command or Test templates" | Template doesn't exist or isn't loaded | Run `Ensure-Templates -Force` and check template name |
| "No clean results returned from template execution" | Template returns verbose output instead of data | Check template command returns structured objects |
| "Excel sheet name too long" | Template name > 31 characters | Template workflow auto-truncates, check sheet naming |
| "Double-prompting in workflow" | Confirmation inheritance not working | Check templateConfirm parameter passing |
| "Session automation not persisting" | Global state not initialized or cleared | Initialize `$global:WorkflowAutoConfirm = @{}` |

### Enhanced Confirmation Error Messages

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Cannot bind parameter 'Confirm'" | Wrong parameter type (bool vs object) | Use `[object]$Confirm = $true` parameter |
| "Session state not found" | WorkflowAutoConfirm not initialized | Initialize global state before checking |
| "Auto mode not recognized" | String comparison issues | Use exact string match: `$Confirm -eq "Auto"` |
| "Yes to All not working" | Session state not checked in subsequent calls | Check global state before prompting |

### Excel Integration Error Messages

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Empty Excel sheets created" | Template results contain no data | Verify CleanResults has actual objects |
| "Mixed data types in Excel" | Verbose output mixed with business data | Use only CleanResults for Excel export |
| "Sheet creation failed" | Invalid sheet names or data format | Check sheet name length and data structure |
| "Multi-sheet export incomplete" | Missing or null data in workflowResults | Verify all templates executed successfully |

---

📖 **Documentation Index**
- [Developer Guide](developer-guide.md) - Enhanced patterns and template-driven development
- [AI Assistant Guide](assistance-guide.md) - Human-AI collaboration with template workflows  
- [Implementation Status](implementation-status.md) - Current completion status including template system
- [API Reference](api-reference.md) - Complete function library with enhanced features
- [Main README](../README.md) - Project overview with enhanced capabilities

**Last Updated**: 2025-06-09 | **Enhanced**: Template workflow troubleshooting and session automation patterns

---