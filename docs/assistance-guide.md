---
title: AI Collaboration Guide
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

# AI-Assisted Development Guide

> Specialized guidance for human and AI collaboration in CheckIT-Core development

## 🔍 Pre-Development Analysis Checklist

### 1. Implementation Status Verification
- [ ] Check Function Readiness Matrix before suggesting functions
- [ ] Verify function exists in Export-ModuleMember list
- [ ] Confirm dependencies are available and functional
- [ ] Review completion status (✅ Complete, 🚧 In Progress, ❌ Not Implemented)

### 2. Critical Rules Audit
- [ ] **Module Load Order**: `Ensure-CheckITGlobals` only at end
- [ ] **DateTime**: Use `(Get-Date).ToString("format")` not `Get-Date -Format`
- [ ] **String Interpolation**: Use `$($variable)` in double quotes
- [ ] **Null Comparisons**: Use `$null -eq $variable` (null on left)
- [ ] **Array Safety**: Wrap uncertain results in `@()`
- [ ] **Case Sensitivity**: Use `.ToUpper()` for node name comparisons
- [ ] **Automatic Variables**: Never use `$error`, `$input`, `$matches` for custom logic
- [ ] **Line Continuation**: Avoid backticks - use single lines or splatting

### 3. Pattern Verification
- [ ] **Reporting Pattern**: Separate Write-TaskLog and Set-Report calls
- [ ] **Progress Pattern**: StatusCallback for GUI, Write-Progress for CLI
- [ ] **Credential Pattern**: Use Process-Parallel -UseCredentials
- [ ] **Node Management**: Use New-NodeObject and NodeList functions
- [ ] **Export Requirements**: Add to Export-ModuleMember when complete

### 4. Architecture Alignment
- [ ] Function fits in correct #region (Main Tools, Diagnostics, etc.)
- [ ] Follows established naming conventions
- [ ] Includes both CLI and GUI support (PromptUser parameter)
- [ ] Uses standardized error handling patterns
- [ ] Integrates with existing credential/node management

## 🤝 Human & AI Collaboration Guide

### How Humans Can Give AI Better Context

#### **Provide Clear Requirements**
```powershell
# ❌ Vague request:
"I need to check some computers"

# ✅ Clear context:
"I need to check if Chrome and Office are installed on 25 lab computers, 
export the results to Excel, and identify which computers are missing either application"
```

#### **Share Your Environment Details**
- **Node scope**: "Lab computers" vs "Classroom PCs" vs "Department workstations"
- **Credential status**: "I already have credentials" vs "Need to run Passman first"
- **Data format preference**: "Need Excel export" vs "Just want to see results in console"
- **Timeline**: "Need results now" vs "Can run overnight for comprehensive analysis"

#### **Specify Your Workflow Stage**
- **Starting fresh**: "Beginning new session, need to add nodes and get credentials"
- **Continuing work**: "Already have nodes in $global:nodeList, need to run diagnostics"
- **Analyzing results**: "Have data from yesterday, need to create summary report"

#### **Include Error Context**
```powershell
# When something fails, provide:
# 1. The exact command you ran
Get-Software -Nodes $nodes -Mode All -ReportName "Test"

# 2. The error message
# "Cannot bind parameter 'Nodes'. Cannot convert the "System.String" value..."

# 3. What you were trying to accomplish
# "Wanted to get all software from 10 lab computers for compliance check"
```

### What AI Can Do for You

#### **1. Workflow Planning & Command Sequencing**
*AI excels at mapping human goals to specific CheckIT function sequences:*

```powershell
# Human: "I want to audit software compliance in Lab A"
# AI can plan the complete workflow:

# Step 1: Node Management
NodeList -Action Add -Nodes @("LAB-A-01", "LAB-A-02", "LAB-A-03")
Passman -Nodes $global:nodeList

# Step 2: Connectivity Check  
Test-NodeConnection -Nodes $global:nodeList -OnlineOnly

# Step 3: Data Collection
Get-Software -Nodes $global:nodeList -Mode Specific -SearchStrings @("Chrome", "Office", "Acrobat") -ReportName "Lab A Compliance"

# Step 4: Analysis & Export
Export-ToExcel -Sheets @{
    'Compliance_Results' = $results
    'Node_Status' = $global:nodeList
} -Title "Lab A Software Compliance Audit"
```

#### **2. Code Refactoring & Optimization**
*AI can improve existing code while preserving CheckIT patterns:*

