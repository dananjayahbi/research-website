'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedHeading from './AnimatedHeading';

export default function DomainSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

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
      title: "Literature Survey",
      description: "Comprehensive analysis of existing depression detection systems, focusing on facial expression analysis, voice pattern recognition, and natural language processing techniques in mental health assessment.",
      icon: "📚"
    },
    {
      title: "Research Problem",
      description: "Addressing the challenge of early depression detection through the development of a multi-modal AI system that combines facial, voice, and textual analysis for more accurate mental health assessment.",
      icon: "🔍"
    },
    {
      title: "Research Gap",
      description: "Current systems lack integration of multiple modalities and real-time analysis capabilities. Our research aims to bridge this gap by developing a comprehensive, AI-driven solution.",
      icon: "🎯"
    },
    {
      title: "Methodology",
      description: "Implementation of deep learning models for facial expression analysis, voice pattern recognition, and NLP, combined with an interactive chatbot interface for real-time mental health monitoring.",
      icon: "⚙️"
    },
    {
      title: "Expected Outcomes",
      description: "Development of an accurate, user-friendly system for early depression detection, featuring real-time analysis and personalized support through an AI companion.",
      icon: "🎯"
    },
    {
      title: "Future Directions",
      description: "Expansion of the system to include additional biomarkers, integration with healthcare systems, and development of preventive intervention strategies based on collected data.",
      icon: "🚀"
    }
  ];

  return (
    <section id="domain" className="py-20 relative overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Glassmorphism background effects */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >          <AnimatedHeading 
            text="RESEARCH DOMAIN"
          />
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            Depression Detection through Facial, Voice, and Text Analysis with AI-Driven Conversational Companion - A Multi-Modal Approach for Mental Health Assessment
          </motion.p>
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {domainAreas.map((domain, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/80 rounded-xl border border-gray-100/50 p-8 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))'
              }}
            >
              <div className="flex items-start space-x-5">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center rounded-lg text-3xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {domain.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {domain.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {domain.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-r from-primary to-purple-600 text-white font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Collaborate with Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
