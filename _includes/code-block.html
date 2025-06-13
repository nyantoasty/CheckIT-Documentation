document.addEventListener('DOMContentLoaded', function() {
  // Main function to fix code blocks
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

  // Direct fix for index.md - targeting the specific structure
  function fixIndexMdCodeBlocks() {
    // Directly modify the specific code blocks in index.md structure
    const codeBlocks = document.querySelectorAll('.quick-start-card .highlight');
    
    if (codeBlocks.length > 0) {
      console.log("Found index code blocks to fix:", codeBlocks.length);
      
      codeBlocks.forEach(function(block, index) {
        console.log(`Fixing index code block ${index + 1}`);
        
        // Clear any existing styles that might interfere
        block.style = "";
        block.removeAttribute("style");

        // Reset any margin/padding of the highlight block itself
        block.style.margin = "0";
        block.style.padding = "0";
        
        // Manually rebuild the internal structure if needed
        let table = block.querySelector('table');
        if (!table) {
          console.log("Table not found in code block, structure may be incorrect");
          return;
        }

        // Fix table and cell alignment
        table.style = ""; // Clear any styles
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.tableLayout = "fixed";
        
        // Make sure column widths are explicitly set
        const gutterCell = table.querySelector('.rouge-gutter');
        const codeCell = table.querySelector('.rouge-code');
        
        if (gutterCell && codeCell) {
          // Reset the cells first
          gutterCell.style = "";
          codeCell.style = "";
          
          // Set fixed width for gutter
          gutterCell.style.width = "40px";
          gutterCell.style.minWidth = "40px";
          gutterCell.style.maxWidth = "40px";
          gutterCell.style.paddingRight = "5px";
          gutterCell.style.borderRight = "1px solid rgba(100, 110, 130, 0.4)";
          gutterCell.style.textAlign = "right";
          gutterCell.style.verticalAlign = "top";
          
          // Code cell takes remaining space
          codeCell.style.width = "auto";
          codeCell.style.paddingLeft = "10px";
          codeCell.style.verticalAlign = "top";
          
          // Make the line numbers more compact
          const lineNumbers = gutterCell.querySelectorAll('.lineno');
          lineNumbers.forEach(num => {
            num.style = "";
            num.style.display = "block";
            num.style.textAlign = "right";
            num.style.width = "100%";
            num.style.paddingRight = "5px";
          });
          
          // Fix any pre/code elements inside
          const preElements = block.querySelectorAll('pre');
          preElements.forEach(pre => {
            pre.style = "";
            pre.style.margin = "0";
            pre.style.padding = "0";
            pre.style.overflow = "auto";
          });
          
          const codeElements = block.querySelectorAll('code');
          codeElements.forEach(code => {
            code.style = "";
            code.style.whiteSpace = "pre";
            code.style.display = "block";
          });
          
          // Fix whitespace and indentation in the code block
          const spans = codeCell.querySelectorAll('span');
          spans.forEach(span => {
            if (span.innerHTML.startsWith('  ')) {
              span.innerHTML = span.innerHTML.replace(/^\s+/, '');
            }
          });
          
          console.log(`Fixed index code block ${index + 1}`);
        } else {
          console.log("Could not find gutter or code cells");
        }
      });
    } else {
      console.log("No index code blocks found to fix");
    }
    
    // Fix the code-example containers
    const codeExamples = document.querySelectorAll('.quick-start-card .code-example');
    codeExamples.forEach((example, i) => {
      example.style = "";
      example.style.padding = "0";
      example.style.margin = "0";
      console.log(`Fixed code example container ${i + 1}`);
    });
    
    // Fix any extra padding in index.md highlighted block
    document.querySelectorAll('.quick-start-card .highlight').forEach((el, i) => {
      if (getComputedStyle(el).paddingLeft !== "0px") {
        el.style.paddingLeft = "0";
        console.log(`Fixed padding on highlight block ${i + 1}`);
      }
    });
  }
  
  // Run all fixing functions
  function applyAllFixes() {
    console.log("Applying code block fixes");
    fixCodeBlocks();
    
    // Apply index-specific fixes with extra logging
    console.log("Applying index-specific fixes");
    fixIndexMdCodeBlocks();
    
    // Force extra fixes with a delay to ensure they apply after any other processing
    setTimeout(() => {
      console.log("Applying delayed fixes");
      fixIndexMdCodeBlocks();
    }, 500);
  }
  
  // Run fixes immediately
  applyAllFixes();
  
  // Also run when window fully loads
  window.addEventListener('load', () => {
    console.log("Window loaded, reapplying fixes");
    applyAllFixes();
  });
});