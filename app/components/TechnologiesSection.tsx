'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';
import AnimatedHeading from './AnimatedHeading';

// Import technology images from the public folder
import CNN from '../../public/technology/cnn.png';
import Llama from '../../public/technology/llama.png';
import EfficientNet from '../../public/technology/effeiecentnet.png';
import TensorFlow from '../../public/technology/tensorflow.png';
import PyTorch from '../../public/technology/pytorch.png';
import Librosa from '../../public/technology/librosa.png';
import MongoDB from '../../public/technology/mongo.png';
import Python from '../../public/technology/python.jpeg';
import MERN from '../../public/technology/mern.png';


export default function TechnologiesSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [activeCategory, setActiveCategory] = useState("All");

  const technologies = [
    {
      name: "TensorFlow",
      icon:TensorFlow,
      description: "Deep learning framework for facial and voice analysis",
      color: "#FF6F00",
      category: "AI"
    },
    {
      name: "PyTorch",
      icon: PyTorch,
      description: "Machine learning library for neural network models",
      color: "#EE4C2C",
      category: "AI"
    },
    {
      name: "Llama 3.2",
      icon: Llama,
      description: "Large language model for conversational companion",
      color: "#6B46C1",
      category: "AI"
    },
    {
      name: "EfficientNet",
      icon: EfficientNet,
      description: "CNN model for facial feature extraction",
      color: "#EC4899",
      category: "AI"
    },
    {
      name: "CNN-LSTM",
      icon: CNN,
      description: "Sequential data analysis for voice/text processing",
      color: "#3B82F6",
      category: "AI"
    },
    {
      name: "Librosa",
      icon: Librosa,
      description: "Audio analysis for voice processing",
      color: "#F59E0B",
      category: "AI"
    },
    {
      name: "Python",
      icon: Python,
      description: "Primary language for backend and frontend development",
      color: "#3776AB",
      category: "Backend"
    },
    {
      name: "MongoDB",
      icon: MongoDB,
      description: "NoSQL database for scalable data storage",
      color: "#4DB33D",
      category: "Database"
    },
    {
      name: "MERN Stack",
      icon: MERN,
      description: "MongoDB, Express, React, Node.js for website development",
      color: "#61DAFB",
      category: "Frontend"
    }
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.7,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    },
    hover: {
      rotate: [0, -5, 5, -5, 0],
      scale: 1.2,
      transition: {
        duration: 0.5
      }
    }
  };

  const filteredTechnologies = technologies.filter(
    tech => activeCategory === "All" || tech.category === activeCategory
  );

  return (
    <section id="technologies" ref={ref} className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >        <motion.div className="text-center mb-16" variants={titleVariants}>          <AnimatedHeading
            text="MIRROR TECHNOLOGIES"
            staggerDuration={0.05}
            initialDelay={0.3}
          />
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Our depression detection and prevention platform leverages cutting-edge AI technologies like 
            EfficientNet, CNN-LSTM, and Llama 3.2 LLM for multimodal analysis of facial expressions, voice patterns, and text sentiment.
          </motion.p>
        </motion.div>
        
        {/* Category filter tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {["All", "AI", "Frontend", "Backend", "Database"].map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${category === activeCategory 
                  ? "bg-gradient-to-r from-blue-600 via-primary to-purple-600 text-white shadow-lg transform scale-110 border border-blue-300/30 ring-2 ring-blue-500/20" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + (index * 0.05), duration: 0.5 }}
              whileHover={{ 
                scale: category === activeCategory ? 1.15 : 1.05, 
                y: -5,
                boxShadow: category === activeCategory ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredTechnologies.map((tech, index) => (
              <motion.div 
                key={tech.name}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                whileHover="hover"
                whileTap="tap"
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 card-hover flex flex-col items-center text-center relative"
              >
                {/* Tech category badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {tech.category}
                  </span>
                </div>
                  <motion.div 
                  className="relative w-24 h-24 mb-4 flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <div className="w-20 h-20 rounded-full" style={{ backgroundColor: `${tech.color}20` }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={tech.icon}
                      alt={`${tech.name} icon`}
                      width={48}
                      height={48}
                      className="object-contain"
                      style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))" }}
                    />
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{tech.name}</h3>
                <p className="text-gray-600">{tech.description}</p>
                
                {/* Decorative line */}
                <div className="w-12 h-1 bg-primary/30 rounded-full my-4"></div>
                
                {/* "Learn more" button for visual effect */}
                <motion.button
                  className="mt-auto text-sm text-primary font-medium flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Learn more
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