```powershell
# Human provides working but inefficient code
# AI refactors to use CheckIT patterns:

# Before: Manual credential handling
foreach ($node in $nodes) {
    $cred = Get-Credential
    Invoke-Command -ComputerName $node -Credential $cred -ScriptBlock { Get-Service }
}

# After: CheckIT-optimized parallel processing
$results = $nodes | Process-Parallel -ScriptBlock {
    param($node, $credential, $fqdn)
    Get-Service
} -UseCredentials
```

**⚠️ Refactoring Caution**: Always verify that AI preserves:
- Error handling logic
- Business-specific validation rules
- User preference integrations
- Critical timing or ordering dependencies

#### **3. Complex Data Analysis**
*AI can create sophisticated analysis from CheckIT data:*

```powershell
# Human: "Show me software installation patterns across departments"
# AI creates comprehensive analysis:

$softwareData = Get-Software -Nodes $global:nodeList -Mode All
$analysis = $softwareData | Group-Object Software | ForEach-Object {
    $installs = $_.Group
    [PSCustomObject]@{
        Software = $_.Name
        TotalInstalls = $installs.Count
        Departments = ($installs | Group-Object Group | Measure-Object).Count
        CommonVersion = ($installs.Version | Group-Object | Sort-Object Count -Desc)[0].Name
        InstallRate = [math]::Round(($installs.Count / $global:nodeList.Count) * 100, 1)
    }
} | Sort-Object TotalInstalls -Desc
```

#### **4. Error Diagnosis & Solution Finding**
*AI can analyze error patterns and suggest specific solutions:*

```powershell
# Human reports: "Process-Parallel is hanging at 8/47 nodes"
# AI identifies pattern and provides working solution:

# Problem: Simple job completion check
$done = $jobs | Where-Object { $_.Job.HasExited }

# Solution: Multi-method completion detection
foreach ($j in $jobs) {
    $isComplete = $false
    try {
        if ($j.Job.State -in @("Completed", "Failed", "Stopped")) {
            $isComplete = $true
        } elseif ($j.Job.HasExited) {
            $isComplete = $true
        } elseif ($jobAge.TotalMinutes -gt 10) {
            Stop-Job -Job $j.Job -Force; $isComplete = $true
        }
    } catch { $isComplete = $true }
}
```

#### **5. Documentation & Knowledge Extraction**
*AI can create documentation from working code:*

```powershell
# Human has working function
# AI creates comprehensive help documentation:

<#
.SYNOPSIS
    Retrieves software compliance status across multiple computer groups.
.DESCRIPTION
    Uses CheckIT patterns for parallel processing and credential management.
    Integrates with Active Directory for group-based analysis.
    Exports multi-sheet Excel reports with compliance percentages.
.PARAMETER Groups
    Array of AD group names to analyze.
.EXAMPLE
    Get-GroupSoftwareCompliance -Groups @("Lab-A", "Lab-B") -RequiredSoftware @("Office", "Chrome")
#>
```

#### **6. Template Creation & Standardization**
*AI can generate reusable patterns from specific solutions:*

```powershell
# Human solves specific problem
# AI creates template for similar scenarios:

# Template: Department Software Audit
$auditTemplate = @{
    Name = "Department Software Audit"
    Steps = @(
        "NodeList -Action Add -Nodes $departmentNodes",
        "Passman -Nodes $global:nodeList", 
        "Get-Software -Nodes $global:nodeList -Mode Specific -SearchStrings $requiredSoftware",
        "Export-ToExcel -Sheets $results -Title '$Department Software Audit'"
    )
    Parameters = @("departmentNodes", "requiredSoftware")
    Usage = "Standard compliance checking workflow for any department"
}
```

### Effective Human-AI Collaboration Patterns

#### **Pattern 1: Iterative Development**
```
Human: "I need to check CCM packages on lab computers"
AI: Suggests Get-CCMPackages function and basic usage
Human: "That works, but I need to see which computers don't have a specific package installed. Can I install the package too?."
AI: Adds filtering logic and which options to select to install.
Human: "Perfect, now export the updated install status of the computers to Excel to verify readiness for classes."
AI: Integrates Export-ToExcel with filtered results
```

#### **Pattern 2: Troubleshooting Partnership**
```
Human: Provides error message and context
AI: Analyzes against known CheckIT patterns and troubleshooting guide
Human: Tests suggested solution and reports results
AI: Refines solution or escalates to advanced diagnostics
```

#### **Pattern 3: Learning & Knowledge Transfer**
```
Human: "Show me how to do X the CheckIT way"
AI: Provides example using proper CheckIT patterns
Human: "I did Y differently, does that work?"
AI: Evaluates against CheckIT guidelines and suggests improvements
```

### When to Use AI vs When to Ask Humans

#### **Use AI for:**
- Planning command sequences for known requirements
- Refactoring working code to CheckIT patterns
- Creating variations of existing solutions
- Analyzing structured data from CheckIT functions
- Documentation and help text creation
- Template generation from working examples

