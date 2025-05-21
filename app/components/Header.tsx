'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero', icon: '🏠' },
    { name: 'About', href: '#about', icon: 'ℹ️' },
    { name: 'Technologies', href: '#technologies', icon: '🔧' },
    { name: 'Documents', href: '#documents', icon: '📄' },
    { name: 'Presentations', href: '#presentations', icon: '📊' },
    { name: 'Milestones', href: '#milestones', icon: '🏆' },
    { name: 'Gallery', href: '#gallery', icon: '🖼️' },
    { name: 'Team', href: '#team', icon: '👥' },
    { name: 'Contact', href: '#contact', icon: '📞' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100;
      
      for(let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if(section && section.offsetTop <= scrollPosition) {
          setActiveLink(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);
  
  // Smooth scroll implementation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL without page reload
      window.history.pushState(null, '', href);
      setActiveLink(targetId);
      
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: { 
      scale: 1.1, 
      color: "var(--primary)",
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.05 * i,
        duration: 0.3,
        ease: "easeOut" 
      }
    }),
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const menuButtonVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 } 
    },
    tap: { 
      scale: 0.9 
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white bg-opacity-95 backdrop-blur-sm shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            variants={logoVariants}
          >
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center"
            >
              <motion.span 
                className="text-2xl font-bold gradient-text mr-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                R
              </motion.span>
              <motion.span 
                className="font-semibold text-lg text-gray-800"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Research Project
              </motion.span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-6">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  custom={index}
                  variants={navItemVariants}
                  whileHover="hover"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-2 py-1 text-sm font-medium transition-colors cursor-pointer group ${
                      activeLink === link.href.replace('#', '') 
                        ? 'text-primary font-semibold' 
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    <span className="hidden sm:inline-block mr-1">{link.icon}</span>
                    {link.name}
                    {activeLink === link.href.replace('#', '') && (
                      <motion.span 
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                        layoutId="activeLink"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            variants={menuButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence for smooth enter/exit animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white bg-opacity-95 backdrop-blur-sm shadow-lg"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="px-4 pt-2 pb-4">
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={mobileNavItemVariants}
                    custom={index}
                  >
                    <a
                      href={link.href}
                      className={`flex items-center py-2 px-3 rounded-md ${
                        activeLink === link.href.replace('#', '') 
                          ? 'bg-primary-light/10 text-primary font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      <span className="mr-3 text-lg">{link.icon}</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
