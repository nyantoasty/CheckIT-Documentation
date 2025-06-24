document.addEventListener('DOMContentLoaded', function() {
  // Map of field labels to emoji/icons
  const fieldIcons = {
    'Purpose:': '🎯',
    'Used by:': '🧩',
    'Description:': '📝',
    'Parameters:': '🔸',
    'Returns:': '📤'
  };

  // Find all <strong> elements in paragraphs and lists
  document.querySelectorAll('p > strong, li > strong').forEach(function(strong) {
    const label = strong.textContent.trim();
    if (fieldIcons[label]) {
      // Only add icon if not already present
      if (!strong.classList.contains('field-iconized')) {
        strong.innerHTML = `<span class="field-icon">${fieldIcons[label]}</span> ${strong.innerHTML}`;
        strong.classList.add('field-iconized');
      }
    }
  });
});