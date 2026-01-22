// ============================================
// Dark Mode Toggle
// ============================================
(function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const sunIconMobile = document.getElementById('sunIconMobile');
    const moonIconMobile = document.getElementById('moonIconMobile');
    const html = document.documentElement;
    
    // Function to update icons based on theme
    function updateIcons(theme) {
        if (theme === 'dark') {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
            if (sunIconMobile) sunIconMobile.style.display = 'none';
            if (moonIconMobile) moonIconMobile.style.display = 'block';
        } else {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIconMobile) sunIconMobile.style.display = 'block';
            if (moonIconMobile) moonIconMobile.style.display = 'none';
        }
    }
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    }
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateIcons(currentTheme);
    
    // Add event listeners
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
    }
    
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleTheme);
    }
})();

// ============================================
// Navbar Scroll Effect
// ============================================
(function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
})();

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
})();

// ============================================
// Hero Image Rotation
// ============================================
(function() {
    const heroImage = document.getElementById('heroImage');
    const images = ['img/Test3.png', 'img/Test4.png', 'img/Test5.jpeg'];
    let currentIndex = 0;
    
    if (heroImage) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            heroImage.src = images[currentIndex];
        }, 3000);
    }
})();

// ============================================
// Testimonials Carousel
// ============================================
(function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    let currentActive = 0;
    
    function setActiveTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        currentActive = index;
    }
    
    // Click handlers for cards
    testimonialCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            setActiveTestimonial(index);
        });
    });
    
    // Click handlers for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            setActiveTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentActive = (currentActive + 1) % testimonialCards.length;
        setActiveTestimonial(currentActive);
    }, 5000);
})();

// ============================================
// Service Modal
// ============================================
(function() {
    const serviceModal = document.getElementById('serviceModal');
    const serviceModalTitle = document.getElementById('serviceModalTitle');
    const serviceModalContent = document.getElementById('serviceModalContent');
    
    const serviceDescriptions = {
        'Web Development': 'Custom websites and web applications built with the latest technologies to create powerful digital experiences. We specialize in responsive design, modern frameworks, and scalable architectures.',
        'DevOps Solutions': 'Streamlined development workflows, CI/CD pipelines, and infrastructure automation to improve your delivery process. We help you deploy faster and more reliably.',
        'Cloud Services': 'Expert cloud solutions for AWS, Azure, and GCP to help you scale your infrastructure efficiently and securely. From migration to optimization, we handle it all.',
        'UX/UI Design': 'User-centered design that creates intuitive, engaging, and accessible digital experiences that convert visitors to customers. We focus on both aesthetics and functionality.',
        'IT Consulting': 'Strategic technology consulting to help your business make the right decisions for sustainable growth and innovation. We provide expert guidance on technology adoption and digital transformation.',
        'Cybersecurity': 'Comprehensive security solutions to protect your business from threats and ensure compliance with regulations. We offer security audits, penetration testing, and ongoing monitoring.',
        'IT Staffing Solutions': 'Expert IT professionals and technical talent on-demand. We provide skilled employees to companies needing qualified staff for their projects and operations. Our team members are vetted and ready to contribute.',
        'Website Maintenance & Support': 'Comprehensive website maintenance services including updates, security patches, performance optimization, and ongoing support for colleges, institutions, and businesses. We ensure your website stays secure, fast, and up-to-date.',
        'Marketing & Advertisement Services': 'We provide end-to-end marketing and advertisement solutions tailored for businesses and educational institutions. Our services include organizing seminars and workshops in partner institutions and schools, creating promotional campaigns, managing event logistics, and ensuring maximum visibility for your brand. Whether you\'re a college looking to attract students or a business seeking to expand your market presence, we help you connect with your target audience through strategic marketing initiatives.'
    };
    
    if (serviceModal) {
        serviceModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const serviceName = button.getAttribute('data-service');
            
            serviceModalTitle.textContent = serviceName;
            serviceModalContent.textContent = serviceDescriptions[serviceName] || 'Service information will be available soon.';
        });
    }
})();

