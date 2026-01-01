document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const words = ["Gen AI Specialist", "Computer Vision Specialist", "Digital Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.parentElement.closest('section')?.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Sticky Header Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // ================================
    // INFINITE GRID BACKGROUND
    // ================================
    const gridHighlight = document.getElementById('grid-highlight');
    const patternSubtle = document.getElementById('grid-pattern-subtle');
    const patternHighlight = document.getElementById('grid-pattern-highlight');

    // Grid animation settings
    const gridSize = 40;
    const speedX = 0.3;
    const speedY = 0.3;
    let gridOffsetX = 0;
    let gridOffsetY = 0;

    // Infinite scroll animation loop
    function animateGrid() {
        gridOffsetX = (gridOffsetX + speedX) % gridSize;
        gridOffsetY = (gridOffsetY + speedY) % gridSize;

        // Update both SVG patterns
        if (patternSubtle) {
            patternSubtle.setAttribute('x', gridOffsetX);
            patternSubtle.setAttribute('y', gridOffsetY);
        }
        if (patternHighlight) {
            patternHighlight.setAttribute('x', gridOffsetX);
            patternHighlight.setAttribute('y', gridOffsetY);
        }

        requestAnimationFrame(animateGrid);
    }

    // Start the animation
    animateGrid();

    // Mouse flashlight effect
    document.addEventListener('mousemove', (e) => {
        if (gridHighlight) {
            const maskStyle = `radial-gradient(300px circle at ${e.clientX}px ${e.clientY}px, black, transparent)`;
            gridHighlight.style.maskImage = maskStyle;
            gridHighlight.style.webkitMaskImage = maskStyle;
        }
    });

    // Hide flashlight when mouse leaves viewport
    document.addEventListener('mouseleave', () => {
        if (gridHighlight) {
            const maskStyle = 'radial-gradient(300px circle at -9999px -9999px, black, transparent)';
            gridHighlight.style.maskImage = maskStyle;
            gridHighlight.style.webkitMaskImage = maskStyle;
        }
    });
});
