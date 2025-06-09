---
title: Changelog
layout: default
---

<link rel="stylesheet" href="assets/style.css">

# CheckIT-Core Changelog    
    ## 2025-06-07 - Documentation Synchronization and Version Updates
    
    **Type:** Documentation
    **Version:** 1.3.0
    
    **Key Changes:**
    - Updated version references from 1.2.0 to 1.3.0 across all files
- Added Add-ChangelogEntry and Generate-DocumentationAnalysisPrompt to function lists
- Enhanced template system documentation with Codebase template type
- Added implementation status verification guidance
- Fixed cross-references to use new docs/ structure
- Added development workflow examples using new functions
    
    **Files Changed:**
    - `README.md`
- `docs/api-reference.md`
- `docs/implementation-status.md`
- `docs/quick-reference.md`
    
    **Functions Completed:**
- `Add-ChangelogEntry`
- `Generate-DocumentationAnalysisPrompt`

**Impact:** Documentation now accurately reflects v1.3.0 capabilities and new automation features. Users have clear guidance on function availability and development workflows.
    
    ---
## 2025-06-07 - Major Documentation Restructure and Module Manifest Creation
    
    **Type:** Enhancement
    **Version:** 1.3.0
    
    **Key Changes:**
    - Created comprehensive docs/ directory structure with specialized guides
- Archived original guidelines to maintain development history
- Added professional README.md with feature overview and usage examples
- Created complete checkit-core.psd1 module manifest with all 67 functions exported
- Implemented Add-ChangelogEntry function for automated documentation maintenance
- Enhanced AI-assisted development workflow with comprehensive collaboration guide
- Updated module version to 1.3.0 reflecting near-completion status
- Added session management documentation and troubleshooting guides
    
    **Files Changed:**
    - `README.md`
- `checkit-core.psd1`
- `checkit-core.psm1`
- `docs/assistance-guide.md`
- `docs/api-reference.md`
- `docs/developer-guide.md`
- `docs/implementation-status.md`
- `docs/quick-reference.md`
- `docs/troubleshooting.md`
- `archive/Checkit-Guidelines.md`
    
    **Functions Added:**
- `Add-ChangelogEntry`
- `Generate-DocumentationAnalysisPrompt`

**Impact:** CheckIT-Core now has professional-grade documentation structure, complete module manifest, and automated documentation maintenance. This establishes the foundation for final release preparation and provides comprehensive guidance for both human developers and AI assistants.
    
    ---
## 2025-06-06 - Process-Parallel Enhanced Job Management and CCM Evaluation Fix

**Type:** Enhancement

**Key Changes:**
- Enhanced Process-Parallel while loop with robust job completion detection using multiple methods
- Added comprehensive timeout handling (10-minute job timeout, 15-minute maximum wait)
- Implemented safety checks to prevent infinite loops in job processing
- Fixed CCM package evaluation commands with CIM/WMI fallback pattern
- Enhanced error detection to properly distinguish CCM data from actual errors
- Added guaranteed job cleanup in finally blocks to prevent resource leaks
- Improved progress reporting with safe callback error handling
- Standardized result processing and normalization across all execution paths

**Files Changed:**
- `checkit-core.psm1`

**Impact:** Process-Parallel now reliably processes all jobs to completion, eliminating the 8/47 node hanging issue. CCM package evaluation now uses proven CIM-first, WMI-fallback pattern for maximum compatibility. Enhanced error handling prevents legitimate CCM data from being classified as errors, improving Get-CCMPackages accuracy.

---
## 2025-06-06 - Process-Parallel and Core Functions Enhancement

**Type:** Enhancement

**Key Changes:**

- Fixed Process-Parallel final collection phase to properly process remaining jobs
- Enhanced Process-Parallel job completion detection with robust while loop
- Improved credential resolution and error handling in parallel execution
- Verified Get-Software function working correctly with Process-Parallel integration
- Enhanced Invoke-NodeCommand with comprehensive timeout and error handling
- Added detailed debug output and progress reporting in Process-Parallel
- Standardized argument passing and credential management across parallel functions
- Initiated Get-CCMPackages debugging and parameter alignment fixes

**Files Changed:**

- `checkit-core.psm1`

**Impact:** Process-Parallel now reliably processes all jobs to completion, eliminating hanging jobs and incomplete results. Get-Software confirmed working with parallel credential support. Invoke-NodeCommand enhanced for production reliability. Get-CCMPackages debugging initiated to resolve parameter mismatch and result classification issues.

---

## 2025-06-06 - Template System Enhancement for Function Development

**Type:** Enhancement

**Key Changes:**

- Added Codebase template type to Manage-Templates function
- Created complete CheckIT function development template
- Added credential resolution, reporting, and error handling patterns
- Added search functionality for Codebase templates
- Created comprehensive function development checklist in Guidelines

**Files Changed:**

