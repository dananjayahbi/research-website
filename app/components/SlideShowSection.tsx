'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';

// Import slideshow images
import slide1 from '../../public/images/slideshow/ss1.jpg';
import slide2 from '../../public/images/slideshow/ss2.jpg';
import slide3 from '../../public/images/slideshow/ss3.jpg';

export default function SlideShowSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  const slides = [
    {
      id: 1,
      image: slide1,
      title: "System Architecture",
      description: "Our comprehensive multi-modal depression detection system"
    },
    {
      id: 2,
      image: slide2,
      title: "AI Analysis",
      description: "Advanced deep learning models for emotion and speech analysis"
    },
    {
      id: 3,
      image: slide3,
      title: "Interactive Support",
      description: "AI-driven conversational companion for mental health support"
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  
  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  const textOverlayVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const navButtonVariants = {
    initial: { opacity: 0.7, scale: 1 },
    hover: { 
      opacity: 1, 
      scale: 1.1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.9 
    }
  };

  const indicatorVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.5)" 
    },
    active: { 
      scale: 1.2,
      backgroundColor: "#FFFFFF",
      transition: {
        duration: 0.3
      }
    },
    hover: { 
      scale: 1.3,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <AnimatedLetters text="Research Gallery" staggerDuration={0.05} initialDelay={0.2} />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Visual documentation of our research journey and milestones.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="relative max-w-5xl mx-auto h-[400px] md:h-[500px]"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Display slideshow images with overlay text */}
          <div className="relative h-full w-full rounded-xl overflow-hidden shadow-md border border-gray-100">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover"
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ 
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5))` 
                  }}
                >
                  <motion.div 
                    className="text-center text-white p-4"
                    variants={textOverlayVariants}
                    initial="hidden"
                    animate="visible"
                    key={`text-${currentSlide}`}
                  >
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold mb-2"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h3>
                    <motion.p 
                      className="text-lg md:text-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      {slides[currentSlide].description}
                    </motion.p>
                  </motion.div>
                </div>
                
                {/* Slide counter badge */}
                <div className="absolute top-4 right-4 bg-white/80 text-primary text-sm font-medium py-1 px-3 rounded-full shadow-sm">
                  {currentSlide + 1} / {slides.length}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation arrows */}
          <motion.button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-primary rounded-full p-3 focus:outline-none shadow-md"
            aria-label="Previous slide"
            variants={navButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-primary rounded-full p-3 focus:outline-none shadow-md"
            aria-label="Next slide"
            variants={navButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          
          {/* Slide indicators */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                variants={indicatorVariants}
                initial="inactive"
                animate={currentSlide === index ? "active" : "inactive"}
                whileHover="hover"
                className={`w-3 h-3 rounded-full focus:outline-none ${currentSlide === index ? 'bg-primary' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
