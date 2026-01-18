import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import TopAnnouncement from '../components/layout/TopAnnouncement';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ProductsSection from '../components/sections/ProductsSection.jsx';
import UpdatesSection from '../components/sections/UpdatesSection.jsx';
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx';
import CareerSection from '../components/sections/CareerSection';
import ContactSection from '../components/sections/ContactSection.jsx';
import Chatbot from '../components/Chatbot';
const Index = () => {
    return (_jsxs("div", { className: "relative bg-gradient-to-br from-green-50 via-white to-green-50 min-h-screen", children: [_jsx(Navbar, {}), _jsx(TopAnnouncement, {}), _jsxs("main", { className: "bg-gradient-to-br from-green-50 via-white to-green-50", children: [_jsx(HeroSection, {}), _jsx(ServicesSection, {}), _jsx(AboutSection, {}), _jsx(ProductsSection, {}), _jsx(UpdatesSection, {}), _jsx(TestimonialsSection, {}), _jsx(CareerSection, {}), _jsx(ContactSection, {})] }), _jsx(Footer, {}), _jsx(Chatbot, {})] }));
};
export default Index;