- `CheckIT-Core\checkit-core.psm1`
- `CheckIT-Core\Checkit-Guidelines.md`

**Impact:** Provides standardized templates and patterns for rapid, consistent function development. Reduces development errors and ensures all new functions follow established CheckIT patterns.

---

## 2025-06-05 - Get-CCMPackages Function and Reporting System Completion

**Type:** Feature

**Key Changes:**

- Completed Get-CCMPackages function with full interactive package management capabilities
- Fixed reporting pattern separation between Write-TaskLog and Set-Report functions
- Implemented CCM package discovery using both CIM and WMI fallback methods
- Added clipboard integration for install/uninstall/evaluate commands
- Enhanced interactive CLI mode with numbered package selection and command generation
- Established proper reporting patterns following Get-Software model for task logging vs business reports
- Added remote execution capabilities for CCM package deployment across multiple nodes

**Files Changed:**

- `CheckIT-Core\checkit-core.psm1`

**Impact:** Users can now discover available CCM packages, generate deployment commands for clipboard use, and execute package operations across multiple target nodes. Proper separation of audit logging and business reporting ensures clean Excel exports and GUI compatibility.

---

## 2025-06-05 - Open-RemoteSystemTools Menu Flow Fix

**Type:** Fix

**Key Changes:**

- Removed intrusive remote RemoteRegistry service manipulation that was causing menu exit failures
- Simplified Registry Editor approach to open locally with user instructions instead of forcing remote service start
- Eliminated Invoke-Command calls that could fail and prevent return to menu system
- Made Registry Editor option consistent with other MMC tools in terms of flow and error handling
- Registry Editor now opens with clear instructions for manual connection rather than automated service starting

**Files Changed:**

- `CheckIT-Core\checkit-core.psm1`

**Impact:** Users can now successfully navigate the Remote System Tools menu without getting stuck after selecting Registry Editor. The function is less intrusive on target computers and more reliable for repeated use. Registry Editor functionality is preserved while eliminating the problematic automated service manipulation.

---

## 2025-06-04 - Add-ChangelogEntry Function Fix

**Type:** Fix

**Key Changes:**

- Fixed string concatenation logic in CHANGELOG.md update section
- Corrected newline handling to properly prepend new entries to existing changelog content
- Enhanced regex pattern to handle variations in guidelines recent changes footer text
- Improved error handling and content replacement logic for both CHANGELOG.md and Guidelines updates
- Fixed issue where new changelog entries were not being properly added to the file

**Files Changed:**

- `checkit-core.psm1`

**Impact:** Add-ChangelogEntry function now properly updates both CHANGELOG.md and Guidelines recent changes section. Changelog maintenance is now fully functional for tracking development progress.

---

## 2025-06-04 - Excel Functions and Software Inventory Completion

**Type:** Feature

**Key Changes:**

- Completed Export-ToExcel function with multi-sheet export, Excel COM integration, and table formatting
- Fixed syntax error in Invoke-Pivotizer function (missing space in conditional)
- Added missing Import-FromExcel function for complete Excel import/export capability
- Verified Get-Software function is production-ready with dual-mode inventory and robust error handling
- Updated Get-AllColumns utility function with proper implementation
- Confirmed all Excel and Main Tools regions are now 100% complete

**Files Changed:**

- `checkit-core.psm1`
- `Checkit-Guidelines.md`

**Impact:** All critical CheckIT infrastructure is now complete. Excel export/import capabilities are fully functional. Software inventory system is production-ready. Phase 1 development is complete - ready for Phase 2 GUI integration.

---

## 2025-06-04 - Implementation Status Review & Unified Development Plan

**Type:** Enhancement

**Key Changes:**

- Comprehensive review of both Core and GUI implementation status
- Established unified development priorities with Core functions taking precedence  
- Identified 4 critical functions blocking GUI integration (Invoke-NodeCommand, Write-TaskLog, Set-Report, Export-ToExcel)
- Created clear dependency mapping between Core and GUI components
- Updated implementation strategy to prioritize Core completion before GUI integration

**Files Changed:**

- `Checkit-Guidelines.md`

**Impact:** Clear development path established with Core functions taking priority to unblock GUI integration. Provides structured approach for completing remaining 54% of core functionality.

---

## 2025-06-04 - Node Object Passman Status Preservation Fix

**Type:** Fix

**Key Changes:**

- Fixed critical issue where Passman status was being reset to false during node updates
- Enhanced New-NodeObject to preserve existing Passman values during updates
- Implemented conditional logic to only query CredStore for new nodes or missing Passman properties
- Corrected variable reference from $InputObject to $inputObj to match function parameter

**Files Changed:**

- `checkit-core.psm1`

**Impact:** Node credential status now remains consistent across all CheckIT operations, resolving the primary issue where Test-NodeConnection was inadvertently clearing Passman flags.

---

## 2025-06-04 - Credential Lookup Pattern Standardization

**Type:** Enhancement

**Key Changes:**

