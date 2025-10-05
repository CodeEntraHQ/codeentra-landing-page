import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import logo from '../../img/logo.png';
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (_jsxs("header", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"}`, children: [_jsxs("div", { className: "container mx-auto px-4 md:px-6 flex items-center justify-between", children: [_jsx("div", { className: "flex items-center", children: _jsx("a", { href: "#", className: "flex items-center", children: _jsx("img", { src: logo, alt: "Logo", className: "relative left-9 h-12 w-auto mr-5", style: { transform: "scale(1.5)", transformOrigin: "left center" } }) }) }), _jsxs("nav", { className: "hidden md:flex items-center space-x-8", children: [_jsx("a", { href: "#services", className: "text-sm font-medium hover:text-green-900 transition-colors", children: "Services" }), _jsx("a", { href: "#about", className: "text-sm font-medium hover:text-green-900 transition-colors", children: "About" }), _jsx("a", { href: "#testimonials", className: "text-sm font-medium hover:text-green-900 transition-colors", children: "Testimonials" }), _jsx("a", { href: "#contact", className: "text-sm font-medium hover:text-green-900 transition-colors", children: "Contact" })] }), _jsx("div", { className: "hidden md:block", children: _jsx("div", { className: "hidden md:block", children: _jsx("a", { href: "#contact", onClick: () => setIsMobileMenuOpen(false), children: _jsx(Button, { className: "relative right-12 bg-green-800 hover:bg-green-700 text-black", children: "Get Started" }) }) }) }), _jsx("button", { className: "md:hidden text-gray-600 focus:outline-none", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: isMobileMenuOpen ? (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })) : (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" })) }) })] }), isMobileMenuOpen && (_jsx("div", { className: "md:hidden bg-white shadow-md", children: _jsxs("div", { className: "container mx-auto px-4 py-4 flex flex-col space-y-4", children: [_jsx("a", { href: "#services", className: "text-sm font-medium hover:text-green-900 transition-colors", onClick: () => setIsMobileMenuOpen(false), children: "Services" }), _jsx("a", { href: "#about", className: "text-sm font-medium hover:text-green-900 transition-colors", onClick: () => setIsMobileMenuOpen(false), children: "About" }), _jsx("a", { href: "#testimonials", className: "text-sm font-medium hover:text-green-900 transition-colors", onClick: () => setIsMobileMenuOpen(false), children: "Testimonials" }), _jsx("a", { href: "#contact", className: "text-sm font-medium hover:text-green-900 transition-colors", onClick: () => setIsMobileMenuOpen(false), children: "Contact" }), _jsx(Button, { className: "bg-green-800 hover:bg-green-700 text-black", children: "Get Started" })] }) }))] }));
};
export default Navbar;
