---
title: Internal Helper Functions
layout: default
---

<link rel="stylesheet" href="../assets/style.css">

---

> This document describes internal helper functions used within the CheckIT-Core module.
> These functions are not exported and are only for internal use by other module functions.

## Internal Helper Functions

### Apply-StandardCleaning

**Purpose:** Standardizes and cleans data values for consistent reporting and display.

**Used by:** `Convert-ReportData`, various data processing functions

**Description:** Takes raw data values and applies context-aware cleaning rules based on the property name and value type.

### Get-DefaultDisplayValue

**Purpose:** Provides context-aware default values for empty or missing data.

**Used by:** Data processing and reporting functions

**Description:** Returns appropriate placeholder text based on property name when a value is null or empty.

### Sanitize-PreferenceInput

**Purpose:** Validates and normalizes user preference inputs.

**Used by:** `Set-UserPreference`, preference management functions

**Description:** Ensures preference values meet expected format and constraints.

### Sanitize-Input

**Purpose:** Generic input sanitization for security and validation.

**Used by:** Multiple functions requiring input validation

**Description:** Removes potentially harmful characters and ensures inputs meet expected formats.

### ConvertTo-SafeDate

**Purpose:** Safely converts various date/time formats to standard DateTime objects.

**Used by:** Date processing functions, WMI date conversions

**Description:** Handles multiple date formats and provides graceful error handling for invalid dates.

## Maintenance Notes

- Internal helper functions should be placed in the `#region Internal Helper Functions` section
- These functions should never be exported in the module manifest
- When adding or modifying helper functions, update this documentation file
- Helper function names should clearly indicate their internal status (e.g., prefix with "Internal-")