### Template System


<div class='function-card'>
  <h3>🛠️ Ensure-Templates</h3>
  <div class='function-description'>
    Ensures all built-in templates are loaded into the global template store.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Force</code>: If set, overwrites existing templates with built-in versions.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Invoke-TemplateCommand</h3>
  <div class='function-description'>
    Executes command templates against target nodes with parallel processing and comprehensive error handling.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>TemplateName</code>: Name of the command template to execute. Can be built-in or user-defined template.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Invoke-TemplateWorkflow</h3>
  <div class='function-description'>
    Executes multiple templates in sequence with optional Excel export.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Target nodes for all templates.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Manage-Templates</h3>
  <div class='function-description'>
    Manage built-in and user-defined templates for remote commands, functionality tests, and code patterns.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Type</code>: The template type: Command, Test, or Codebase.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ New-SystemTestTemplate</h3>
  <div class='function-description'>
    Quick helper to create common system test templates.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Type</code>: Type of test: Basic, Extended, Software, Hardware.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ New-TestTemplate</h3>
  <div class='function-description'>
    Interactive or programmatic generator for dynamic test templates.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>PromptUser</code>: If $true (default), prompts the user for each step.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

### Error Handling


<div class='function-card'>
  <h3>🛠️ Is-TaskLogError</h3>
  <div class='function-description'>
    Determines if a task log row represents an error or failure.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Row</code>: The log row object to check.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Manage-Store</h3>
  <div class='function-description'>
    View, preview, drill down, and clear CheckIT virtual stores including NodeList, Reports, TaskLog, ErrorLog, Preferences, Templates, and CredStore.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Store</code>: Which store to manage.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ New-ErrorRecord</h3>
  <div class='function-description'>
    Creates a standardized error record object for CheckIT error logging and reporting.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: The node name related to the error (optional).</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

### Report Generation


<div class='function-card'>
  <h3>🛠️ Build-Report</h3>
  <div class='function-description'>
    Adds a result to a named report batch and to the daily worklog batch.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Batch</code>: {{ Fill Batch Description }}</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Clean-ExcelColumnName</h3>
  <div class='function-description'>
    Sanitizes column names for Excel compatibility, especially for pivot tables and slicers.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>ColumnName</code>: The column name string to clean and make Excel-compatible.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Convert-ReportData</h3>
  <div class='function-description'>
    Post-processes raw template data for clean reporting while preserving original audit data.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>RawData</code>: Array of raw data objects from template execution or CheckIT functions.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Export-ToExcel</h3>
  <div class='function-description'>
    Exports objects or report data to an Excel file using the Excel COM object (no ImportExcel dependency).
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>InputObject</code>: The objects to export (accepts pipeline input).</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-SafeReportFilename</h3>
  <div class='function-description'>
    Returns a safe filename for a report export.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Function</code>: {{ Fill Function Description }}</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Import-FromExcel</h3>
  <div class='function-description'>
    Imports data from an Excel file using COM objects.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Path</code>: Path to the Excel file to import.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Set-Report</h3>
  <div class='function-description'>
    Adds or manages a report entry in the global Reports store for CheckIT.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>ReportName</code>: Name of the report.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

### Node Management


<div class='function-card'>
  <h3>🛠️ Add-SkipNode</h3>
  <div class='function-description'>
    Adds a node to the global skip list for exclusion from operations.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: The node name to add to the skip list.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Ensure-NodeADInfo</h3>
  <div class='function-description'>
    Ensures a node object has complete Active Directory information (OS and OU) by querying AD if needed.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: The node object to check and potentially enrich with Active Directory information. The object must have a 'Node' property containing the computer name.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-NodeCredAndFQDN</h3>
  <div class='function-description'>
    Retrieves the credential and FQDN for a node object or node name with comprehensive credential validation and error handling.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: The node object or node name for which to retrieve credentials and FQDN information. Supports flexible input formats for seamless integration with CheckIT workflows.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Invoke-NodeCommand</h3>
  <div class='function-description'>
    Safely runs commands or scriptblocks on multiple nodes with comprehensive logging, dry-run support, and robust error handling
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node objects or node names to execute commands on. Supports both string arrays and CheckIT node objects with automatic normalization.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ New-NodeObject</h3>
  <div class='function-description'>
    Creates a standardized node object for the CheckIT NodeList with all required properties and automatic status management.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>inputObj</code>: The node data to standardize.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ NodeList</h3>
  <div class='function-description'>
    Manage and manipulate the global CheckIT node list with comprehensive CRUD operations and advanced features.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Action</code>: The operation to perform on the NodeList.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Resolve-NodeObjects</h3>
  <div class='function-description'>
    {{ Fill in the Synopsis }}
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>AutoRemove</code>: {{ Fill AutoRemove Description }}</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Test-NodeConnection</h3>
  <div class='function-description'>
    Tests connectivity, WinRM, WSMan authentication, and Win32PowerManagement service for nodes, with robust parallel and reporting support.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node objects or node names to test.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Update-NodeFromResult</h3>
  <div class='function-description'>
    Updates node properties in the global NodeList from function execution results with selective property updates.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>result</code>: The result object containing node information to update. Must have a 'Node' property with a valid node name. Only properties that exist in this object and have non-null values will be updated in the NodeList.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

