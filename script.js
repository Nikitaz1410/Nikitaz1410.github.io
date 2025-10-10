// Application Banner Close Function
function closeBanner() {
    const banner = document.querySelector('.application-banner');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    if (banner) {
        banner.style.transform = 'translateY(-100%)';
        banner.style.transition = 'transform 0.5s ease-in-out';
        
        setTimeout(() => {
            banner.style.display = 'none';
            if (navbar) navbar.classList.add('banner-closed');
            if (hero) hero.classList.add('banner-closed');
        }, 500);
    }
}

// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

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
    
    // Update days counter on page load
    updateDaysCounter();
});

// Calculate days since founding date (August 1st, 2025)
function calculateDaysSinceFounding() {
    const foundingDate = new Date('2025-08-01');
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - foundingDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return Math.max(0, daysDifference); // Return 0 if founding date is in the future
}

// Update the days counter element
function updateDaysCounter() {
    const daysCounter = document.getElementById('days-counter');
    if (daysCounter) {
        const days = calculateDaysSinceFounding();
        daysCounter.textContent = days;
    }
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number:not(#days-counter)');
    
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
            updateDaysCounter();
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

// Enhanced cursor system with performance optimizations
let cursor = null;
let cursorFollower = null;
let hasMoved = false;
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;
let animationId = null;

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

// Optimized cursor update with smooth interpolation
function updateCursor(e) {
    if (!cursor || !cursorFollower) return;
    
    // Show cursor on first movement
    if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate cursor positioning for instant response
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    
    // Start smooth follower animation if not already running
    if (!animationId) {
        animateFollower();
    }
}

// Smooth follower animation with optimized interpolation
function animateFollower() {
    if (!cursorFollower) return;
    
    // Calculate smooth interpolation with faster response
    const easeFactor = 0.15; // Increased from default for faster response
    followerX += (mouseX - followerX) * easeFactor;
    followerY += (mouseY - followerY) * easeFactor;
    
    // Update follower position
    cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    
    // Continue animation if cursor is still moving
    const distance = Math.abs(mouseX - followerX) + Math.abs(mouseY - followerY);
    if (distance > 0.1) {
        animationId = requestAnimationFrame(animateFollower);
    } else {
        animationId = null;
    }
}

// Ensure cursor visibility function - guarantee cursor never disappears
function ensureCursorVisibility() {
    // Always ensure default cursor is visible
    document.body.style.cursor = 'auto';
    
    if (!cursor || !cursorFollower) return;
    
    // Check if we're on desktop
    const isDesktop = !('ontouchstart' in window || navigator.maxTouchPoints > 0) || window.innerWidth > 768;
    
    if (isDesktop) {
        // Ensure cursor is visible on desktop
        if (cursor.style.display === 'none') {
            cursor.style.display = 'block';
        }
        if (cursorFollower.style.display === 'none') {
            cursorFollower.style.display = 'block';
        }
        if (cursor.style.opacity === '0' && hasMoved) {
            cursor.style.opacity = '1';
        }
        if (cursorFollower.style.opacity === '0' && hasMoved) {
            cursorFollower.style.opacity = '1';
        }
    }
}

// Global cursor visibility enforcement
function enforceCursorVisibility() {
    // Force cursor to be visible on all elements
    document.body.style.cursor = 'auto';
    
    // Ensure no element hides the cursor
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        if (element.style.cursor === 'none') {
            element.style.cursor = 'auto';
        }
    });
}

