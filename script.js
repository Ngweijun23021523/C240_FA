// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Function to scroll to checker section
function scrollToChecker() {
    const checker = document.getElementById('checker');
    checker.scrollIntoView({ behavior: 'smooth' });
}
