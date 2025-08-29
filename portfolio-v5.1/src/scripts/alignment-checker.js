/**
 * Alignment Checker Script
 * 
 * This script checks that all content elements align properly with the reference anchor.
 * It runs in development mode to help identify any alignment issues.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Run in all environments but allow time for everything to render
  setTimeout(checkAlignment, 500);
});

function checkAlignment() {
  // Get our reference anchor element
  const referenceAnchor = document.getElementById('home');
  
  if (!referenceAnchor) {
    console.warn('Alignment checker: Reference anchor #home not found');
    return;
  }
  
  // Get the computed left position of our reference
  const referenceRect = referenceAnchor.getBoundingClientRect();
  const referenceLeft = referenceRect.left;
  
  console.log(`Reference left position: ${referenceLeft}px`);
  
  // Elements that should align with the reference
  const alignedSelectors = [
    '.align-left',
    'section h1', 
    'section h2',
    '.container-page > *'
  ];
  
  // Check each element
  alignedSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      const elementRect = element.getBoundingClientRect();
      const elementLeft = elementRect.left;
      const diff = Math.abs(elementLeft - referenceLeft);
      
      if (diff > 1) { // Allow 1px difference for rounding
        console.warn(
          `Alignment issue: ${selector} is off by ${diff.toFixed(2)}px`,
          element
        );
      }
    });
  });
  
  // Check the navigation position
  const nav = document.querySelector('nav.fixed');
  if (nav) {
    const navRect = nav.getBoundingClientRect();
    const diff = Math.abs(navRect.left - referenceLeft);
    
    if (diff > 1) {
      console.warn(`Navigation alignment is off by ${diff.toFixed(2)}px`);
    } else {
      console.log('Navigation is aligned correctly');
    }
  }
  
  console.log('Alignment check complete');
}

// Re-check on resize
window.addEventListener('resize', debounce(checkAlignment, 250));

// Simple debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