- Standardized credential lookup pattern between Get-ValidCred and Get-NodeCredAndFQDN
- Added support for Boolean return values from Get-ValidCred
- Enhanced robust type checking for PSCustomObject, Boolean, and Hashtable return types
- Implemented case-insensitive credential key lookups across all functions
- Established consistent FQDN construction pattern

**Files Changed:**

- `checkit-core.psm1`

**Impact:** Credential lookup is now consistent and robust across all credential management functions, eliminating lookup failures and type mismatch errors.

---

## 2025-01-04 - Passman Credential Retrieval Region Completion Analysis

**Type:** Documentation

**Key Changes:**

- Corrected function status for Passman region after comprehensive analysis
- Updated Passman from placeholder to complete (full web portal integration)
- Updated Get-NodeCredAndFQDN from placeholder to complete (credential resolution)
- Verified all 7 functions in Passman region are production-ready
- Removed Passman region from critical implementation targets

**Files Changed:**

- `Checkit-Guidelines.md`

**Impact:** All credential management functionality confirmed operational, unblocking Main Tools and Diagnostics regions that depend on credential support.

---

## 2025-06-04 - NodeList Syntax Errors Fixed & Implementation Status Update

**Type:** Fix

**Key Changes:**

- Fixed critical syntax errors in NodeList function (unreachable code after return statements)
- Corrected orphaned code placement at end of function
- Fixed misplaced Passman update logic
- Standardized Passman status updates across ALL NodeList operations (Add, Remove, Update, Upload, SyncWithCredStore)
- Fixed all New-ErrorRecord calls to use correct -tmpError parameter
- Added proper PromptUser checks for user-facing error messages

**Files Changed:**

- `checkit-core.psm1`

**Impact:** Node Management region now 100% functional, unblocking Main Tools, Diagnostics, and other dependent regions.

---

## 2025-06-04 - Node Management Region Analysis & Function Status Corrections

**Type:** Documentation

**Key Changes:**

- Corrected function status based on comprehensive code analysis
- Updated New-ErrorRecord from placeholder to complete (standardized error object creation)
- Updated Write-Color from placeholder to complete (multi-color console output)
- Updated AD from placeholder to complete (full Active Directory integration)
- Updated New-NodeObject from placeholder to complete (standardized node creation)
- Identified Resolve-NodeObjects as complete but requiring refactoring for circular dependencies

**Files Changed:**

- `Checkit-Guidelines.md`

**Impact:** Node Management region status corrected from 25% to 80% complete, with only NodeList syntax issues remaining.

---

## 2025-06-02 - Syntax Fixes Completed

**Type:** Fix

**Key Changes:**

- Replaced all Get-Date -Format usage with (Get-Date).ToString() method calls
- Updated all string interpolation to use $($variable) syntax in double-quoted strings
- Standardized all null comparisons to place $null on the left side
- Applied PowerShell best practices consistently throughout codebase

**Files Changed:**

- `checkit-core.psm1`

**Impact:** Core module now follows all PowerShell best practices for syntax consistency and reliability.

---

## 2025-06-02 - Utility Functions Status Correction

**Type:** Documentation

**Key Changes:**

- Corrected Get-CheckITColumns from placeholder to complete (comprehensive switch statement)
- Corrected Write-Color from placeholder to complete (full multi-color implementation)
- Corrected Set-UserPreference/Get-UserPreference from placeholder to complete
- Corrected Show-PreferenceHelp from placeholder to complete (regex-based help extraction)
- Corrected Manage-Templates from placeholder to complete (extensive CRUD operations)
- Corrected ConvertTo-PSCustomObject from placeholder to complete (recursive conversion)
- Updated utility functions region from 36% to 100% complete

**Files Changed:**

- `Checkit-Guidelines.md`

**Impact:** Core infrastructure functions confirmed available, unblocking dependent regions and establishing solid foundation for development.

---

## 2025-06-02 - Module Load Order Fix Verification

**Type:** Fix

**Key Changes:**

- Verified Ensure-CheckITGlobals is correctly placed at end of module after Export-ModuleMember
- Confirmed module initialization occurs after all function definitions
- Validated proper module load sequence to prevent undefined function errors

**Files Changed:**

- `checkit-core.psm1`

**Impact:** Module initialization sequence now reliable, preventing startup errors and ensuring all functions are available when globals are initialized.

---

## 2025-06-02 - Guidelines Accuracy Update

**Type:** Documentation

**Key Changes:**

- Updated function status listings to reflect actual implementation state rather than assumptions
- Corrected dependency analysis to show realistic implementation requirements
- Emphasized that most functions have placeholder implementations requiring completion
- Updated priority implementation order based on actual code analysis
- Established accurate baseline for tracking completion progress

**Files Changed:**

- `Checkit-Guidelines.md`

**Impact:** Guidelines now provide accurate roadmap for development with realistic assessment of current state and clear priorities for completion.

---



