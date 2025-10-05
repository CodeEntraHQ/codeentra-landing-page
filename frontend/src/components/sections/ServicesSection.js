import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ServiceCard from '../../components/ui/ServiceCard';
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../../services/api';
const ServicesSection = () => {
    const { data: services, isLoading, error } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices
    });
    const fallbackServices = [
        {
            id: '1',
            title: "Web Development",
            description: "Custom websites and web applications built with the latest technologies to create powerful digital experiences.",
            icon: "code"
        },
        {
            id: '2',
            title: "DevOps Solutions",
            description: "Streamlined development workflows, CI/CD pipelines, and infrastructure automation to improve your delivery process.",
            icon: "settings"
        },
        {
            id: '3',
            title: "Cloud Services",
            description: "Expert cloud solutions for AWS, Azure, and GCP to help you scale your infrastructure efficiently and securely.",
            icon: "cloud"
        },
        {
            title: "UX/UI Design",
            description: "User-centered design that creates intuitive, engaging, and accessible digital experiences that convert visitors to customers.",
            icon: (_jsx("svg", { className: "w-6 h-6 text-green-800 group-hover:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" }) }))
        },
        {
            title: "IT Consulting",
            description: "Strategic technology consulting to help your business make the right decisions for sustainable growth and innovation.",
            icon: (_jsx("svg", { className: "w-6 h-6 text-green-800 group-hover:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }))
        },
        {
            title: "Cybersecurity",
            description: "Comprehensive security solutions to protect your business from threats and ensure compliance with regulations.",
            icon: (_jsx("svg", { className: "w-6 h-6 text-green-800 group-hover:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }))
        },
    ];
    const displayServices = isLoading || error ? fallbackServices : services || fallbackServices;
    const getIconByName = (iconName) => {
        switch (iconName) {
            case 'code':
                return (_jsx("svg", { className: "w-6 h-6 text-green-800 group-hover:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }) }));
            case 'settings':
                return (_jsx("svg", { className: "w-6 h-6 text-green-800 group-hover:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" }) }));
            case 'cloud':
                return (_jsx("svg", { className: "w-6 h-6 text-green-800 group-hover:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" }) }));
            default:
                return (_jsx("svg", { className: "w-6 h-6 text-green-800 group-hover:text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }));
        }
    };
    return (_jsx("section", { id: "services", className: "section-padding bg-gray-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [_jsx("span", { className: "inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-green-50 text-green-800 rounded-full", children: "Our Services" }), _jsxs("h2", { className: "mb-4 font-bold text-[32px]", children: ["Comprehensive ", _jsx("span", { className: "text-green-800", children: "Tech Unlocking Solutions" })] }), _jsx("p", { className: "text-muted-foreground", children: "We offer a wide range of technology services to help your business succeed in the digital world. Here are some of our core offerings:" })] }), isLoading && (_jsx("div", { className: "flex justify-center mb-8", children: _jsx("div", { className: "animate-spin rounded-full h-10 w-10 border-b-2 border-green-700" }) })), _jsx("div", { className: "relative left-10 mr-23 mb-22 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: displayServices.map((service, index) => (_jsx("div", { className: "animate-fade-up", style: { animationDelay: `${(index + 1) * 100}ms` }, children: _jsx(ServiceCard, { title: service.title, description: service.description, icon: getIconByName(service.icon) }) }, service.id))) })] }) }));
};
export default ServicesSection;
