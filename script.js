// SparkCrew Landing Page JavaScript
// Premium interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initNavigation();
    initFAQ();
    initScrollAnimations();
    initFormHandling();
    initFloatingCards();
    initStatsAnimation();
    initScrollIndicator();
});

// === NAVIGATION ===
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navHeight = nav.offsetHeight;
    
    // Navbar scroll behavior
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.85)';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === FAQ ACCORDION ===
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = '0';
            });
            
            // Open current item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for different elements
                if (entry.target.classList.contains('step')) {
                    animateStep(entry.target);
                } else if (entry.target.classList.contains('partner-card')) {
                    animatePartnerCard(entry.target);
                } else if (entry.target.classList.contains('feature')) {
                    animateFeature(entry.target);
                } else if (entry.target.classList.contains('pricing-card')) {
                    animatePricingCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.step, .partner-card, .feature, .pricing-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

function animateStep(step) {
    const visual = step.querySelector('.step-visual');
    if (visual) {
        setTimeout(() => {
            visual.style.transform = 'scale(1.05)';
            setTimeout(() => {
                visual.style.transform = 'scale(1)';
            }, 200);
        }, 300);
    }
}

function animatePartnerCard(card) {
    const avatar = card.querySelector('.partner-avatar');
    const skills = card.querySelectorAll('.skill');
    
    if (avatar) {
        setTimeout(() => {
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 200);
    }
    
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.transform = 'translateY(0)';
            skill.style.opacity = '1';
        }, 400 + (index * 100));
    });
}

function animateFeature(feature) {
    const icon = feature.querySelector('.feature-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        }, 200);
    }
}

function animatePricingCard(card) {
    const price = card.querySelector('.price-amount');
    if (price) {
        const finalValue = price.textContent;
        let current = 0;
        const increment = finalValue === '∞' ? 0 : Math.ceil(finalValue / 30);
        
        if (finalValue !== '∞') {
            const counter = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    current = finalValue;
                    clearInterval(counter);
                }
                price.textContent = current;
            }, 50);
        }
    }
}

// === FLOATING CARDS ANIMATION ===
function initFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        // Add hover interactions
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.zIndex = '';
        });
        
        // Random floating motion
        setInterval(() => {
            if (!card.matches(':hover')) {
                const randomX = (Math.random() - 0.5) * 10;
                const randomY = (Math.random() - 0.5) * 10;
                card.style.transform = `translate(${randomX}px, ${randomY}px)`;
                
                setTimeout(() => {
                    if (!card.matches(':hover')) {
                        card.style.transform = '';
                    }
                }, 2000);
            }
        }, 3000 + (index * 1000));
    });
}

// === STATS COUNTER ANIMATION ===
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const text = stat.textContent;
            if (text === '∞') return;
            
            const finalValue = parseInt(text) || 0;
            let current = 0;
            const increment = Math.ceil(finalValue / 20);
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    current = finalValue;
                    clearInterval(counter);
                }
                stat.textContent = current;
            }, 100);
        });
    };
    
    // Trigger animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
}

// === SCROLL INDICATOR ===
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled / (document.body.scrollHeight - window.innerHeight);
        const opacity = 1 - (rate * 2);
        
        scrollIndicator.parentElement.style.opacity = Math.max(0, opacity);
    });
}

// === FORM HANDLING ===
function initFormHandling() {
    const form = document.querySelector('.waitlist-form');
    const submitButton = document.querySelector('.form-submit');
    
    if (!form || !submitButton) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const originalText = submitButton.innerHTML;
        
        // Update button state
        submitButton.innerHTML = '<span>Joining...</span>';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormSuccess();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormError();
        } finally {
            // Reset button state
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 2000);
        }
    });
}

function showFormSuccess() {
    const form = document.querySelector('.waitlist-form');
    const originalContent = form.innerHTML;
    
    form.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--color-success);">✓</div>
            <h3 style="margin-bottom: 1rem; color: var(--color-success);">Welcome to the Future!</h3>
            <p style="color: var(--color-text-secondary);">You're on the waitlist. We'll be in touch soon with your early access invitation.</p>
        </div>
    `;
    
    // Add success animation
    form.style.background = 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1))';
    form.style.border = '2px solid var(--color-success)';
    
    // Reset after 5 seconds
    setTimeout(() => {
        form.innerHTML = originalContent;
        form.style.background = '';
        form.style.border = '';
        initFormHandling(); // Re-initialize form handling
    }, 5000);
}

function showFormError() {
    const submitButton = document.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Try Again</span>';
    submitButton.style.background = 'linear-gradient(135deg, var(--color-error), #cc2244)';
    
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';
    }, 3000);
}

// === ENHANCED HOVER EFFECTS ===
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .pricing-cta, .nav-cta');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease-out';
        });
    });
    
    // Add magnetic effect to partner cards
    const partnerCards = document.querySelectorAll('.partner-card');
    
    partnerCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// === PERFORMANCE OPTIMIZATION ===
// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-related logic here
}, 16); // 60fps

// === ACCESSIBILITY IMPROVEMENTS ===
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for FAQ
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('faq-question')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// === EASTER EGGS ===
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add special effects
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show special message
    const message = document.createElement('div');
    message.innerHTML = '🦇 Alfred approves! The SparkCrew is strong with you. 🦇';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
        color: var(--color-bg);
        padding: 2rem;
        border-radius: var(--radius-lg);
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        box-shadow: var(--shadow-glow);
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.style.animation = '';
        message.remove();
        style.remove();
    }, 5000);
}

// === INITIALIZE CSS VARIABLES BASED ON USER PREFERENCES ===
function initThemePreferences() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-smooth', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }
    
    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.documentElement.style.setProperty('--color-border', '#ffffff');
        document.documentElement.style.setProperty('--color-text-secondary', '#ffffff');
    }
}

// Initialize theme preferences
initThemePreferences();

console.log('🚀 SparkCrew landing page loaded successfully!');
console.log('💡 Try the Konami Code for a special surprise...');