// ============================================
// Chatbot Functionality
// ============================================
(function() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotOptions = document.getElementById('chatbotOptions');
    
    const chatbotResponses = {
        'services': {
            answer: 'We offer Web Development, DevOps Solutions, Cloud Services, UX/UI Design, IT Consulting, and Cybersecurity services. Visit our Services section to learn more!',
            link: '#services'
        },
        'products': {
            answer: 'We have developed innovative products to solve real-world problems. Visit our Products section to explore them!',
            link: '#products'
        },
        'internship': {
            answer: 'We offer amazing internship opportunities. You can apply by visiting our Career section on the website.',
            link: '#career'
        },
        'about': {
            answer: 'codeEntra is a leading technology solutions provider founded in 2025. We specialize in empowering businesses with innovative technology solutions.',
            link: '#about'
        },
        'contact': {
            answer: `You can reach us through our contact form on this page or email us directly at ${CONFIG.chatbot.contactEmail}. We would love to hear from you!`,
            link: '#contact'
        }
    };
    
    function openChatbot() {
        chatbotPanel.classList.add('active');
        // Show options when opening
        addOptionsToMessages();
    }
    
    function closeChatbot() {
        chatbotPanel.classList.remove('active');
    }
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        if (!isUser) {
            const header = document.createElement('div');
            header.className = 'message-header';
            header.innerHTML = '<i class="bi bi-robot"></i><span>Assistant</span>';
            messageDiv.appendChild(header);
        }
        
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addOptionsToMessages() {
        // Remove existing options if any
        const existingOptions = chatbotMessages.querySelector('.chatbot-options-inline');
        if (existingOptions) {
            existingOptions.remove();
        }
        
        // Create new options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'chatbot-options-inline';
        optionsContainer.id = 'chatbotOptions';
        
        // Add all options
        const options = [
            { option: 'services', text: 'Our Services' },
            { option: 'products', text: 'Our Products' },
            { option: 'internship', text: 'Internship Program' },
            { option: 'about', text: 'About codeEntra' },
            { option: 'contact', text: 'Contact Us' }
        ];
        
        options.forEach(opt => {
            const button = document.createElement('button');
            button.className = 'chatbot-option';
            button.setAttribute('data-option', opt.option);
            button.textContent = opt.text;
            button.addEventListener('click', () => {
                const optionType = button.getAttribute('data-option');
                addMessage(opt.text, true);
                // Hide options after selection
                optionsContainer.style.display = 'none';
                setTimeout(() => {
                    handleOptionClick(optionType);
                }, 500);
            });
            optionsContainer.appendChild(button);
        });
        
        chatbotMessages.appendChild(optionsContainer);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function handleOptionClick(option) {
        const response = chatbotResponses[option];
        if (response) {
            addMessage(response.answer);
            
            // Add link button if available
            if (response.link) {
                setTimeout(() => {
                    const linkButton = document.createElement('a');
                    linkButton.href = response.link;
                    linkButton.className = 'btn btn-sm btn-primary-custom mt-2';
                    linkButton.textContent = 'Learn More';
                    linkButton.style.display = 'inline-block';
                    linkButton.onclick = () => {
                        closeChatbot();
                        setTimeout(() => {
                            document.querySelector(response.link).scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                    };
                    const lastMessage = chatbotMessages.querySelector('.message:last-child');
                    if (lastMessage) {
                        lastMessage.appendChild(linkButton);
                    }
                }, 100);
            }
            
            // Show options again after response
            setTimeout(() => {
                addOptionsToMessages();
            }, 800);
        }
    }
    
    chatbotButton.addEventListener('click', openChatbot);
    chatbotClose.addEventListener('click', closeChatbot);
    
    // Initialize options on page load
    if (chatbotOptions) {
        // Options will be added dynamically via addOptionsToMessages()
    }
    
    
    // Close on outside click (optional)
    document.addEventListener('click', (e) => {
        if (chatbotPanel.classList.contains('active') && 
            !chatbotPanel.contains(e.target) && 
            !chatbotButton.contains(e.target)) {
            // Uncomment to enable auto-close on outside click
            // closeChatbot();
        }
    });
})();

// ============================================
// Google Forms Placeholders
// ============================================
function openContactForm() {
    const formUrl = CONFIG.forms.contact;
    
    if (formUrl) {
        window.open(formUrl, '_blank', 'noopener,noreferrer');
    } else {
        // Show modal placeholder for now
        const modal = new bootstrap.Modal(document.getElementById('formModal'));
        document.getElementById('formModalTitle').textContent = 'Contact Us';
        modal.show();
    }
}

function openInternshipForm() {
    const formUrl = CONFIG.forms.internship;
    
    if (formUrl) {
        window.open(formUrl, '_blank', 'noopener,noreferrer');
    } else {
        // Show modal placeholder for now
        const modal = new bootstrap.Modal(document.getElementById('formModal'));
        document.getElementById('formModalTitle').textContent = 'Internship Application';
        modal.show();
    }
}

// ============================================
// Intersection Observer for Animations
// ============================================
(function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in-up 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe service cards, benefit cards, etc.
    document.querySelectorAll('.service-card, .benefit-card, .testimonial-card, .product-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
})();

// ============================================
// About Section Image Rotation
// ============================================
(function() {
    const aboutImages = document.querySelectorAll('.about-image');
    const images = ['img/Test3.png', 'img/Test4.png', 'img/Test5.jpeg'];
    let startIndex = 0;
    
    if (aboutImages.length > 0) {
        setInterval(() => {
            aboutImages.forEach((img, index) => {
                const imageIndex = (startIndex + index) % images.length;
                img.src = images[imageIndex];
            });
            startIndex = (startIndex + 1) % images.length;
        }, 3000);
    }
})();

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('codeEntra website loaded successfully!');
});
