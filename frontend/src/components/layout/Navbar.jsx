import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/ui/button";
import { getAllNavbar } from "../../services/api";
import logo from '../../img/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fetch navbar data from API
    const { data: navbarData = [], isLoading } = useQuery({
        queryKey: ['navbar'],
        queryFn: getAllNavbar,
        staleTime: 0, // Always refetch to get latest data
        refetchOnWindowFocus: true,
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Separate regular links from "Get Started" button
    const regularLinks = navbarData.filter(item => item.isActive && item.label !== 'Get Started').sort((a, b) => a.orderIndex - b.orderIndex);
    const getStartedButton = navbarData.find(item => item.isActive && item.label === 'Get Started');

    // Fallback links if API fails
    const fallbackLinks = [
        { label: 'Services', url: '#services' },
        { label: 'About', url: '#about' },
        { label: 'Products', url: '#products' },
        { label: 'Testimonials', url: '#testimonials' },
        { label: 'Career', url: '#career' },
        { label: 'Contact', url: '#contact' },
    ];

    const displayLinks = regularLinks.length > 0 ? regularLinks : fallbackLinks;
    const getStartedUrl = getStartedButton?.url || '#contact';

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
                ? "bg-gradient-to-br from-green-50/90 via-white/90 to-green-50/90 backdrop-blur-md shadow-sm py-3"
                : "bg-gradient-to-br from-green-50/50 via-white/50 to-green-50/50 backdrop-blur-sm py-5"
        }`}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <a href="#" className="flex items-center">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="relative left-9 h-12 w-auto mr-5" 
                            style={{ transform: "scale(1.5)", transformOrigin: "left center" }}
                        />
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {displayLinks.map((link) => (
                        <a
                            key={link.id || link.label}
                            href={link.url}
                            className="text-sm font-medium hover:text-green-900 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop Get Started Button */}
                <div className="hidden md:block">
                    <div className="hidden md:block">
                        <a 
                            href={getStartedUrl} 
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Button className="relative right-12 bg-green-800 hover:bg-green-700 text-white">
                                Get Started
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gradient-to-br from-green-50 via-white to-green-50 shadow-md">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        {displayLinks.map((link) => (
                            <a
                                key={link.id || link.label}
                                href={link.url}
                                className="text-sm font-medium hover:text-green-900 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a href={getStartedUrl} onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="bg-green-800 hover:bg-green-700 text-white">
                                Get Started
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
