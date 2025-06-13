// Add copy buttons to code blocks
document.addEventListener('DOMContentLoaded', function() {
  // Set language attribute for syntax highlighting
  const codeBlocks = document.querySelectorAll('div.highlight');
  
  codeBlocks.forEach(function(block) {
    // Find the language from class name
    const classes = block.className.split(' ');
    let language = 'powershell'; // Default
    
    for (const className of classes) {
      if (className.startsWith('language-')) {
        language = className.replace('language-', '');
        break;
      }
    }
    
    // Set data attribute
    block.setAttribute('data-language', language);
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    copyButton.addEventListener('click', function() {
      // Get code from inside pre > code, but filter out line numbers
      const pre = block.querySelector('pre');
      const code = pre.innerText;
      
      // Remove line numbers if present
      const cleanCode = code.replace(/^\s*\d+\s+/gm, '');
      
      // Copy to clipboard
      navigator.clipboard.writeText(cleanCode).then(function() {
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(function() {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      })
      .catch(function(err) {
        console.error('Failed to copy: ', err);
        copyButton.textContent = 'Error!';
        
        setTimeout(function() {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    });
    
    block.appendChild(copyButton);
  });
});
