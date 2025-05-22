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
  iconType?: 'pdf' | 'doc' | 'image' | 'zip' | 'other';
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
      title: "Project Charter",
      description: "Formal document outlining the project scope, objectives, and participants",
      fileUrl: "https://drive.google.com/drive/folders/1POOn5VfvSxTIXLUGhizWIRMDsWmlW4dw?usp=sharing",
      fileSize: "1.8 MB",
      dateAdded: "2024-06-15",
      iconType: "pdf"
    },
    {
      id: "doc2",
      title: "Project Proposal",
      description: "Comprehensive proposal including research objectives, methodology, and expected outcomes",
      fileUrl: "https://drive.google.com/drive/folders/15e8T_M3xsftnPEgF4JeAzmC4RG96IeFe?usp=sharing",
      fileSize: "3.2 MB",
      dateAdded: "2024-07-10",
      iconType: "pdf"
    },
    {
      id: "doc3",
      title: "Research Paper",
      description: "Published academic paper detailing our research findings and methodology",
      fileUrl: "https://drive.google.com/drive/folders/1MP0lkjkTBql907RkkVd5CU3ONlWPEjdu?usp=sharing",
      fileSize: "2.5 MB",
      dateAdded: "2025-02-28",
      iconType: "pdf"
    },
    {
      id: "doc4",
      title: "Final Thesis",
      description: "Complete thesis document with comprehensive analysis and conclusions",
      fileUrl: "https://drive.google.com/drive/folders/1VNt9a2XGMTnMBOBwFD-4dBhbfr5MWWG8?usp=sharing",
      fileSize: "5.7 MB",
      dateAdded: "2025-03-15",
      iconType: "doc"
    },
    {
      id: "doc5",
      title: "Status Document",
      description: "Current project status report with progress updates and milestone achievements",
      fileUrl: "https://drive.google.com/drive/folders/1tvgdab5ye24Nyi45M7pUa27Q1QG1_c72?usp=sharing",
      fileSize: "1.5 MB",
      dateAdded: "2025-04-05",
      iconType: "doc"
    },
    {
      id: "doc6",
      title: "Research Logbook",
      description: "Detailed documentation of research activities, methodologies, and findings",
      fileUrl: "/documents/document3.pdf",
      fileSize: "4.3 MB",
      dateAdded: "2025-04-12",
      iconType: "zip"
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
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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

  // Function to render the appropriate icon based on document type
  const renderDocumentIcon = (type: Document['iconType'] = 'other') => {
    switch(type) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'doc':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'zip':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
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
        >          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <AnimatedLetters text="Project Documents" staggerDuration={0.05} initialDelay={0.2} />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Access and download key research documents for the MIRROR project, including project charter, proposal, research papers, and reports.
          </motion.p>
        </motion.div>
        
        <StaggerContainer delay={0.3} staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <motion.div 
              key={doc.id} 
              custom={index}
              variants={documentCardVariants}
              whileHover="hover"
              className="bg-white rounded-lg border border-gray-100 shadow-md overflow-hidden flex flex-col aspect-square"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-center mb-5">
                  {renderDocumentIcon(doc.iconType)}
                </div>
                
                <motion.h3 
                  className="text-xl font-semibold mb-2 text-center text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (0.1 * index) }}
                >
                  {doc.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 mb-4 text-sm text-center flex-grow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + (0.1 * index) }}
                >
                  {doc.description}
                </motion.p>
                
                <motion.div 
                  className="flex justify-between items-center text-xs text-gray-500 mt-auto mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + (0.1 * index) }}
                >
                  <span className="flex items-center">
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
                className="mt-auto"
              >
                <Link 
                  href={doc.fileUrl}
                  className="block text-center py-3 bg-primary text-white font-medium transition duration-300 hover:bg-primary-dark"
                  download
                >
                  <motion.div variants={downloadIconVariants} className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
