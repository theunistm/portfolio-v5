// DOM Elements
const navIcons = document.querySelectorAll('.nav-icon');
const versionElement = document.querySelector('.version');

// Navigation functionality
navIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        // Remove active class from all icons
        navIcons.forEach(i => i.classList.remove('active'));
        // Add active class to clicked icon
        icon.classList.add('active');
        
        // Get the page to navigate to
        const page = icon.getAttribute('data-page');
        if (page !== 'home') {
            // In a real implementation, this would navigate to the page
            console.log(`Navigating to ${page} page`);
        }
    });
});

// Set the current date as the version tooltip
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
versionElement.setAttribute('title', `Last updated: ${formattedDate}`);

// Interactive text highlights
const introText = document.querySelector('.intro');
if (introText) {
    const words = introText.textContent.split(' ');
    introText.innerHTML = words.map(word => {
        // Simple logic to highlight specific words - customize as needed
        const highlightedWords = ['Windhoek', 'e-commerce', 'Nampharm', 'BS'];
        if (highlightedWords.includes(word.replace(/[^\w\s]/g, ''))) {
            return `<span class="highlight" data-term="${word}">${word}</span>`;
        }
        return word;
    }).join(' ');

    // Add click handler for highlighted terms
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.addEventListener('click', (e) => {
            const term = e.target.getAttribute('data-term');
            // In a real implementation, this would show more info about the term
            console.log(`Clicked on: ${term}`);
            // For now, just toggle a class for visual feedback
            e.target.classList.toggle('active');
        });
    });
}

// Simple scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.content-left > *').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Add visible class when elements come into view
const handleIntersection = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

// Add some basic keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Handle tab navigation through nav icons
    if (e.key === 'Tab' && document.activeElement.classList.contains('nav-icon')) {
        e.preventDefault();
        const currentIndex = Array.from(navIcons).indexOf(document.activeElement);
        const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
        
        if (nextIndex >= 0 && nextIndex < navIcons.length) {
            navIcons[nextIndex].focus();
        }
    }
});
