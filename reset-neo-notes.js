// Reset Neo Notes localStorage
console.log('Resetting Neo Notes localStorage...');

// Clear all localStorage data
if (typeof localStorage !== 'undefined') {
  localStorage.removeItem('rob-yyn-notes-data');
  localStorage.removeItem('rob-yyn-notes-theme');
  console.log('✅ localStorage cleared');
  
  // Reload the page
  window.location.reload();
} else {
  console.log('❌ localStorage not available');
}