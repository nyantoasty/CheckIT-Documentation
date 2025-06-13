---
title: AI-Assisted Development Guide
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

# AI-Assisted Development Guide for CheckIT-Core

> Strategic guidance for human-AI collaboration in CheckIT development

## 🎯 Core Philosophy

**CheckIT follows three fundamental principles:**
1. **Template-Driven Development** - Leverage existing capabilities before building new ones
2. **Small, Careful Enhancements** - Incremental improvements over large refactors  
3. **Modular Integration** - Use core functions to keep the system scalable

## 🔍 Pre-Development Analysis (For AI Assistants)

### Essential Checks Before Suggesting Code
```powershell
# 1. Verify function exists and is exported
Get-Command Function-Name -Module CheckIT-Core

# 2. Check template availability first
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search

# 3. Confirm dependency availability
Get-Help Invoke-TemplateCommand -Full
```

### Critical Rules Audit
- [ ] **Templates First**: Check existing templates before creating new functions
- [ ] **Confirm Enhancement**: Use enhanced confirmation patterns (`-Confirm` parameter)
- [ ] **Credential Integration**: Use `Process-Parallel -UseCredentials` pattern
- [ ] **Reporting Separation**: Separate `Write-TaskLog` and `Set-Report` calls
- [ ] **Node Management**: Always use `New-NodeObject` and `NodeList` functions

## 🤝 Effective Human-AI Collaboration

### How to Give AI Better Context

#### **Specify Your Workflow Stage**
```powershell
# ❌ Vague: "I need to check some computers"
# ✅ Clear: "I have 25 lab computers in NodeList with credentials. 
#          Need to check Chrome and Office installations, export to Excel"

# Include your current state:
"$global:nodeList has 25 nodes, credentials valid until 3pm"
"Starting fresh session, need to add Lab-A computers and get credentials"
"Have yesterday's software data, need summary report with compliance percentages"
```

#### **Share Error Context Completely**
```powershell
# When something fails, provide:
# 1. Exact command
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info") -WorkflowName "Test" -ExportToExcel

# 2. Full error message
"Template 'Get OS Info' not found in Command or Test templates..."

# 3. Your goal
"Wanted to run OS audit on 10 lab computers for inventory report"
```

### What AI Excels At

#### **1. Workflow Planning & Command Sequencing**
AI can map goals to CheckIT function chains:

```powershell
# Human: "Audit software compliance in Lab A"
# AI provides complete workflow:

# Step 1: Get computers from AD
Select-OUComputers -BaseOU "Lab" -StringSearch @("Lab-A") -AddToNodeList

# Step 2: Get credentials  
Passman -Nodes $global:nodeList

# Step 3: Run template workflow
Invoke-TemplateWorkflow -Nodes $global:nodeList -Templates @("Get OS Info", "List Installed Apps") -WorkflowName "Lab_A_Compliance" -ExportToExcel
```

#### **2. Template Integration Strategies**
```powershell
# AI can suggest template combinations:
Invoke-TemplateWorkflow -Templates @(
    "Get OS Info",           # System inventory
    "Check Disk Space",      # Storage status  
    "List Installed Apps",   # Software compliance
    "Query Service Status"   # Service health
) -WorkflowName "Complete_Audit" -ExportToExcel
```

#### **3. Enhanced Confirmation Patterns**
```powershell
# AI can implement automation-friendly patterns:

# For interactive use:
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm:$true

# For automation:
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm:$false

# For smart batching:
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm "Auto"
```

### When to Use AI vs Ask Humans

#### **Use AI For:**
- Planning command sequences for clear requirements
- Creating template workflows from existing components  
- Integrating confirmation patterns for automation
- Analyzing structured data from CheckIT reports
- Generating variations of working solutions

#### **Ask Humans For:**
- Business requirements clarification ("What compliance standards?")
- Production system approval ("Should I run this on all 200 computers?")
- Domain-specific knowledge ("Which software is required for this department?")
- Final validation of critical operations

## 🔄 Advanced Workflow & Template Integration Patterns

### Template Workflow Architecture
The enhanced `Invoke-TemplateWorkflow` demonstrates key CheckIT patterns:

```powershell
# ✅ CORRECT: Each template creates individual reports, Excel combines them
Invoke-TemplateWorkflow -Nodes $nodes -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "System_Audit" -ExportToExcel

# Workflow process:
# 1. Each template executes independently → creates individual reports
# 2. Excel export reads actual report data → creates individual sheets + summary
# 3. No artificial data combining/batching
# 4. Clean separation of concerns
```

### Enhanced Confirmation System Pattern
```powershell
# Three-tier confirmation for automation-friendly workflows:
[object]$Confirm = $true   # $true, $false, or "Auto"

# Implementation pattern:
if ($Confirm -eq $false) {
    $shouldProceed = $true  # Skip confirmation entirely
}
elseif ($Confirm -eq "Auto") {
    # Check session-wide preferences, prompt once and remember
    if ($global:WorkflowAutoConfirm.ContainsKey('*')) {
        $shouldProceed = $global:WorkflowAutoConfirm['*']
    } else {
        # Enhanced options: Y/N/YA=Yes to All/NA=No to All
        $confirm = Read-Host "Proceed? (Y/N/YA=Yes to All/NA=No to All)"
        # Store choice for session-wide automation
    }
}
```

