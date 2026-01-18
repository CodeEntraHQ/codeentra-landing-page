// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const API_PORT = import.meta.env.VITE_PORT || '4000';
const apiUrl = API_BASE_URL.includes('://') ? API_BASE_URL : `http://${API_BASE_URL}:${API_PORT}`;

// Services - Fetch from backend API
export async function fetchServices() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/services`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch services' }));
            throw new Error(errorData.message || 'Failed to fetch services');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching services:', error);
        // Return fallback data on error
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
        ];
    }
}

// Services Admin API
export async function getAllServicesAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/services/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch services' }));
            throw new Error(errorData.message || 'Failed to fetch services');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
}

export async function createService(serviceData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/services/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to create service' }));
            throw new Error(errorData.message || 'Failed to create service');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating service:', error);
        throw error;
    }
}

export async function updateService(serviceId, serviceData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/services/admin/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to update service' }));
            throw new Error(errorData.message || 'Failed to update service');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
}

export async function deleteService(serviceId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/services/admin/${serviceId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete service' }));
            throw new Error(errorData.message || 'Failed to delete service');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
}

// Testimonials API
export async function fetchTestimonials() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/testimonials`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch testimonials' }));
            throw new Error(errorData.message || 'Failed to fetch testimonials');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Return fallback data on error
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
}

// Testimonials Admin API
export async function getAllTestimonialsAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/testimonials/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch testimonials' }));
            throw new Error(errorData.message || 'Failed to fetch testimonials');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
}

export async function createTestimonial(testimonialData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/testimonials/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonialData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to create testimonial' }));
            throw new Error(errorData.message || 'Failed to create testimonial');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating testimonial:', error);
        throw error;
    }
}

export async function updateTestimonial(testimonialId, testimonialData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/testimonials/admin/${testimonialId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonialData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to update testimonial' }));
            throw new Error(errorData.message || 'Failed to update testimonial');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating testimonial:', error);
        throw error;
    }
}

export async function deleteTestimonial(testimonialId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/testimonials/admin/${testimonialId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete testimonial' }));
            throw new Error(errorData.message || 'Failed to delete testimonial');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
    }
}

// Contact Info API
export async function getAllContactInfo() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/contact-info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch contact info' }));
            throw new Error(errorData.message || 'Failed to fetch contact info');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching contact info:', error);
        throw error;
    }
}

export async function getAllContactInfoAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/contact-info/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch contact info' }));
            throw new Error(errorData.message || 'Failed to fetch contact info');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching contact info:', error);
        throw error;
    }
}

export async function createContactInfo(contactInfoData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/contact-info/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactInfoData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to create contact info' }));
            throw new Error(errorData.message || 'Failed to create contact info');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating contact info:', error);
        throw error;
    }
}

export async function updateContactInfo(contactInfoId, contactInfoData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/contact-info/admin/${contactInfoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactInfoData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to update contact info' }));
            throw new Error(errorData.message || 'Failed to update contact info');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating contact info:', error);
        throw error;
    }
}

export async function deleteContactInfo(contactInfoId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/contact-info/admin/${contactInfoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete contact info' }));
            throw new Error(errorData.message || 'Failed to delete contact info');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting contact info:', error);
        throw error;
    }
}

// Footer API
export async function getAllFooter() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/footer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch footer' }));
            throw new Error(errorData.message || 'Failed to fetch footer');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching footer:', error);
        throw error;
    }
}

export async function getAllFooterAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/footer/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch footer' }));
            throw new Error(errorData.message || 'Failed to fetch footer');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching footer:', error);
        throw error;
    }
}

export async function createFooter(footerData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/footer/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(footerData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to create footer item' }));
            throw new Error(errorData.message || 'Failed to create footer item');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating footer item:', error);
        throw error;
    }
}

export async function updateFooter(footerId, footerData) {
    try {
        console.log('API: Updating footer item', footerId, footerData);
        const response = await fetch(`${apiUrl}/api/v1/footer/admin/${footerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(footerData),
        });
        
        const responseData = await response.json();
        console.log('API: Update response', response.status, responseData);
        
        if (!response.ok) {
            const errorMessage = responseData.message || 'Failed to update footer item';
            console.error('API: Update failed', errorMessage);
            throw new Error(errorMessage);
        }
        
        return responseData;
    } catch (error) {
        console.error('Error updating footer item:', error);
        throw error;
    }
}

export async function deleteFooter(footerId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/footer/admin/${footerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete footer item' }));
            throw new Error(errorData.message || 'Failed to delete footer item');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting footer item:', error);
        throw error;
    }
}

// Admin API
export async function adminLogin(email, password) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Invalid email or password' }));
            // Extract the actual error message from the API response
            const errorMessage = errorData.message || errorData.errors?.[0] || 'Invalid email or password';
            throw new Error(errorMessage);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        // Re-throw with a user-friendly message
        throw new Error(error.message || 'Invalid email or password');
    }
}

export async function getAdminProfile() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/admin/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch profile' }));
            throw new Error(errorData.message || 'Failed to fetch profile');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        throw error;
    }
}

export async function changePassword(currentPassword, newPassword, confirmPassword) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/admin/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to change password' }));
            throw new Error(errorData.message || 'Failed to change password');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
}

export async function updateAdminEmail(email, password) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/admin/update-email`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to update email' }));
            throw new Error(errorData.message || 'Failed to update email');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating email:', error);
        throw error;
    }
}

export async function uploadProfilePhoto(photoFile) {
    try {
        const formData = new FormData();
        formData.append('photo', photoFile);
        
        const response = await fetch(`${apiUrl}/api/v1/admin/upload-photo`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to upload photo' }));
            throw new Error(errorData.message || 'Failed to upload photo');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading photo:', error);
        throw error;
    }
}

export async function deleteProfilePhoto() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/admin/delete-photo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete photo' }));
            throw new Error(errorData.message || 'Failed to delete photo');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw error;
    }
}

