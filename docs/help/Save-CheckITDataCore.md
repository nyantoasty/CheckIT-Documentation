---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Save-CheckITDataCore

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Save-CheckITDataCore

## SYNOPSIS

Saves CheckIT data (Reports, NodeList, Preferences, Templates) to disk as JSON with security controls.

## SYNTAX





Save-CheckITDataCore [[-Path] <String>] [[-PromptUser] <Boolean>]





## DESCRIPTION

Serializes the current session's Reports, NodeList, Preferences, and Templates to a JSON file for persistence across sessions.
Ensures all global stores are properly structured before saving and automatically updates preferences.

✅ SECURITY POLICY: Credentials are NEVER saved to disk for security reasons - they remain session-only.

Data Structure Saved:

- Reports: Business reports with versioning and export capabilities
- NodeList: Computer inventory with status tracking (saved in Reports\['NodeList'\])
- TaskLog: Comprehensive audit trail for all operations
- ErrorLog: Centralized error tracking and analysis
- Preferences: User configuration and customization settings
- Templates: Reusable command, test, and codebase templates (Command, Test, Codebase)

The function automatically ensures proper hashtable structure and handles legacy upgrades by adding missing keys.
All data is stored with UTF-8 encoding and includes metadata (version, save timestamp, security note).

## EXAMPLES

### EXAMPLE 1





Save-CheckITDataCore
# Saves to default "CheckIT_Reports.json" with console output





### EXAMPLE 2





Save-CheckITDataCore -Path "C:\Transcripts\CheckIT_Reports.json"
# Saves to specific path with full console feedback





### EXAMPLE 3





Save-CheckITDataCore -Path "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').json" -PromptUser:$false
# Silent save with timestamped filename for automation





### EXAMPLE 4





# Error handling pattern for automation
try {
    Save-CheckITDataCore -Path $backupPath -PromptUser:$false
    Write-Log "CheckIT data saved successfully"
} catch {
    Write-Error "Failed to save CheckIT data: $($_.Exception.Message)"
}





### EXAMPLE 5





# Save before major operations
Save-CheckITDataCore -Path "pre_operation_backup.json"
# Perform risky operations...
# Load-CheckITDataCore -Path "pre_operation_backup.json" # if needed





## PARAMETERS

### -Path

The file path where the data will be saved.
Defaults to "CheckIT_Reports.json" in the current directory.
Supports relative and absolute paths.
The directory must exist and be writable.

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

Controls output behavior:

- $true (default): Displays colored status messages and confirmations to the console
- $false: Operates silently for GUI/automation scenarios - no console output

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

### None. This function performs file I/O operations as a side effect

### Success Indicators

### - PromptUser=$true: Green success message displayed to console

### - PromptUser=$false: No output, no exceptions thrown

### Error Indicators

### - PromptUser=$true: Red error message displayed to console

### - PromptUser=$false: No console output, but exceptions may be thrown

### File Output

### Creates a JSON file containing the complete CheckIT data structure with

### - Reports: All CheckIT stores in hashtable format

### - Version: Data format version (currently "1.3")

### - SecurityNote: Reminder about credential security policy

### - SavedAt: ISO timestamp of when the data was saved

## NOTES

Security Features:

- Credentials are NEVER written to disk - session-only storage for maximum security
- All user input and configuration data is sanitized before saving
- File operations use UTF-8 encoding for cross-platform compatibility

Data Structure Management:

- Automatically ensures $global:Reports is a properly structured hashtable
- Adds missing keys for legacy compatibility (NodeList, TaskLog, ErrorLog, Reports, Preferences, Templates)
- Updates Templates structure to include Command, Test, and Codebase substores
- Synchronizes global preferences before saving

File Format:

- JSON with 8-level depth for complex nested structures
- UTF-8 encoding for international character support
- Self-documenting with version and timestamp metadata

Error Handling:

- Graceful handling of file system errors (permissions, disk space, path issues)
- Automatic structure repair if global stores are corrupted
- Console feedback respects PromptUser parameter for automation compatibility

Performance Considerations:

- Serialization depth limited to 8 levels to prevent infinite recursion
- Minimal memory footprint during JSON conversion
- Fast file I/O with single write operation

Related Workflows:

- Save before risky operations or major changes
- Regular backups of CheckIT session data
- Data migration between environments
- Session persistence across PowerShell restarts


