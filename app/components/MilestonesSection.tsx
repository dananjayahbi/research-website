'use client';

import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';

interface Milestone {
  date: string;
  title: string;
  description: string;
}

export default function MilestonesSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: false
  });

  const milestones: Milestone[] = [
    {
      date: "January 2024",
      title: "Project Initiation",
      description: "Initial research proposal approved and project planning begins"
    },
    {
      date: "March 2024",
      title: "Methodology Development",
      description: "Research methodologies finalized and initial data collection begins"
    },
    {
      date: "June 2024",
      title: "Data Collection Complete",
      description: "Primary research data collected and organized for analysis"
    },
    {
      date: "August 2024",
      title: "Analysis Phase",
      description: "Comprehensive analysis of collected data using advanced statistical methods"
    },
    {
      date: "November 2024",
      title: "Interim Findings",
      description: "Preliminary research findings presented to stakeholders"
    },
    {
      date: "February 2025",
      title: "Peer Review Process",
      description: "Research undergoes rigorous peer review process for validation"
    },
    {
      date: "April 2025",
      title: "Publication Preparation",
      description: "Final report preparation and submission for publication"
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

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };
  
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    })
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: { 
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const cardVariants = {
    hidden: (isEven: boolean) => ({ 
      x: isEven ? 100 : -100, 
      opacity: 0 
    }),
    visible: (i: number) => ({ 
      x: 0, 
      opacity: 1,
      transition: {
        delay: 0.2 * i,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const dateVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="milestones" className="py-20 px-4 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <AnimatedLetters text="Project Milestones" staggerDuration={0.05} initialDelay={0.2} />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Key achievements and milestones in our research journey.
          </motion.p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-light via-primary to-primary-dark"
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          ></motion.div>
          
          <motion.div 
            className="space-y-12"
            variants={timelineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row gap-8 items-center md:items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <motion.div 
                  custom={index}
                  variants={dotVariants}
                  className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-md z-10"
                  whileHover={{ 
                    scale: 1.5, 
                    backgroundColor: "#3b82f6", 
                    transition: { duration: 0.3 } 
                  }}
                ></motion.div>
                
                {/* Content */}
                <motion.div 
                  className="w-full md:w-[calc(50%-2rem)] pt-2"
                  custom={index % 2 === 0}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm"
                  >
                    <motion.span 
                      className="inline-block text-sm font-semibold text-white px-3 py-1 rounded-full bg-primary mb-3"
                      variants={dateVariants}
                    >
                      {milestone.date}
                    </motion.span>
                    <motion.h3 
                      className="text-xl font-bold mb-2 text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (0.1 * index) }}
                    >
                      {milestone.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + (0.1 * index) }}
                    >
                      {milestone.description}
                    </motion.p>
                    
                    {/* Decorative dots */}
                    <div className="absolute bottom-4 right-4 flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary-light opacity-60"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: [0, 1, 0],
                            opacity: [0, 0.6, 0] 
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 2,
                            delay: i * 0.3 + index * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Empty space for layout on mobile */}
                <div className="w-0 md:w-[calc(50%-2rem)]"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
