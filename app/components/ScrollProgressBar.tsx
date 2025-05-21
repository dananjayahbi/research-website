'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  zIndex?: number;
  showPercentage?: boolean;
}

export default function ScrollProgressBar({
  color = '#3B82F6', // Default blue color
  height = 4,
  zIndex = 100,
  showPercentage = false
}: ScrollProgressBarProps) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Add spring physics for smoother animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (showPercentage) {
      return scrollYProgress.onChange((latest) => {
        setScrollPercentage(Math.round(latest * 100));
      });
    }
  }, [scrollYProgress, showPercentage]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0"
        style={{
          height,
          background: color,
          scaleX,
          transformOrigin: 'left',
          zIndex
        }}
      />
      
      {showPercentage && (
        <motion.div
          className="fixed right-4 bottom-4 bg-white dark:bg-gray-800 text-black dark:text-white text-sm font-mono px-2 py-1 rounded-md shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ zIndex }}
        >
          {scrollPercentage}%
        </motion.div>
      )}
    </>
  );
}
