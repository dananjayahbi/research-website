'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Documents', href: '#documents' },
    { name: 'Presentations', href: '#presentations' },
    { name: 'Milestones', href: '#milestones' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">          <div className="flex items-center">            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center"
            >              <div className="w-8 h-8 mr-2 relative overflow-hidden rounded-full">
                <Image
                  src="/images/logo.png"
                  alt="Research Project Logo"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              <span className={`font-semibold text-lg ${isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-gray-800 dark:text-white'}`}>
                Mirror
              </span>
            </a>
          </div>{/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer ${
                      isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-800 dark:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <nav className="px-4 pt-2 pb-4">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
