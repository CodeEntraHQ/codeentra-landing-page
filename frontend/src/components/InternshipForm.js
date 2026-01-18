import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { submitInternshipApplication, getAllPricings } from "../services/api";

const InternshipForm = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        course: "",
        year: "",
        duration: "",
        price: "",
        skills: "",
        resume: "",
        coverLetter: "",
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [pricingOptions, setPricingOptions] = useState([]);
    const [loadingPricing, setLoadingPricing] = useState(true);

    useEffect(() => {
        const fetchPricings = async () => {
            try {
                setLoadingPricing(true);
                const response = await getAllPricings();
                if (response?.data && response.data.length > 0) {
                    const formatted = response.data
                        .filter(p => p.isActive !== false) // Only show active pricings
                        .map(p => ({
                            months: p.duration,
                            price: parseFloat(p.price)
                        }))
                        .sort((a, b) => a.months - b.months);
                    setPricingOptions(formatted);
                } else {
                    // No pricing data available - show empty array
                    setPricingOptions([]);
                    setResponseMessage("Error: No pricing plans available. Please contact admin.");
                }
            } catch (error) {
                console.error("Error fetching pricings:", error);
                // No fallback - show error message
                setPricingOptions([]);
                setResponseMessage("Error: Unable to load pricing information. Please try again later or contact support.");
            } finally {
                setLoadingPricing(false);
            }
        };
        
        // Fetch prices when dialog opens to get latest prices
        if (open) {
            fetchPricings();
        }
    }, [open]);

    const selectedPricing = pricingOptions.find(opt => opt.months.toString() === formData.duration);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");

        // Validate required fields before submission
        if (!formData.fullName || !formData.email || !formData.phone || 
            !formData.college || !formData.course || !formData.year || 
            !formData.duration || !formData.skills || !formData.resume) {
            setResponseMessage("Error: Please fill all required fields.");
            setLoading(false);
            return;
        }

        // Validate duration is selected
        if (!formData.duration || formData.duration === "") {
            setResponseMessage("Error: Please select internship duration.");
            setLoading(false);
            return;
        }

        // Get selected price from selected pricing option
        const selectedPrice = selectedPricing?.price;
        
        if (!selectedPrice) {
            setResponseMessage("Error: Please select a valid internship duration.");
            setLoading(false);
            return;
        }

        // Submit internship application to backend
        try {
            console.log("Submitting form with data:", { ...formData, price: selectedPrice });
            await submitInternshipApplication({ ...formData, price: selectedPrice });
            setResponseMessage("Application submitted successfully! We'll get back to you soon.");
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                college: "",
                course: "",
                year: "",
                duration: "",
                price: "",
                skills: "",
                resume: "",
                coverLetter: "",
            });
            setTimeout(() => {
                setOpen(false);
                setResponseMessage("");
            }, 2000);
        } catch (err) {
            console.error("Form submission error:", err);
            const errorMessage = err.message || "Unable to submit application. Please try again.";
            setResponseMessage(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        _jsx(Dialog, { 
            open: open, 
            onOpenChange: setOpen, 
            children: [
                _jsx(DialogTrigger, { 
                    asChild: true, 
                    children: _jsx(Button, { 
                        className: "bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow hover:animate-none relative overflow-hidden group border-2 border-green-400/50", 
                        children: [
                            _jsx("span", { 
                                className: "relative z-10 flex items-center gap-2", 
                                children: [
                                    _jsx("svg", { 
                                        className: "w-5 h-5", 
                                        fill: "none", 
                                        stroke: "currentColor", 
                                        viewBox: "0 0 24 24", 
                                        children: _jsx("path", { 
                                            strokeLinecap: "round", 
                                            strokeLinejoin: "round", 
                                            strokeWidth: 2, 
                                            d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                                        }) 
                                    }),
                                    _jsx("span", { children: "Apply for Internship" })
                                ] 
                            }),
                            _jsx("span", { 
                                className: "absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                            })
                        ] 
                    })
                }),
                _jsxs(DialogContent, { 
                className: "max-w-2xl max-h-[90vh] bg-white flex flex-col p-0", 
                children: [
                    _jsxs(DialogHeader, { 
                        className: "sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 shadow-sm", 
                        children: [
                            _jsx(DialogTitle, { 
                                className: "text-2xl font-bold text-green-800", 
                                children: "Internship Application Form" 
                            }),
                            _jsx(DialogDescription, { 
                                className: "text-muted-foreground", 
                                children: "Fill in your details to apply for our internship program. Please note: The internship fee is payable by the student. We'll review your application and get back to you soon." 
                            })
                        ] 
                    }),
                    _jsxs("form", { 
                        onSubmit: handleSubmit, 
                        className: "space-y-6 px-6 py-4 overflow-y-auto flex-1", 
                        children: [
                            _jsxs("div", { 
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4", 
                                children: [
                                    _jsxs("div", { 
                                        children: [
                                            _jsx(Label, { 
                                                htmlFor: "fullName", 
                                                children: "Full Name *" 
                                            }),
                                            _jsx(Input, { 
                                                id: "fullName", 
                                                type: "text", 
                                                value: formData.fullName, 
                                                onChange: handleChange, 
                                                placeholder: "Enter your full name", 
                                                required: true 
                                            })
                                        ] 
                                    }),
                                    _jsxs("div", { 
                                        children: [
                                            _jsx(Label, { 
                                                htmlFor: "email", 
                                                children: "Email *" 
                                            }),
                                            _jsx(Input, { 
                                                id: "email", 
                                                type: "email", 
                                                value: formData.email, 
                                                onChange: handleChange, 
                                                placeholder: "your.email@example.com", 
                                                required: true 
                                            })
                                        ] 
                                    })
                                ] 
                            }),
                            _jsxs("div", { 
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4", 
                                children: [
                                    _jsxs("div", { 
                                        children: [
                                            _jsx(Label, { 
                                                htmlFor: "phone", 
                                                children: "Phone Number *" 
                                            }),
                                            _jsx(Input, { 
                                                id: "phone", 
                                                type: "tel", 
                                                value: formData.phone, 
                                                onChange: handleChange, 
                                                placeholder: "+91 1234567890", 
                                                required: true 
                                            })
                                        ] 
                                    }),
                                    _jsxs("div", { 
                                        children: [
                                            _jsx(Label, { 
                                                htmlFor: "college", 
                                                children: "College/University *" 
                                            }),
                                            _jsx(Input, { 
                                                id: "college", 
                                                type: "text", 
                                                value: formData.college, 
                                                onChange: handleChange, 
                                                placeholder: "Your college name", 
                                                required: true 
                                            })
                                        ] 
                                    })
                                ] 
                            }),
                            _jsxs("div", { 
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4", 
                                children: [
                                    _jsxs("div", { 
                                        children: [
                                            _jsx(Label, { 
                                                htmlFor: "course", 
                                                children: "Course/Stream *" 
                                            }),
                                            _jsx(Input, { 
                                                id: "course", 
                                                type: "text", 
                                                value: formData.course, 
                                                onChange: handleChange, 
                                                placeholder: "e.g., Computer Science", 
                                                required: true 
                                            })
                                        ] 
                                    }),
                                    _jsxs("div", { 
                                        children: [
                                            _jsx(Label, { 
                                                htmlFor: "year", 
                                                children: "Year of Study *" 
                                            }),
                                            _jsx(Input, { 
                                                id: "year", 
                                                type: "text", 
                                                value: formData.year, 
                                                onChange: handleChange, 
                                                placeholder: "e.g., 2nd Year, 3rd Year", 
                                                required: true 
                                            })
                                        ] 
                                    })
                                ] 
                            }),
                            _jsxs("div", { 
                                children: [
                                    _jsx(Label, { 
                                        htmlFor: "duration", 
                                        children: "Internship Duration & Fee (Payable) *" 
                                    }),
                                    _jsx("p", { 
                                        className: "text-xs text-gray-600 mb-2", 
                                        children: "Please select the duration. The fee is payable by the student." 
                                    }),
                                    loadingPricing ? (
                                        _jsx("p", { 
                                            className: "text-gray-500 text-sm py-2", 
                                            children: "Loading pricing options..." 
                                        })
                                    ) : pricingOptions.length === 0 ? (
                                        _jsxs("div", { 
                                            className: "p-3 bg-yellow-50 border border-yellow-200 rounded-lg", 
                                            children: [
                                                _jsx("p", { 
                                                    className: "text-sm text-yellow-800 font-semibold mb-1", 
                                                    children: "No pricing plans available" 
                                                }),
                                                _jsx("p", { 
                                                    className: "text-xs text-yellow-700", 
                                                    children: "Please contact admin to set up pricing plans." 
                                                })
                                            ]
                                        })
                                    ) : (
                                        _jsx(Select, { 
                                            value: formData.duration, 
                                            onValueChange: (value) => {
                                                const selected = pricingOptions.find(opt => opt.months.toString() === value);
                                                setFormData((prev) => ({ 
                                                    ...prev, 
                                                    duration: value,
                                                    price: selected ? selected.price.toString() : ""
                                                }));
                                            }, 
                                            required: true,
                                            children: [
                                                _jsx(SelectTrigger, { 
                                                    id: "duration",
                                                    className: "w-full bg-white border-gray-300 text-gray-900",
                                                    children: _jsx(SelectValue, { placeholder: "Select duration and fee" }) 
                                                }),
                                                _jsx(SelectContent, { 
                                                    className: "bg-white",
                                                    children: pricingOptions.map((option) => (
                                                        _jsx(SelectItem, { 
                                                            value: option.months.toString(), 
                                                            children: `${option.months} Month${option.months > 1 ? 's' : ''} – Payable: ₹${option.price.toLocaleString('en-IN')}` 
                                                        }, option.months)
                                                    ))
                                                })
                                            ]
                                        })
                                    ),
                                    selectedPricing && _jsxs("div", { 
                                        className: "mt-3 p-3 bg-green-50 border border-green-200 rounded-lg", 
                                        children: [
                                            _jsx("p", { 
                                                className: "text-sm font-semibold text-green-800 mb-1", 
                                                children: `Selected Duration: ${selectedPricing.months} Month${selectedPricing.months > 1 ? 's' : ''} Internship` 
                                            }),
                                            _jsx("p", { 
                                                className: "text-sm text-green-700", 
                                                children: `Total Fee Payable: ₹${selectedPricing.price.toLocaleString('en-IN')}` 
                                            })
                                        ]
                                    })
                                ] 
                            }),
                            _jsxs("div", { 
                                children: [
                                    _jsx(Label, { 
                                        htmlFor: "skills", 
                                        children: "Skills & Technologies *" 
                                    }),
                                    _jsx(Input, { 
                                        id: "skills", 
                                        type: "text", 
                                        value: formData.skills, 
                                        onChange: handleChange, 
                                        placeholder: "e.g., React, Node.js, Python, etc.", 
                                        required: true 
                                    })
                                ] 
                            }),
                            _jsxs("div", { 
                                children: [
                                    _jsx(Label, { 
                                        htmlFor: "resume", 
                                        children: "Resume/CV Link *" 
                                    }),
                                    _jsx(Input, { 
                                        id: "resume", 
                                        type: "url", 
                                        value: formData.resume, 
                                        onChange: handleChange, 
                                        placeholder: "https://drive.google.com/...", 
                                        required: true 
                                    })
                                ] 
                            }),
                            _jsxs("div", { 
                                children: [
                                    _jsx(Label, { 
                                        htmlFor: "coverLetter", 
                                        children: "Cover Letter / Why do you want to intern with us?" 
                                    }),
                                    _jsx(Textarea, { 
                                        id: "coverLetter", 
                                        value: formData.coverLetter, 
                                        onChange: handleChange, 
                                        placeholder: "Tell us about yourself and why you're interested in this internship...", 
                                        rows: 4 
                                    })
                                ] 
                            }),
                            responseMessage && _jsx("p", { 
                                className: `text-sm ${responseMessage.includes("successfully") ? "text-green-700" : "text-red-700"}`, 
                                children: responseMessage 
                            }),
                            _jsxs("div", { 
                                className: "flex gap-3 justify-end pt-4", 
                                children: [
                                    _jsx(Button, { 
                                        type: "button", 
                                        variant: "outline", 
                                        onClick: () => setOpen(false), 
                                        children: "Cancel" 
                                    }),
                                    _jsx(Button, { 
                                        type: "submit", 
                                        className: "bg-green-800 hover:bg-green-700 text-white", 
                                        disabled: loading, 
                                        children: loading ? "Submitting..." : "Submit Application" 
                                    })
                                ] 
                            })
                        ] 
                    })
                ] 
                })
            ]
        })
    );
};

export default InternshipForm;