#### **Ask Humans for:**
- Business requirements clarification
- Approval for changes affecting production systems
- Validation of security implications
- Domain-specific knowledge (department policies, compliance requirements)
- Testing and validation of critical functions
- Final review of refactored code for business logic preservation

### Collaboration Best Practices

#### **For Humans:**
1. **Start with clear goals**: "I want to accomplish X for Y reason"
2. **Provide context**: Environment, constraints, previous attempts
3. **Test AI suggestions**: Always verify before running in production
4. **Give feedback**: "This worked but..." or "This failed because..."
5. **Iterate**: Build solutions step-by-step rather than asking for everything at once

#### **For AI:**
1. **Ask clarifying questions**: Confirm requirements before suggesting solutions
2. **Explain reasoning**: Why this CheckIT pattern vs alternatives
3. **Provide complete examples**: No placeholders, ready-to-run code
4. **Include error handling**: Account for common failure scenarios
5. **Reference documentation**: Point to relevant sections for deeper understanding

#### **Together:**
1. **Start simple**: Basic functionality first, then enhance
2. **Follow CheckIT patterns**: Always use established guidelines
3. **Document solutions**: Capture working patterns for reuse
4. **Test thoroughly**: CLI and GUI modes, error scenarios
5. **Share knowledge**: Add successful patterns to troubleshooting guide

## 📋 Enhanced AI Assistant Prompt Examples

### 🔍 Comprehensive Documentation Analysis & Changelog Generation

````
## 🔍 Comprehensive Documentation Analysis & Changelog Generation

Please perform a thorough analysis of CheckIT-Core's current state and generate an appropriate changelog entry:

### 📖 Analysis Tasks

**1. Code vs Documentation Accuracy Check:**
- Review [`checkit-core.psm1`](checkit-core.psm1) Export-ModuleMember list
- Cross-reference with [`docs/api-reference.md`](docs/api-reference.md) function status
- Verify [`docs/implementation-status.md`](docs/implementation-status.md) completion percentages
- Check [`README.md`](README.md) feature claims against actual code

**2. Function Status Verification:**
- Identify functions that exist in code but missing from documentation
- Find placeholder functions vs fully implemented functions
- Check for functions marked "🚧 In Progress" that are actually complete
- Verify Export-ModuleMember matches documented "✅ Ready" functions

**3. Documentation Consistency Analysis:**
- Compare usage examples in [`README.md`](README.md) with actual function signatures
- Verify developer patterns in [`docs/developer-guide.md`](docs/developer-guide.md) match current code
- Check if troubleshooting guide reflects current error handling patterns
- Validate that quick-reference examples work with current implementation

**4. Version & Status Reconciliation:**
- Check if version numbers are consistent across all files
- Verify completion percentages reflect actual implementation
- Identify any outdated change dates or status indicators

### 🎯 Specific Analysis Focus

**High-Priority Checks:**
```powershell
# Check these specific areas:
# 1. Export-ModuleMember vs documented function lists
# 2. Placeholder vs complete function implementations  
# 3. Examples that reference non-existent or changed functions
# 4. Status indicators that don't match actual code state
# 5. Version inconsistencies across documentation files
```

**Documentation Files to Analyze:**
- [`README.md`](README.md) - Feature claims, examples, quick start
- [`docs/api-reference.md`](docs/api-reference.md) - Function matrix, status indicators
- [`docs/implementation-status.md`](docs/implementation-status.md) - Completion tracking
- [`docs/developer-guide.md`](docs/developer-guide.md) - Patterns and examples
- [`docs/quick-reference.md`](docs/quick-reference.md) - Common usage examples
- [`CHANGELOG.md`](CHANGELOG.md) - Recent changes accuracy

### 📋 Expected Output Format

**1. Summary of Findings:**
- Functions implemented but not documented
- Functions documented but not implemented/exported
- Outdated examples or status indicators
- Version/date inconsistencies

**2. Recommended Actions:**
- Documentation updates needed
- Status corrections required
- New content to add
- Outdated content to remove/update

**3. Generated Add-ChangelogEntry Command:**
Based on your analysis, provide a complete CLI command like:

```powershell
Add-ChangelogEntry `
    -Summary "Documentation Synchronization and Status Updates" `
    -Type "Documentation" `
    -KeyChanges @(
        "Updated function readiness matrix to reflect actual implementation status",
        "Corrected completion percentages based on Export-ModuleMember analysis",
        "Fixed outdated examples in README.md and quick-reference.md",
        "Synchronized version numbers across all documentation files"
    ) `
    -FilesChanged @(
        "docs/api-reference.md",
        "docs/implementation-status.md", 
        "README.md",
        "docs/quick-reference.md"
    ) `
    -Impact "Documentation now accurately reflects current CheckIT-Core implementation state, eliminating confusion about function availability and status" `
    -FunctionsCompleted @("List any functions that should be marked complete") `
    -GenerateAIPrompt:$true