### Core Data Collection


<div class='function-card'>
  <h3>🛠️ Get-ADMembership</h3>
  <div class='function-description'>
    Retrieves comprehensive AD group membership and metadata for computers or users with detailed property information.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>User</code>: One or more usernames to query for group membership and profile information.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-AllColumns</h3>
  <div class='function-description'>
    Gets all unique column names from an array of objects.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Data</code>: Array of objects to examine.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-AvailablePackages</h3>
  <div class='function-description'>
    Discovers available SCCM packages from a sample node.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>SearchPattern</code>: Wildcard pattern to filter packages (default: "*").</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-CCMPackages</h3>
  <div class='function-description'>
    Retrieves CCM package status from all specified nodes with per-node state tracking and deployment readiness analysis
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node names or node objects to query for CCM package information. Accepts both string arrays and CheckIT node objects from the global node list.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-CheckITColumns</h3>
  <div class='function-description'>
    {{ Fill in the Synopsis }}
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Store</code>: {{ Fill Store Description }}</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-CheckITStore</h3>
  <div class='function-description'>
    Safely retrieves or clears a CheckIT store (NodeList, Reports, TaskLog, ErrorLog, Preferences, CredStore).
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Store</code>: The store to retrieve: NodeList, Reports, TaskLog, ErrorLog, Preferences, CredStore.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-FriendlySize</h3>
  <div class='function-description'>
    Converts byte values to human-readable size strings.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>bytes</code>: The number of bytes to convert to a friendly format.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-OUComputerSummary</h3>
  <div class='function-description'>
    Generates comprehensive organizational unit summaries with computer counts, OS distribution, and connectivity status from Active Directory.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>BaseOU</code>: Specifies the base organizational unit for the search. Supports built-in mappings for common OU structures.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-PassManInfo</h3>
  <div class='function-description'>
    Interactively collects and validates work order number and reason for Passman credential requests with comprehensive input sanitization.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>TargetNodes</code>: Array of target computer names that will receive the credential request. Used for context and included in the returned information but does not affect validation logic.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-TaskLogErrors</h3>
  <div class='function-description'>
    Filters task log rows for error or failure conditions.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>LogRows</code>: Array of log row objects to filter.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-UserPreference</h3>
  <div class='function-description'>
    Retrieves a user preference for a specific function in CheckIT.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Function</code>: The name of the function or context for which the preference is being retrieved.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-Users</h3>
  <div class='function-description'>
    Retrieves all user sessions and session details for each remote node.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node objects or node names.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-ValidCred</h3>
  <div class='function-description'>
    Checks for valid credentials for one or more nodes, and optionally retrieves them via Passman if missing or expired with comprehensive validation and automatic management.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node names or node objects for credential validation. Supports flexible input formats for seamless integration with CheckIT workflows.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-ValidCredStatus</h3>
  <div class='function-description'>
    Lightweight wrapper for Get-ValidCred that returns only node names and credential status for quick credential validation across multiple nodes.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node names or node objects for credential status validation. Supports the same flexible input formats as Get-ValidCred.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Get-WorklogBatchName</h3>
  <div class='function-description'>
    Returns a batch name for worklog reports.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Author</code>: {{ Fill Author Description }}</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Import-CheckITData</h3>
  <div class='function-description'>
    Imports Excel data and routes it to the appropriate CheckIT global store (NodeList, Reports, TaskLog, ErrorLog, Templates, Preferences, CredStore).
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Path</code>: Path to the Excel file to import.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Load-CheckITDataCore</h3>
  <div class='function-description'>
    Loads CheckIT data (Reports, NodeList, CredStore, Preferences, Templates) from disk with automatic structure validation and security controls.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Path</code>: The file path to load CheckIT data from.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Normalize-CheckITData</h3>
  <div class='function-description'>
    Normalizes CheckIT data structures to ensure consistent PSCustomObject formatting and proper array handling.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Data</code>: The data structure to normalize.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Save-CheckITDataCore</h3>
  <div class='function-description'>
    Saves CheckIT data (Reports, NodeList, Preferences, Templates) to disk as JSON with security controls.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Path</code>: The file path where the data will be saved.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

### Utility Functions


