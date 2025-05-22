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
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Documents', href: '#documents' },
    { name: 'Presentations', href: '#presentations' },
    { name: 'Milestones', href: '#milestones' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Domain', href: '#domain' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
        // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100; // Adjusted offset for larger header
      
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
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25
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
    }),    hover: { 
      scale: 1.02, 
      color: "#60a5fa", /* blue-400 */
      transition: { 
        duration: 0.2 
      } 
    }
  };
  const logoVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.05,
        type: "spring",
        stiffness: 200,
        damping: 18
      }
    }
  };
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };
  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.03 * i,
        duration: 0.2,
        ease: "easeOut" 
      }
    }),
    exit: { 
      opacity: 0, 
      x: -10,
      transition: { 
        duration: 0.15 
      }
    }
  };
  const menuButtonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.15 } 
    },
    tap: { 
      scale: 0.95 
    }  };  return (    <motion.header      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900 text-white bg-opacity-95 backdrop-blur-sm shadow-md pl-0 ${
        isScrolled
          ? 'py-3'
          : 'py-4'
      }`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"    >      <div className="w-full max-w-full mx-0 px-0">
        <div className="flex items-center h-14">          <motion.div 
            className="flex items-center ml-8 md:ml-12 lg:ml-16"
            variants={logoVariants}
          >            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center pl-3"
            >              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-12 h-12 mr-3 rounded-full overflow-hidden border-2 border-blue-400/30"
              >
                <Image
                  src="/images/logo.png"
                  alt="MIRROR Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.span 
                className="font-medium text-lg text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                MIRROR
              </motion.span>
            </a></motion.div>          {/* Desktop Navigation */}          <nav className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex space-x-6 md:space-x-8">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  custom={index}
                  variants={navItemVariants}
                  whileHover="hover"
                >                  <a
                    href={link.href}                    onClick={(e) => handleNavClick(e, link.href)}                    className={`relative px-3 py-2 text-base font-medium transition-colors cursor-pointer group ${
                      activeLink === link.href.replace('#', '') 
                        ? 'text-blue-300 font-semibold'
                        : 'text-gray-200 hover:text-blue-300'
                    }`}
                  >
                    {link.name}                    {activeLink === link.href.replace('#', '') && (
                      <motion.span 
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-300"
                        layoutId="activeLink"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>          {/* Mobile Menu Button */}          <motion.button
            type="button"
            className="md:hidden flex items-center ml-auto mr-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            variants={menuButtonVariants}
            whileHover="hover"
            whileTap="tap"
          ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>          </motion.button>
          <div className="hidden md:block ml-8 md:ml-12 lg:ml-16 w-8"></div>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence for smooth enter/exit animations */}      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-gray-900 bg-opacity-98 backdrop-blur-sm shadow-xs"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="px-3 pt-1 pb-2">
              <ul className="space-y-0.5">
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={mobileNavItemVariants}
                    custom={index}
                  >                    <a
                      href={link.href}                      className={`block py-3 px-4 rounded-sm text-base ${
                        activeLink === link.href.replace('#', '') 
                          ? 'bg-blue-500/15 text-blue-300 font-medium' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
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
