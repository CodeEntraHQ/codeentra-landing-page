import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

// Global Smooth Scroll Handler Component
const SmoothScrollHandler = () => {
  useEffect(() => {
    const handleAnchorClick = (e) => {
      // Check if clicked element is an anchor link or inside one
      const link = e.target.closest('a[href^="#"]');
      
      if (link) {
        const href = link.getAttribute('href');
        
        // Only handle hash links (not just #)
        if (href && href !== '#' && href.startsWith('#')) {
          const targetId = href;
          const element = document.querySelector(targetId);
          
          if (element) {
            e.preventDefault();
            const navbarHeight = 80; // Fixed navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    // Add click listener to document for all anchor links
    document.addEventListener('click', handleAnchorClick, true);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, []);

  return null;
};

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Theme>
      <SmoothScrollHandler />
      <App />
    </Theme>
  </StrictMode>
);
