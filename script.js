// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
const animatedElements = document.querySelectorAll(
    '.feature-card, .problem-card, .step-card, .impact-card, .audience-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');

    const existingRipple = button.getElementsByClassName('ripple')[0];
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(ripple);
}

const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

// Observe stats for counter animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const text = entry.target.textContent;
            const number = parseInt(text);

            if (!isNaN(number)) {
                entry.target.classList.add('counted');
                animateCounter(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Mobile menu toggle (for future mobile menu implementation)
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        display: none;
        font-size: 1.5rem;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-primary);
    `;

    // Show menu button on mobile
    if (window.innerWidth <= 640) {
        menuButton.style.display = 'block';
        document.querySelector('.nav-content').appendChild(menuButton);
    }
};

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('TruthGuard AI website loaded successfully!');

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });

    // Verification Form Handler (for Try It Out section)
    const form = document.getElementById('verification-form');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const urlInput = document.getElementById('news-url');
            const newsUrl = urlInput.value.trim();

            if (!newsUrl) return;

            // Show result container with loading state
            resultContainer.style.display = 'block';
            resultMessage.innerHTML = '🤖 Analyzing the article... This may take a few seconds.';

            // TODO: Replace with your actual n8n webhook endpoint
            // Example integration:
            /*
            try {
                const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: newsUrl })
                });
                
                const data = await response.json();
                
                // Update with actual response from n8n
                resultMessage.innerHTML = `🤖 ${data.message}`;
            } catch (error) {
                resultMessage.innerHTML = '❌ Error analyzing article. Please try again or use our Telegram bot.';
            }
            */

            // Demo response (remove when integrating real webhook)
            setTimeout(() => {
                resultMessage.innerHTML = `
                    <strong>Demo Mode:</strong> This is a placeholder response.<br><br>
                    <strong>To activate:</strong><br>
                    1. Replace the webhook URL in script.js (line ~168)<br>
                    2. Connect to your n8n workflow<br>
                    3. Remove this setTimeout demo code<br><br>
                    <strong>For now, please use the Telegram bot below! 📱</strong>
                `;
            }, 1500);
        });
    }
});

console.log('TruthBot - Protecting you from misinformation');