// Initialize cursor (desktop only) - but ensure default cursor is always visible
document.addEventListener('DOMContentLoaded', () => {
    // Always ensure default cursor is visible
    document.body.style.cursor = 'auto';
    
    // Only create custom cursor on non-touch devices as enhancement
    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        createCursor();
        
        // Throttled mouse move handler for better performance
        let mouseMoveThrottle;
        document.addEventListener('mousemove', (e) => {
            if (mouseMoveThrottle) return;
            
            mouseMoveThrottle = requestAnimationFrame(() => {
                updateCursor(e);
                mouseMoveThrottle = null;
            });
        });
    }
    
    // Enhanced mobile device detection
    const isMobileDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 768;
    const isTabletDevice = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    if (isMobileDevice) {
        // On mobile, ensure default cursor behavior
        document.body.style.cursor = 'auto';
        document.addEventListener('touchstart', () => {
            // Keep default cursor visible on mobile
            document.body.style.cursor = 'auto';
        });
        
        document.addEventListener('click', () => {
            // Keep default cursor visible on mobile
            document.body.style.cursor = 'auto';
        });
    } else {
        // On desktop, ensure both default and custom cursor are visible
        document.body.style.cursor = 'auto';
        document.addEventListener('click', () => {
            // Ensure default cursor stays visible
            document.body.style.cursor = 'auto';
            if (cursor && cursor.style.display === 'none') {
                cursor.style.display = 'block';
            }
            if (cursorFollower && cursorFollower.style.display === 'none') {
                cursorFollower.style.display = 'block';
            }
        });
    }
    
    // Cursor interactions with different elements (desktop and tablet only)
    if (cursor && cursorFollower && !isMobileDevice) {
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .team-card, .growth-card, .floating-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                ensureCursorVisibility(); // Ensure cursor is visible
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-follower-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-follower-hover');
                ensureCursorVisibility(); // Ensure cursor stays visible
            });
            
            element.addEventListener('click', () => {
                ensureCursorVisibility(); // Ensure cursor stays visible after click
            });
        });
    }
    
    // Special hover for logo (desktop and tablet only)
    if (cursor && !isMobileDevice) {
        const logos = document.querySelectorAll('.logo-img, .hero-logo-img, .about-logo, .mission-logo-img');
        logos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                ensureCursorVisibility(); // Ensure cursor is visible
                cursor.classList.add('cursor-logo-hover');
            });
            
            logo.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-logo-hover');
                ensureCursorVisibility(); // Ensure cursor stays visible
            });
            
            logo.addEventListener('click', () => {
                ensureCursorVisibility(); // Ensure cursor stays visible after click
            });
        });
        
        // Click effect with ripple (desktop only) - exclude form elements
        document.addEventListener('click', (e) => {
            // Skip cursor click animation for form elements and invalid coordinates
            const target = e.target;
            const isFormElement = target.tagName === 'SELECT' || 
                                  target.tagName === 'INPUT' || 
                                  target.tagName === 'TEXTAREA' ||
                                  target.closest('select') ||
                                  target.closest('input') ||
                                  target.closest('textarea');
            
            // Skip if coordinates are invalid (0,0 or negative)
            const hasValidCoordinates = e.clientX > 0 && e.clientY > 0;
            
            if (!isFormElement && hasValidCoordinates) {
                cursor.classList.add('cursor-click');
                cursorFollower.classList.add('cursor-follower-click');
                
                // Create ripple effect
                createRipple(e.clientX, e.clientY);
                
                setTimeout(() => {
                    cursor.classList.remove('cursor-click');
                    cursorFollower.classList.remove('cursor-follower-click');
                }, 150);
            }
        });
    }
    
    // Magnetic effect for buttons (desktop and tablet only)
    if (!isMobileDevice) {
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
        if (!isMobileDevice) {
            createCursorTrail();
        }
    }
    
    // Periodic cursor visibility check
    setInterval(ensureCursorVisibility, 1000);
    
    // Periodic global cursor enforcement
    setInterval(enforceCursorVisibility, 500);
    
    // Ensure cursor visibility on window resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            ensureCursorVisibility();
            enforceCursorVisibility();
        }, 100);
    });
    
    // Ensure cursor visibility on any mouse movement
    document.addEventListener('mousemove', () => {
        enforceCursorVisibility();
    });
    
    // Ensure cursor visibility on any click
    document.addEventListener('click', () => {
        enforceCursorVisibility();
    });
    
    // Mobile-specific enhancements
    if (isMobileDevice) {
        // Improve touch interactions for mobile
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            btn.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Add touch feedback to cards
        document.querySelectorAll('.project-card, .team-card, .growth-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            card.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Prevent zoom on double tap for buttons
        document.querySelectorAll('a, button, .btn').forEach(element => {
            element.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            });
        });
        
        // Improve form interactions on mobile
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', function() {
                // Scroll to input on focus for better UX
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        });
    }
});

