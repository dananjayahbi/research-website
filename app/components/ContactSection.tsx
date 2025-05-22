'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';
import StaggerContainer from './StaggerContainer';
import FadeInAnimation from './FadeInAnimation';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        // Reset form data
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formInputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  const contactItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i: number) => ({ 
      x: 0, 
      opacity: 1, 
      transition: { 
        delay: 0.1 * i,
        type: "spring",
        stiffness: 200,
        damping: 20
      } 
    })
  };

  const submitButtonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.6,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 400 
      } 
    },
    tap: { 
      scale: 0.95 
    }
  };
    // Animation variants for colorful contact section with fixed positions
  const particles = Array.from({ length: 6 }, (_, i) => i);
  
  // Fixed positions for particles to prevent hydration mismatch
  const particlePositions = [
    { top: "10%", left: "80%" },
    { top: "20%", left: "15%" },
    { top: "35%", left: "60%" },
    { top: "50%", left: "25%" },
    { top: "65%", left: "75%" },
    { top: "85%", left: "40%" }
  ];
  
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: [0.2, 0.8, 0.2], 
      scale: [1, 1.5, 1],
      transition: { 
        delay: i * 0.2,
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      } 
    })
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white relative overflow-hidden" ref={ref}>      {/* Decorative particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={particleVariants}
          initial="hidden"
          animate="visible"
          className={`absolute rounded-full opacity-20 ${
            i % 3 === 0 
              ? 'bg-blue-400 w-32 h-32' 
              : i % 3 === 1 
                ? 'bg-indigo-400 w-48 h-48' 
                : 'bg-purple-400 w-64 h-64'
          }`}
          style={{
            top: particlePositions[i].top,
            left: particlePositions[i].left,
            filter: 'blur(40px)'
          }}
        />
      ))}
      
      <div className="max-w-6xl mx-auto relative">
        <FadeInAnimation>
          <div className="relative p-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 inline-block mx-auto mb-3">
            <div className="bg-white p-2 rounded-full">
              <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  <AnimatedLetters text="Contact Us" staggerDuration={0.05} initialDelay={0.2} />
                </h2>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Have questions about our research? Get in touch with our team using the form below.
          </p>
        </FadeInAnimation>
        
        <div className="grid md:grid-cols-2 gap-12">
          <StaggerContainer delay={0.3} staggerDelay={0.15} className="space-y-8 md:pr-6">
            <FadeInAnimation direction="left">
              <div className="px-6 py-8 rounded-2xl bg-white shadow-xl border border-blue-100 relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-50 z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Get in Touch</h3>
                  <p className="text-gray-600 mb-6">
                    We're interested in collaborations and are open to answering any questions about our research. 
                    Feel free to reach out to us using this form and we'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            </FadeInAnimation>
            
            <div className="space-y-4">
              <motion.div 
                className="flex items-start"
                custom={0}
                variants={contactItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div 
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1 text-foreground">Email</h4>
                  <p className="text-gray-600">isurangasulakshana@gmail.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                custom={1}
                variants={contactItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div 
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1 text-foreground">Phone</h4>
                  <p className="text-gray-600">(+94) 557-5691</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                custom={2}
                variants={contactItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div 
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1 text-foreground">Location</h4>
                  <p className="text-gray-600">SLIIT Malabe Campus, New Kandy Road, Malabe.</p>
                </div>
              </motion.div>
            </div>
            
            {/* Social media links */}
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              {["twitter", "linkedin", "github", "youtube"].map((platform, index) => (
                <motion.a 
                  key={platform}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md border border-blue-100 text-gray-600 hover:text-white transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: 
                      platform === "twitter" ? "#1DA1F2" : 
                      platform === "linkedin" ? "#0A66C2" : 
                      platform === "github" ? "#24292E" : 
                      "#FF0000",
                    y: -5
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  {platform === "twitter" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  )}
                  {platform === "linkedin" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  )}
                  {platform === "github" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  )}
                  {platform === "youtube" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </StaggerContainer>
          
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-blue-100 to-transparent rounded-full transform translate-x-16 -translate-y-16 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-t from-indigo-100 to-transparent rounded-full transform -translate-x-16 translate-y-16 opacity-70"></div>
            
            <div className="relative">
              <h3 className="text-2xl font-semibold mb-6 text-foreground bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Send a Message</h3>
              
              {submitStatus && (
                <motion.div 
                  className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200'}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus.message}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit}>
                <StaggerContainer staggerDelay={0.1} className="space-y-4">
                  <motion.div variants={formInputVariants} className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Your Name</label>
                    <motion.div className="relative">
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                        placeholder="Enter Your Name"
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={formInputVariants} className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Your Email</label>
                    <motion.div className="relative">
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                        placeholder="Enter Your email"
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={formInputVariants} className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">Subject</label>
                    <motion.div className="relative">
                      <motion.input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                        placeholder="Inquiry about research project"
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 010-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={formInputVariants} className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                    <motion.div className="relative">
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                        placeholder="Your message here..."
                        rows={5}
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      ></motion.textarea>
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white py-3 rounded-lg transition duration-300 flex items-center justify-center font-medium shadow-md"
                    variants={submitButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                        Send Message
                      </span>
                    )}
                  </motion.button>
                </StaggerContainer>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
