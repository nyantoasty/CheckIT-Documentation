document.addEventListener('DOMContentLoaded', function() {
  // Process function names in text
  function linkFunctionReferences() {
    // Define regex pattern for PowerShell function names (Verb-Noun format)
    const functionPattern = /(\b[A-Z][a-z]+-[A-Z][a-zA-Z]+\b)(?!<\/a>)/g;
    
    // Elements that might contain function references
    const textElements = document.querySelectorAll('p, li, td, th, h1, h2, h3, h4, h5, h6');
    
    textElements.forEach(function(element) {
      // Skip code blocks and elements within code blocks
      if (element.closest('pre, code, .highlight')) {
        return;
      }
      
      // Replace function names with links
      element.innerHTML = element.innerHTML.replace(functionPattern, function(match) {
        // Create link to API reference
        return `<a href="docs/api-reference#${match.toLowerCase()}" class="function-link">${match}</a>`;
      });
    });
  }
  
  // Run the function after DOM loads
  linkFunctionReferences();
  
  // Also run on window load to catch dynamically loaded content
  window.addEventListener('load', linkFunctionReferences);
});