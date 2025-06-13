// Add copy buttons to code blocks

document.addEventListener('DOMContentLoaded', function() {
  // Select all code blocks - works with both highlight and regular markdown code blocks
  const codeBlocks = document.querySelectorAll('pre.highlight, pre > code').forEach(function(block) {
    // Get the parent pre tag if this is a code tag
    const preBlock = block.tagName === 'CODE' ? block.parentElement : block;
    
    // Don't add button if it already exists
    if (preBlock.querySelector('.copy-button')) {
      return;
    }
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    copyButton.addEventListener('click', function() {
      // Get text from either highlight or regular code block
      const code = block.tagName === 'CODE' ? block.textContent : block.querySelector('code').textContent;
      
      navigator.clipboard.writeText(code).then(function() {
        copyButton.textContent = 'Copied!';
        setTimeout(function() {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    });
    
    // Position the button
    preBlock.style.position = 'relative';
    preBlock.appendChild(copyButton);
  });
});