### Template Integration Inheritance Pattern
```powershell
# ✅ CORRECT: Workflow confirmation settings inherit to templates
if ($isCommandTemplate) {
    $templateConfirm = if ($Confirm -eq $false -or $global:WorkflowAutoConfirm.ContainsKey('*')) { 
        $false  # Inherit automation setting
    } else { 
        $true   # Use standard confirmation
    }
    $result = Invoke-TemplateCommand -Confirm:$templateConfirm
}

# This prevents double-prompting when user chooses "Yes to All"
```

## 💡 Development Best Practices

### Template-Driven Development Pattern
```powershell
# ALWAYS check existing capabilities first:

# 1. Search existing templates
Manage-Templates -Type Command -Action List
Manage-Templates -Type Codebase -Action Search

# 2. Use workflow for complex operations  
Invoke-TemplateWorkflow -Templates @("Existing Template 1", "Existing Template 2")

# 3. Only create new functions when templates can't solve the need
```

### Small Enhancement Pattern
```powershell
# ✅ CORRECT: Small, targeted enhancements
# Example: Adding -Confirm parameter to existing function

# Before: Function without automation support
function Invoke-TemplateCommand {
    param($Nodes, $TemplateName, $PromptUser = $true)
    # Always prompted for confirmation
}

# After: Enhanced with confirmation control  
function Invoke-TemplateCommand {
    param($Nodes, $TemplateName, $PromptUser = $true, [object]$Confirm = $true)
    # Now supports $false, $true, "Auto" modes
    # Preserves ALL existing functionality
}
```

### Excel Integration Strategy
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
```

## 🚨 Anti-Patterns to Avoid

### ❌ Large Refactors
```powershell
# ❌ WRONG: Rewriting entire function architecture
function Invoke-TemplateWorkflow {
    # Complete rewrite of workflow system
    # Changes fundamental behavior
    # Breaks existing integrations
}
```

### ❌ Bypassing Core Functions  
```powershell
# ❌ WRONG: Direct manipulation
$global:nodeList += $newNode  # Bypasses New-NodeObject
$global:Reports['Reports'] += $result  # Bypasses Set-Report

# ✅ CORRECT: Use core functions
$nodeObj = New-NodeObject $newNode
NodeList -Action Add -Nodes @($nodeObj)
Set-Report -ReportName $name -Data $results
```

### ❌ Combining Unrelated Concerns
```powershell
# ❌ WRONG: Artificial batching in workflow
foreach ($template in $templates) {
    $result = Invoke-Template $template
    Build-Report -Batch $WorkflowName -Result $result  # Don't do this
}

# ✅ CORRECT: Individual reports, combine at export
foreach ($template in $templates) {
    $result = Invoke-Template $template  # Creates individual report
    $workflowResults[$template] = $result.CleanResults
}
# Excel export combines sheets from individual reports
```

## 🧪 Testing & Validation Patterns

### Regression Testing Checklist
```powershell
# After any enhancement, verify:

# 1. Original functionality still works
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info"

# 2. New functionality works  
Invoke-TemplateCommand -Nodes $nodes -TemplateName "Get OS Info" -Confirm:$false

# 3. Integration points aren't broken
Invoke-TemplateWorkflow -Templates @("Get OS Info") -Confirm "Auto"

# 4. Edge cases are handled
Invoke-TemplateCommand -Confirm "Invalid"  # Should handle gracefully
```

### Template Workflow Testing
```powershell
# Test template combinations:
Invoke-TemplateWorkflow -Templates @("Get OS Info", "Check Disk Space") -WorkflowName "Test" -ExportToExcel

# Verify:
# - Each template creates individual report
# - Excel has separate sheets per template + summary
# - No double-prompting with confirmation inheritance
# - Clean data separation (no verbose command output in business reports)
```

## 📋 AI Assistant Prompt Templates

### 🔄 Workflow Planning Prompt
```
I need to accomplish: [specific goal]
My current state: [NodeList status, credentials, previous work]
Environment: [Lab/Classroom/Department, number of computers]
Output needed: [Console results/Excel export/Compliance report]

Please provide a complete CheckIT workflow using existing templates and functions.
```

### 🛠️ Enhancement Request Prompt  
```
I have this working CheckIT code: [paste code]
I want to enhance it to: [specific improvement]
Requirements: [CLI/GUI compatibility, automation support, etc.]

Please show small, targeted improvements that preserve existing functionality.
```

### 🔍 Template Discovery Prompt
```
I need to: [describe task]
Available templates: [run Manage-Templates -Type Command -Action List]

Please suggest a template workflow or identify if new templates are needed.
```

---

## 📖 Quick Navigation

**Core Documentation:**
- [Developer Guide](developer-guide.md) - Core patterns and development workflow  
- [API Reference](api-reference.md) - Complete function library
- [Quick Reference](quick-reference.md) - Common task cheat sheet

**For AI Assistants:**
- [Implementation Status](implementation-status.md) - Function readiness verification
- [Troubleshooting](troubleshooting.md) - Error patterns and solutions

**Project Overview:**
- [Main README](../README.md) - Getting started and overview
- [Changelog](../CHANGELOG.md) - Recent development history

---

*This guide focuses on practical collaboration patterns for CheckIT-Core development. For complete technical details, see the Developer Guide and API Reference.*