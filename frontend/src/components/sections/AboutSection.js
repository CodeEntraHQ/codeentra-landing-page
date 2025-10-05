import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import Test3 from '../../img/Test3.png';
import Test4 from '../../img/Test4.png';
import Test5 from '../../img/Test5.jpeg';
const images = [Test3, Test4, Test5];
const AboutSection = () => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 4;
    const stats = [
        { value: '1+', label: 'Clients' },
        { value: '10+', label: 'Team Members' },
        { value: '2025', label: 'Years Experience' },
        { value: '  1+', label: 'Countries Served' },
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setStartIndex((prev) => (prev + visibleCount) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const visibleImages = Array.from({ length: visibleCount }, (_, i) => {
        return images[(startIndex + i) % images.length];
    });
    return (_jsx("section", { id: "about", className: "section-padding", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute -inset-2 bg-gradient-to-r from-green-200/50 to-green-100/50 rounded-2xl blur-xl opacity-50" }), _jsx("div", { className: "p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto", children: _jsx("div", { className: "grid grid-cols-2 gap-6", children: visibleImages.map((imgSrc, index) => (_jsx("div", { className: "bg-gray-100 p-6 rounded-lg flex items-center justify-center", children: _jsx("img", { src: imgSrc, alt: `Test ${index + 1}`, className: "w-24 h-24 object-contain" }) }, index))) }) })] }), _jsxs("div", { children: [_jsx("span", { className: "relative left-10 inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-green-50 text-green-800 rounded-full", children: "About Us" }), _jsxs("h2", { className: "relative left-10 font-bold text-[38px] mb-6", children: ["We're a Team of ", _jsx("span", { className: "font-bold text-[38px] text-green-800", children: "Tech Enthusiasts" })] }), _jsx("p", { className: "relative left-10 mr-20 text-muted-foreground mb-6", children: "Founded in 2025, codeEntra Unlocking Solutions has grown to leading technology solutions provider. Our mission is to empower businesses with innovative technology solutions that drive growth and success." }), _jsx("p", { className: "relative left-10 mr-20 text-[#6478B] text-muted-foreground mb-8", children: "We combine technical expertise with a deep understanding of business needs to deliver solutions that not only solve problems but create opportunities for our clients. Our team of dedicated professionals is passionate about technology and committed to excellence in everything we do." }), _jsx("div", { className: "relative left-10 mr-20 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8", children: stats.map((stat, index) => (_jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "text-2xl md:text-3xl font-bold text-green-800", children: stat.value }), _jsx("div", { className: "text-sm text-black", children: stat.label })] }, index))) }), _jsx(Button, { className: "relative left-10 mb-20 bg-green-800 hover:bg-green-700 text-black", children: "Our Team" })] })] }) }) }));
};
export default AboutSection;
