import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import TestimonialCard from '../../components/ui/TestimonialCard';
const TestimonialsSection = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(1);
    const displayTestimonials = [
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
    return (_jsx("section", { id: "testimonials", className: "section-padding bg-gradient-to-br from-green-50 via-white to-green-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center max-w-2xl mx-auto mb-30", children: [_jsx("span", { className: "inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-green-100 text-green-900 rounded-full", children: "Testimonials" }), _jsxs("h2", { className: "mb-4 font-bold text-[32px]", children: ["What Our ", _jsx("span", { className: "text-green-900", children: "Clients Say" })] }), _jsx("p", { className: "text-muted-foreground", children: "Don't just take our word for it. Here's what some of our clients have to say about working with us." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: displayTestimonials.map((testimonial) => (_jsx("div", { className: "transition-all duration-300", onMouseEnter: () => setActiveTestimonial(Number(testimonial.id)), onClick: () => setActiveTestimonial(Number(testimonial.id)), children: _jsx(TestimonialCard, { quote: testimonial.quote, name: testimonial.name, title: testimonial.title, company: testimonial.company, rating: testimonial.rating, isActive: Number(testimonial.id) === activeTestimonial }) }, testimonial.id))) }), _jsx("div", { className: "flex justify-center mt-12", children: displayTestimonials.map((testimonial) => (_jsx("button", { className: `w-3 h-3 mx-1 rounded-full transition-all ${Number(testimonial.id) === activeTestimonial
                            ? 'bg-green-900 scale-125' // replaced bg-primary (blue) with dark green
                            : 'bg-green-100' // light green when not active
                        }`, onClick: () => setActiveTestimonial(Number(testimonial.id)), "aria-label": `View testimonial from ${testimonial.name}` }, testimonial.id))) })] }) }));
};
export default TestimonialsSection;
