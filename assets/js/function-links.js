document.addEventListener('DOMContentLoaded', function() {
  // Function to process function references with [[Function]] syntax
  function linkFunctionReferences() {
    // All content elements that might contain function references
    const contentElements = document.querySelectorAll('p, li, td, th, h1, h2, h3, h4, h5, h6');
    
    // Process each content element
    contentElements.forEach(function(element) {
      // Skip code blocks
      if (element.closest('pre, code, .highlight')) {
        return;
      }
      
      // Get the HTML content
      const html = element.innerHTML;
      
      // Replace [[Function-Name]] with links
      // The pattern looks for [[any text]] and captures the text inside
      const processedHtml = html.replace(/\[\[([^\]]+)\]\]/g, function(match, funcName) {
        // Determine if it's an internal helper or API function
        const isInternalHelper = funcName.startsWith('Apply-') || 
                                funcName.startsWith('Sanitize-') || 
                                funcName.startsWith('ConvertTo-') ||
                                funcName === 'Get-DefaultDisplayValue';
        
        // Create the appropriate link based on function type
        const targetDoc = isInternalHelper ? 'internal-helpers' : 'api-reference';
        
        return `<a href="/docs/${targetDoc}#${funcName.toLowerCase()}" class="fn">${funcName}</a>`;
      });
      
      // Update the element's HTML only if changes were made
      if (processedHtml !== html) {
        element.innerHTML = processedHtml;
      }
    });
  }
  
  // Fix inline code rendering in tables and lists
  function fixInlineCodeRendering() {
    // Find all inline code elements
    const inlineCodeElements = document.querySelectorAll('li > code, td > code, th > code');
    
    inlineCodeElements.forEach(function(codeElement) {
      // Make sure they have proper styling and aren't breaking layouts
      if (!codeElement.closest('pre')) {
        // Ensure it has inline display
        codeElement.style.display = 'inline';
        codeElement.style.whiteSpace = 'normal';
        
        // If in a table cell, ensure it respects cell width
        if (codeElement.closest('td, th')) {
          codeElement.style.maxWidth = '100%';
          codeElement.style.wordBreak = 'break-word';
        }
      }
    });
  }
  
  // Run the functions
  linkFunctionReferences();
  fixInlineCodeRendering();
  
  // Also run when DOM content might change
  window.addEventListener('load', function() {
    linkFunctionReferences();
    fixInlineCodeRendering();
  });
});