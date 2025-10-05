// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Add staggered animation for team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Enhanced parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero section parallax
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    // Floating cards enhanced movement
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        const speed = 0.05 + (index * 0.02);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Background elements parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.02}px)`;
    }
});

// Add active class to current navigation link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.animation = 'fadeInLeft 1s ease-out';
    }
    
    if (heroVisual) {
        heroVisual.style.animation = 'fadeInRight 1s ease-out 0.3s both';
    }
    
    // Add subtle fade-in effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Particles removed as requested
});

// Particle system removed

// Enhanced cursor system
let cursor = null;
let cursorFollower = null;
let hasMoved = false;

function createCursor() {
    if (cursor) return cursor;
    
    cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    
    // Initially hide cursor until first movement
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    return cursor;
}

// Use transform instead of left/top for better performance
function updateCursor(e) {
    if (!cursor || !cursorFollower) return;
    
    // Show cursor on first movement
    if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }
    
    const x = e.clientX;
    const y = e.clientY;
    
    // Use transform for hardware acceleration - much faster than left/top
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    // Follower with smooth interpolation
    requestAnimationFrame(() => {
        cursorFollower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
}

// Initialize cursor (desktop only)
document.addEventListener('DOMContentLoaded', () => {
    // Only create custom cursor on non-touch devices
    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        createCursor();
        document.addEventListener('mousemove', updateCursor);
    }
    
    // Remove cursor on mobile devices after clicks
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.addEventListener('touchstart', () => {
            if (cursor) {
                cursor.style.display = 'none';
            }
            if (cursorFollower) {
                cursorFollower.style.display = 'none';
            }
        });
        
        document.addEventListener('click', () => {
            if (cursor) {
                cursor.style.display = 'none';
            }
            if (cursorFollower) {
                cursorFollower.style.display = 'none';
            }
        });
    }
    
    // Cursor interactions with different elements (desktop only)
    if (cursor && cursorFollower) {
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .team-card, .growth-card, .floating-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-follower-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-follower-hover');
            });
        });
    }
    
    // Special hover for logo (desktop only)
    if (cursor) {
        const logos = document.querySelectorAll('.logo-img, .hero-logo-img, .about-logo, .mission-logo-img');
        logos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-logo-hover');
            });
            
            logo.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-logo-hover');
            });
        });
        
        // Click effect with ripple (desktop only)
        document.addEventListener('click', (e) => {
            cursor.classList.add('cursor-click');
            cursorFollower.classList.add('cursor-follower-click');
            
            // Create ripple effect
            createRipple(e.clientX, e.clientY);
            
            setTimeout(() => {
                cursor.classList.remove('cursor-click');
                cursorFollower.classList.remove('cursor-follower-click');
            }, 150);
        });
    }
    
    // Magnetic effect for buttons (desktop only)
    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        const magneticElements = document.querySelectorAll('.btn, .logo-img, .hero-logo-img');
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = x * force * 0.2;
                    const moveY = y * force * 0.2;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
        
        // Cursor trail effect (desktop only)
        createCursorTrail();
    }
});

// Ripple effect function
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(30, 58, 138, 0.5), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        animation: ripple-expand 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Cursor trail system
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${6 - i * 0.5}px;
            height: ${6 - i * 0.5}px;
            background: rgba(30, 58, 138, ${0.3 - i * 0.03});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9995;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trail.forEach((dot, index) => {
            const delay = index * 0.02;
            setTimeout(() => {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
            }, delay * 1000);
        });
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add enhanced CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #1e3a8a;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Particle styles removed */
    
    .hero-title {
        overflow: visible;
        white-space: normal;
    }
    
    /* Enhanced Cursor Styles */
    .cursor {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: opacity 0.3s ease;
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #1e3a8a, #dc2626, #0891b2);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .cursor-ring {
        width: 30px;
        height: 30px;
        border: 2px solid rgba(30, 58, 138, 0.3);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        transform-origin: center center;
    }
    
    .cursor-follower {
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(30, 58, 138, 0.1), transparent);
        border-radius: 50%;
        transition: all 0.15s ease, opacity 0.3s ease;
        transform: translate(-50%, -50%);
    }
    
    /* Cursor States */
    .cursor-hover .cursor-ring {
        width: 50px;
        height: 50px;
        border-color: rgba(220, 38, 38, 0.6);
        border-width: 3px;
        transform: translate(-50%, -50%);
    }
    
    .cursor-hover .cursor-dot {
        transform: translate(-50%, -50%) scale(1.5);
    }
    
    .cursor-follower-hover {
        width: 60px;
        height: 60px;
        background: radial-gradient(circle, rgba(220, 38, 38, 0.2), transparent);
        transform: translate(-50%, -50%);
    }
    
    /* Logo hover effect */
    .cursor-logo-hover .cursor-ring {
        width: 80px;
        height: 80px;
        border-color: rgba(8, 145, 178, 0.8);
        border-width: 4px;
        animation: rotate 2s linear infinite;
        transform: translate(-50%, -50%);
    }
    
    .cursor-logo-hover .cursor-dot {
        background: linear-gradient(135deg, #0891b2, #1e3a8a, #dc2626);
        transform: translate(-50%, -50%) scale(2);
    }
    
    /* Click effect */
    .cursor-click .cursor-ring {
        border-color: rgba(30, 58, 138, 1);
        width: 60px;
        height: 60px;
        animation: pulse 0.15s ease;
        transform: translate(-50%, -50%);
        transform-origin: center center;
    }
    
    .cursor-follower-click {
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, rgba(30, 58, 138, 0.3), transparent);
        animation: expand 0.15s ease;
        transform: translate(-50%, -50%);
        transform-origin: center center;
    }
    
    @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes expand {
        0% { transform: translate(-50%, -50%) scale(1); }
        100% { transform: translate(-50%, -50%) scale(1.5); }
    }
    
    /* Hide default cursor on interactive elements (desktop only) */
    @media (hover: hover) and (pointer: fine) {
        a, button, .btn, .project-card, .team-card, .growth-card, .floating-card, 
        .logo-img, .hero-logo-img, .about-logo, .mission-logo-img {
            cursor: none;
        }
    }
    
    /* Smooth cursor transitions */
    .cursor, .cursor-follower {
        transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Ripple animation */
    @keyframes ripple-expand {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(10);
            opacity: 0;
        }
    }
    
    /* Cursor trail styles */
    .cursor-trail-dot {
        transition: all 0.1s ease;
    }
    
    /* Magnetic element transitions */
    .btn, .logo-img, .hero-logo-img {
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Enhanced cursor blend modes */
    .cursor-hover {
        mix-blend-mode: difference;
    }
    
    .cursor-logo-hover {
        mix-blend-mode: multiply;
    }
    
    /* Cursor glow effect */
    .cursor-logo-hover .cursor-ring {
        box-shadow: 0 0 20px rgba(8, 145, 178, 0.5);
    }
    
    /* Performance optimizations */
    .cursor, .cursor-follower, .cursor-trail-dot, .cursor-ripple {
        will-change: transform, opacity;
    }
    
    /* Enhanced hover effects for cards */
    .project-card:hover .project-image {
        transform: scale(1.05);
    }
    
    .team-card:hover .team-image i {
        animation: bounce 1s ease;
    }
    
    /* Remove growth icon animation to prevent movement */
    .growth-card:hover .growth-icon {
        animation: none;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);
