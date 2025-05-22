'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';
import StaggerContainer from './StaggerContainer';
import AnimatedHeading from './AnimatedHeading';

// Import document images from the presentations folder
import charter from '../../public/presentations/charter.png';
import proposal from '../../public/presentations/propre.png';
import research from '../../public/presentations/rp.png';
import finalThesis from '../../public/presentations/final.png';
import statusDoc from '../../public/presentations/status.png';
import logbook from '../../public/presentations/lobook.png';

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
      fileUrl: "https://drive.google.com/file/d/1DSNh1zQvkBV5hzxFLIvLH8AVCzZG3Q_B/view?usp=sharing",
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
      fileUrl: "https://drive.google.com/drive/folders/1iRwy-Vzsjq91FzkXGJsP04_Vqj_FvTJ6?usp=sharing",
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
      boxShadow: "0px 8px 15px rgba(37, 99, 235, 0.3)",
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
  // Function to render the appropriate image based on document title
  const renderDocumentIcon = (doc: Document) => {
    // Map document titles to their respective images
    switch(doc.title) {
      case "Project Charter":
        return (
          <div className="relative w-24 h-24">
            <Image 
              src={charter} 
              alt="Project Charter" 
              className="object-contain rounded-md shadow-sm" 
              fill
              sizes="100px"
            />
          </div>
        );
      case "Project Proposal":
        return (
          <div className="relative w-24 h-24">
            <Image 
              src={proposal} 
              alt="Project Proposal" 
              className="object-contain rounded-md shadow-sm" 
              fill
              sizes="100px"
            />
          </div>
        );
      case "Research Paper":
        return (
          <div className="relative w-24 h-24">
            <Image 
              src={research} 
              alt="Research Paper" 
              className="object-contain rounded-md shadow-sm" 
              fill
              sizes="100px"
            />
          </div>
        );
      case "Final Thesis":
        return (
          <div className="relative w-24 h-24">
            <Image 
              src={finalThesis} 
              alt="Final Thesis" 
              className="object-contain rounded-md shadow-sm" 
              fill
              sizes="100px"
            />
          </div>
        );
      case "Status Document":
        return (
          <div className="relative w-24 h-24">
            <Image 
              src={statusDoc} 
              alt="Status Document" 
              className="object-contain rounded-md shadow-sm" 
              fill
              sizes="100px"
            />
          </div>
        );
      case "Research Logbook":
        return (
          <div className="relative w-24 h-24">
            <Image 
              src={logbook} 
              alt="Research Logbook" 
              className="object-contain rounded-md shadow-sm" 
              fill
              sizes="100px"
            />
          </div>
        );
      default:
        return (
          <div className="relative w-24 h-24">
            <Image 
              src={research} 
              alt="Document" 
              className="object-contain rounded-md shadow-sm" 
              fill
              sizes="100px"
            />
          </div>
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
        >          <AnimatedHeading 
            text="PROJECT DOCUMENTS" 
            staggerDuration={0.05} 
            initialDelay={0.2}
            className="text-center" 
          />
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
          {documents.map((doc, index) => (            <motion.div 
              key={doc.id} 
              custom={index}
              variants={documentCardVariants}
              whileHover="hover"
              className="bg-white rounded-lg border border-gray-100 shadow-md overflow-hidden flex flex-col"
              style={{ minHeight: "450px" }}
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-center mb-5">
                  {renderDocumentIcon(doc)}
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
                
                <div className="flex w-full">
                  <motion.div
                    variants={downloadButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative flex-1"
                  >
                    {/* Pulse animation for attention */}
                    <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-sm animate-pulse"></div>
                    <Link 
                      href={doc.fileUrl}
                      className="relative block text-center py-3 bg-blue-600 text-white font-medium transition duration-300 hover:bg-blue-700 rounded-lg shadow-md"
                      download
                    >
                      <motion.div variants={downloadIconVariants} className="inline-flex items-center justify-center w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="font-semibold tracking-wide">
                          Download
                        </span>
                      </motion.div>
                    </Link>                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
