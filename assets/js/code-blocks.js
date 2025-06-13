document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded - Starting with minimal approach");

  // Find all code blocks
  const blocks = document.querySelectorAll('div.highlight, figure.highlight');
  console.log(`Found ${blocks.length} total highlight blocks`);
  
  blocks.forEach(function(block, index) {
    console.log(`Processing block ${index + 1}`);
    
    // Check if block is already in a code-example container
    let codeExample = block.parentElement;
    if (!codeExample.classList.contains('code-example')) {
      console.log(`Creating code-example wrapper for block ${index + 1}`);
      // Create wrapper if not exists
      codeExample = document.createElement('div');
      codeExample.className = 'code-example';
      block.parentNode.insertBefore(codeExample, block);
      codeExample.appendChild(block);
    }
    
    // Determine language
    let language = 'POWERSHELL'; // Default
    const classes = block.className.split(' ');
    for (const className of classes) {
      if (className.startsWith('language-')) {
        language = className.replace('language-', '').toUpperCase();
        break;
      }
    }
    codeExample.setAttribute('data-language', language);
    
    // Add copy button if not already present
    if (!codeExample.querySelector('.copy-button')) {
      console.log(`Adding copy button to block ${index + 1}`);
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
    }
  });

  console.log("Minimal processing complete - Letting CSS handle styles");
});