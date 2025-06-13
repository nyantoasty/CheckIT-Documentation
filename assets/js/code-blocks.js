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
          row.style.boxShadow = 'none'; // Remove any shadow
        });
        
        // Fix line number column - LEFT aligned numbers with fixed width
        const gutterCell = block.querySelector('.rouge-gutter');
        if (gutterCell) {
          gutterCell.style.background = 'transparent';
          gutterCell.style.border = 'none';
          gutterCell.style.borderRight = '1px solid rgba(100, 110, 130, 0.4)';
          gutterCell.style.padding = '1rem 0 1rem 0.25rem'; // Reduced left padding
          gutterCell.style.verticalAlign = 'top';
          gutterCell.style.width = '2.5rem'; // Slightly smaller width
          gutterCell.style.minWidth = '2.5rem';
          gutterCell.style.maxWidth = '2.5rem';
          gutterCell.style.display = 'table-cell';
          gutterCell.style.position = 'relative';
          gutterCell.style.boxSizing = 'border-box';
          gutterCell.style.textAlign = 'left'; // LEFT aligned
          gutterCell.style.paddingRight = '0.25rem';
          gutterCell.style.boxShadow = 'none'; // Remove any shadow
        }
        
        // Fix code column - bring closer to gutter
        const codeCell = block.querySelector('.rouge-code');
        if (codeCell) {
          codeCell.style.width = 'auto';
          codeCell.style.boxSizing = 'border-box';
          codeCell.style.paddingLeft = '0.5rem'; // Reduced padding to be closer to gutter
          codeCell.style.verticalAlign = 'top';
          codeCell.style.textAlign = 'left';
          codeCell.style.borderLeft = 'none';
          codeCell.style.boxShadow = 'none'; // Remove any shadow
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
        preElement.style.textAlign = 'left';
        preElement.style.boxShadow = 'none'; // Remove any shadow
        preElement.style.background = 'transparent'; // Remove any background
      }
      
      // Fix code element
      const codeElement = block.querySelector('code');
      if (codeElement) {
        codeElement.style.display = 'inline-block';
        codeElement.style.minWidth = '100%';
        codeElement.style.textAlign = 'left';
        codeElement.style.boxShadow = 'none'; // Remove any shadow
      }
      
      // Fix line numbers - LEFT align them
      const lineNumbers = block.querySelectorAll('.lineno');
      lineNumbers.forEach(num => {
        num.style.textAlign = 'left';
        num.style.paddingRight = '0.25rem';
        num.style.width = '2rem';
        num.style.display = 'inline-block';
        num.style.boxShadow = 'none'; // Remove any shadow
      });
    });
  }
  
  // Special function focused on fixing index.md code blocks alignment
  function fixIndexCodeBlocks() {
    // Target specifically the code blocks in quick-start-card
    const indexBlocks = document.querySelectorAll('.quick-start-card .code-example .highlight');
    
    indexBlocks.forEach(function(block) {
      // Remove shadows
      block.style.boxShadow = 'none';
      
      // Remove any unwanted left padding on the block itself
      block.style.paddingLeft = '0';
      block.style.marginLeft = '0';
      
      // Fix table layout
      const table = block.querySelector('table');
      if (table) {
        table.style.width = '100%';
        table.style.tableLayout = 'fixed';
        table.style.borderCollapse = 'collapse';
        table.style.margin = '0';
        table.style.padding = '0';
        table.style.boxShadow = 'none'; // Remove shadow
        
        // Ensure line numbers are properly aligned - LEFT ALIGNED
        const gutterCell = block.querySelector('.rouge-gutter');
        if (gutterCell) {
          gutterCell.style.background = 'transparent';
          gutterCell.style.border = 'none';
          gutterCell.style.borderRight = '1px solid rgba(100, 110, 130, 0.4)';
          gutterCell.style.padding = '1rem 0 1rem 0.25rem'; // Less left padding
          gutterCell.style.verticalAlign = 'top';
          gutterCell.style.width = '2.5rem'; // Slightly smaller width
          gutterCell.style.minWidth = '2.5rem';
          gutterCell.style.maxWidth = '2.5rem';
          gutterCell.style.display = 'table-cell';
          gutterCell.style.position = 'relative';
          gutterCell.style.boxSizing = 'border-box';
          gutterCell.style.textAlign = 'left'; // LEFT aligned
          gutterCell.style.paddingRight = '0.25rem';
          gutterCell.style.boxShadow = 'none'; // Remove shadow
          gutterCell.style.marginLeft = '0';
        }
        
        // Ensure code cell uses remaining width with proper left alignment - CLOSER TO GUTTER
        const codeCell = block.querySelector('.rouge-code');
        if (codeCell) {
          codeCell.style.width = 'auto';
          codeCell.style.boxSizing = 'border-box';
          codeCell.style.paddingLeft = '0.5rem'; // Less padding for closer code
          codeCell.style.verticalAlign = 'top';
          codeCell.style.textAlign = 'left';
          codeCell.style.borderLeft = 'none';
          codeCell.style.boxShadow = 'none'; // Remove shadow
        }
      }
      
      // Fix pre element - ensure left alignment and no shadow
      const preElement = block.querySelector('pre');
      if (preElement) {
        preElement.style.margin = '0';
        preElement.style.padding = '0';
        preElement.style.whiteSpace = 'pre';
        preElement.style.overflowX = 'auto';
        preElement.style.width = '100%';
        preElement.style.textAlign = 'left';
        preElement.style.paddingLeft = '0';
        preElement.style.marginLeft = '0';
        preElement.style.boxShadow = 'none'; // Remove shadow
        preElement.style.background = 'transparent'; // Remove background
      }
      
      // Fix line numbers - LEFT ALIGNED
      const lineNumbers = block.querySelectorAll('.lineno');
      lineNumbers.forEach(num => {
        num.style.textAlign = 'left';
        num.style.paddingRight = '0.25rem';
        num.style.width = '2rem';
        num.style.display = 'inline-block';
        num.style.boxShadow = 'none'; // Remove shadow
      });
    });
    
    // Fix extra indentation in the code-example containers
    const codeExamples = document.querySelectorAll('.quick-start-card .code-example');
    codeExamples.forEach(example => {
      example.style.paddingLeft = '0';
      example.style.marginLeft = '0';
      example.style.boxShadow = 'none'; // Remove shadow
    });
    
    // Remove any pre-applied styles causing shadows
    document.querySelectorAll('.quick-start-card pre, .quick-start-card pre *').forEach(el => {
      el.style.boxShadow = 'none';
      el.style.background = 'transparent';
    });
  }
  
  // Run all fixing functions
  function applyAllFixes() {
    fixCodeBlocks();
    fixIndexCodeBlocks();
    
    // Force left alignment of first lines in code blocks and remove shadow
    setTimeout(() => {
      document.querySelectorAll('.quick-start-card .highlight pre code span:first-child').forEach(span => {
        span.style.paddingLeft = '0';
        span.style.marginLeft = '0';
        span.style.boxShadow = 'none';
      });
      
      // Remove any shadow-causing styles
      document.querySelectorAll('.shadow, [style*="shadow"]').forEach(el => {
        el.style.boxShadow = 'none';
      });
    }, 200);
  }
  
  // Run fixes at multiple points to ensure they apply
  applyAllFixes();
  
  // Run fixes after a short delay
  setTimeout(applyAllFixes, 500);
  
  // Also run when window fully loads
  window.addEventListener('load', applyAllFixes);
});