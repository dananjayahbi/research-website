"use client"

import { motion } from 'framer-motion';
import AnimatedLetters from './AnimatedLetters';
import GradientText from './GradientText';
import ParallaxAnimation from './ParallaxAnimation';
import { useEffect, useState, useRef } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);  
  
  return (
    <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center py-36 px-4 text-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10"></div>
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/video chat.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Animated overlay elements */}
      <ParallaxAnimation direction="up" speed={0.5} offset={80}>
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary opacity-10 -z-5 blur-3xl"
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
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary opacity-10 -z-5 blur-3xl"
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

      {/* Title with gradient and animated letters */}      <motion.div
        className="mb-8 mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <GradientText 
          text="MIRROR APP" 
          from="from-white" 
          via="via-blue-200" 
          to="to-white" 
          fontSize="text-5xl md:text-6xl lg:text-7xl"
          animate={true}
          duration={5}
        />
      </motion.div>

      <ParallaxAnimation direction="up" speed={0.3} offset={20}>
        <motion.p          className="text-base md:text-lg max-w-4xl mb-12 text-white/90 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          AI-based depression detection has emerged as an effective approach for early diagnosis 
          and continuous mental health monitoring. Our multi-modal framework integrates voice, text, 
          and facial expression analysis, leveraging AI-driven deep learning, NLP, and computer vision 
          techniques. Through CNN-LSTM hybrid models, RNN-LSTM networks, and advanced facial analysis 
          using FaceNet-PyTorch and EfficientNet, we deliver comprehensive emotional assessment. 
          Featured by our AI-trained voice companion based on LLaMA 3.2 LLM, providing personalized 
          mental health support and adaptive interventions.
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
          className="bg-white/20 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-lg font-medium text-lg shadow-lg relative overflow-hidden group flex items-center hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center">
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </motion.a>
        
        <motion.a
          href="#contact"
          className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-8 py-4 rounded-lg transition-colors font-medium text-lg flex items-center hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.a>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
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
