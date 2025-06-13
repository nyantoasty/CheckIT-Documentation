// Enhanced code block functionality
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
    
    // Create copy button with better text
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '<span>Copy</span>';
    
    copyButton.addEventListener('click', function() {
      // Get code without line numbers
      const pre = block.querySelector('pre');
      const code = pre.innerText
        .replace(/^\s*\d+\s+/gm, '') // Remove line numbers
        .replace(/^\s{4}/gm, '');    // Remove common indentation
      
      // Copy to clipboard
      navigator.clipboard.writeText(code).then(function() {
        copyButton.innerHTML = '<span>Copied!</span>';
        copyButton.classList.add('copied');
        
        setTimeout(function() {
          copyButton.innerHTML = '<span>Copy</span>';
          copyButton.classList.remove('copied');
        }, 2000);
      })
      .catch(function(err) {
        console.error('Failed to copy: ', err);
        copyButton.innerHTML = '<span>Error!</span>';
        
        setTimeout(function() {
          copyButton.innerHTML = '<span>Copy</span>';
        }, 2000);
      });
    });
    
    // Position the button in the language bar
    const languageBar = block.querySelector(':scope > pre');
    block.insertBefore(copyButton, languageBar);
  });
});