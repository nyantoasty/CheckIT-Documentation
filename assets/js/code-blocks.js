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
      
      // Fix the table layout and styling
      const table = block.querySelector('table');
      if (table) {
        table.style.width = '100%';
        table.style.tableLayout = 'fixed';
      }
      
      // Fix code cell width and background
      const codeCell = block.querySelector('.rouge-code');
      if (codeCell) {
        codeCell.style.width = '100%';
        codeCell.style.boxSizing = 'border-box';
        codeCell.style.padding = '1rem 2rem 1rem 0.75rem';
      }
      
      // Fix gutter column width
      const gutterCell = block.querySelector('.rouge-gutter');
      if (gutterCell) {
        gutterCell.style.width = '3rem';
        gutterCell.style.minWidth = '3rem';
        gutterCell.style.maxWidth = '3rem';
        gutterCell.style.boxSizing = 'border-box';
      }
      
      // Ensure code spans full width
      const codeElement = block.querySelector('code');
      if (codeElement) {
        codeElement.style.width = '100%';
        codeElement.style.display = 'inline-block';
      }
      
      // Fix pre element
      const preElement = block.querySelector('pre');
      if (preElement) {
        preElement.style.width = '100%';
        preElement.style.overflowX = 'auto';
        preElement.style.whiteSpace = 'pre';
      }
    });
  }
  
  // Also ensure buttons are added to pre-existing code-example blocks in index.md
  function addCopyButtonsToIndexCodeExamples() {
    // Target specifically the code-example blocks in quick-start-card on index page
    const indexCodeBlocks = document.querySelectorAll('.quick-start-card .code-example');
    
    indexCodeBlocks.forEach(function(codeExample) {
      // Check if it already has a copy button
      if (codeExample.querySelector('.copy-button')) {
        return; // Skip if already has button
      }
      
      const highlight = codeExample.querySelector('.highlight');
      if (!highlight) return;
      
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.innerHTML = 'Copy';
      copyButton.style.zIndex = '15';
      codeExample.appendChild(copyButton);
      
      copyButton.addEventListener('click', function() {
        // Get code text without line numbers
        let codeText;
        const codeElement = highlight.querySelector('.rouge-code');
        
        if (codeElement) {
          codeText = codeElement.innerText;
        } else {
          codeText = highlight.innerText;
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
      
      // Also fix the styling for index code blocks
      const table = highlight.querySelector('table');
      if (table) {
        table.style.width = '100%';
        table.style.tableLayout = 'fixed';
      }
      
      const codeCell = highlight.querySelector('.rouge-code');
      if (codeCell) {
        codeCell.style.width = '100%';
        codeCell.style.boxSizing = 'border-box';
        codeCell.style.padding = '1rem 2rem 1rem 0.75rem';
      }
      
      const gutterCell = highlight.querySelector('.rouge-gutter');
      if (gutterCell) {
        gutterCell.style.width = '3rem';
        gutterCell.style.minWidth = '3rem';
        gutterCell.style.maxWidth = '3rem';
        gutterCell.style.boxSizing = 'border-box';
      }
      
      const codeElement = highlight.querySelector('code');
      if (codeElement) {
        codeElement.style.width = '100%';
        codeElement.style.display = 'inline-block';
      }
      
      const preElement = highlight.querySelector('pre');
      if (preElement) {
        preElement.style.width = '100%';
        preElement.style.overflowX = 'auto';
        preElement.style.whiteSpace = 'pre';
      }
    });
  }
  
  // Fix specifically for index.md code blocks
  function fixIndexCodeBlocks() {
    // Target all code blocks in the index page
    const indexBlocks = document.querySelectorAll('.quick-start-card .highlight');
    
    indexBlocks.forEach(function(block) {
      // Fix highlight container
      block.style.width = '100%';
      block.style.display = 'block';
      block.style.overflow = 'hidden';
      
      // Fix table layout
      const table = block.querySelector('table');
      if (table) {
        table.style.width = '100%';
        table.style.tableLayout = 'fixed';
        table.style.display = 'table';
      }
      
      // Fix table rows
      const rows = block.querySelectorAll('tr');
      rows.forEach(row => {
        row.style.display = 'table-row';
        row.style.width = '100%';
      });
      
      // Fix code column width and background
      const codeCell = block.querySelector('.rouge-code');
      if (codeCell) {
        codeCell.style.width = '100%';
        codeCell.style.boxSizing = 'border-box';
        codeCell.style.padding = '1rem 2rem 1rem 0.75rem';
        codeCell.style.display = 'table-cell';
        codeCell.style.background = 'transparent';
      }
      
      // Fix gutter column width
      const gutterCell = block.querySelector('.rouge-gutter');
      if (gutterCell) {
        gutterCell.style.width = '3rem';
        gutterCell.style.minWidth = '3rem';
        gutterCell.style.maxWidth = '3rem';
        gutterCell.style.boxSizing = 'border-box';
        gutterCell.style.display = 'table-cell';
      }
      
      // Ensure code spans full width
      const codeElement = block.querySelector('code');
      if (codeElement) {
        codeElement.style.width = '100%';
        codeElement.style.display = 'inline-block';
        codeElement.style.background = 'transparent';
      }
      
      // Fix pre element
      const preElement = block.querySelector('pre');
      if (preElement) {
        preElement.style.width = '100%';
        preElement.style.overflowX = 'auto';
        preElement.style.whiteSpace = 'pre';
        preElement.style.background = 'transparent';
      }
    });
  }
  
  // Run immediately and again after DOM fully loaded to catch all blocks
  fixCodeBlocks();
  addCopyButtonsToIndexCodeExamples();
  fixIndexCodeBlocks();
  
  // Run again after a delay to catch any dynamically loaded content
  setTimeout(() => {
    fixCodeBlocks();
    addCopyButtonsToIndexCodeExamples();
    fixIndexCodeBlocks();
  }, 500);
  
  // Also run when window loads to catch everything
  window.addEventListener('load', () => {
    fixCodeBlocks();
    addCopyButtonsToIndexCodeExamples();
    fixIndexCodeBlocks();
  });
});