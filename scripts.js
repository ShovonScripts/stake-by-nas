document.addEventListener('DOMContentLoaded', () => {
    // ===== MOBILE NAV TOGGLE =====
    const navToggle = document.querySelector('.nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');

    if (navToggle && mobileOverlay) {
        navToggle.addEventListener('click', () => {
            const isOpen = mobileOverlay.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        mobileOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
                mobileOverlay.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Nav blur and shadow on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for scroll animations
    const animateElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .step, .money-card, .reward-card, .benefit, .testimonial, .region-card'
    );

    // Check if the elements don't already have initial styles set by CSS classes
    animateElements.forEach(el => {
        if (!el.classList.contains('fade-in-up') && !el.classList.contains('fade-in-left') && !el.classList.contains('fade-in-right')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });

    // Special utility classes applied via HTML (fade-in-up, etc.)
    const applyInitialStyles = () => {
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        document.querySelectorAll('.fade-in-left').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-40px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        document.querySelectorAll('.fade-in-right').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(40px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    };

    applyInitialStyles();

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // Parallax effect on hero section for floating cards and phones
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const x = (window.innerWidth / 2 - e.pageX) / 60;
                const y = (window.innerHeight / 2 - e.pageY) / 60;

                const mainPhone = document.querySelector('.phone-main');
                const leftPhone = document.querySelector('.phone-left');
                const rightPhone = document.querySelector('.phone-right');

                if (mainPhone) {
                    mainPhone.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) translateZ(20px)`;
                }
                if (leftPhone) {
                    leftPhone.style.transform = `translateY(-55%) rotate(-6deg) translate(${x * 1.5}px, ${y * 1.5}px) translateZ(10px)`;
                }
                if (rightPhone) {
                    rightPhone.style.transform = `translateY(-45%) rotate(6deg) translate(${x * 0.8}px, ${y * 0.8}px) translateZ(10px)`;
                }
            });
        });
    }
});






// Inside your existing DOMContentLoaded
const cards = document.querySelectorAll('.testimonial-3d');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    });
});
