'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';
import StaggerContainer from './StaggerContainer';

interface Document {
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

export default function DocumentsSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Sample documents data
  const documents: Document[] = [
    {
      id: "doc1",
      title: "Research Methodology",
      description: "Comprehensive guide to our research methodology and approach",
      fileUrl: "/documents/document1.pdf",
      fileSize: "2.4 MB",
      dateAdded: "2025-01-15"
    },
    {
      id: "doc2",
      title: "Data Analysis Report",
      description: "Detailed analysis of research data with key findings and insights",
      fileUrl: "/documents/document2.pdf",
      fileSize: "3.8 MB",
      dateAdded: "2025-02-28"
    },
    {
      id: "doc3",
      title: "Literature Review",
      description: "Comprehensive review of existing literature related to our research",
      fileUrl: "/documents/document3.pdf",
      fileSize: "1.7 MB",
      dateAdded: "2025-03-10"
    },
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

  const documentCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const downloadButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: "#2563EB", // blue-700
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 }
  };

  // Icon animation
  const downloadIconVariants = {
    initial: { y: 0 },
    hover: {
      y: [0, -3, 0, -3, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <section id="documents" className="py-20 px-4 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <AnimatedLetters text="Project Documents" staggerDuration={0.05} initialDelay={0.2} />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Access and download key research documents related to our project.
          </motion.p>
        </motion.div>
        
        <StaggerContainer delay={0.3} staggerDelay={0.2} className="grid gap-6">
          {documents.map((doc, index) => (
            <motion.div 
              key={doc.id} 
              custom={index}
              variants={documentCardVariants}
              whileHover="hover"
              className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <motion.h3 
                    className="text-xl font-semibold mb-2 text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + (0.1 * index) }}
                  >
                    {doc.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + (0.1 * index) }}
                  >
                    {doc.description}
                  </motion.p>
                  <motion.div 
                    className="flex items-center text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + (0.1 * index) }}
                  >
                    <span className="mr-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {doc.fileSize}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(doc.dateAdded)}
                    </span>
                  </motion.div>
                </div>
                <motion.div
                  variants={downloadButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link 
                    href={doc.fileUrl}
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md transition duration-300"
                    download
                  >
                    <motion.div variants={downloadIconVariants}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </motion.div>
                    Download
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
