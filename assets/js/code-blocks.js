document.addEventListener('DOMContentLoaded', function() {
  // Select all code blocks
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
    block.setAttribute('data-language', language.toUpperCase());
    
    // Wrap in code-example container if it's not already wrapped
    if (!block.parentElement.classList.contains('code-example')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-example';
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);
    }
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = 'Copy';
    
    copyButton.addEventListener('click', function() {
      // Get code without line numbers
      const pre = block.querySelector('pre');
      const code = pre.innerText
        .replace(/^\s*\d+\s+/gm, '') // Remove line numbers
        .replace(/^\s{4}/gm, '');    // Remove common indentation
      
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
    
    // Add the button to the language header
    block.insertBefore(copyButton, block.firstChild);
  });
});