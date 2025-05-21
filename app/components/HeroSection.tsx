"use client"

import Image from 'next/image';
import hero from '../../public/images/hero-placeholder.jpg';
import { motion } from 'framer-motion';
import AnimatedLetters from './AnimatedLetters';
import GradientText from './GradientText';
import ParallaxAnimation from './ParallaxAnimation';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);  
  
  return (
    <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 text-center relative overflow-hidden">
      {/* Modern background with gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
      
      {/* Animated background elements */}
      <ParallaxAnimation direction="up" speed={0.5} offset={80}>
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary opacity-5 -z-10 blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [20, -20, 20],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </ParallaxAnimation>
      
      <ParallaxAnimation direction="down" speed={0.5} offset={80}>
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary opacity-5 -z-10 blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-20, 20, -20],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </ParallaxAnimation>
      
      <ParallaxAnimation direction="left" speed={0.3} offset={40}>
        <motion.div 
          className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-accent opacity-5 -z-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </ParallaxAnimation>

      {/* Title with gradient and animated letters */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <AnimatedLetters 
          text="Advanced " 
          staggerDuration={0.04}
          initialDelay={0.5}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
        />
        <GradientText 
          text="Research" 
          from="from-primary" 
          via="via-accent" 
          to="to-secondary" 
          fontSize="text-5xl md:text-6xl lg:text-7xl"
          animate={true}
          duration={5}
        />
      </motion.div>

      <ParallaxAnimation direction="up" speed={0.3} offset={20}>
        <motion.p 
          className="text-xl md:text-2xl max-w-2xl mb-12 text-gray-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Innovative research solutions for the modern scientific community. 
          Exploring the frontiers of knowledge through collaboration and cutting-edge technology.
        </motion.p>
      </ParallaxAnimation>
      
      <motion.div 
        className="flex flex-wrap gap-6 justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.a
          href="#about"
          className="btn-primary px-8 py-4 rounded-lg font-medium text-lg shadow-lg relative overflow-hidden group flex items-center"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(74, 108, 247, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center">
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <motion.span 
            className="absolute bottom-0 left-0 w-full h-full bg-primary-dark opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.a>
        
        <motion.a
          href="#contact"
          className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary-light/10 rounded-lg transition-colors font-medium text-lg flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.a>
      </motion.div>

      <div className="w-full max-w-5xl mt-16">
        <motion.div 
          className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ 
            y: -10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          <Image
            src={hero}
            alt="Research visualization"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="rounded-2xl transition-transform duration-700 hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>
          
          {/* Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <p className="text-sm font-semibold text-gray-800">Est. May 2024</p>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-primary rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ 
              y: [0, 16, 0],
              opacity: [1, 0, 1]
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