```

### 🔧 Analysis Depth Guidelines

**Level 1 - Quick Scan:**
- Count exported functions vs documented functions
- Check latest changelog date vs file modification dates
- Verify main version numbers match

**Level 2 - Detailed Review:**
- Test each example command in documentation for syntax/availability
- Check function help text matches documented parameters
- Verify completion percentages add up correctly

**Level 3 - Deep Analysis:**
- Compare actual function implementations vs placeholder status
- Analyze code complexity to verify "complete" vs "in progress" classifications
- Cross-reference all inter-document links and examples

---

**Context for Analysis:** CheckIT-Core is at v1.3.0 with 67+ functions. The project is nearing completion (98%+) so documentation accuracy is critical for final release preparation.
````

### 📝 Function Implementation Analysis Prompt

````
Please analyze Add-ChangelogEntry and all functions in checkit-core.psm1:

1. **Completeness Check:** Which functions have full implementations vs placeholders?
2. **Export Status:** Which functions are implemented but missing from Export-ModuleMember?
3. **Documentation Gap:** Which exported functions lack proper help documentation?
4. **Pattern Compliance:** Which functions don't follow the CheckIT Big 3 Patterns?

Generate an Add-ChangelogEntry command for any discrepancies found.
````

### 🔄 Cross-Reference Validation Prompt

````
Cross-reference these CheckIT-Core components and identify inconsistencies:

**Files to Compare:**
- Function exports in [`checkit-core.psm1`](checkit-core.psm1)
- Status matrix in [`docs/api-reference.md`](docs/api-reference.md)  
- Examples in [`README.md`](README.md)
- Quick reference in [`docs/quick-reference.md`](docs/quick-reference.md)

**Focus Areas:**
- Do all README examples use exported functions?
- Are "✅ Ready" functions actually in Export-ModuleMember?
- Do quick-reference examples match current function signatures?
- Are there functions in code but missing from documentation?

Provide a complete Add-ChangelogEntry command to address any issues.
````

### 🎯 Version Consistency Audit Prompt

````
Perform a version consistency audit across CheckIT-Core:

**Check These Elements:**
- Version numbers in all .md files
- Dates in [`CHANGELOG.md`](CHANGELOG.md) vs actual file modification dates
- "Last Updated" fields in documentation
- Version references in [`README.md`](README.md) and implementation-status.md

**Analysis Request:**
1. Are all version numbers consistent?
2. Do changelog dates align with actual changes?
3. Are "Last Updated" fields current?
4. Do any examples reference outdated version info?

Generate appropriate Add-ChangelogEntry command for version synchronization.
````

### 🧪 Testing & Quality Assurance Prompts

````
## 🧪 Comprehensive Testing Strategy Development

Please analyze CheckIT-Core's testing needs and create a testing strategy:

**Current Testing Infrastructure:**
- Review Start-Test function capabilities
- Analyze Manage-Templates for test template support
- Check Invoke-TestStep for step execution patterns

**Testing Gaps Analysis:**
1. **Unit Testing:** Which functions lack individual test coverage?
2. **Integration Testing:** What workflow combinations need testing?
3. **Error Scenarios:** Which error paths are untested?
4. **Performance Testing:** What parallel processing scenarios need validation?

**Generate Test Templates For:**
- Critical path workflows (NodeList → Passman → Get-Software → Export-ToExcel)
- Error recovery scenarios (credential failures, network timeouts)
- CLI vs GUI mode compatibility
- Large dataset processing (100+ nodes)

**Expected Output:**
- Prioritized list of testing needs
- Template designs for critical test scenarios
- Add-ChangelogEntry command for implementing test strategy
````

### 🔧 Performance Analysis & Optimization Prompt

````
## 🔧 Performance Analysis & Optimization Review

Analyze CheckIT-Core for performance bottlenecks and optimization opportunities:

**Focus Areas:**
- Process-Parallel job management efficiency
- Credential pre-resolution in large batches
- Excel export performance with large datasets
- Memory usage in long-running operations

**Specific Analysis:**
1. **Parallel Processing:** Review job completion detection methods
2. **Credential Management:** Analyze cache hit rates and lookup efficiency  
3. **Data Structures:** Check for memory leaks in global stores
4. **Excel Operations:** Evaluate COM object cleanup and file size limits

**Optimization Targets:**
- Functions processing >50 nodes
- Operations taking >10 minutes
- Memory usage >500MB
- Excel files >50MB

**Expected Deliverables:**
- Performance improvement recommendations
- Code optimization suggestions
- Resource usage guidelines
- Add-ChangelogEntry for performance enhancements
````

### 🏗️ Architecture Review & Modernization Prompt

````
## 🏗️ Architecture Review & Future Planning

Evaluate CheckIT-Core architecture for scalability and maintainability:

**Architecture Assessment:**
- Review function interdependencies in [`docs/assistance-guide.md`](docs/assistance-guide.md)
- Analyze region organization in [`checkit-core.psm1`](checkit-core.psm1)
- Evaluate global state management patterns
- Check separation of concerns compliance

**Modernization Opportunities:**
1. **PowerShell 7 Compatibility:** What features could benefit from newer PowerShell versions?
2. **Class-Based Design:** Which object types would benefit from PowerShell classes?
3. **Module Dependencies:** Could any external modules enhance functionality?
4. **API Design:** How could functions be more composable?

**Future Considerations:**
- Cloud integration potential (Azure, Office 365)
- REST API development for web interfaces
- Cross-platform compatibility requirements
- Enterprise scale deployment patterns

**Expected Output:**
- Architecture strengths and weaknesses
- Modernization roadmap with priorities
- Breaking change impact analysis
- Strategic development recommendations
````

### 🔍 Security & Compliance Analysis Prompt

````
## 🔍 Security & Compliance Review

Analyze CheckIT-Core for security vulnerabilities and compliance requirements:

**Security Assessment Areas:**
- Credential handling and storage patterns
- Privilege escalation and access control
- Network communication security
- Data encryption and protection

**Compliance Analysis:**
1. **PowerShell Security:** ScriptBlock logging, execution policy compliance
2. **Active Directory Integration:** Authentication and authorization patterns
3. **Data Handling:** PII protection, audit trail requirements
4. **Remote Operations:** Secure communication protocols

**Risk Assessment:**
- Identify potential attack vectors
- Evaluate credential exposure risks
- Analyze privilege requirements
- Review network communication security

**Expected Output:**
- Security vulnerability assessment
- Compliance gap analysis
- Risk mitigation recommendations
- Security enhancement roadmap
````

### 🌐 Integration & Compatibility Analysis Prompt

````
## 🌐 Integration & Compatibility Analysis

Evaluate CheckIT-Core's integration capabilities and compatibility requirements:

**Integration Points Analysis:**
- Active Directory connectivity and requirements
- SCCM integration capabilities and limitations
- Passman integration patterns and dependencies
- Excel/Office integration compatibility

**Compatibility Assessment:**
1. **PowerShell Versions:** 5.1 vs 7+ feature usage
2. **Windows Versions:** Minimum requirements and feature dependencies
3. **Network Dependencies:** Required protocols and ports
4. **Third-Party Tools:** External dependencies and version requirements

**Enterprise Readiness:**
- Multi-domain support capabilities
- Large-scale deployment considerations
- Performance at enterprise scale
- Integration with enterprise monitoring tools

**Expected Output:**
- Compatibility matrix documentation
- Integration best practices guide
- Enterprise deployment recommendations
- Upgrade path planning
````

## 🛠️ Code Generation Patterns

### Template-Based Development
**Always start with:**
```powershell
# Get the complete function template
Manage-Templates -Type Codebase -Action Preview
# Select "CheckIT Function Template"
```

### Function Structure Template
```powershell
function New-CheckITFunction {
    <#
    .SYNOPSIS
        Brief one-line description
    .DESCRIPTION
        Detailed explanation including CLI/GUI compatibility
    .PARAMETER Nodes
        Array of node objects or names
    .PARAMETER PromptUser
        CLI vs GUI mode control
    .PARAMETER StatusCallback
        GUI progress reporting
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
    
    # Always ensure credentials first
    Ensure-GlobalCredStore -PromptUser:$PromptUser
    
    # Normalize input nodes using standard pattern
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
    # MAIN PROCESSING PHASE
    # ====================================================================
    
    # Your Process-Parallel implementation here
    $results = $nodeObjects | Process-Parallel -ScriptBlock {
        param($node, $credential, $fqdn)
        # $credential and $fqdn automatically available
        # Your core logic here
    } -UseCredentials
    
    # ====================================================================
    # RESULTS & CLEANUP PHASE
    # ====================================================================
    
    # Separate logging and reporting (CRITICAL PATTERN)
    $allResults | Write-TaskLog -Function $function -TaskParams @{} | Out-Null
    Set-Report -ReportName $ReportName -Function $function -Data $cleanResults | Out-Null
    
    return $allResults
}
```

### Multi-Method Approach for Windows Mechanisms
When initial approaches fail, provide ranked alternatives:

**Example: File System Access**
1. **Primary**: `rundll32.exe url.dll,FileProtocolHandler`
2. **Fallback**: `Invoke-Item` with UNC path
3. **Alternative**: `cmd /c start` with UNC path
4. **Last Resort**: Direct `explorer.exe` invocation

**Example: Remote Management**
1. **Primary**: PowerShell Remoting with stored credentials
2. **Fallback**: WMI/CIM with explicit credentials
3. **Alternative**: DCOM/COM objects
4. **Troubleshooting**: Local MMC tools with remote targeting

## 📝 Enhanced Code Documentation Standards

### Comment Architecture Levels (From Process-Parallel)

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

#### 3. Functional Block Headers (40-character width)
```powershell
# ================================================================
# JOB SLOT MANAGEMENT - Wait for available slots
# ================================================================
```

#### 4. Algorithm Documentation
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

#### 5. Variable Purpose Documentation
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

#### 6. Integration Points Documentation
```powershell
# ================================================================
# CHECKIT INTEGRATION POINTS
# ================================================================
# This function integrates with the following CheckIT components:
# 
# 1. Credential Management:
#    - Uses Get-NodeCredAndFQDN for standard credential resolution
#    - Integrates with global CredStore for cached credentials
#    - Supports Passman integration for automated credential retrieval
#
# 2. Node Management:
#    - Updates $global:nodeList via NodeList function (never direct manipulation)
#    - Uses New-NodeObject for all node creation/updates
#    - Preserves existing node properties (especially Passman status)
#
# 3. Reporting System:
#    - Task logging via Write-TaskLog (audit trail)
#    - Business reporting via Set-Report (clean user data)
#    - Excel export compatibility via Export-ToExcel
```

## 🚨 Enhanced Error Handling Patterns

### Standardized Error Record Creation
```powershell
# ✅ Correct - Comprehensive error record with all CheckIT metadata
function New-ErrorRecord {
    param(
        [Parameter(Mandatory)]
        [string]$Node,
        [Parameter(Mandatory)]
        [string]$Error,
        [Parameter(Mandatory)]
        [string]$Function,
        [string]$Details = "",
        [string]$Category = "GeneralError"
    )
    
    return [PSCustomObject]@{
        Node = $Node
        Error = $Error
        Function = $Function
        Details = $Details
        Category = $Category
        Timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        User = $env:USERNAME
    }
}