<div class='function-card'>
  <h3>🛠️ about_CheckIT-Core</h3>
  <div class='function-description'>
    Core module for CheckIT: comprehensive node management, credential handling, diagnostics, reporting, and automation.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ AD</h3>
  <div class='function-description'>
    Updates node objects with OS and OU information from Active Directory with automatic NodeList integration.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node objects to update with AD information. Each object must have a 'Node' property containing the computer name to search for in Active Directory.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Add-ChangelogEntry</h3>
  <div class='function-description'>
    Creates and adds a standardized entry to the project's CHANGELOG.md file.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Convert-WMIDateTime</h3>
  <div class='function-description'>
    Converts WMI datetime format to readable date string
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>WMIDateTime</code>: WMI datetime string in format like `20250607000000.000000+***` or `20250607</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ ConvertTo-PSCustomObject</h3>
  <div class='function-description'>
    Recursively converts hashtables to PSCustomObjects with deep conversion support.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>ht</code>: The hashtable to convert to PSCustomObject.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Ensure-CheckITGlobals</h3>
  <div class='function-description'>
    Ensures all global CheckIT stores and variables are properly initialized with correct types.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Ensure-GlobalCredStore</h3>
  <div class='function-description'>
    Ensures the global credential store exists, is initialized, and is not expired with optional NodeList synchronization and missing credential management.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>SyncNodeList</code>: Enables synchronization with the NodeList to identify nodes missing credentials and optionally resolve them via Passman.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Generate-DocumentationAnalysisPrompt</h3>
  <div class='function-description'>
    Generates an intelligent AI assistant prompt for documentation analysis and follow-up tasks.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Summary</code>: A summary of recent code changes or feature additions that need documentation.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Invoke-CCMPackageDeployment</h3>
  <div class='function-description'>
    SCCM package deployment with package discovery and selection using All/Specific search modes.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node objects or node names.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Invoke-Pivotizer</h3>
  <div class='function-description'>
    Adds a pivot table and slicers to an Excel worksheet exported by Export-ToExcel.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>ExcelPath</code>: Path to the Excel file.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Invoke-TestStep</h3>
  <div class='function-description'>
    Executes a single test step for a node, supporting all step types and both CLI and GUI workflows.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Step</code>: The test step object (from a template), must include .Name, .Type, and other relevant properties.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Open-RemoteExplorer</h3>
  <div class='function-description'>
    Opens Windows Explorer to a remote computer's C$ share using stored credentials.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: Single node name (string) or node object with .Node property.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Open-RemoteSystemTools</h3>
  <div class='function-description'>
    Opens Computer Management and other MMC tools connected to a remote computer.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: Single node name (string) or node object with .Node property.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Passman</h3>
  <div class='function-description'>
    Retrieve administrator credentials from Passman for valid Active Directory nodes with comprehensive validation and security controls.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Nodes</code>: Array of node objects or node names for credential retrieval. Supports multiple input formats and automatic resolution from the global NodeList.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Process-Parallel</h3>
  <div class='function-description'>
    Runs a scriptblock in parallel for each input object, collecting results with credential support and real-time progress reporting
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>InputObject</code>: The objects to process (accepts pipeline input). Can be node objects, strings, or any data type. Objects with a .Node property are automatically recognized for credential resolution.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ SanityCheck</h3>
  <div class='function-description'>
    Checks for common configuration issues for CLI/GUI.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>PromptUser</code>: {{ Fill PromptUser Description }}</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Select-OUComputers</h3>
  <div class='function-description'>
    Interactive organizational unit computer selection with automatic NodeList integration and comprehensive filtering options.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>BaseOU</code>: Specifies the base organizational unit for computer discovery. Supports built-in mappings for common organizational structures.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Select-PackageForDeployment</h3>
  <div class='function-description'>
    Interactive package selection for deployment.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>PromptUser</code>: CLI vs GUI mode control.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Set-UserPreference</h3>
  <div class='function-description'>
    Sets or interactively configures user preferences for CheckIT functions.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Function</code>: The function/context for the preference.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Show-CredentialClipboard</h3>
  <div class='function-description'>
    Interactively or programmatically retrieve and copy credentials for one or more nodes from the global credential store with secure clipboard integration.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: Array of node names or node objects for credential retrieval and clipboard operations. Supports flexible input formats consistent with CheckIT patterns.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Show-PreferenceHelp</h3>
  <div class='function-description'>
    Displays an explanation for a user preference key from the help of a specified function.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Function</code>: The name of the function whose help should be searched.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Start-Test</h3>
  <div class='function-description'>
    Runs a dynamic test template (manual and automated steps) against local or remote nodes, supporting CLI and GUI, resuming, and parallel unattended execution.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>TemplateName</code>: Name of the test template to use (from $global:Reports\['Templates'\]\['Test'\]).</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Test-AlternativeShares</h3>
  <div class='function-description'>
    {{ Fill in the Synopsis }}
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: {{ Fill Node Description }}</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Test-RemoteSystemAccess</h3>
  <div class='function-description'>
    Tests if the stored Administrator credentials can access remote system management tools.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Node</code>: The target node to test access against.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Update-Progress</h3>
  <div class='function-description'>
    Updates progress indicators for both CLI and GUI scenarios.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Activity</code>: The name of the activity being performed.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Write-Color</h3>
  <div class='function-description'>
    Writes colored text to the console, supporting multiple colors per message.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>Text</code>: Array of strings to write.</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>

<div class='function-card'>
  <h3>🛠️ Write-TaskLog</h3>
  <div class='function-description'>
    Logs task results as a report entry in the global Reports\['TaskLog'\] store.
  </div>
  <div class='function-section'><strong>Parameters:</strong></div>
  <ul class='param-list'>
    <li><span class='param-icon'>🔸</span> <code>InputObject</code>: The objects to log (accepts pipeline input).</li>
  </ul>
  <div class='returns-section'><span class='returns-icon'>📤</span> <strong>Returns:</strong> </div>
  
</div>
