import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InternshipForm from "../InternshipForm";
import { Button } from "../ui/button";

const CareerSection = () => {
    const benefits = [
        {
            icon: _jsx("svg", { 
                className: "w-6 h-6 text-green-800", 
                fill: "none", 
                stroke: "currentColor", 
                viewBox: "0 0 24 24", 
                children: _jsx("path", { 
                    strokeLinecap: "round", 
                    strokeLinejoin: "round", 
                    strokeWidth: 2, 
                    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                }) 
            }),
            title: "Learning & Growth",
            description: "Continuous learning opportunities and mentorship from industry experts"
        },
        {
            icon: _jsx("svg", { 
                className: "w-6 h-6 text-green-800", 
                fill: "none", 
                stroke: "currentColor", 
                viewBox: "0 0 24 24", 
                children: _jsx("path", { 
                    strokeLinecap: "round", 
                    strokeLinejoin: "round", 
                    strokeWidth: 2, 
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                }) 
            }),
            title: "Team Collaboration",
            description: "Work with talented professionals in a collaborative environment"
        },
        {
            icon: _jsx("svg", { 
                className: "w-6 h-6 text-green-800", 
                fill: "none", 
                stroke: "currentColor", 
                viewBox: "0 0 24 24", 
                children: _jsx("path", { 
                    strokeLinecap: "round", 
                    strokeLinejoin: "round", 
                    strokeWidth: 2, 
                    d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                }) 
            }),
            title: "Real-World Projects",
            description: "Gain hands-on experience working on live projects"
        },
        {
            icon: _jsx("svg", { 
                className: "w-6 h-6 text-green-800", 
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
            title: "Certificate & Recognition",
            description: "Receive certificates and recommendations upon completion"
        }
    ];

    return (
        _jsx("section", { 
            id: "career", 
            className: "py-16 md:py-20 bg-gradient-to-br from-green-50 via-white to-green-50 pb-20 md:pb-24", 
            children: _jsx("div", { 
                className: "container mx-auto px-4", 
                children: _jsxs("div", { 
                    className: "max-w-4xl mx-auto", 
                    children: [
                        _jsxs("div", { 
                            className: "text-center mb-12", 
                            children: [
                                _jsx("span", { 
                                    className: "inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-green-50 text-green-800 rounded-full", 
                                    children: "Career Opportunities" 
                                }),
                                _jsxs("h2", { 
                                    className: "mb-4 font-bold text-[32px] md:text-[40px]", 
                                    children: [
                                        "Start Your Career with ", 
                                        _jsx("span", { 
                                            className: "text-green-800", 
                                            children: "codeEntra" 
                                        })
                                    ] 
                                }),
                                _jsx("p", { 
                                    className: "text-muted-foreground text-lg max-w-2xl mx-auto", 
                                    children: "Join our internship program and kickstart your career in technology. Work on real projects, learn from experts, and build your professional network." 
                                })
                            ] 
                        }),
                        _jsxs("div", { 
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12", 
                            children: benefits.map((benefit, index) => (
                                _jsxs("div", { 
                                    key: index,
                                    className: "bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100", 
                                    children: [
                                        _jsx("div", { 
                                            className: "mb-4", 
                                            children: benefit.icon 
                                        }),
                                        _jsx("h3", { 
                                            className: "text-xl font-semibold mb-2 text-gray-900", 
                                            children: benefit.title 
                                        }),
                                        _jsx("p", { 
                                            className: "text-muted-foreground", 
                                            children: benefit.description 
                                        })
                                    ] 
                                }, index)
                            ))
                        }),
                        _jsxs("div", { 
                            className: "bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12 text-center border-2 border-green-200 mb-0", 
                            children: [
                                _jsxs("h3", { 
                                    className: "text-2xl md:text-3xl font-bold mb-4 text-gray-900", 
                                    children: [
                                        "Ready to Begin Your Journey?", 
                                        _jsx("br", {}), 
                                        _jsx("span", { 
                                            className: "text-green-800", 
                                            children: "Apply for Internship Today!" 
                                        })
                                    ] 
                                }),
                                _jsx("p", { 
                                    className: "text-muted-foreground mb-8 text-lg", 
                                    children: "Fill out the application form below and take the first step towards an exciting career in technology." 
                                }),
                                _jsx("div", { 
                                    className: "flex justify-center", 
                                    children: _jsx(InternshipForm, {}) 
                                })
                            ] 
                        })
                    ] 
                }) 
            }) 
        })
    );
};

export default CareerSection;
