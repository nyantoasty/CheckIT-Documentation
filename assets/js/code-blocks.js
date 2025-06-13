document.addEventListener('DOMContentLoaded', function() {
  // Clean up code block structure and fix styling
  function fixCodeBlocks() {
    // Find all code blocks
    const blocks = document.querySelectorAll('div.highlight');
    
    blocks.forEach(function(block) {
      // Find language from class
      const classes = block.className.split(' ');
      let language = 'POWERSHELL'; // Default
      
      for (const className of classes) {
        if (className.startsWith('language-')) {
          language = className.replace('language-', '').toUpperCase();
          break;
        }
      }
      
      // Check if this block is already properly wrapped
      let codeExample = block.parentElement;
      if (!codeExample.classList.contains('code-example')) {
        // Create wrapper if not exists
        codeExample = document.createElement('div');
        codeExample.className = 'code-example';
        block.parentNode.insertBefore(codeExample, block);
        codeExample.appendChild(block);
      }
      
      // Set data attribute on wrapper, not on highlight div
      codeExample.setAttribute('data-language', language);
      
      // Remove any existing headers/duplicate elements
      const existingHeaders = block.querySelectorAll('[data-language]');
      existingHeaders.forEach(header => header.removeAttribute('data-language'));
      
      // Remove any existing copy buttons
      const existingButtons = codeExample.querySelectorAll('.copy-button');
      existingButtons.forEach(button => button.remove());
      
      // Add copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.innerHTML = 'Copy';
      copyButton.style.zIndex = '15';
      codeExample.appendChild(copyButton);
      
      copyButton.addEventListener('click', function() {
        // Get code text without line numbers
        let codeText;
        const codeElement = block.querySelector('.rouge-code');
        
        if (codeElement) {
          codeText = codeElement.innerText;
        } else {
          codeText = block.innerText;
        }
        
        // Clean up the code
        codeText = codeText.replace(/^\s*\d+\s+/gm, ''); // Remove line numbers
        
        // Copy to clipboard
        navigator.clipboard.writeText(codeText).then(function() {
          copyButton.innerHTML = 'Copied!';
          copyButton.classList.add('copied');
          
          setTimeout(function() {
            copyButton.innerHTML = 'Copy';
            copyButton.classList.remove('copied');
          }, 2000);
        })
        .catch(function(err) {
          console.error('Failed to copy: ', err);
          copyButton.innerHTML = 'Error!';
          
          setTimeout(function() {
            copyButton.innerHTML = 'Copy';
          }, 2000);
        });
      });
      
      // Fix table structure for proper alignment
      const table = block.querySelector('table');
      if (table) {
        // Apply proper styles to table
        table.style.width = '100%';
        table.style.tableLayout = 'fixed';
        table.style.borderCollapse = 'collapse';
        table.style.margin = '0';
        table.style.padding = '0';
        
        // Fix table rows
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          row.style.display = 'table-row';
          row.style.width = '100%';
        });
        
        // Fix line number column
        const gutterCell = block.querySelector('.rouge-gutter');
        if (gutterCell) {
          gutterCell.style.width = '3rem';
          gutterCell.style.minWidth = '3rem';
          gutterCell.style.maxWidth = '3rem';
          gutterCell.style.boxSizing = 'border-box';
          gutterCell.style.textAlign = 'right';
          gutterCell.style.paddingRight = '0.75rem';
          gutterCell.style.paddingLeft = '0.5rem';
          gutterCell.style.verticalAlign = 'top';
        }
        
        // Fix code column
        const codeCell = block.querySelector('.rouge-code');
        if (codeCell) {
          codeCell.style.width = 'auto';
          codeCell.style.boxSizing = 'border-box';
          codeCell.style.paddingLeft = '1rem';
          codeCell.style.verticalAlign = 'top';
        }
      }
      
      // Fix pre element
      const preElement = block.querySelector('pre');
      if (preElement) {
        preElement.style.margin = '0';
        preElement.style.padding = '0';
        preElement.style.whiteSpace = 'pre';
        preElement.style.overflowX = 'auto';
        preElement.style.width = '100%';
      }
      
      // Fix code element
      const codeElement = block.querySelector('code');
      if (codeElement) {
        codeElement.style.display = 'inline-block';
        codeElement.style.minWidth = '100%';
      }
    });
  }
  
  // Special function to fix index.md code blocks
  function fixIndexCodeBlocks() {
    // Target specifically the code blocks in quick-start-card
    const indexBlocks = document.querySelectorAll('.quick-start-card .code-example .highlight');
    
    indexBlocks.forEach(function(block) {
      // Fix table layout
      const table = block.querySelector('table');
      if (table) {
        table.style.width = '100%';
        table.style.tableLayout = 'fixed';
        table.style.borderCollapse = 'collapse';
        
        // Ensure line numbers are properly aligned
        const gutterCell = block.querySelector('.rouge-gutter');
        if (gutterCell) {
          gutterCell.style.width = '3rem';
          gutterCell.style.minWidth = '3rem';
          gutterCell.style.maxWidth = '3rem';
          gutterCell.style.paddingRight = '0.75rem';
          gutterCell.style.textAlign = 'right';
          gutterCell.style.verticalAlign = 'top';
        }
        
        // Ensure code cell uses remaining width
        const codeCell = block.querySelector('.rouge-code');
        if (codeCell) {
          codeCell.style.width = 'auto';
          codeCell.style.paddingLeft = '1rem';
          codeCell.style.verticalAlign = 'top';
        }
      }
      
      // Fix line numbers
      const lineNumbers = block.querySelectorAll('.lineno');
      lineNumbers.forEach(num => {
        num.style.textAlign = 'right';
        num.style.paddingRight = '0.5rem';
        num.style.width = '2rem';
        num.style.display = 'inline-block';
      });
    });
  }
  
  // NEW FUNCTION: Convert inline code to function links
  function convertFunctionLinks() {
    // Build function list from api-reference.md
    const knownFunctions = {
      // Core Functions and Utilities
      'Convert-ReportData': '/docs/api-reference#convert-reportdata',
      'Convert-WMIDateTime': '/docs/api-reference#convert-wmidatetime',
      'Get-AllColumns': '/docs/api-reference#get-allcolumns',
      'Get-CheckITColumns': '/docs/api-reference#get-checkitcolumns',
      'Get-FriendlySize': '/docs/api-reference#get-friendlysize', 
      'Write-Color': '/docs/api-reference#write-color',
      'Get-UserPreference': '/docs/api-reference#get-userpreference',
      'Set-UserPreference': '/docs/api-reference#set-userpreference',
      'Show-PreferenceHelp': '/docs/api-reference#show-preferencehelp',
      
      // Documentation & Maintenance
      'Add-ChangelogEntry': '/docs/api-reference#add-changelogentry',
      'Generate-DocumentationAnalysisPrompt': '/docs/api-reference#generate-documentationanalysisprompt',
      
      // Store Management
      'Ensure-CheckITGlobals': '/docs/api-reference#ensure-checkitglobals',
      'Get-CheckITStore': '/docs/api-reference#get-checkitstore',
      'Manage-Store': '/docs/api-reference#manage-store',
      'Save-CheckITDataCore': '/docs/api-reference#save-checkitdatacore',
      'Load-CheckITDataCore': '/docs/api-reference#load-checkitdatacore',
      'Normalize-CheckITData': '/docs/api-reference#normalize-checkitdata',
      
      // Template System
      'Ensure-Templates': '/docs/api-reference#ensure-templates',
      'Invoke-TemplateCommand': '/docs/api-reference#invoke-templatecommand',
      'Invoke-TemplateWorkflow': '/docs/api-reference#invoke-templateworkflow',
      'Manage-Templates': '/docs/api-reference#manage-templates',
      'New-SystemTestTemplate': '/docs/api-reference#new-systemtesttemplate',
      'New-TestTemplate': '/docs/api-reference#new-testtemplate',
      'Start-Test': '/docs/api-reference#start-test',
      'Invoke-TestStep': '/docs/api-reference#invoke-teststep',
      
      // Node Management
      'Add-SkipNode': '/docs/api-reference#add-skipnode',
      'New-NodeObject': '/docs/api-reference#new-nodeobject',
      'NodeList': '/docs/api-reference#nodelist',
      'Resolve-NodeObjects': '/docs/api-reference#resolve-nodeobjects',
      'Update-NodeFromResult': '/docs/api-reference#update-nodefromresult',
      
      // Credential Management
      'Ensure-GlobalCredStore': '/docs/api-reference#ensure-globalcredstore',
      'Get-NodeCredAndFQDN': '/docs/api-reference#get-nodecredandfqdn',
      'Get-PassManInfo': '/docs/api-reference#get-passmaninfo',
      'Get-ValidCred': '/docs/api-reference#get-validcred',
      'Get-ValidCredStatus': '/docs/api-reference#get-validcredstatus',
      'Passman': '/docs/api-reference#passman',
      'Show-CredentialClipboard': '/docs/api-reference#show-credentialclipboard',
      
      // Remote Operations
      'Invoke-NodeCommand': '/docs/api-reference#invoke-nodecommand',
      'Process-Parallel': '/docs/api-reference#process-parallel',
      'Get-Users': '/docs/api-reference#get-users',
      'Open-RemoteExplorer': '/docs/api-reference#open-remoteexplorer',
      'Open-RemoteSystemTools': '/docs/api-reference#open-remotesystemtools',
      'Test-AlternativeShares': '/docs/api-reference#test-alternativeshares',
      'Test-NodeConnection': '/docs/api-reference#test-nodeconnection',
      'Test-RemoteSystemAccess': '/docs/api-reference#test-remotesystemaccess',
      
      // Active Directory Functions
      'AD': '/docs/api-reference#ad',
      'Get-ADMembership': '/docs/api-reference#get-admembership',
      'Ensure-NodeADInfo': '/docs/api-reference#ensure-nodeadinfo',
      'Get-OUComputerSummary': '/docs/api-reference#get-oucomputersummary',
      'Select-OUComputers': '/docs/api-reference#select-oucomputers',
      
      // SCCM Functions
      'Get-AvailablePackages': '/docs/api-reference#get-availablepackages',
      'Get-CCMPackages': '/docs/api-reference#get-ccmpackages',
      'Invoke-CCMPackageDeployment': '/docs/api-reference#invoke-ccmpackagedeployment',
      'Select-PackageForDeployment': '/docs/api-reference#select-packagefordeployment',
      'Get-DeploymentPackage': '/docs/api-reference#get-deploymentpackage',
      'Get-DeploymentCommand': '/docs/api-reference#get-deploymentcommand',
      'New-PackageAuditCommand': '/docs/api-reference#new-packageauditcommand',
      
      // Reporting & Logging
      'Build-Report': '/docs/api-reference#build-report',
      'Clean-ExcelColumnName': '/docs/api-reference#clean-excelcolumnname',
      'Export-ToExcel': '/docs/api-reference#export-toexcel',
      'Get-SafeReportFilename': '/docs/api-reference#get-safereportfilename',
      'Get-TaskLogErrors': '/docs/api-reference#get-tasklogerrors',
      'Get-WorklogBatchName': '/docs/api-reference#get-worklogbatchname',
      'Import-CheckITData': '/docs/api-reference#import-checkitdata',
      'Import-FromExcel': '/docs/api-reference#import-fromexcel',
      'Invoke-Pivotizer': '/docs/api-reference#invoke-pivotizer',
      'Is-TaskLogError': '/docs/api-reference#is-tasklogerror',
      'New-ErrorRecord': '/docs/api-reference#new-errorrecord',
      'Set-Report': '/docs/api-reference#set-report',
      'Write-TaskLog': '/docs/api-reference#write-tasklog',
      
      // Utility & Support Functions
      'ConvertTo-PSCustomObject': '/docs/api-reference#convertto-pscustomobject',
      'SanityCheck': '/docs/api-reference#sanitycheck',
      'Update-Progress': '/docs/api-reference#update-progress',
      
      // Internal Helpers
      'Apply-StandardCleaning': '/docs/internal-helpers#apply-standardcleaning',
      'Get-DefaultDisplayValue': '/docs/internal-helpers#get-defaultdisplayvalue',
      'Sanitize-PreferenceInput': '/docs/internal-helpers#sanitize-preferenceinput',
      'Sanitize-Input': '/docs/internal-helpers#sanitize-input',
      'ConvertTo-SafeDate': '/docs/internal-helpers#convertto-safedate'
    };
    
    // Find all inline code elements (but not those inside code blocks)
    const inlineCodeElements = document.querySelectorAll('p code, li code, td code, h1 code, h2 code, h3 code, h4 code');
    
    inlineCodeElements.forEach(function(codeElement) {
      const functionName = codeElement.textContent.trim();
      
      // Check if this is a known function
      if (knownFunctions[functionName]) {
        // Create a new link element
        const linkElement = document.createElement('a');
        linkElement.href = knownFunctions[functionName];
        linkElement.className = 'function-link';
        linkElement.textContent = functionName;
        
        // Style it similar to code but with link styling
        linkElement.style.background = 'rgba(15, 20, 25, 0.5)';
        linkElement.style.color = '#93c5fd';
        linkElement.style.padding = '0.2rem 0.4rem';
        linkElement.style.borderRadius = '0.375rem';
        linkElement.style.fontSize = '0.9em';
        linkElement.style.fontFamily = "'JetBrains Mono', 'Fira Code', monospace";
        linkElement.style.border = '1px solid rgba(59, 130, 246, 0.2)';
        linkElement.style.textDecoration = 'none';
        
        // Add hover effect
        linkElement.addEventListener('mouseover', function() {
          this.style.border = '1px solid rgba(59, 130, 246, 0.8)';
          this.style.background = 'rgba(30, 41, 59, 0.8)';
          this.style.color = '#dbeafe';
        });
        
        linkElement.addEventListener('mouseout', function() {
          this.style.border = '1px solid rgba(59, 130, 246, 0.2)';
          this.style.background = 'rgba(15, 20, 25, 0.5)';
          this.style.color = '#93c5fd';
        });
        
        // Replace the code element with the link
        codeElement.parentNode.replaceChild(linkElement, codeElement);
      } else {
        // Just style normal inline code elements properly
        codeElement.style.background = 'rgba(15, 20, 25, 0.5)';
        codeElement.style.color = '#93c5fd';
        codeElement.style.padding = '0.2rem 0.4rem';
        codeElement.style.borderRadius = '0.375rem';
        codeElement.style.fontSize = '0.9em';
        codeElement.style.fontFamily = "'JetBrains Mono', 'Fira Code', monospace";
        codeElement.style.border = '1px solid rgba(59, 130, 246, 0.2)';
        codeElement.style.display = 'inline';
        codeElement.style.whiteSpace = 'nowrap';
      }
    });
  }
  
  // Run all fixing functions
  function applyAllFixes() {
    fixCodeBlocks();
    fixIndexCodeBlocks();
    convertFunctionLinks();
  }
  
  // Run fixes at multiple points to ensure they apply
  applyAllFixes();
  
  // Run fixes after a short delay
  setTimeout(applyAllFixes, 500);
  
  // Also run when window fully loads
  window.addEventListener('load', applyAllFixes);
});