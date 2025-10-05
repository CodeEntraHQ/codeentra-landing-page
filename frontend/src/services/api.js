import { supabase } from '../lib/supabase';
// Services
export async function fetchServices() {
    const { data, error } = await supabase
        .from('services')
        .select('*');
    if (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
    return data;
}
// Testimonials
export async function fetchTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*');
    if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
    return data;
}
// Submit contact form
export async function submitContactForm(formData) {
    const { data, error } = await supabase
        .from('contact_messages')
        .insert([formData])
        .select();
    if (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
    return data;
}
