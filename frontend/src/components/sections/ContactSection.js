import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { submitContactForm } from "../../services/api";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    
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
        }
        catch (err) {
            console.log("API ERROR", err);
            setResponseMessage(`Error: ${err.message || "Unable to send message. Please make sure the backend server is running."}`);
        }
        finally {
            setLoading(false);
        }
    };
    
    return (_jsx("section", { 
        id: "contact", 
        className: "section-padding", 
        children: _jsx("div", { 
            className: "container mx-auto px-15", 
            children: _jsxs("div", { 
                className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start", 
                children: [
                    _jsxs("div", { 
                        className: "px-4 lg:px-0",
                        children: [
                            _jsx("span", { 
                                className: "inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-green-50 text-green-800 rounded-full", 
                                children: "Contact Us" 
                            }), 
                            _jsxs("h2", { 
                                className: "mb-6 font-bold text-[32px]", 
                                children: [
                                    "Let's Start Your", 
                                    " ", 
                                    _jsx("span", { 
                                        className: "text-green-800", 
                                        children: "Digital Journey" 
                                    })
                                ] 
                            }), 
                            _jsx("p", { 
                                className: "text-muted-foreground mb-8", 
                                children: "Ready to transform your business with cutting-edge technology solutions? Get in touch with our team to discuss how we can help you achieve your goals." 
                            }), 
                            _jsxs("div", { 
                                className: "space-y-6", 
                                children: [
                                    _jsxs("div", { 
                                        className: "flex items-start space-x-4", 
                                        children: [
                                            _jsx("div", { 
                                                className: "mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0", 
                                                children: _jsxs("svg", { 
                                                    className: "w-5 h-5", 
                                                    fill: "none", 
                                                    stroke: "currentColor", 
                                                    viewBox: "0 0 24 24", 
                                                    children: [
                                                        _jsx("path", { 
                                                            strokeLinecap: "round", 
                                                            strokeLinejoin: "round", 
                                                            strokeWidth: 2, 
                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                                                        }), 
                                                        _jsx("path", { 
                                                            strokeLinecap: "round", 
                                                            strokeLinejoin: "round", 
                                                            strokeWidth: 2, 
                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                                                        })
                                                    ] 
                                                }) 
                                            }), 
                                            _jsxs("div", { 
                                                children: [
                                                    _jsx("h3", { 
                                                        className: "font-medium text-lg", 
                                                        children: "Our Office" 
                                                    }), 
                                                    _jsxs("p", { 
                                                        className: "text-muted-foreground mt-1", 
                                                        children: [
                                                            "Bhoothnath road Adarsh colony", 
                                                            _jsx("br", {}), 
                                                            "Bihar, Patna - 800026"
                                                        ] 
                                                    })
                                                ] 
                                            })
                                        ] 
                                    }), 
                                    _jsxs("div", { 
                                        className: "flex items-start space-x-4", 
                                        children: [
                                            _jsx("div", { 
                                                className: "mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0", 
                                                children: _jsx("svg", { 
                                                    className: "w-5 h-5", 
                                                    fill: "none", 
                                                    stroke: "currentColor", 
                                                    viewBox: "0 0 24 24", 
                                                    children: _jsx("path", { 
                                                        strokeLinecap: "round", 
                                                        strokeLinejoin: "round", 
                                                        strokeWidth: 2, 
                                                        d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                                                    }) 
                                                }) 
                                            }), 
                                            _jsxs("div", { 
                                                children: [
                                                    _jsx("h3", { 
                                                        className: "font-medium text-lg", 
                                                        children: "Email Us" 
                                                    }), 
                                                    _jsx("p", { 
                                                        className: "text-muted-foreground mt-1", 
                                                        children: "codeentra.oversight144@slmail.me" 
                                                    })
                                                ] 
                                            })
                                        ] 
                                    }), 
                                    _jsxs("div", { 
                                        className: "flex items-start space-x-4", 
                                        children: [
                                            _jsx("div", { 
                                                className: "mt-1 bg-green-100 p-2 rounded-lg text-green-700 flex-shrink-0", 
                                                children: _jsx("svg", { 
                                                    className: "w-5 h-5", 
                                                    fill: "none", 
                                                    stroke: "currentColor", 
                                                    viewBox: "0 0 24 24", 
                                                    children: _jsx("path", { 
                                                        strokeLinecap: "round", 
                                                        strokeLinejoin: "round", 
                                                        strokeWidth: 2, 
                                                        d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                                                    }) 
                                                }) 
                                            }), 
                                            _jsxs("div", { 
                                                children: [
                                                    _jsx("h3", { 
                                                        className: "font-medium text-lg", 
                                                        children: "Call Us" 
                                                    }), 
                                                    _jsx("p", { 
                                                        className: "text-muted-foreground mt-1", 
                                                        children: "+91 (960) 875-8841" 
                                                    })
                                                ] 
                                            })
                                        ] 
                                    })
                                ] 
                            })
                        ] 
                    }), 
                    _jsx("div", { 
                        className: "px-4 lg:px-0",
                        children: _jsxs("div", { 
                            className: "bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-gray-100", 
                            children: [
                                _jsx("h3", { 
                                    className: "text-2xl font-bold mb-6 text-green-800", 
                                    children: "Send us a message" 
                                }), 
                                _jsxs("form", { 
                                    className: "space-y-5", 
                                    onSubmit: handleSubmit, 
                                    children: [
                                        _jsxs("div", { 
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-5", 
                                            children: [
                                                _jsxs("div", { 
                                                    children: [
                                                        _jsx("label", { 
                                                            htmlFor: "fullname", 
                                                            className: "block text-sm font-medium text-gray-700 mb-1", 
                                                            children: "Full Name" 
                                                        }), 
                                                        _jsx(Input, { 
                                                            id: "fullname", 
                                                            type: "text", 
                                                            value: formData.fullname, 
                                                            onChange: handleChange, 
                                                            placeholder: "Enter your name", 
                                                            required: true 
                                                        })
                                                    ] 
                                                }), 
                                                _jsxs("div", { 
                                                    children: [
                                                        _jsx("label", { 
                                                            htmlFor: "email", 
                                                            className: "block text-sm font-medium text-gray-700 mb-1", 
                                                            children: "Email" 
                                                        }), 
                                                        _jsx(Input, { 
                                                            id: "email", 
                                                            type: "email", 
                                                            value: formData.email, 
                                                            onChange: handleChange, 
                                                            placeholder: "email@example.com", 
                                                            required: true 
                                                        })
                                                    ] 
                                                })
                                            ] 
                                        }), 
                                        _jsxs("div", { 
                                            children: [
                                                _jsx("label", { 
                                                    htmlFor: "subject", 
                                                    className: "block text-sm font-medium text-gray-700 mb-1", 
                                                    children: "Subject" 
                                                }), 
                                                _jsx(Input, { 
                                                    id: "subject", 
                                                    type: "text", 
                                                    value: formData.subject, 
                                                    onChange: handleChange, 
                                                    placeholder: "Enter your subject", 
                                                    required: true 
                                                })
                                            ] 
                                        }), 
                                        _jsxs("div", { 
                                            children: [
                                                _jsx("label", { 
                                                    htmlFor: "message", 
                                                    className: "block text-sm font-medium text-gray-700 mb-1", 
                                                    children: "Message" 
                                                }), 
                                                _jsx(Textarea, { 
                                                    id: "message", 
                                                    value: formData.message, 
                                                    onChange: handleChange, 
                                                    placeholder: "Tell us about your project...", 
                                                    rows: 5, 
                                                    required: true 
                                                })
                                            ] 
                                        }), 
                                        responseMessage && (_jsx("p", { 
                                            className: "text-sm text-green-700", 
                                            children: responseMessage 
                                        })), 
                                        _jsx(Button, { 
                                            type: "submit", 
                                            className: "w-full bg-green-800 hover:bg-green-700 text-black", 
                                            disabled: loading, 
                                            children: loading ? "Sending..." : "Send Message" 
                                        })
                                    ] 
                                })
                            ] 
                        }) 
                    })
                ] 
            }) 
        }) 
    }));
};

export default ContactSection;