document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded - Starting Debugging");

  // Debug function to show element structure
  function debugElement(element, label) {
    console.log('------ DEBUG: ' + label + ' ------');
    console.log('Element:', element);
    console.log('Classes:', element.className);
    console.log('HTML:', element.outerHTML.substring(0, 100) + '...');
    console.log('Computed style:', window.getComputedStyle(element));
  }

  // Find code blocks
  const allBlocks = document.querySelectorAll('div.highlight');
  console.log(`Found ${allBlocks.length} total highlight blocks`);

  // Specifically target index code blocks
  const indexBlocks = document.querySelectorAll('.quick-start-card .highlight');
  console.log(`Found ${indexBlocks.length} index highlight blocks`);

  if (indexBlocks.length > 0) {
    // Debug first index block
    const firstBlock = indexBlocks[0];
    debugElement(firstBlock, 'First Index Block');
    
    // Debug table and cells
    const table = firstBlock.querySelector('table');
    if (table) {
      debugElement(table, 'Table in first block');
      
      const gutterCell = table.querySelector('.rouge-gutter');
      const codeCell = table.querySelector('.rouge-code');
      
      if (gutterCell) debugElement(gutterCell, 'Gutter Cell');
      if (codeCell) debugElement(codeCell, 'Code Cell');
    } else {
      console.log("No table found in highlight block!");
    }
  }

  // Apply some test CSS to see if it works at all
  console.log("Applying test styles");
  document.querySelectorAll('.quick-start-card .highlight').forEach(block => {
    block.style.border = '3px solid red';
    
    const gutterCell = block.querySelector('.rouge-gutter');
    if (gutterCell) {
      gutterCell.style.border = '3px solid blue';
      gutterCell.style.width = '40px';
    }
    
    const codeCell = block.querySelector('.rouge-code');
    if (codeCell) {
      codeCell.style.border = '3px solid green';
    }
  });

  console.log("Debug logging complete");
});