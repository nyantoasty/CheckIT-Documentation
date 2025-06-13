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
          gutterCell.style.background = 'transparent';
          gutterCell.style.border = 'none';
          gutterCell.style.borderRight = '1px solid rgba(100, 110, 130, 0.4)';
          gutterCell.style.padding = '1rem 0 1rem 1rem';
          gutterCell.style.verticalAlign = 'top';
          gutterCell.style.width = '3rem';
          gutterCell.style.minWidth = '3rem';
          gutterCell.style.maxWidth = '3rem';
          gutterCell.style.display = 'table-cell';
          gutterCell.style.position = 'relative';
          gutterCell.style.boxSizing = 'border-box';
          gutterCell.style.textAlign = 'right';
          gutterCell.style.paddingRight = '0.75rem';
        }
        
        // Fix code column
        const codeCell = block.querySelector('.rouge-code');
        if (codeCell) {
          codeCell.style.width = 'auto';
          codeCell.style.boxSizing = 'border-box';
          codeCell.style.paddingLeft = '1rem';
          codeCell.style.verticalAlign = 'top';
          codeCell.style.textAlign = 'left';
          codeCell.style.borderLeft = 'none';
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
      }
      
      // Fix code element
      const codeElement = block.querySelector('code');
      if (codeElement) {
        codeElement.style.display = 'inline-block';
        codeElement.style.minWidth = '100%';
        codeElement.style.textAlign = 'left';
      }
    });
  }
  
  // Special function focused on fixing index.md code blocks alignment
  function fixIndexCodeBlocks() {
    // Target specifically the code blocks in quick-start-card
    const indexBlocks = document.querySelectorAll('.quick-start-card .code-example .highlight');
    
    indexBlocks.forEach(function(block) {
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
        
        // Ensure line numbers are properly aligned
        const gutterCell = block.querySelector('.rouge-gutter');
        if (gutterCell) {
          gutterCell.style.background = 'transparent';
          gutterCell.style.border = 'none';
          gutterCell.style.borderRight = '1px solid rgba(100, 110, 130, 0.4)';
          gutterCell.style.padding = '1rem 0 1rem 1rem';
          gutterCell.style.verticalAlign = 'top';
          gutterCell.style.width = '3rem';
          gutterCell.style.minWidth = '3rem';
          gutterCell.style.maxWidth = '3rem';
          gutterCell.style.display = 'table-cell';
          gutterCell.style.position = 'relative';
          gutterCell.style.boxSizing = 'border-box';
          gutterCell.style.textAlign = 'right';
          gutterCell.style.paddingRight = '0.75rem';
          gutterCell.style.paddingLeft = '0';
          gutterCell.style.marginLeft = '0';
        }
        
        // Ensure code cell uses remaining width with proper left alignment
        const codeCell = block.querySelector('.rouge-code');
        if (codeCell) {
          codeCell.style.width = 'auto';
          codeCell.style.boxSizing = 'border-box';
          codeCell.style.paddingLeft = '1rem';
          codeCell.style.verticalAlign = 'top';
          codeCell.style.textAlign = 'left';
          codeCell.style.borderLeft = 'none';
        }
      }
      
      // Fix pre element - ensure left alignment
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
      }
      
      // Ensure code element is aligned left
      const codeElement = block.querySelector('code');
      if (codeElement) {
        codeElement.style.display = 'inline-block';
        codeElement.style.minWidth = '100%';
        codeElement.style.textAlign = 'left';
        codeElement.style.paddingLeft = '0';
        codeElement.style.marginLeft = '0';
      }
      
      // Fix line numbers - ensure they don't push content right
      const lineNumbers = block.querySelectorAll('.lineno');
      lineNumbers.forEach(num => {
        num.style.textAlign = 'right';
        num.style.paddingRight = '0.5rem';
        num.style.width = '2rem';
        num.style.display = 'inline-block';
      });
      
      // Fix all spans to ensure they don't have extra padding
      const spans = block.querySelectorAll('span');
      spans.forEach(span => {
        span.style.paddingLeft = '0';
        span.style.marginLeft = '0';
      });
    });
    
    // Fix extra indentation in the code-example containers
    const codeExamples = document.querySelectorAll('.quick-start-card .code-example');
    codeExamples.forEach(example => {
      example.style.paddingLeft = '0';
      example.style.marginLeft = '0';
    });
  }
  
  // Run all fixing functions
  function applyAllFixes() {
    fixCodeBlocks();
    fixIndexCodeBlocks();
    
    // Force left alignment of first lines in code blocks - apply after a short delay
    setTimeout(() => {
      document.querySelectorAll('.quick-start-card .highlight pre code span:first-child').forEach(span => {
        span.style.paddingLeft = '0';
        span.style.marginLeft = '0';
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