document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded - Setting up code blocks");

  // Process standard code blocks
  function setupCodeBlocks() {
    const blocks = document.querySelectorAll('div.highlight, figure.highlight');
    console.log(`Found ${blocks.length} total highlight blocks`);
    
    blocks.forEach(function(block, index) {
      // Check if already in a code-example container
      let codeExample = block.parentElement;
      if (!codeExample.classList.contains('code-example')) {
        // Create wrapper if not exists
        codeExample = document.createElement('div');
        codeExample.className = 'code-example';
        block.parentNode.insertBefore(codeExample, block);
        codeExample.appendChild(block);
      }
      
      // Determine language
      let language = 'POWERSHELL';
      const classes = block.className.split(' ');
      for (const className of classes) {
        if (className.startsWith('language-')) {
          language = className.replace('language-', '').toUpperCase();
          break;
        }
      }
      codeExample.setAttribute('data-language', language);
      
      // Add copy button if not present
      if (!codeExample.querySelector('.copy-button')) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = 'Copy';
        codeExample.appendChild(copyButton);
        
        // Set up copy functionality
        copyButton.addEventListener('click', function() {
          // Get code without line numbers
          let codeText;
          const codeElement = block.querySelector('.rouge-code');
          
          if (codeElement) {
            codeText = codeElement.innerText;
          } else {
            codeText = block.innerText;
          }
          
          codeText = codeText.replace(/^\s*\d+\s+/gm, '');
          
          // Copy to clipboard
          navigator.clipboard.writeText(codeText).then(function() {
            copyButton.innerHTML = 'Copied!';
            
            setTimeout(function() {
              copyButton.innerHTML = 'Copy';
            }, 2000);
          })
          .catch(function(err) {
            console.error('Failed to copy:', err);
            copyButton.innerHTML = 'Error';
            
            setTimeout(function() {
              copyButton.innerHTML = 'Copy';
            }, 2000);
          });
        });
      }
    });
  }

  // Run at multiple points to ensure everything is processed
  setupCodeBlocks();
  
  // Also run on window load
  window.addEventListener('load', function() {
    console.log("Window loaded, re-applying formatting");
    setupCodeBlocks();
  });
});