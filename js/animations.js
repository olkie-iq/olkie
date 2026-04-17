/**
 * Animation Management
 * Typing animation, skill bars, and other effects
 */

/**
 * Typing Animation
 * Animated typing effect for welcome screen
 */
class TypingAnimation {
    constructor(elementId, texts, speed = CONFIG.ANIMATION.TYPING_SPEED) {
        this.element = document.getElementById(elementId);
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

/**
 * Skill Bar Animation
 * Animate skill progress bars when card is opened
 */
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    skillFills.forEach(fill => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.parentElement.parentElement.style.getPropertyValue('--pct');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(fill);
    });
}

/**
 * Scroll Animation
 * Trigger animations when elements enter viewport
 */
function initScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Parallax Effect
 * Subtle parallax effect on scroll
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', throttle(() => {
        parallaxElements.forEach(element => {
            const scrollY = window.scrollY;
            const speed = element.dataset.parallax || 0.5;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, 16));
}

/**
 * Matrix Rain Effect
 * Animated matrix-like effect on canvas
 */
function initMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charSize = 10;
    const columns = Math.floor(canvas.width / charSize);
    const drops = Array(columns).fill(0);
    
    function draw() {
        ctx.fillStyle = 'rgba(4, 4, 4, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(255, 140, 0, 0.1)';
        ctx.font = `${charSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * charSize, drops[i] * charSize);
            
            if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const animationId = setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/**
 * Hover Glow Effect
 * Add glow effect on hover
 */
function initHoverGlowEffect() {
    const glowElements = document.querySelectorAll('.hex-btn, .card, .project-card, .social-card');
    
    glowElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.setProperty('--glow-x', `${x}px`);
            element.style.setProperty('--glow-y', `${y}px`);
        });
    });
}

/**
 * Stagger Animation
 * Animate elements with stagger effect
 */
function staggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        element.style.animation = `fadeSlide 0.6s ease forwards`;
        element.style.animationDelay = `${index * delay}ms`;
    });
}

/**
 * Initialize all animations
 */
function initializeAnimations() {
    // Typing animation
    const typingTexts = currentLanguage === 'en' 
        ? CONFIG.TYPING_TEXTS.en 
        : CONFIG.TYPING_TEXTS.ar;
    
    const typing = new TypingAnimation('typed-text', typingTexts);
    typing.start();
    
    // Skill bars
    animateSkillBars();
    
    // Scroll animations
    initScrollAnimations();
    
    // Parallax
    initParallaxEffect();
    
    // Matrix effect
    initMatrixEffect();
    
    // Hover glow
    initHoverGlowEffect();
    
    // Stagger animations
    staggerAnimation('.project-card', 100);
    staggerAnimation('.social-card', 80);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    initializeAnimations();
}
