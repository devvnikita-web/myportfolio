// ========================================
// NAVIGATION & SCROLL EFFECTS
// ========================================

// Get elements
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // 80px для навигации
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to top button
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SCROLL ANIMATIONS (AOS-like)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission (replace with actual API call)
    console.log('Form submitted:', formData);
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('active');
    
    // Reset form after 3 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.classList.remove('active');
    }, 3000);
    
    // In production, you would send data to server:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Show success message
    })
    .catch(error => {
        console.error('Error:', error);
        // Show error message
    });
    */
});

// ========================================
// HERO BUTTONS SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty anchors
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional)
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
// window.addEventListener('load', () => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     const text = subtitle.textContent;
//     typeWriter(subtitle, text, 50);
// });

// ========================================
// PORTFOLIO HOVER EFFECTS
// ========================================

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.zIndex = '1';
    });
});

// ========================================
// SERVICE CARDS ANIMATION
// ========================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ========================================
// SKILLS PROGRESS ANIMATION
// ========================================

const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    skillObserver.observe(item);
});

// ========================================
// FLOATING ELEMENTS ANIMATION
// ========================================

const floatingElements = document.querySelectorAll('.float-element');

floatingElements.forEach((element, index) => {
    const randomDuration = 4 + Math.random() * 4;
    const randomDelay = Math.random() * 2;
    
    element.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
});

// ========================================
// PROCESS STEPS PROGRESSIVE REVEAL
// ========================================

const processSteps = document.querySelectorAll('.process-step');

const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

processSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-50px)';
    step.style.transition = `all 0.6s ease ${index * 0.2}s`;
    processObserver.observe(step);
});

// ========================================
// STATISTICS COUNTER ANIMATION
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Uncomment to enable counter animation for stats
// const statNumbers = document.querySelectorAll('.stat-number');
// const statsObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const target = parseInt(entry.target.textContent);
//             animateCounter(entry.target, target);
//             statsObserver.unobserve(entry.target);
//         }
//     });
// }, { threshold: 0.5 });
// 
// statNumbers.forEach(stat => {
//     statsObserver.observe(stat);
// });

// ========================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.hero-background::before, .hero-background::after');
    
    // Apply parallax effect to hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// CURSOR GLOW EFFECT (Optional)
// ========================================

// Uncomment for custom cursor effect
// const cursor = document.createElement('div');
// cursor.classList.add('custom-cursor');
// document.body.appendChild(cursor);

// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = e.clientX + 'px';
//     cursor.style.top = e.clientY + 'px';
// });

// ========================================
// FORM VALIDATION
// ========================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Real-time validation
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.style.borderColor = '#10b981';
        } else {
            input.style.borderColor = '#ef4444';
        }
    });
});

// ========================================
// PRELOADER (Optional)
// ========================================

window.addEventListener('load', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Hide preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c👋 Привет! Добро пожаловать на сайт Никиты Чучаева', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cЕсли вы видите это, вы, вероятно, разработчик! 🚀', 'color: #764ba2; font-size: 14px;');
console.log('%cСвяжитесь со мной для обсуждения проектов!', 'color: #6366f1; font-size: 14px;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Focus trap for mobile menu
navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = navMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ========================================
// EASTER EGG (Optional Fun Feature)
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Trigger easter egg
        document.body.style.animation = 'rainbow 2s linear';
        console.log('🎉 Вы нашли секретный код! 🎉');
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Сайт загружен и готов к работе!');
    
    // Set current year in footer (if you add a year placeholder)
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize all animations
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
});
