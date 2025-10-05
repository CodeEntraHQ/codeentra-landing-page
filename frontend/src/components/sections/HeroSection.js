import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"; 
import { useState, useEffect } from 'react'; 
import { Button } from "../../components/ui/button"; 

// Local image imports (adjust paths if HeroSection is in a subfolder) 
import Test3 from '../../img/Test3.png'; 
import Test4 from '../../img/Test4.png'; 
import Test5 from '../../img/Test5.jpeg'; 

const images = [Test3, Test4, Test5]; 

const HeroSection = () => {     
    const [currentIndex, setCurrentIndex] = useState(0);     
    
    useEffect(() => {         
        const interval = setInterval(() => {             
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));         
        }, 3000); // change every 3 seconds         
        return () => clearInterval(interval);     
    }, []);     
    
    return (_jsxs("section", { 
        className: "relative pt-32 pb-20 md:pt-40 md:pb-28 flex items-center min-h-screen overflow-hidden overflow-x-hidden", 
        children: [
            _jsxs("div", { 
                className: "absolute inset-0 -z-10 ", 
                children: [
                    _jsx("div", { className: "absolute right-0 top-1/4 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20" }), 
                    _jsx("div", { className: "absolute left-1/4 bottom-0 w-80 h-80 bg-purple-100 rounded-full filter blur-3xl opacity-20" })
                ] 
            }), 
            _jsx("div", { 
                className: "container mx-auto px-4", 
                children: _jsxs("div", { 
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center", 
                    children: [
                        _jsxs("div", { 
                            className: "order-2 lg:order-1 animate-fade-up [animation-delay:200ms]", 
                            children: [
                                _jsx("span", { 
                                    className: "relative top-2 left-4 md:left-14 inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-blue-50 text-green-800 rounded-full pr-20 w-[40%] h-[35%] max-w-xs", 
                                    children: "Tech Unlocking Solutions" 
                                }), 
                                _jsxs("h1", { 
                                    className: "mb-6 text-center md:text-left", 
                                    children: [
                                        _jsx("span", { 
                                            className: "block mb-2 text-[#020817] text-[45px] md:text-[57px] font-bold px-4 md:pl-15", 
                                            children: "Empowering Your" 
                                        }), 
                                        _jsxs("span", { 
                                            className: "block text-green-800 text-[43px] md:text-[55px] font-bold px-4 md:pl-15", 
                                            children: [
                                                _jsx("span", { className: "block", children: "Digital" }),
                                                _jsx("span", { className: "block", children: "Transformation" })
                                            ]
                                        })
                                    ] 
                                }), 
                                _jsx("p", { 
                                    className: "text-lg md:text-xl text-muted-foreground mb-8 max-w-lg text-center md:text-left px-4 md:pl-15", 
                                    children: "We deliver end-to-end tech services and on-site talent, empowering companies to scale faster and smarter in the digital era." 
                                }), 
                                _jsxs("div", { 
                                    className: "flex flex-col sm:flex-row gap-4 justify-center md:justify-start", 
                                    children: [
                                        _jsx("a", { 
                                            href: "#contact", 
                                            children: _jsx(Button, { 
                                                className: "bg-green-800 hover:bg-green-700 text-black px-7 py-6 mx-4 md:ml-15", 
                                                children: "Get Started" 
                                            }) 
                                        }), 
                                        _jsx(Button, { 
                                            variant: "outline", 
                                            className: "border-green-700 text-black hover:text-green-700 hover:bg-green-50 font-medium px-8 py-6 mx-4 md:mx-0", 
                                            children: "Learn More" 
                                        })
                                    ] 
                                })
                            ] 
                        }), 
                        _jsx("div", { 
                            className: "order-1 lg:order-2 animate-fade-up [animation-delay:400ms]", 
                            children: _jsxs("div", { 
                                className: "relative md:right-5", 
                                children: [
                                    _jsx("div", { 
                                        className: "absolute -inset-1 bg-gradient-to-r from-green-800/30 to-green-900/30 rounded-2xl blur-xl opacity-50" 
                                    }), 
                                    _jsxs("div", { 
                                        className: "relative bg-white rounded-2xl shadow-xl overflow-hidden border aspect-[4/3] flex items-center justify-center w-full max-w-md mx-auto lg:max-w-none lg:w-[92%]", 
                                        children: [
                                            _jsx("div", { 
                                                className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-800 to-green-900" 
                                            }), 
                                            _jsx("img", { 
                                                src: images[currentIndex], 
                                                alt: `Slide ${currentIndex + 1}`, 
                                                className: "w-full h-full space-x-4 object-cover rounded-2xl" 
                                            })
                                        ] 
                                    })
                                ] 
                            }) 
                        })
                    ] 
                }) 
            })
        ] 
    })); 
}; 

export default HeroSection;