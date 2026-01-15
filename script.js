// Image Lightbox/Zoom Functionality
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const projectPhotos = document.querySelectorAll('.project-photo');

// Open modal when project image is clicked
projectPhotos.forEach(photo => {
    photo.addEventListener('click', function() {
        imageModal.classList.add('show');
        modalImage.src = this.src;
        modalImage.alt = this.alt;
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when close button is clicked
modalClose.addEventListener('click', function() {
    imageModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the image
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModal.classList.contains('show')) {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Submission Handler
const contactForm = document.querySelector('.contact-form');
const successModal = document.getElementById('successModal');
const successModalBtn = document.getElementById('successModalBtn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Submit to Formspree
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success modal
            successModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            contactForm.reset();
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
});

// Close success modal
successModalBtn.addEventListener('click', function() {
    successModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close success modal when clicking outside
successModal.addEventListener('click', function(e) {
    if (e.target === successModal) {
        successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close success modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && successModal.classList.contains('show')) {
        successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Project Tab Filtering
const tabButtons = document.querySelectorAll('.tab-btn');
const projectCards = document.querySelectorAll('.project-card');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Get the category
        const category = button.getAttribute('data-tab');

        // Filter projects
        projectCards.forEach(card => {
            if (category === 'all') {
                card.classList.remove('hidden');
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
    }
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill tags and project cards for animation
document.querySelectorAll('.skill-tag, .project-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Prevent form submission via mailto for demo purposes
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-color)';
        });
    });
});
