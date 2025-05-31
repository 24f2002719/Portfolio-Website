document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => { // Ensure all assets are loaded, then fade out
            preloader.classList.add('loaded');
        }, 500); // Adjust delay as needed, 0 for immediate fade after load
    });

    // --- Responsive Navigation (Burger Menu) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(l => l.style.animation = '');
            }
        });
    });

    // --- Smooth Scrolling for internal links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Enhanced Section Fade-in & Element Staggering ---
    const sections = document.querySelectorAll('.section');
    const sectionObserverOptions = {
        root: null, // viewport
        threshold: 0.1, // 10% visibility
        rootMargin: "0px 0px -50px 0px" // trigger a bit earlier
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger animation for child elements
                const animatedChildren = entry.target.querySelectorAll('.skill-category, .project-card, .education-item, .about-image, .about-text p');
                animatedChildren.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.15}s`; // Stagger delay
                });
                observer.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Typewriter Effect ---
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const originalText = typewriterElement.textContent;
        typewriterElement.textContent = ''; // Clear original text
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                typewriterElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80); // Adjust typing speed
            }
        }
        // Start typing a bit after page load for effect
        setTimeout(typeWriter, 1000);
    }


    // --- Particles.js Initialization ---
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80, // Number of particles
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00aeff" // Primary color for particles
                },
                "shape": {
                    "type": "circle", // "circle", "edge", "triangle", "polygon", "star", "image"
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.6, // Particle opacity
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3, // Particle size
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00aeff", // Line color
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3, // Particle movement speed
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // "grab", "bubble", "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" // "push", "remove", "bubble"
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
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }


    // --- Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector("button[type='submit']");
    const btnText = submitBtn.querySelector("span");
    const loadingSpinner = submitBtn.querySelector(".submit-loading");

    // Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});
    
    // Show loading state
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
            // Show success message
            form.reset();
            alert("Thank you! Your message has been sent successfully.");
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert("Oops! There was a problem sending your message. Please try again.");
    } finally {
        // Reset button state
        btnText.style.display = "block";
        loadingSpinner.style.display = "none";
        submitBtn.disabled = false;
    }
});

    // --- Active Nav Link Highlighting (improved for dark theme) ---
    const navA = document.querySelectorAll('nav .nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - (document.querySelector('header').offsetHeight + 100); // Adjusted offset
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) { // Compare without '#'
                a.classList.add('active');
            }
        });
        // Ensure first link is active if at top
        if (window.pageYOffset < sections[0].offsetTop - (document.querySelector('header').offsetHeight + 100) && navA.length > 0) {
             navA.forEach(a => a.classList.remove('active')); // Remove all active
             // Optionally, make the "home/first" link active or none
        }
    });
});