# Usage in functions:
try {
    # Your operation here
    $result = Invoke-SomeOperation -Node $nodeName
} catch {
    $errorRecord = New-ErrorRecord -Node $nodeName -Error $_.Exception.Message -Function $function -Details "Operation failed during remote connection" -Category "ConnectionError"
    $nodeErrors += $errorRecord
    
    # Update node status in NodeList
    $updateObj = New-NodeObject @{ 
        Node = $nodeName
        TaskStatus = 'Error'
        LastError = $errorRecord.Error
        ErrorCategory = $errorRecord.Category
        ErrorTimestamp = $errorRecord.Timestamp
    }
    NodeList -Action Update -Nodes @($updateObj) -PromptUser:$false | Out-Null
}
```

### Error Classification System
```powershell
# Standardized error categories for consistent handling
$ErrorCategories = @{
    'ConnectionError' = 'Network or remote connectivity issues'
    'CredentialError' = 'Authentication or authorization failures' 
    'PermissionError' = 'Insufficient permissions for operation'
    'DataError' = 'Invalid or corrupted data encountered'
    'TimeoutError' = 'Operation exceeded maximum time limit'
    'ServiceError' = 'Required service unavailable or stopped'
    'ConfigError' = 'Configuration or setup issues'
    'GeneralError' = 'Unspecified or unknown error'
}

