'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function DomainSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const domainAreas = [
    {
      title: "Machine Learning",
      description: "Developing advanced algorithms and models for pattern recognition, prediction, and data analysis.",
      icon: "🧠"
    },
    {
      title: "Data Science",
      description: "Extracting insights and knowledge from structured and unstructured data using scientific methods.",
      icon: "📊"
    },
    {
      title: "Artificial Intelligence",
      description: "Creating intelligent systems capable of performing tasks that typically require human intelligence.",
      icon: "🤖"
    },
    {
      title: "Computer Vision",
      description: "Enabling computers to derive meaningful information from digital images, videos and other visual inputs.",
      icon: "👁️"
    },
    {
      title: "Natural Language Processing",
      description: "Processing and analyzing large amounts of natural language data to improve human-computer interaction.",
      icon: "💬"
    },
    {
      title: "Robotics",
      description: "Designing and developing autonomous systems capable of interacting with the physical world.",
      icon: "🦾"
    }
  ];

  return (
    <section id="domain" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
          >
            Research Domains
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 max-w-3xl mx-auto"
          >
            Our research spans across multiple domains in cutting-edge technology and scientific fields, focusing on innovation and practical applications.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {domainAreas.map((domain, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-primary-light/10 flex items-center justify-center rounded-lg text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  {domain.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">{domain.title}</h3>
              </div>
              <p className="text-gray-600 ml-16">{domain.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <a 
            href="#contact" 
            className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-full shadow-md hover:bg-primary-dark transition-colors duration-300"
          >
            Collaborate with Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