// Navbar API
export async function getAllNavbar() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/navbar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch navbar' }));
            throw new Error(errorData.message || 'Failed to fetch navbar');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching navbar:', error);
        throw error;
    }
}

export async function getAllNavbarAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/navbar/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch navbar' }));
            throw new Error(errorData.message || 'Failed to fetch navbar');
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching navbar:', error);
        throw error;
    }
}

export async function createNavbar(navbarData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/navbar/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(navbarData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to create navbar item' }));
            throw new Error(errorData.message || 'Failed to create navbar item');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating navbar item:', error);
        throw error;
    }
}

export async function updateNavbar(navbarId, navbarData) {
    try {
        console.log('API: Updating navbar item', navbarId, navbarData);
        const response = await fetch(`${apiUrl}/api/v1/navbar/admin/${navbarId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(navbarData),
        });
        
        const responseData = await response.json();
        console.log('API: Update response', response.status, responseData);
        
        if (!response.ok) {
            const errorMessage = responseData.message || 'Failed to update navbar item';
            console.error('API: Update failed', errorMessage);
            throw new Error(errorMessage);
        }
        
        return responseData;
    } catch (error) {
        console.error('Error updating navbar item:', error);
        throw error;
    }
}

export async function deleteNavbar(navbarId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/navbar/admin/${navbarId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete navbar item' }));
            throw new Error(errorData.message || 'Failed to delete navbar item');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting navbar item:', error);
        throw error;
    }
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

// Get all internship applications - Dashboard API
export async function getAllInternships() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/internship/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch internships' }));
            throw new Error(errorData.message || 'Failed to fetch internships');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching internships:', error);
        throw error;
    }
}

// Get all contact form submissions - Dashboard API
export async function getAllContacts() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/user/contacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch contacts' }));
            throw new Error(errorData.message || 'Failed to fetch contacts');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
}

// Delete contact - Dashboard API
export async function deleteContact(contactId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/user/contacts/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete contact' }));
            throw new Error(errorData.message || 'Failed to delete contact');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
}

// Delete internship - Dashboard API
export async function deleteInternship(internshipId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/internship/${internshipId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete internship' }));
            throw new Error(errorData.message || 'Failed to delete internship');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting internship:', error);
        throw error;
    }
}

// Submit internship application - Use backend API
export async function submitInternshipApplication(formData) {
    try {
        const url = `${apiUrl}/api/v1/internship/apply`;
        console.log('Submitting to:', url);
        console.log('Form data:', formData);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('Response status:', response.status, response.statusText);

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.error('Error response data:', errorData);
            } catch (parseError) {
                console.error('Failed to parse error response:', parseError);
                errorData = { 
                    message: `Server error: ${response.status} ${response.statusText}` 
                };
            }
            
            const errorMessage = errorData?.message || 
                                errorData?.error || 
                                `Failed to submit: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Success response:', data);
        return data;
    } catch (error) {
        console.error('Error submitting internship application:', error);
        
        // Network errors (backend not running, CORS, etc.)
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Cannot connect to server. Please check if backend is running on ' + apiUrl);
        }
        
        // Re-throw with original message if it's already an Error
        if (error instanceof Error) {
            throw error;
        }
        
        // Fallback for unknown errors
        throw new Error(error.message || 'Failed to submit internship application. Please try again.');
    }
}

// Get all notifications - Dashboard API
export async function getAllNotifications() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/notifications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch notifications' }));
            throw new Error(errorData.message || 'Failed to fetch notifications');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
}

// Mark notification as read - Dashboard API
export async function markNotificationAsRead(notificationId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/notifications/${notificationId}/read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to mark notification as read' }));
            throw new Error(errorData.message || 'Failed to mark notification as read');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
}

