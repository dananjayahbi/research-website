"use client"

import { motion } from "framer-motion";

interface LoadingAnimationProps {
  size?: number;
  color?: string;
}

export default function LoadingAnimation({ size = 40, color = "#4a6cf7" }: LoadingAnimationProps) {
  const dotSize = Math.max(3, size / 12);
  
  return (
    <div className="flex flex-col justify-center items-center py-6">
      {/* Dots animation */}
      <div className="flex space-x-2 mb-4">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="rounded-full"
            style={{ 
              width: `${dotSize}px`, 
              height: `${dotSize}px`,
              backgroundColor: color
            }}
            initial={{ y: 0, opacity: 0.5 }}
            animate={{ 
              y: [-10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}      </div>

      {/* Up down arrow animation */}
      <motion.div 
        style={{ color }}
        animate={{
          y: [0, 10, 0, -10, 0],
          opacity: [0.5, 1, 0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ width: `${size / 5}px`, height: `${size / 5}px` }}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </motion.div>
    </div>
  );
}
