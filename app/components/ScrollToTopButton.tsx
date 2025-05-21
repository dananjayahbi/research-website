'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component to display a reusable "scroll to top" button with animations
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Update URL without page reload
    window.history.pushState(null, '', '#hero');
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275] // Custom cubic bezier for spring effect
      }
    },
    tap: { 
      scale: 0.9, 
      backgroundColor: "#2563EB" // Darker blue on tap
    },
    hover: {
      scale: 1.1,
      backgroundColor: "#3B82F6", // Lighter blue on hover
      boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)", // Glowing effect
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants = {
    hover: {
      y: -3,
      transition: {
        yoyo: Infinity,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="#hero"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg z-50"
          aria-label="Scroll to top"
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <motion.div variants={arrowVariants}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
