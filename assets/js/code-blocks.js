document.addEventListener('DOMContentLoaded', function() {
  // Clean up any duplicate elements first
  document.querySelectorAll('.highlight pre pre').forEach(function(dupePre) {
    const parent = dupePre.parentNode;
    parent.innerHTML = dupePre.innerHTML;
  });

  // Fix code blocks
  document.querySelectorAll('div.highlight').forEach(function(block) {
    // Find the language from class name
    const classes = block.className.split(' ');
    let language = 'POWERSHELL'; // Default
    
    for (const className of classes) {
      if (className.startsWith('language-')) {
        language = className.replace('language-', '').toUpperCase();
        break;
      }
    }
    
    // Set data attribute for the title
    block.setAttribute('data-language', language);
    
    // Remove any duplicate headers
    block.querySelectorAll('.highlight::before').forEach(function(dupeHeader) {
      dupeHeader.remove();
    });
    
    // Ensure we only have one wrapper
    if (!block.parentElement.classList.contains('code-example')) {
      // Check if we're already in a code-example
      let parent = block.parentElement;
      let inCodeExample = false;
      
      while (parent) {
        if (parent.classList && parent.classList.contains('code-example')) {
          inCodeExample = true;
          break;
        }
        parent = parent.parentElement;
      }
      
      if (!inCodeExample) {
        // Create wrapper if not already wrapped
        const wrapper = document.createElement('div');
        wrapper.className = 'code-example';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
      }
    }
    
    // Create copy button if not exists
    if (!block.querySelector('.copy-button')) {
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.innerHTML = 'Copy';
      
      copyButton.addEventListener('click', function() {
        // Get code without line numbers
        const code = Array.from(block.querySelectorAll('.rouge-code .line'))
          .map(line => line.textContent)
          .join('\n')
          .replace(/^\s*\d+\s+/gm, ''); // Remove line numbers
        
        // Copy to clipboard
        navigator.clipboard.writeText(code).then(function() {
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
      
      // Add to the block
      block.appendChild(copyButton);
    }
  });

  // Fix any additional styling issues
  document.querySelectorAll('.highlight table').forEach(function(table) {
    table.style.margin = '0';
    table.style.padding = '0';
    table.style.border = 'none';
    table.style.width = '100%';
    table.style.tableLayout = 'fixed';
  });
});