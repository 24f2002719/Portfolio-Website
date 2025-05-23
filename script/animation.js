const observerOptions = {
    threshold: 0.25
};



document.querySelectorAll('.project-card, .skill-category, .education-item').forEach((el) => {
    observer.observe(el);
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', animateOnScroll);

// Scroll Progress Indicator
const updateScrollProgress = () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    
    const progressWidth = `${(scrolled / scrollable) * 100}%`;
    scrollProgress.style.width = progressWidth;
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);



// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card, .skill-category, .education-item')
        .forEach(el => observer.observe(el));
    
    window.addEventListener('scroll', updateScrollProgress);
});

// Smooth section transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});