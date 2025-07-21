document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        }
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 100; 
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

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

    const animatedElements = document.querySelectorAll('.service-item, .project-item, .video-credits, .about-grid');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const spotifyIframes = document.querySelectorAll('iframe[src*="spotify"]');
    spotifyIframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s ease-in';
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = '#0F0F0F';
        } else {
            navbar.style.background = '#0F0F0F';
        }
    });

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
                typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    setTimeout(typeWriter, 300); 
                    return;
                }
                
                setTimeout(typeWriter, 50);
            } else {
                typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentText.length) {
                    isPaused = true;
                    setTimeout(typeWriter, 100);
                    return;
                }
                
                const typingSpeed = Math.random() * 100 + 80;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        setTimeout(() => {
            typeWriter();
        }, 1000);
    }
    
    initTypewriterAnimation();

// Hero Carousel Functionality
let currentHeroSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-carousel .carousel-slide');
const heroDots = document.querySelectorAll('.hero-carousel .dot');

function showHeroSlide(index) {
    // Hide all slides
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (heroSlides[index]) {
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
    }
}

function moveHeroCarousel(direction) {
    currentHeroSlideIndex += direction;
    
    if (currentHeroSlideIndex >= heroSlides.length) {
        currentHeroSlideIndex = 0;
    } else if (currentHeroSlideIndex < 0) {
        currentHeroSlideIndex = heroSlides.length - 1;
    }
    
    showHeroSlide(currentHeroSlideIndex);
}

function currentHeroSlide(index) {
    currentHeroSlideIndex = index - 1;
    showHeroSlide(currentHeroSlideIndex);
}

// Auto-advance hero carousel every 4 seconds
let heroCarouselInterval = setInterval(() => {
    moveHeroCarousel(1);
}, 4000);

// Pause auto-advance on hover
const heroCarousel = document.querySelector('.hero-carousel');
if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', () => {
        clearInterval(heroCarouselInterval);
    });
    
    heroCarousel.addEventListener('mouseleave', () => {
        heroCarouselInterval = setInterval(() => {
            moveHeroCarousel(1);
        }, 4000);
    });
}

// Initialize hero carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (heroSlides.length > 0) {
        showHeroSlide(0);
    }
});

// Photo Slider Functionality
let slideIndex = 1;

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let slides = document.getElementsByClassName('slide');
    let dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance slider every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);


// Lightbox Functionality
let currentLightboxIndex = 0;
const lightboxSlides = document.querySelectorAll('.lightbox-slide');
const lightboxDots = document.querySelectorAll('.lightbox-dot');
const lightboxImages = [
    'assets/IMG_9719.jpeg',
    'assets/IMG_9722.jpeg',
    'assets/IMG_9725.jpeg'
];

function openLightbox(slideIndex) {
    currentLightboxIndex = slideIndex;
    document.getElementById('lightboxModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    showLightboxSlide(currentLightboxIndex);
    updateLightboxCounter();
}

function closeLightbox() {
    document.getElementById('lightboxModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function changeLightboxSlide(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= lightboxSlides.length) {
        currentLightboxIndex = 0;
    }
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxSlides.length - 1;
    }
    showLightboxSlide(currentLightboxIndex);
    updateLightboxCounter();
}

function currentLightboxSlide(slideIndex) {
    currentLightboxIndex = slideIndex - 1;
    showLightboxSlide(currentLightboxIndex);
    updateLightboxCounter();
}

function showLightboxSlide(slideIndex) {
    // Hide all lightbox slides
    lightboxSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Hide all lightbox dots
    lightboxDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current lightbox slide and dot
    if (lightboxSlides[slideIndex]) {
        lightboxSlides[slideIndex].classList.add('active');
    }
    if (lightboxDots[slideIndex]) {
        lightboxDots[slideIndex].classList.add('active');
    }
}

function updateLightboxCounter() {
    const counterText = document.getElementById('lightbox-counter-text');
    if (counterText) {
        counterText.textContent = `${currentLightboxIndex + 1} / ${lightboxSlides.length}`;
    }
}

// Close lightbox when clicking outside the image
document.getElementById('lightboxModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightboxModal').style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            changeLightboxSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxSlide(1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightboxModal').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightboxModal').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - go to previous image
            changeLightboxSlide(-1);
        } else {
            // Swipe left - go to next image
            changeLightboxSlide(1);
        }
    }
}

// Individual Image Zoom Functionality
function openImageZoom(imageSrc) {
    const modal = document.getElementById('imageZoomModal');
    const zoomedImage = document.getElementById('zoomedImage');
    
    zoomedImage.src = imageSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeImageZoom() {
    const modal = document.getElementById('imageZoomModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close zoom when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const zoomModal = document.getElementById('imageZoomModal');
    if (zoomModal) {
        zoomModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeImageZoom();
            }
        });
    }
});

// Add keyboard support for individual zoom
document.addEventListener('keydown', function(e) {
    const zoomModal = document.getElementById('imageZoomModal');
    if (zoomModal && zoomModal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeImageZoom();
        }
    }
});

// Concept Photos functionality
function showConceptPhotos(concept) {
    // Hide all concept photo sets
    const allPhotos = document.querySelectorAll('.concept-photos');
    allPhotos.forEach(photos => {
        photos.classList.remove('active');
    });
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.concept-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected concept photos
    const selectedPhotos = document.getElementById(concept + '-photos');
    if (selectedPhotos) {
        selectedPhotos.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}
