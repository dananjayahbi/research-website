'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import AnimatedLetters from './AnimatedLetters';

// Import SVGs from the public folder
import nextSvg from '../../public/next.svg';
import vercelSvg from '../../public/vercel.svg';
import fileSvg from '../../public/file.svg';
import globeSvg from '../../public/globe.svg';
import windowSvg from '../../public/window.svg';

export default function TechnologiesSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const technologies = [
    {
      name: "React",
      icon: globeSvg,
      description: "For building interactive user interfaces",
      color: "#61DAFB",
      category: "Frontend"
    },
    {
      name: "Next.js",
      icon: nextSvg,
      description: "For server-side rendering and static site generation",
      color: "#000000",
      category: "Framework"
    },
    {
      name: "TailwindCSS",
      icon: windowSvg,
      description: "For modern, responsive designs",
      color: "#38B2AC",
      category: "Styling"
    },
    {
      name: "Python",
      icon: fileSvg,
      description: "For data processing and analysis",
      color: "#3776AB",
      category: "Backend"
    },
    {
      name: "TensorFlow",
      icon: vercelSvg,
      description: "For machine learning capabilities",
      color: "#FF6F00",
      category: "AI"
    },
    {
      name: "PostgreSQL",
      icon: fileSvg,
      description: "For reliable data storage",
      color: "#336791",
      category: "Database"
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
      >
        <motion.div className="text-center mb-16" variants={titleVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <AnimatedLetters text="Technologies " staggerDuration={0.05} initialDelay={0.3} />
            <span className="gradient-text">Used</span>
          </h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Our research platform leverages cutting-edge technologies to provide a robust, 
            scalable, and user-friendly experience.
          </motion.p>
        </motion.div>
        
        {/* Category tabs - decorative element that doesn't actually filter */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {["All", "Frontend", "Backend", "AI", "Database", "Framework"].map((category, index) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${category === "All" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + (index * 0.05), duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div 
              key={index}
              custom={index}
              variants={cardVariants}
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
                className="relative w-20 h-20 mb-4 flex items-center justify-center"
                variants={iconVariants}
                whileHover="hover"
              >
                <div className="w-16 h-16 rounded-full" style={{ backgroundColor: `${tech.color}20` }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    width={40}
                    height={40}
                    className="object-contain"
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
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
