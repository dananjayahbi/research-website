'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';

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
    <section id="domain" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Glassmorphism background effects */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">

  return (
    <section id="domain" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-50 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 w-80 h-80 rounded-full bg-indigo-50 blur-3xl opacity-70"></div>

      <div className="container mx-auto px-4 max-w-6xl">

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >

          <motion.h2 
            variants={itemVariants} 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-600"
          >
            Research Overview

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedLetters text="Research " staggerDuration={0.05} initialDelay={0.2} />
            <span className="gradient-text">Domain</span>

          </motion.h2>
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

            Exploring the intersection of artificial intelligence, psychology, and mental health technology to advance depression detection and support.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Literature Review</h3>
              <p className="text-gray-600 leading-relaxed">
                Depression affects over 264 million people globally and is a leading cause of disability. Early detection and intervention can significantly improve outcomes, but many cases go undiagnosed due to stigma, lack of awareness, or limited access to mental health professionals.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Recent studies have shown that behavioral and linguistic patterns can provide early indicators of depression, offering an opportunity for technology-assisted screening and support.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Key Challenges in Current Approaches</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Single Modality Limitations</h4>
                  <p className="text-gray-600">Existing solutions typically rely on just one analysis method (facial, voice, OR text), missing the comprehensive picture that multiple data points can provide.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Lack of Intervention Capabilities</h4>
                  <p className="text-gray-600">Most systems focus solely on detection without offering meaningful support or intervention strategies to users following identification.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Accessibility Barriers</h4>
                  <p className="text-gray-600">Many solutions require specialized equipment, clinical settings, or technical expertise, limiting their reach to those who may need them most.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Privacy Concerns</h4>
                  <p className="text-gray-600">Existing approaches often don't adequately address the sensitive nature of mental health data, creating barriers to adoption.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Main Objective</h3>
              <p className="text-gray-600 leading-relaxed">
                The MIRROR project aims to develop an integrated, AI-powered application that can detect early signs of depression through multimodal analysis (facial expressions, voice patterns, and text sentiment) and provide timely, personalized support through a conversational companion.
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-700"><span className="font-medium text-gray-900">Develop a multimodal detection system</span> that achieves at least 90% accuracy in identifying depressive symptoms by combining facial, voice, and text analysis.</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-700"><span className="font-medium text-gray-900">Create an empathetic conversational AI</span> capable of engaging users in supportive dialogue, evaluating mental health status, and providing appropriate resources.</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-700"><span className="font-medium text-gray-900">Design an accessible mobile application</span> that integrates detection and support capabilities in a user-friendly, private, and secure environment.</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-600 text-sm font-bold">4</span>
                  </div>
                  <p className="text-gray-700"><span className="font-medium text-gray-900">Validate the system's effectiveness</span> through user testing and clinical evaluation to ensure it provides meaningful support and accurate detection.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Methodology</h3>
              <p className="text-gray-600 leading-relaxed">
                The MIRROR project employs a comprehensive methodology that integrates multiple detection mechanisms with supportive interventions:
              </p>
              <div className="mt-6 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-3">Data Collection & Analysis</h4>
                  <p className="text-gray-600 mb-4">We collect and analyze three types of user data using advanced AI techniques:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><span className="font-medium text-gray-800">Facial Analysis:</span> Using EfficientNet to detect microexpressions, eye movement patterns, and other visual indicators of depression</li>
                    <li><span className="font-medium text-gray-800">Voice Analysis:</span> Applying Librosa and CNN-LSTM models to examine speech parameters including tone, rhythm, pause frequency, and energy levels</li>
                    <li><span className="font-medium text-gray-800">Text Analysis:</span> Implementing NLP and CNN-LSTM architectures to identify linguistic patterns, sentiment, and content that may indicate depressive thinking</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-3">Integration & Model Development</h4>
                  <p className="text-gray-600 mb-4">Our approach combines data from multiple modalities using:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Feature extraction from each modality using specialized neural networks (EfficientNet, CNN-LSTM)</li>
                    <li>Decision-level fusion methodology to combine outputs from individual detection systems</li>
                    <li>Ensemble learning techniques to improve overall system reliability and accuracy</li>
                    <li>Continuous model training and refinement using feedback loops</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-3">Conversational Companion Design</h4>
                  <p className="text-gray-600 mb-4">The AI companion is designed with:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Llama 3.2 LLM foundation for empathetic response generation trained on therapeutic dialogue</li>
                    <li>Personalized interaction paths based on user needs and preferences</li>
                    <li>Resource recommendation systems that connect users to appropriate support</li>
                    <li>Crisis detection and escalation protocols for severe cases</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
