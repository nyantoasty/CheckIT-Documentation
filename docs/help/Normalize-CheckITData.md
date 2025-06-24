---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---
# Normalize-CheckITData

---
external help file: checkit-core-help.xml
Module Name: checkit-core
online version:
schema: 2.0.0
---

# Normalize-CheckITData

## SYNOPSIS

Normalizes CheckIT data structures to ensure consistent PSCustomObject formatting and proper array handling.

## SYNTAX





Normalize-CheckITData [[-Data] <Hashtable>]





## DESCRIPTION

Converts and standardizes CheckIT data structures to ensure compatibility across all CheckIT functions.
Handles both current (hashtable) and legacy (array) data formats by normalizing them to the expected
structure with proper PSCustomObject formatting.

This function is critical for data import/export operations, ensuring that all data maintains the
correct structure regardless of source format.
It handles complex nested data structures and
ensures that all objects are properly typed for downstream processing.

Key Normalization Operations:

- Converts legacy array formats to proper hashtable structure
- Ensures all data items are PSCustomObjects for consistent property access
- Normalizes Reports data with proper Data array structure
- Converts hashtables to PSCustomObjects in TaskLog and ErrorLog
- Preserves Preferences and Templates as hashtables for bracket notation access
- Handles NodeList normalization using New-NodeObject for standardization

## EXAMPLES

### EXAMPLE 1





# Normalize a hashtable with mixed data types
$data = @{
    NodeList = @("PC1", "PC2")
    Reports = @(@{ ReportName = "Test"; Data = @{ Node = "PC1"; Status = "OK" } })
    TaskLog = @(@{ Task = "Test"; Result = "Success" })
    Preferences = @{ Setting1 = "Value1" }
}
$normalized = Normalize-CheckITData -Data $data
# Returns properly structured data with PSCustomObjects





### EXAMPLE 2





# Handle legacy array format
$legacyData = @("PC1", "PC2", "PC3")
$normalized = Normalize-CheckITData -Data $legacyData
# Converts to: @{ Reports = @("PC1", "PC2", "PC3") }





### EXAMPLE 3





# Normalize Reports with complex Data structures
$reportsData = @{
    Reports = @(
        @{
            ReportName = "Software_Audit"
            Data = @{ Software = "Office"; Version = "2021" }  # Single hashtable
        },
        @{
            ReportName = "Hardware_Check" 
            Data = @("Result1", "Result2")  # Array of strings
        }
    )
}
$normalized = Normalize-CheckITData -Data $reportsData
# Ensures all Data entries are arrays of PSCustomObjects





### EXAMPLE 4





# Import and normalize data from external source
$importedData = Import-Csv "data.csv" | ConvertTo-Json | ConvertFrom-Json -AsHashtable
$normalized = Normalize-CheckITData -Data $importedData
# Ensures compatibility with CheckIT data structures





### EXAMPLE 5





# Error handling for invalid input
try {
    $invalid = "not a hashtable or array"
    Normalize-CheckITData -Data $invalid
} catch {
    Write-Error "Input must be a hashtable or array: $($_.Exception.Message)"
}





## PARAMETERS

### -Data

The data structure to normalize.
Must be a hashtable or array.

Supported Input Formats:

- Hashtable with CheckIT store structure (NodeList, Reports, TaskLog, etc.)
- Array of data (automatically wrapped as Reports structure)
- Mixed data types with nested hashtables and arrays

The function will validate input type and throw an error for unsupported formats.

```yaml
Type: Hashtable
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False





## INPUTS

### [hashtable] or [array] - The data structure to normalize

## OUTPUTS

### [hashtable] - Normalized data structure with consistent PSCustomObject formatting

### Output Structure

### - All array elements are properly typed PSCustomObjects

### - Reports Data arrays contain standardized objects

### - NodeList items are normalized using New-NodeObject

### - TaskLog and ErrorLog contain PSCustomObjects

### - Preferences and Templates remain as hashtables for bracket notation access

## NOTES

Data Structure Handling:

- Legacy array inputs are automatically wrapped as Reports structure
- Reports.Data handling ensures consistent array formatting:
  - Single hashtables are converted to PSCustomObject arrays
  - Non-enumerable objects are wrapped in arrays
  - Existing arrays have all items converted to PSCustomObjects
- Empty or missing Data properties are initialized as empty arrays

Store-Specific Processing:

- NodeList: Uses New-NodeObject for complete standardization
- Reports: Complex Data array normalization with type conversion
- TaskLog/ErrorLog: Hashtable to PSCustomObject conversion
- Preferences: Hashtable structure preserved for bracket notation
- Templates: Hashtable structure preserved for bracket notation

Type Safety:

- All input is validated before processing
- Consistent PSCustomObject output for array elements
- Preserves data integrity while ensuring compatibility

Performance Considerations:

- Single-pass processing for efficiency
- Minimal object creation and copying
- Optimized for large data structures

Error Handling:

- Validates input type before processing
- Throws descriptive errors for unsupported input types
- Graceful handling of missing or null properties

Integration Points:

- Called by Load-CheckITDataCore for data restoration
- Used by Import-CheckITData for external data import
- Integrated with Save-CheckITDataCore for pre-save validation
- Essential for cross-environment data migration

Development Notes:

- Always use this function when importing external data
- Required for maintaining data structure consistency
- Critical for ensuring bracket notation access works correctly
- Must be called before storing data in global CheckIT stores



