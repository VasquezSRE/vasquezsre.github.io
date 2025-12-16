// ========================================
// Utility: Throttle Function
// ========================================
function throttle(func, wait) {
    let timeout;
    let lastRan;
    return function executedFunction(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                if ((Date.now() - lastRan) >= wait) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastRan), 0));
        }
    };
}

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Consolidated Scroll Handler with Throttling
// ========================================
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const hero = document.querySelector('.hero-content');

const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    // Navbar shadow
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // Active navigation link highlighting
    let current = '';
    const scrollPosition = currentScroll + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-primary)';
        }
    });
    
    // Parallax effect for hero section
    if (hero && currentScroll < window.innerHeight) {
        hero.style.transform = `translateY(${currentScroll * 0.3}px)`;
        hero.style.opacity = 1 - (currentScroll / window.innerHeight);
    }
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .metric-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});



// ========================================
// Typing Effect for Hero Title (Optional)
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const typingElement = document.querySelector('.typing-text');
// if (typingElement) {
//     const originalText = typingElement.textContent;
//     typeWriter(typingElement, originalText, 80);
// }

// ========================================
// Project Card Click Handler
// ========================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 255, 204, 0.3)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Dynamic Uptime Counter
// ========================================
function updateUptime() {
    const uptimeElement = document.querySelector('.uptime');
    if (uptimeElement) {
        // Calculate days since January 1st of current year
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const now = new Date();
        const diff = now - startOfYear;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        uptimeElement.textContent = `Uptime: 100% (${days} days)`;
    }
}

updateUptime();

// ========================================
// Console Easter Egg
// ========================================
console.log('%c👋 Welcome to my portfolio!', 'color: #00ffcc; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Looking for a SRE/DevOps Engineer?', 'color: #06b6d4; font-size: 16px;');
console.log('%c📧 Let\'s connect: contact@vasquez.dev', 'color: #7c3aed; font-size: 14px;');
console.log('%c💻 Built with HTML, CSS, and vanilla JavaScript', 'color: #10b981; font-size: 12px;');

// ========================================
// Performance Monitoring (Optional)
// ========================================
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});

// ========================================
// Mobile Menu Toggle (for future enhancement)
// ========================================
// This can be implemented when adding a hamburger menu for mobile
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-menu');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }
}

// Initialize mobile menu if elements exist
initMobileMenu();

// ========================================
// Skill Tags Interactive Hover
// ========================================
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});


