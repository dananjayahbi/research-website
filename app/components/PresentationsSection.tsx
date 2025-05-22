'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';
import StaggerContainer from './StaggerContainer';
import fileSvg from '../../public/file.svg';

interface Presentation {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  dateAdded: string;
}

// Helper function to format dates consistently
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // Get parts in numeric format (not locale-dependent)
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  
  // Return in DD/MM/YYYY format
  return `${day}/${month}/${year}`;
};

export default function PresentationsSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const items = container.querySelectorAll('.snap-center');
      const containerRect = container.getBoundingClientRect();
      
      let closestIndex = 0;
      let minDistance = Infinity;
      
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.left - containerRect.left);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      
      setActiveIndex(closestIndex);
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  // Sample presentations data
  const presentations: Presentation[] = [
    {
      id: "pres1",
      title: "Proposal Presentation",
      description: "Initial project proposal presentation outlining the research goals and methodology",
      fileUrl: "/presentations/presentation1.pdf",
      fileSize: "4.8 MB",
      dateAdded: "2024-07-15"
    },
    {
      id: "pres2",
      title: "Progress Presentation-1",
      description: "First progress update showcasing initial findings and implementation progress",
      fileUrl: "https://drive.google.com/drive/folders/1Ut_VolK6xRS_pnYx4wN2Ht3GP3IfCNcr?usp=sharing",
      fileSize: "5.2 MB",
      dateAdded: "2024-12-10"
    },
    {
      id: "pres3",
      title: "Progress Presentation-2",
      description: "Second progress update with detailed analysis and results from ongoing research",
      fileUrl: "/presentations/presentation3.pdf",
      fileSize: "6.5 MB",
      dateAdded: "2025-03-22"
    },
    {
      id: "pres4",
      title: "Final Presentation",
      description: "Comprehensive presentation of the complete research project and findings",
      fileUrl: "https://drive.google.com/drive/folders/1awT134Q7fmjHd-v8zA1gBK5Le3Aii6v8?usp=sharing",
      fileSize: "7.3 MB",
      dateAdded: "2025-04-15"
    }
  ];

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.4
      }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "#2563EB", // blue-700
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="presentations" className="py-20 px-4 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <AnimatedLetters text="Project Presentations" staggerDuration={0.05} initialDelay={0.2} />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Scroll through all presentation slides from MIRROR project milestones in a single row.
          </motion.p>
        </motion.div>
        
        <div 
          ref={scrollContainerRef} 
          className="flex flex-nowrap overflow-x-auto gap-6 pb-4 -mx-4 px-4 snap-x scroll-smooth"
        >
          {presentations.map((presentation, index) => (
            <motion.div 
              key={presentation.id} 
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition duration-300 flex-shrink-0 w-full md:w-[350px] snap-center"
            >
              <motion.div 
                className="relative h-48 bg-gradient-to-br from-primary-light to-primary flex items-center justify-center overflow-hidden"
                whileHover="hover"
              >
                <div className="absolute w-full h-full opacity-10">
                  <div className="absolute -top-16 -left-16 w-40 h-40 bg-white rounded-full opacity-20"></div>
                  <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-white rounded-full opacity-20"></div>
                </div>
                <motion.div variants={imageVariants}>
                  <Image
                    src={fileSvg}
                    alt={`${presentation.title} thumbnail`}
                    width={80}
                    height={80}
                    className="opacity-80"
                  />
                </motion.div>
                <div className="absolute top-3 right-3 bg-white/90 text-primary text-xs font-medium py-1 px-2 rounded-full">
                  Presentation
                </div>
              </motion.div>
              
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold mb-2 text-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 + (0.1 * index), duration: 0.5 }}
                >
                  {presentation.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3 + (0.1 * index), duration: 0.5 }}
                >
                  {presentation.description}
                </motion.p>
                <motion.div 
                  className="flex items-center text-sm text-gray-500 mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4 + (0.1 * index), duration: 0.5 }}
                >
                  <span className="mr-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {presentation.fileSize}
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(presentation.dateAdded)}
                  </span>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link 
                    href={presentation.fileUrl}
                    className="inline-flex items-center w-full justify-center px-4 py-2 bg-primary text-white rounded-md transition duration-300"
                    download
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatDelay: 1,
                        duration: 0.5 
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </motion.svg>
                    Download Presentation
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {presentations.map((_, i) => (
            <motion.div 
              key={i}
              className={`h-2 w-2 rounded-full cursor-pointer ${i === activeIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                const container = scrollContainerRef.current;
                const items = container?.querySelectorAll('.snap-center');
                if (container && items?.[i]) {
                  container.scrollTo({
                    left: (items[i] as HTMLElement).offsetLeft - 16,
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
