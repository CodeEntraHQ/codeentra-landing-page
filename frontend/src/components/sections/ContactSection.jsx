import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { submitContactForm, getAllContactInfo } from "../../services/api";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    // Fetch contact info from API
    const { data: contactInfo = [], isLoading: contactInfoLoading } = useQuery({
        queryKey: ['contactInfo'],
        queryFn: getAllContactInfo,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    });

    // Get contact info by type
    const getContactByType = (type) => {
        return contactInfo.find(ci => ci.type === type && ci.isActive);
    };

    const officeInfo = getContactByType('office');
    const emailInfo = getContactByType('email');
    const phoneInfo = getContactByType('phone');

    // Fallback values
    const officeValue = officeInfo?.value || "CodeEntra Unlocking Solutions Pvt. Ltd.\nKhata No. 64, Bhagwat Nag, Adarsh Colony, Kumhrar, Patna- 800026, Bihar";
    const emailValue = emailInfo?.value || "info@codeentra.com";
    const phoneValue = phoneInfo?.value || "+(91) 8105791804";
    const officeLabel = officeInfo?.label || "Our Office";
    const emailLabel = emailInfo?.label || "Email Us";
    const phoneLabel = phoneInfo?.label || "Call Us";
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");
        try {
            await submitContactForm(formData);
            setResponseMessage("Your message has been sent successfully!");
            setFormData({ fullname: "", email: "", subject: "", message: "" });
        } catch (err) {
            console.log("API ERROR", err);
            setResponseMessage(`Error: ${err.message || "Unable to send message. Please make sure the backend server is running."}`);
        } finally {
            setLoading(false);
        }
    };
    
    // Format phone number for tel: link
    const formatPhoneForLink = (phone) => {
        return phone.replace(/\D/g, '');
    };

    return (
        <section id="contact" className="py-16 md:py-20 pt-8 md:pt-12">
            <div className="container mx-auto px-4">
                <div>
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-green-50 text-green-800 rounded-full">
                            Contact Us
                        </span>
                        <h2 className="mb-6 font-bold text-[32px] md:text-[40px]">
                            Let's Start Your <span className="text-green-800">Digital Journey</span>
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                            Ready to transform your business with cutting-edge technology solutions? Get in touch with our team to discuss how we can help you achieve your goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        <div className="px-4 lg:px-0">
                            <div className="space-y-6">
                                {/* Our Office */}
                                {officeInfo && (
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">{officeLabel}</h3>
                                            <p className="text-muted-foreground mt-1 whitespace-pre-line">
                                                {officeValue}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Email Us */}
                                {emailInfo && (
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">{emailLabel}</h3>
                                            <a
                                                href={`mailto:${emailValue}`}
                                                className="text-muted-foreground mt-1 hover:text-green-800 transition-colors"
                                            >
                                                {emailValue}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Call Us */}
                                {phoneInfo && (
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">{phoneLabel}</h3>
                                            <a
                                                href={`tel:${formatPhoneForLink(phoneValue)}`}
                                                className="text-muted-foreground mt-1 hover:text-green-800 transition-colors"
                                            >
                                                {phoneValue}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Fallback if no contact info loaded */}
                                {contactInfoLoading && (
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg">{officeLabel}</h3>
                                                <p className="text-muted-foreground mt-1 whitespace-pre-line">
                                                    {officeValue}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4">
                                            <div className="mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg">{emailLabel}</h3>
                                                <a
                                                    href={`mailto:${emailValue}`}
                                                    className="text-muted-foreground mt-1 hover:text-green-800 transition-colors"
                                                >
                                                    {emailValue}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4">
                                            <div className="mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg">{phoneLabel}</h3>
                                                <a
                                                    href={`tel:${formatPhoneForLink(phoneValue)}`}
                                                    className="text-muted-foreground mt-1 hover:text-green-800 transition-colors"
                                                >
                                                    {phoneValue}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="px-4 lg:px-0">
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-gray-100">
                                <h3 className="text-2xl font-bold mb-6 text-green-800">Send us a message</h3>
                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <Input
                                                id="fullname"
                                                type="text"
                                                value={formData.fullname}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject
                                        </label>
                                        <Input
                                            id="subject"
                                            type="text"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Enter your subject"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                            Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your project..."
                                            rows={5}
                                            required
                                        />
                                    </div>
                                    {responseMessage && (
                                        <p className={`text-sm ${responseMessage.includes('Error') ? 'text-red-700' : 'text-green-700'}`}>
                                            {responseMessage}
                                        </p>
                                    )}
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-800 hover:bg-green-700 text-white"
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