// Delete notification - Dashboard API
export async function deleteNotification(notificationId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/notifications/${notificationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete notification' }));
            throw new Error(errorData.message || 'Failed to delete notification');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
}

// Clear all notifications - Dashboard API
export async function clearAllNotifications() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/notifications/clear`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to clear notifications' }));
            throw new Error(errorData.message || 'Failed to clear notifications');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error clearing notifications:', error);
        throw error;
    }
}

// Get all pricings (public) - Website API
export async function getAllPricings() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/pricing`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch pricings' }));
            throw new Error(errorData.message || 'Failed to fetch pricings');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching pricings:', error);
        throw error;
    }
}

// Get all pricings (admin) - Dashboard API
export async function getAllPricingsAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/pricing/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch pricings' }));
            throw new Error(errorData.message || 'Failed to fetch pricings');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching pricings:', error);
        throw error;
    }
}

// Update multiple pricings (admin) - Dashboard API
export async function updateMultiplePricings(pricings) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/pricing/admin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pricings }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to update pricings' }));
            throw new Error(errorData.message || 'Failed to update pricings');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating pricings:', error);
        throw error;
    }
}

// Delete pricing (admin) - Dashboard API
export async function deletePricing(pricingId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/pricing/admin/${pricingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete pricing' }));
            throw new Error(errorData.message || 'Failed to delete pricing');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting pricing:', error);
        throw error;
    }
}

// Get all updates (public) - Website API
export async function getAllUpdates() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/updates`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch updates' }));
            throw new Error(errorData.message || 'Failed to fetch updates');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching updates:', error);
        throw error;
    }
}

// Get all updates (admin) - Dashboard API
export async function getAllUpdatesAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/updates/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch updates' }));
            throw new Error(errorData.message || 'Failed to fetch updates');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching updates:', error);
        throw error;
    }
}

// Create update (admin) - Dashboard API
export async function createUpdate(updateData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/updates/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to create update' }));
            throw new Error(errorData.message || 'Failed to create update');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating update:', error);
        throw error;
    }
}

// Update update (admin) - Dashboard API
export async function updateUpdate(updateId, updateData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/updates/admin/${updateId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to update update' }));
            throw new Error(errorData.message || 'Failed to update update');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating update:', error);
        throw error;
    }
}

// Delete update (admin) - Dashboard API
export async function deleteUpdate(updateId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/updates/admin/${updateId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete update' }));
            throw new Error(errorData.message || 'Failed to delete update');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting update:', error);
        throw error;
    }
}


// FAQs API
export async function getAllFAQs() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/faqs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch FAQs' }));
            throw new Error(errorData.message || 'Failed to fetch FAQs');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        throw error;
    }
}

// Conversation Flow API
export async function getInitialQuestion() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/conversation/initial`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch initial question' }));
            throw new Error(errorData.message || 'Failed to fetch initial question');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching initial question:', error);
        throw error;
    }
}

export async function getQuestionById(questionId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/conversation/${questionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch question' }));
            throw new Error(errorData.message || 'Failed to fetch question');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching question:', error);
        throw error;
    }
}

// Conversation Admin API
export async function getAllQuestionsAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/conversation/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch questions' }));
            throw new Error(errorData.message || 'Failed to fetch questions');
        }
        const data = await response.json();
        console.log('getAllQuestionsAdmin response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}

export async function createQuestion(questionData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/conversation/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to create question' }));
            throw new Error(errorData.message || 'Failed to create question');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
}

export async function updateQuestion(questionId, questionData) {
    try {
        console.log('API: Updating question', questionId, questionData);
        const response = await fetch(`${apiUrl}/api/v1/conversation/admin/${questionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });
        
        console.log('API: Response status', response.status, response.statusText);
        
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.error('API: Error response data', errorData);
            } catch (parseError) {
                console.error('API: Failed to parse error response', parseError);
                errorData = { message: `Server error: ${response.status} ${response.statusText}` };
            }
            throw new Error(errorData.message || errorData.error || `Failed to update question: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API: Update successful', data);
        return data;
    } catch (error) {
        console.error('API: Error updating question:', error);
        // Re-throw with more context
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(error.message || 'Failed to update question. Please try again.');
    }
}

export async function deleteQuestion(questionId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/conversation/admin/${questionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete question' }));
            throw new Error(errorData.message || 'Failed to delete question');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
}

// Products API
export async function getAllProducts() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch products' }));
            throw new Error(errorData.message || 'Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getAllProductsAdmin() {
    try {
        const response = await fetch(`${apiUrl}/api/v1/products/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch products' }));
            throw new Error(errorData.message || 'Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function createProduct(productData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/products/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to create product' }));
            throw new Error(errorData.message || 'Failed to create product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

export async function updateProduct(productId, productData) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/products/admin/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to update product' }));
            throw new Error(errorData.message || 'Failed to update product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await fetch(`${apiUrl}/api/v1/products/admin/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete product' }));
            throw new Error(errorData.message || 'Failed to delete product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
