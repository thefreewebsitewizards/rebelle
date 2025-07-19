// REBELLE Website JavaScript
// Mobile Navigation & Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact Form Enhancement
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            
            if (name && name.value.trim() === '') {
                showFieldError(name, 'Name is required');
                isValid = false;
            } else if (name) {
                clearFieldError(name);
            }
            
            if (email && email.value.trim() === '') {
                showFieldError(email, 'Email is required');
                isValid = false;
            } else if (email && !isValidEmail(email.value)) {
                showFieldError(email, 'Please enter a valid email');
                isValid = false;
            } else if (email) {
                clearFieldError(email);
            }
            
            if (!isValid) {
                e.preventDefault();
            } else {
                // Show success message
                showSuccessMessage('Thank you! Your message has been sent.');
            }
        });
    }

    // Form validation helper functions
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#FF1493';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#FF1493';
    }

    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '#FFB6C1';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #FF1493, #8B008B);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            font-weight: 600;
            animation: fadeInUp 0.5s ease-out;
        `;
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Scroll animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-item, .project-item, .video-credits, .about-grid');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add loading animation to Spotify iframes
    const spotifyIframes = document.querySelectorAll('iframe[src*="spotify"]');
    spotifyIframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s ease-in';
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 182, 193, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 182, 193, 0.95)';
        }
    });

    // Add hover effects to social icons
    const socialIcons = document.querySelectorAll('.footer-social a, .social-icons-large a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('🎵 REBELLE Website JavaScript Loaded Successfully! 🎵');
});

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);

    // Typewriter Animation for Hero Title
    function initTypewriterAnimation() {
        const typewriterElement = document.getElementById('typewriter-text');
        
        if (!typewriterElement) return;
        
        const words = [
            { text: 'Rebelle', class: 'word-rebelle', pause: 2000 },
            { text: 'Feminine', class: 'word-feminine', pause: 1500 },
            { text: 'Fierce', class: 'word-fierce', pause: 1500 },
            { text: 'Fearless', class: 'word-fearless', pause: 1500 }
        ];
        
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        
        function typeWriter() {
            const currentWord = words[currentWordIndex];
            const currentText = currentWord.text;
            
            // Update word-specific class
            typewriterElement.className = `typewriter-text ${currentWord.class}`;
            
            if (isPaused) {
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    typeWriter();
                }, currentWord.pause);
                return;
            }
            
            if (isDeleting) {
                // Remove character
                typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    setTimeout(typeWriter, 300); // Brief pause before next word
                    return;
                }
                
                setTimeout(typeWriter, 50); // Fast deletion
            } else {
                // Add character
                typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentText.length) {
                    isPaused = true;
                    setTimeout(typeWriter, 100);
                    return;
                }
                
                // Variable typing speed for natural feel
                const typingSpeed = Math.random() * 100 + 80; // 80-180ms
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start animation after initial delay
        setTimeout(() => {
            typeWriter();
        }, 1000);
    }
    
    // Initialize typewriter animation
    initTypewriterAnimation();
