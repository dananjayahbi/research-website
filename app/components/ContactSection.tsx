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

  return (
    <section id="contact" className="py-20 px-4 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <FadeInAnimation>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <AnimatedLetters text="Contact Us" staggerDuration={0.05} initialDelay={0.2} />
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Have questions about our research? Get in touch with our team using the form below.
          </p>
        </FadeInAnimation>
        
        <div className="grid md:grid-cols-2 gap-12">
          <StaggerContainer delay={0.3} staggerDelay={0.15} className="space-y-8">
            <FadeInAnimation direction="left">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                We're interested in collaborations and are open to answering any questions about our research. 
                Feel free to reach out to us using this form and we'll get back to you as soon as possible.
              </p>
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
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1 text-foreground">Email</h4>
                  <p className="text-gray-600">research@example.com</p>
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
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium mb-1 text-foreground">Phone</h4>
                  <p className="text-gray-600">(123) 456-7890</p>
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
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"
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
                  <p className="text-gray-600">123 Research Way, Science City, 12345</p>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative element */}
            <div className="relative hidden md:block mt-8 h-48">
              <motion.div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full border-2 border-primary/20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-24 h-24 rounded-full border-2 border-primary/30"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -5, 0],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </StaggerContainer>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Send a Message</h3>
            
            {submitStatus && (
              <motion.div 
                className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
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
                      className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="John Doe"
                      required
                      whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(74, 108, 247, 0.2)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
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
                      className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="john.doe@example.com"
                      required
                      whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(74, 108, 247, 0.2)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
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
                      className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Inquiry about research project"
                      required
                      whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(74, 108, 247, 0.2)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
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
                      className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Your message here..."
                      rows={5}
                      required
                      whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(74, 108, 247, 0.2)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    ></motion.textarea>
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md transition duration-300 flex items-center justify-center font-medium shadow-md"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
