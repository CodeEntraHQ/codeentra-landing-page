// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const API_PORT = import.meta.env.VITE_PORT || '4000';
const apiUrl = API_BASE_URL.includes('://') ? API_BASE_URL : `http://${API_BASE_URL}:${API_PORT}`;

// Services - Return static data (can be replaced with backend API later)
export async function fetchServices() {
    // Static services data - matches fallback in ServicesSection
    return [
        {
            id: '1',
            title: "Web Development",
            description: "Custom websites and web applications built with the latest technologies to create powerful digital experiences.",
            icon: "code"
        },
        {
            id: '2',
            title: "DevOps Solutions",
            description: "Streamlined development workflows, CI/CD pipelines, and infrastructure automation to improve your delivery process.",
            icon: "settings"
        },
        {
            id: '3',
            title: "Cloud Services",
            description: "Expert cloud solutions for AWS, Azure, and GCP to help you scale your infrastructure efficiently and securely.",
            icon: "cloud"
        },
        {
            id: '4',
            title: "UX/UI Design",
            description: "User-centered design that creates intuitive, engaging, and accessible digital experiences that convert visitors to customers.",
            icon: "design"
        },
        {
            id: '5',
            title: "IT Consulting",
            description: "Strategic technology consulting to help your business make the right decisions for sustainable growth and innovation.",
            icon: "consulting"
        },
        {
            id: '6',
            title: "Cybersecurity",
            description: "Comprehensive security solutions to protect your business from threats and ensure compliance with regulations.",
            icon: "security"
        },
    ];
}

// Testimonials - Return static data (can be replaced with backend API later)
export async function fetchTestimonials() {
    // Static testimonials data - matches data in TestimonialsSection
    return [
        {
            id: '1',
            quote: "codeEntra transformed our outdated systems into a streamlined, modern infrastructure. Their expertise in DevOps was invaluable, and the results have significantly improved our productivity.",
            name: "Abhishek",
            title: "Principal",
            company: "University partner",
            rating: 5
        },
        {
            id: '2',
            quote: "Working with codeEntra on our web application was a game-changer. Their team delivered beyond our expectations, creating an intuitive platform that our users love.",
            name: "Suhani",
            title: "HOD",
            company: "EcoSolutions",
            rating: 5
        },
        {
            id: '3',
            quote: "The cloud migration support from codeEntra was excellent. Their team guided us through every step with clear communication and technical expertise.",
            name: "Sourabh",
            title: "HOC",
            company: "Global client Partners",
            rating: 4
        }
    ];
}

// Submit contact form - Use backend API
export async function submitContactForm(formData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/user/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to submit form' }));
            throw new Error(errorData.message || 'Failed to submit form');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
}
