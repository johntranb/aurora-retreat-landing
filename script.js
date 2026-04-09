/* ========================================
   Aurora Retreat Landing Page — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    const handleNavScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // --- Hero slider ---
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    setInterval(nextSlide, 6000);

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let lightboxImages = [];
    let lightboxIndex = 0;

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.dataset.caption || '';

        lightboxImages.push({
            src: img.src,
            alt: img.alt,
            caption: caption
        });

        item.addEventListener('click', () => {
            lightboxIndex = index;
            openLightbox();
        });
    });

    const openLightbox = () => {
        const current = lightboxImages[lightboxIndex];
        lightboxImg.src = current.src;
        lightboxImg.alt = current.alt;
        lightboxCaption.textContent = current.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        openLightbox();
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        openLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
            openLightbox();
        }
        if (e.key === 'ArrowRight') {
            lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
            openLightbox();
        }
    });

    // --- Scroll animations with IntersectionObserver ---
    const animateElements = () => {
        // Add animate-on-scroll class to elements
        const selectors = [
            '.host-card',
            '.amenity-card',
            '.review-card',
            '.timeline-item',
            '.booking-card',
            '.gallery-item'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add('animate-on-scroll');
                el.style.transitionDelay = `${i * 0.1}s`;
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    };

    animateElements();

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Parallax on hero (subtle) ---
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const heroContent = document.querySelector('.hero-content');
                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                    heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

});
