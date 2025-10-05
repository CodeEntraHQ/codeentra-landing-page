import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
const Index = () => {
    return (_jsxs("div", { className: "relative", children: [_jsx(Navbar, {}), _jsxs("main", { children: [_jsx(HeroSection, {}), _jsx(ServicesSection, {}), _jsx(AboutSection, {}), _jsx(TestimonialsSection, {}), _jsx(ContactSection, {})] }), _jsx(Footer, {})] }));
};
export default Index;
