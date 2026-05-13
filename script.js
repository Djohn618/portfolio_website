// ===========================
// Configuration
// ===========================
const CONFIG = {
    contactEmail: 'deshan.john@gmx.ch'
};

// ===========================
// Global Variables
// ===========================
let currentLang = 'de';

// ===========================
// Detect Browser Language and Initialize
// ===========================
function detectBrowserLanguage() {
    // Check saved preference first
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        return savedLang;
    }
    
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Check if browser language starts with 'en'
    if (browserLang && browserLang.toLowerCase().startsWith('en')) {
        return 'en';
    }
    
    // Default to German
    return 'de';
}

// ===========================
// Initialize Language
// ===========================
function initLanguage() {
    currentLang = detectBrowserLanguage();
    updateLanguage();
}

// ===========================
// Dark Mode Toggle
// ===========================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved preference first, then system preference
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Priority: user choice > system preference > default (dark)
    if (savedMode === 'disabled') {
        // User explicitly disabled dark mode
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else if (savedMode === 'enabled') {
        // User explicitly enabled dark mode
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (systemPrefersDark) {
        // System prefers dark mode
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        // System prefers light mode (or no preference)
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ===========================
// Language Switcher
// ===========================
function updateLanguage() {
    const elements = document.querySelectorAll('[data-de]');
    
    elements.forEach(element => {
        const deText = element.getAttribute('data-de');
        const enText = element.getAttribute('data-en');
        
        if (currentLang === 'de') {
            element.textContent = deText;
        } else {
            element.textContent = enText;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const langText = langToggle.querySelector('.lang-text');
        if (langText) {
            langText.textContent = currentLang.toUpperCase();
        }
    }
}

function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'de' ? 'en' : 'de';
            localStorage.setItem('language', currentLang);
            updateLanguage();
        });
    }
}

// ===========================
// Mobile Menu Toggle
// ===========================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// Fade-in Animation on Scroll
// ===========================
function initScrollAnimations() {
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
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ===========================
// Header Scroll Effect
// ===========================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===========================
// Work Category Filter
// ===========================
function initWorkFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 100);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===========================
// Services Toggle
// ===========================
function initServicesToggle() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const toggleBtn = item.querySelector('.service-toggle');
        
        toggleBtn.addEventListener('click', () => {
            // Close all other items
            serviceItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ===========================
// Contact Form Handler with Anti-Spam
// ===========================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Rate limiting using localStorage
        let lastSubmitTime = localStorage.getItem('lastFormSubmit');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Rate limiting check (30 seconds between submissions)
            const now = Date.now();
            if (lastSubmitTime) {
                const parsedTime = parseInt(lastSubmitTime, 10);
                if (!isNaN(parsedTime) && (now - parsedTime) < 30000) {
                    alert('Bitte warten Sie 30 Sekunden zwischen den Anfragen.');
                    return;
                }
            }
            
            // Check honeypot field (if exists)
            const honeypot = form.querySelector('input[name="_gotcha"]');
            if (honeypot && honeypot.value) {
                // Bot detected, silently reject
                return;
            }
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Senden...';
            
            try {
                const formData = new FormData(form);
                
                const response = await fetch('https://formspree.io/f/mgoeznlr', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Store submit time for rate limiting
                    localStorage.setItem('lastFormSubmit', now.toString());
                    // Redirect to thank you page
                    window.location.href = 'https://deshanjohn.me/thankyou.html';
                } else {
                    alert('Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            } catch (error) {
                alert('Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
}

// ===========================
// Skill Cards Animation Enhancement
// ===========================
function initSkillsEnhancement() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        // Stagger animation
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Add hover effect for icon rotation
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon-wrapper i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotateY(360deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.skill-icon-wrapper i');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
    });
}

// ===========================
// Parallax Effect for Hero
// ===========================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-circle');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===========================
// Typing Effect for Hero Title (Optional)
// ===========================
function initTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;
    
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.opacity = '1';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===========================
// Horizontal Timeline Navigation
// ===========================
function initHorizontalTimeline() {
    const container = document.getElementById('timelineContainer');
    const leftBtn = document.querySelector('.timeline-nav-left');
    const rightBtn = document.querySelector('.timeline-nav-right');
    
    if (!container || !leftBtn || !rightBtn) return;
    
    // Calculate scroll amount dynamically based on card width
    const getScrollAmount = () => {
        const firstCard = container.querySelector('.timeline-item-horizontal');
        if (firstCard) {
            return firstCard.offsetWidth + 100; // card width + gap
        }
        return 450; // fallback
    };
    
    leftBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });
    
    rightBtn.addEventListener('click', () => {
        container.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });
    
    // Show/hide navigation buttons based on scroll position
    function updateNavButtons() {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        
        leftBtn.style.opacity = currentScroll <= 0 ? '0.5' : '1';
        leftBtn.style.cursor = currentScroll <= 0 ? 'default' : 'pointer';
        
        rightBtn.style.opacity = currentScroll >= maxScroll - 10 ? '0.5' : '1';
        rightBtn.style.cursor = currentScroll >= maxScroll - 10 ? 'default' : 'pointer';
    }
    
    container.addEventListener('scroll', updateNavButtons);
    updateNavButtons();
    
    // Add scroll-based animations with IntersectionObserver
    initTimelineScrollAnimations();
}

// ===========================
// Timeline Scroll Animations
// ===========================
function initTimelineScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item-horizontal');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-visible');
                // Unobserve after animation for better performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach((item) => {
        observer.observe(item);
    });
}

// ===========================
// Initialize All Functions
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initLanguageToggle();
    initDarkMode();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initWorkFilter();
    initServicesToggle();
    initContactForm();
    initSkillsEnhancement();
    initHorizontalTimeline();
    // initParallax(); // Uncomment if you want parallax effect
    // initTypingEffect(); // Uncomment if you want typing effect
});

// ===========================
// Loading Screen
// ===========================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 500);
    }
});

// ===========================
// Add keyboard navigation support
// ===========================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});
