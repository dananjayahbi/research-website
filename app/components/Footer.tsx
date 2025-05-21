'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { getCurrentYear } from '../utils/dateUtils';

export default function Footer() {  
  const { ref, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  // Get current year using the utility function
  const currentYear = getCurrentYear();

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: "#FFFFFF",
      transition: {
        duration: 0.2
      }
    }
  };
  const socialIconVariants = {
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const copyrightVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.5
      }
    }
  };

  return (
    <motion.footer 
      className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden"
      ref={ref}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-xl"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-accent/5 blur-xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-secondary/5 blur-xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div 
            custom={0} 
            variants={columnVariants}
          >
            <motion.div 
              className="flex items-center mb-6"
              variants={logoVariants}
            >
              <motion.div 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-xl font-bold mr-3"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                R
              </motion.div>
              <motion.span 
                className="text-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Research Project
              </motion.span>
            </motion.div>
            <motion.p 
              className="text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Advancing scientific knowledge through innovative research methodologies and interdisciplinary collaboration.
            </motion.p>
            <div className="flex space-x-4">
              {/* Social media icons */}
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            custom={1} 
            variants={columnVariants}
          >
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <motion.span 
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About', href: '#about' },
                { name: 'Technologies', href: '#technologies' },
                { name: 'Documents', href: '#documents' },
                { name: 'Presentations', href: '#presentations' },
                { name: 'Team', href: '#team' },
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.5 + (index * 0.05), duration: 0.4 }}
                >
                  <motion.div
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center group"
                  >
                    <motion.span 
                      className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            custom={2} 
            variants={columnVariants}
          >
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Resources
              <motion.span 
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Research Papers', href: '#' },
                { name: 'Data Repository', href: '#' },
                { name: 'News & Updates', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Use', href: '#' },
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.6 + (index * 0.05), duration: 0.4 }}
                >
                  <motion.div
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center group"
                  >
                    <motion.span 
                      className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            custom={3} 
            variants={columnVariants}
          >
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contact
              <motion.span 
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </h3>            <address className="not-italic text-gray-300 space-y-3">
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ x: 3 }}
              >
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 text-primary" 
                  whileHover={{ scale: 1.2, rotate: 5, backgroundColor: "#3a4fcf" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
                <span>123 Research Way, Science City, 12345</span>
              </motion.div>              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ x: 3 }}
              >
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 text-primary" 
                  whileHover={{ scale: 1.2, rotate: 5, backgroundColor: "#3a4fcf" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <span>research@example.com</span>
              </motion.div>              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                whileHover={{ x: 3 }}
              >
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 text-primary" 
                  whileHover={{ scale: 1.2, rotate: 5, backgroundColor: "#3a4fcf" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                <span>(123) 456-7890</span>
              </motion.div>
              
              {/* Newsletter signup */}
              <motion.div
                className="mt-6 pt-6 border-t border-gray-800"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Subscribe to Updates</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 bg-gray-800 text-white rounded-l-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary flex-grow text-sm"
                  />
                  <button 
                    className="bg-primary hover:bg-primary-dark transition-colors px-3 py-2 rounded-r-md text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </address>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 pt-8 mt-8"
          variants={copyrightVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-400 text-sm"
              whileHover={{ color: "#CBD5E0" }}
            >
              © {currentYear} Research Project. All rights reserved.
            </motion.p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item, index) => (
                  <motion.li key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1 + (index * 0.1), duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ x: 2, color: "#FFFFFF" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        {item}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