# Usage in error handling:
if ($_.Exception.Message -match 'access.*denied|unauthorized') {
    $category = 'PermissionError'
} elseif ($_.Exception.Message -match 'timeout|timed out') {
    $category = 'TimeoutError'
} elseif ($_.Exception.Message -match 'network|connection|unreachable') {
    $category = 'ConnectionError'
} else {
    $category = 'GeneralError'
}
```

### Progressive Error Recovery
```powershell
# Multi-method approach with graceful degradation
function Invoke-WithFallback {
    param($Node, $PrimaryMethod, $FallbackMethod, $LastResortMethod)
    
    $attempts = @(
        @{ Method = $PrimaryMethod; Description = "Primary approach" },
        @{ Method = $FallbackMethod; Description = "Fallback method" },
        @{ Method = $LastResortMethod; Description = "Last resort" }
    )
    
    foreach ($attempt in $attempts) {
        try {
            Write-Verbose "Attempting $($attempt.Description) for node $Node"
            $result = & $attempt.Method -Node $Node
            if ($result) {
                Write-Verbose "Success with $($attempt.Description)"
                return $result
            }
        } catch {
            Write-Verbose "Failed $($attempt.Description): $($_.Exception.Message)"
            if ($attempt -eq $attempts[-1]) {
                # Last attempt failed, record comprehensive error
                throw "All methods failed for $Node. Final error: $($_.Exception.Message)"
            }
        }
    }
}
```

## 🔗 Comprehensive Integration Points & Dependencies

### Core Dependency Mapping
```powershell
# ================================================================
# COMPLETE DEPENDENCY TREE
# ================================================================

