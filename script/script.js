document.addEventListener('DOMContentLoaded', () => {

    const backgroundAnimation = document.querySelector('.background-animation');
    
    // Check device performance
    const checkPerformance = () => {
        const devicePixelRatio = window.devicePixelRatio || 1;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Reduce animations on low-performance devices
        if (isMobile || devicePixelRatio < 1) {
            backgroundAnimation.style.opacity = '0.5';
            document.querySelectorAll('.cube').forEach(cube => {
                cube.style.animationDuration = '20s';
            });
        }
    };

    checkPerformance();
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Check if device has touch support
    if ('ontouchstart' in window) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';

        // Smooth animation with requestAnimationFrame
        requestAnimationFrame(() => {
            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
        });
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            cursorOutline.classList.add('cursor-hover');
        });

        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        cursorOutline.style.transform = `translate(${posX}px, ${posY}px) scale(0.9)`;
    });

    document.addEventListener('mouseup', () => {
        cursorOutline.style.transform = `translate(${posX}px, ${posY}px) scale(1)`;
    });
    
    // Adjust animation on window resize
    window.addEventListener('resize', checkPerformance);
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
           preloader.classList.add('loaded');
            document.body.style.overflow = 'visible'; // Enable scrolling
            
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });

    // --- Navigation functionality ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    const toggleMenu = () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    };

    // Burger click
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            nav.classList.contains('nav-active') &&
            !nav.contains(e.target) &&
            !burger.contains(e.target)
        ) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
    

    // --- Smooth Scrolling + Close Nav ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close nav on mobile
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });

    // --- Project Card Animation ---
    const projectCards = document.querySelectorAll('.project-card');
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                projectObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        projectObserver.observe(card);
    });

    // --- Section Animation ---
    const sections = document.querySelectorAll('.section');
    const sectionObserverOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const animatedChildren = entry.target.querySelectorAll('.skill-category, .project-card, .education-item, .about-image, .about-text p');
                animatedChildren.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.15}s`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Typewriter ---
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const originalText = typewriterElement.textContent;
        typewriterElement.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                typewriterElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 1000);
    }

    // --- Particles ---
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00aeff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00aeff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // --- Footer Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Contact Form Submission ---
    document.getElementById("contact-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector("button[type='submit']");
        const btnText = submitBtn.querySelector("span");
        const loadingSpinner = submitBtn.querySelector(".submit-loading");

        btnText.style.display = "none";
        loadingSpinner.style.display = "block";
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                form.reset();
                alert("Thank you! Your message has been sent successfully.");
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert("Oops! There was a problem sending your message. Please try again.");
        } finally {
            btnText.style.display = "block";
            loadingSpinner.style.display = "none";
            submitBtn.disabled = false;
        }
    });

    // --- Nav Link Active Highlight ---
    const navA = document.querySelectorAll('nav .nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - (document.querySelector('header').offsetHeight + 100);
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });

        if (window.pageYOffset < sections[0].offsetTop - (document.querySelector('header').offsetHeight + 100) && navA.length > 0) {
            navA.forEach(a => a.classList.remove('active'));
        }
    });
});
