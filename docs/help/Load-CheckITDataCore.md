---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Load-CheckITDataCore

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Load-CheckITDataCore

## SYNOPSIS

Loads CheckIT data (Reports, NodeList, CredStore, Preferences, Templates) from disk with automatic structure validation and security controls.

## SYNTAX





Load-CheckITDataCore [[-Path] <String>] [[-PromptUser] <Boolean>]





## DESCRIPTION

Deserializes a JSON file containing CheckIT session data and restores all global stores including Reports, NodeList,
Preferences, and Templates.
Ensures proper hashtable structure with all required keys and handles both current
(hashtable) and legacy (array) data formats seamlessly.

✅ SECURITY POLICY: Credentials are NEVER loaded from disk for security reasons - they remain session-only.

Data Structure Restored:

- Reports: Business reports with versioning and export capabilities  
- NodeList: Computer inventory with status tracking (restored from Reports\['NodeList'\])
- TaskLog: Comprehensive audit trail for all operations
- ErrorLog: Centralized error tracking and analysis
- Preferences: User configuration and customization settings (copied to $global:CheckIT_Preferences)
- Templates: Reusable command, test, and codebase templates (Command, Test, Codebase)

The function automatically validates and repairs data structure integrity, adds missing keys for legacy
compatibility, and sets $global:nodeList to the most recent NodeList report by timestamp.

## EXAMPLES

### EXAMPLE 1





Load-CheckITDataCore
# Loads from default "CheckIT_Reports.json" with full console output





### EXAMPLE 2





Load-CheckITDataCore -Path "C:\Transcripts\CheckIT_Reports.json"
# Loads from specific path with detailed status reporting





### EXAMPLE 3





Load-CheckITDataCore -Path "backup_20250611_143022.json" -PromptUser:$false
# Silent load from timestamped backup file for automation





### EXAMPLE 4





# Error handling pattern for automation scripts
try {
    Load-CheckITDataCore -Path $dataPath -PromptUser:$false
    Write-Log "CheckIT data loaded successfully: $($global:nodeList.Count) nodes"
} catch {
    Write-Error "Failed to load CheckIT data: $($_.Exception.Message)"
    # Initialize empty structures for graceful degradation
    Ensure-CheckITGlobals
}





### EXAMPLE 5





# Session restoration workflow
if (Test-Path "CheckIT_Reports.json") {
    Load-CheckITDataCore
    Write-Host "Session restored: $($global:nodeList.Count) nodes loaded"
} else {
    Write-Host "No saved session found - starting fresh"
    Ensure-CheckITGlobals
}





### EXAMPLE 6





# Data migration between environments
Load-CheckITDataCore -Path "\\server\share\CheckIT_Export.json"
Save-CheckITDataCore -Path "Local_Import_$(Get-Date -Format 'yyyyMMdd').json"





## PARAMETERS

### -Path

The file path to load CheckIT data from.
Defaults to "CheckIT_Reports.json" in the current directory.
Supports both relative and absolute paths.
The file must exist and be readable.

File Format Requirements:

- Must be valid JSON with UTF-8 encoding
- Should contain a 'Reports' key with CheckIT data structure
- Legacy formats (direct arrays) are automatically converted

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: CheckIT_Reports.json
Accept pipeline input: False
Accept wildcard characters: False





### -PromptUser

Controls output behavior and user interaction:

- $true (default): Displays colored status messages, progress updates, and detailed loading information
- $false: Operates silently for GUI/automation scenarios with minimal console output

Silent mode still writes to error streams for proper error handling in automation scripts.

```yaml
Type: Boolean
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: True
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

## OUTPUTS

### None. This function performs data restoration as a side effect by modifying global variables

### Success Indicators

### - PromptUser=$true: Green success messages with item counts displayed to console

### - PromptUser=$false: No console output, no exceptions thrown, global variables populated

### Error Indicators

### - PromptUser=$true: Red error messages with stack trace displayed to console

### - PromptUser=$false: No console output, but exceptions may be thrown for automation handling

### Global Variables Modified

### - $global:Reports: Master hashtable with all CheckIT stores (NodeList, TaskLog, ErrorLog, Reports, Preferences, Templates)

### - $global:CheckIT_Preferences: User configuration copied from Reports['Preferences']  

### - $global:nodeList: Array of node objects from most recent NodeList report (normalized with New-NodeObject)

### - $global:CredStore: Initialized as empty (never loaded from disk for security)

## NOTES

Security Features:

- Credentials are NEVER loaded from disk - session-only storage for maximum security
- CredStore is always initialized as empty regardless of file contents
- All user data is validated and sanitized during load process
- File operations use UTF-8 encoding for cross-platform compatibility

Data Structure Management:

- Uses -AsHashtable for proper PowerShell hashtable structure (critical for bracket notation access)
- Automatically adds missing keys for legacy compatibility (NodeList, TaskLog, ErrorLog, Reports, Preferences, Templates)
- Ensures Templates substructure includes Command, Test, and Codebase stores
- Normalizes all node objects using New-NodeObject for consistency

NodeList Restoration Logic:

- Finds most recent NodeList report by Timestamp or ReportName (descending sort)
- Extracts Data property and normalizes each node object
- Handles missing or empty Data gracefully with empty array fallback
- Updates global nodeList with standardized node objects

Legacy Format Support:

- Automatically detects and converts legacy array-based formats
- Preserves all existing data while upgrading structure
- Maintains backward compatibility with older CheckIT versions

Error Handling:

- Graceful handling of missing files (returns silently)
- Validates JSON content before parsing (handles empty files)
- Comprehensive error logging with stack traces in CLI mode
- Structured error objects suitable for automation scenarios

Performance Considerations:

- Single-pass JSON deserialization with -AsHashtable for efficiency
- Minimal memory footprint during data restoration
- Fast hashtable operations for structure validation
- Optimized node object normalization process

Related Workflows:

- Load session data at application startup
- Restore from backups after system issues  
- Import data from other CheckIT installations
- Migrate configurations between environments

Troubleshooting:

- File not found: Check path and file permissions
- Empty file: Verify file wasn't corrupted during save
- JSON parse errors: Validate file format and encoding
- Structure errors: Use Ensure-CheckITGlobals to rebuild defaults