# Tier 1: Foundation (No dependencies)
Ensure-CheckITGlobals
├── Initialize global stores
├── Set default preferences
└── Create directory structure

Get-CheckITStore / Manage-Store
├── NodeList access and management
├── Reports collection access
├── CredStore management
└── UserPrefs storage

# Tier 2: Core Infrastructure (Depends on Tier 1)
New-NodeObject
├── Requires: Ensure-CheckITGlobals (for column definitions)
├── Standardizes all node creation/updates
├── Preserves Passman status and metadata
└── Validates node structure

NodeList (Node Management)
├── Requires: New-NodeObject, Get-CheckITStore
├── Add, Update, Remove, Preview operations
├── Syncs with Active Directory
└── Maintains referential integrity

Passman / Credential Management
├── Requires: NodeList (for node context)
├── Get-NodeCredAndFQDN (per-node resolution)
├── Ensure-GlobalCredStore (cache management)
└── Get-ValidCred / Get-ValidCredStatus (validation)

# Tier 3: Processing Engine (Depends on Tier 1 & 2)
Process-Parallel
├── Requires: Credential Management, NodeList
├── Automatic credential resolution via Get-NodeCredAndFQDN
├── Job management with timeout handling
├── Progress reporting (CLI/GUI compatible)
├── Error collection and classification
└── Result aggregation and cleanup

# Tier 4: Data Collection (Depends on Tier 1-3)
Get-Software
├── Requires: Process-Parallel, NodeList, Credential Management
├── Uses Write-TaskLog for audit trail
├── Uses Set-Report for business reporting
└── Supports both CLI and GUI modes

Get-CCMPackages
├── Requires: Process-Parallel, NodeList
├── Enhanced CIM/WMI fallback pattern
├── Interactive package evaluation
└── Deployment status tracking

# Tier 5: Reporting & Export (Depends on Tier 1-4)
Write-TaskLog / Set-Report
├── Requires: Get-CheckITStore (for report storage)
├── Separate concerns (audit vs business reporting)
├── Metadata preservation and enrichment
└── Error correlation and tracking

Export-ToExcel
├── Uses COM objects (no external dependencies)
├── Multi-sheet support with formatting
├── Pivot table and slicer generation
└── Integration with CheckIT data structures
```

### Function Interdependency Rules

#### 1. Node Management Chain
```powershell
# ALWAYS follow this pattern for node operations:
$inputNode → New-NodeObject → NodeList -Action Update → Write-TaskLog

# ❌ NEVER manipulate $global:nodeList directly:
$global:nodeList += $newNode  # Breaks referential integrity
$global:nodeList[0].Status = "Complete"  # Loses metadata
```

#### 2. Credential Resolution Chain
```powershell
# ALWAYS use this pattern for remote operations:
Ensure-GlobalCredStore → Process-Parallel -UseCredentials → Automatic resolution

# The chain automatically handles:
# 1. Credential cache validation
# 2. Per-node credential lookup via Get-NodeCredAndFQDN
# 3. Passman integration if configured
# 4. Credential format conversion (domain\user vs user@domain)
# 5. Retry logic for failed credential operations
```

#### 3. Reporting Separation Chain
```powershell
# ALWAYS separate these concerns:
$results → Write-TaskLog (audit trail) → Set-Report (business data) → Export-ToExcel

# Task logging captures:
# - Function execution details
# - Parameters and context
# - Technical metadata
# - Error correlation

# Business reporting captures:
# - Clean user-facing data
# - Summary information
# - Organized by groups
# - Export-ready format
```

### Store Management Integration
```powershell
# ================================================================
# STORE INTERACTION PATTERNS
# ================================================================

# NodeList Store (Primary node collection)
$nodes = Get-CheckITStore -Store NodeList
NodeList -Action Add -Nodes $newNodes
NodeList -Action Update -Nodes $updatedNodes
NodeList -Action Remove -Nodes $removeNodes