// Ripple effect function with coordinate validation
function createRipple(x, y) {
    // Validate coordinates to prevent ripple in wrong position
    if (x <= 0 || y <= 0 || x > window.innerWidth || y > window.innerHeight) {
        return; // Skip creating ripple for invalid coordinates
    }
    
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

// Optimized cursor trail system
function createCursorTrail() {
    const trail = [];
    const trailLength = 8; // Reduced for better performance
    const trailPositions = [];
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${6 - i * 0.4}px;
            height: ${6 - i * 0.4}px;
            background: rgba(30, 58, 138, ${0.3 - i * 0.03});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9995;
            will-change: transform;
            transform: translate3d(-50%, -50%, 0);
        `;
        document.body.appendChild(dot);
        trail.push(dot);
        trailPositions.push({ x: 0, y: 0 });
    }
    
    let trailIndex = 0;
    let lastUpdateTime = 0;
    const updateInterval = 16; // ~60fps
    
    function updateTrail() {
        const now = performance.now();
        if (now - lastUpdateTime >= updateInterval) {
            lastUpdateTime = now;
            
            // Update trail positions with optimized interpolation
            trail.forEach((dot, index) => {
                const targetIndex = (trailIndex - index + trailLength) % trailLength;
                const target = trailPositions[targetIndex];
                
                if (target.x !== 0 || target.y !== 0) {
                    dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
                }
            });
        }
        requestAnimationFrame(updateTrail);
    }
    
    // Throttled mouse move handler
    let mouseMoveTimeout;
    document.addEventListener('mousemove', (e) => {
        if (mouseMoveTimeout) return;
        
        mouseMoveTimeout = setTimeout(() => {
            trailPositions[trailIndex] = { x: e.clientX, y: e.clientY };
            trailIndex = (trailIndex + 1) % trailLength;
            mouseMoveTimeout = null;
        }, 8); // Throttle to ~120fps
    });
    
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
    
    /* Enhanced Cursor Styles - Optimized for Performance */
    .cursor {
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        mix-blend-mode: difference;
        transition: opacity 0.2s ease;
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
        transform: translate3d(-50%, -50%, 0);
        will-change: transform;
    }
    
    .cursor-ring {
        width: 30px;
        height: 30px;
        border: 2px solid rgba(30, 58, 138, 0.3);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        transition: all 0.15s ease;
        transform-origin: center center;
        will-change: transform;
    }
    
    .cursor-follower {
        position: fixed;
        pointer-events: none;
        z-index: 99998;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(30, 58, 138, 0.1), transparent);
        border-radius: 50%;
        transition: opacity 0.2s ease;
        transform: translate3d(-50%, -50%, 0);
        will-change: transform;
    }
    
    /* Cursor States - Optimized Transitions */
    .cursor-hover .cursor-ring {
        width: 50px;
        height: 50px;
        border-color: rgba(220, 38, 38, 0.6);
        border-width: 3px;
        transform: translate3d(-50%, -50%, 0);
        transition: all 0.1s ease;
    }
    
    .cursor-hover .cursor-dot {
        transform: translate3d(-50%, -50%, 0) scale(1.5);
        transition: transform 0.1s ease;
    }
    
    .cursor-follower-hover {
        width: 60px;
        height: 60px;
        background: radial-gradient(circle, rgba(220, 38, 38, 0.2), transparent);
        transform: translate3d(-50%, -50%, 0);
        transition: all 0.1s ease;
    }
    
    /* Logo hover effect - Optimized */
    .cursor-logo-hover .cursor-ring {
        width: 80px;
        height: 80px;
        border-color: rgba(8, 145, 178, 0.8);
        border-width: 4px;
        animation: rotate 2s linear infinite;
        transform: translate3d(-50%, -50%, 0);
        transition: all 0.1s ease;
    }
    
    .cursor-logo-hover .cursor-dot {
        background: linear-gradient(135deg, #0891b2, #1e3a8a, #dc2626);
        transform: translate3d(-50%, -50%, 0) scale(2);
        transition: transform 0.1s ease;
    }
    
    /* Click effect - Optimized */
    .cursor-click .cursor-ring {
        border-color: rgba(30, 58, 138, 1);
        width: 60px;
        height: 60px;
        animation: pulse 0.1s ease;
        transform: translate3d(-50%, -50%, 0);
        transform-origin: center center;
    }
    
    .cursor-follower-click {
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, rgba(30, 58, 138, 0.3), transparent);
        animation: expand 0.1s ease;
        transform: translate3d(-50%, -50%, 0);
        transform-origin: center center;
    }
    
    @keyframes pulse {
        0% { transform: translate3d(-50%, -50%, 0) scale(1); }
        50% { transform: translate3d(-50%, -50%, 0) scale(1.1); }
        100% { transform: translate3d(-50%, -50%, 0) scale(1); }
    }
    
    @keyframes expand {
        0% { transform: translate3d(-50%, -50%, 0) scale(1); }
        100% { transform: translate3d(-50%, -50%, 0) scale(1.5); }
    }
    
    /* CRITICAL: Ensure cursor is ALWAYS visible - never hide it anywhere */
    *, *::before, *::after {
        cursor: auto !important;
    }
    
    /* Override any cursor: none rules that might exist */
    body, html {
        cursor: auto !important;
    }
    
    /* Specific cursor types for interactive elements */
    a, button, .btn {
        cursor: pointer !important;
    }
    
    input, textarea, select {
        cursor: text !important;
    }
    
    .project-card, .growth-card, .floating-card, .team-card {
        cursor: pointer !important;
    }
    
    .logo-img, .hero-logo-img, .about-logo, .mission-logo-img {
        cursor: pointer !important;
    }
    
    /* Force cursor visibility on all hover states */
    *:hover {
        cursor: inherit !important;
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
    
    /* Cursor trail styles - Optimized */
    .cursor-trail-dot {
        will-change: transform;
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

