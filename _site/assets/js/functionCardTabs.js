// functionCardTabs.js
document.querySelectorAll('.function-card').forEach(card => {
  // On load: show the active tab's content
  const activeTab = card.querySelector('.tab.active');
  if (activeTab) {
    card.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    const tabId = activeTab.dataset.tab;
    const tabContent = card.querySelector('#' + tabId);
    if (tabContent) tabContent.style.display = '';
  }
  // On click: switch tabs
  card.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      card.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      card.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      tab.classList.add('active');
      const tabId = tab.dataset.tab;
      const tabContent = card.querySelector('#' + tabId);
      if (tabContent) tabContent.style.display = '';
    });
  });
});