# Reports Store (Business reporting)
Set-Report -ReportName "MyReport" -Function $function -Data $results
$reports = Get-CheckITStore -Store Reports
Manage-Store -Store Reports -Action Preview

# CredStore (Credential caching)
Ensure-GlobalCredStore
$credInfo = Get-NodeCredAndFQDN -Node $nodeName
Get-ValidCredStatus -Nodes $nodeList

# UserPrefs Store (User preferences)
Set-UserPreference -Function 'Export-ToExcel' -Key 'AutoOpen' -Value $true
$autoOpen = Get-UserPreference -Function 'Export-ToExcel' -Key 'AutoOpen'

# Templates Store (Development templates)
Manage-Templates -Type Codebase -Action Preview
$template = Manage-Templates -Type Command -Action Get -TemplateName "MyCommand"
```

## 🔄 Change Management & File Organization

### Change Making Procedures

#### 1. Function Development Workflow
```powershell
# Step 1: Get template and plan
Manage-Templates -Type Codebase -Action Preview  # Get function template
# Review API Reference for similar functions
# Check Implementation Status for dependencies

# Step 2: Implement following patterns
# - Use established comment architecture (80/60/40 character headers)
# - Follow The Big 3 Patterns (Reporting, Progress, Credential)
# - Implement standardized error handling
# - Add comprehensive help documentation

# Step 3: Test both modes
Your-Function -Nodes $testNodes -PromptUser:$true    # CLI test
Your-Function -Nodes $testNodes -PromptUser:$false   # GUI test

# Step 4: Add to exports and update status
# Add to Export-ModuleMember in checkit-core.psm1
# Update docs/implementation-status.md
# Add changelog entry via Add-ChangelogEntry

# Step 5: Documentation updates
# Update docs/api-reference.md with function details
# Add troubleshooting notes to docs/troubleshooting.md if needed
# Update docs/quick-reference.md if it's a commonly used function
```

#### 2. File Structure Organization
```
CheckIT-Core/
├── checkit-core.psm1           # Main module with all functions
├── checkit-core.psd1           # Module manifest
├── checkit-guiLIVE.ps1         # GUI application
├── README.md                   # Project overview
├── CHANGELOG.md                # Detailed change history
├── Checkit-Guidelines.md       # [ARCHIVE] Original guidelines
└── docs/                       # 📁 Documentation ecosystem
    ├── developer-guide.md      # Core patterns and development workflow
    ├── assistance-guide.md     # AI/human assistant guidance
    ├── troubleshooting.md      # Technical solutions and fixes
    ├── api-reference.md        # Complete function library
    ├── implementation-status.md # Function status dashboard
    ├── quick-reference.md      # Cheat sheet for common tasks
    └── archive/                # 📁 Archived documentation
        └── original-guidelines.md
```

#### 3. Status Update Procedures
```powershell
# When completing a function:
# 1. Add to Export-ModuleMember (checkit-core.psm1)
Export-ModuleMember -Function @(
    'Existing-Function1',
    'Existing-Function2',
    'Your-New-Function'  # Add here
)

# 2. Update implementation status
# Edit docs/implementation-status.md:
# - Move from 🚧 In Progress to ✅ Complete
# - Add to Function Readiness Matrix
# - Update completion percentages

# 3. Add changelog entry
Add-ChangelogEntry -Type Enhancement -Summary "Added Your-New-Function for..."

# 4. Update API reference
# Edit docs/api-reference.md:
# - Add function to Quick Function Lookup
# - Include usage examples
# - Document parameters and features
```

#### 4. Documentation Maintenance
```powershell
# Regular maintenance tasks:

# Weekly during active development:
# - Review implementation-status.md for accuracy
# - Update function readiness matrix
# - Sync API reference with actual exports
# - Validate cross-references between docs

# After major changes:
# - Test all documentation examples
# - Update troubleshooting guide with new solutions
# - Refresh quick-reference.md
# - Verify developer-guide.md patterns are current

# Monthly:
# - Archive old changelog entries
# - Review and update user preferences examples
# - Validate template system integration
# - Check for outdated function references
```

---
📖 **Documentation Index**
- [Developer Guide](developer-guide.md) - Core patterns and development workflow
- [Troubleshooting](troubleshooting.md) - Technical solutions and fixes
- [API Reference](api-reference.md) - Complete function library
- [Quick Reference](quick-reference.md) - Cheat sheet for common tasks
- [Implementation Status](implementation-status.md) - Function status dashboard
- [Main README](../README.md) | [Changelog](../CHANGELOG.md)
