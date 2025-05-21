'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  duration?: number;
  animate?: boolean;
  fontSize?: string;
  fontWeight?: string;
}

export default function GradientText({
  text,
  className = '',
  from = 'from-blue-600',
  via = 'via-purple-600',
  to = 'to-pink-600',
  duration = 3,
  animate = true,
  fontSize = 'text-4xl',
  fontWeight = 'font-bold'
}: GradientTextProps) {
  const [gradientAngle, setGradientAngle] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 1) % 360);
    }, 20);

    return () => clearInterval(interval);
  }, [animate]);

  const gradientStyle = {
    backgroundSize: '200% 200%',
    backgroundPosition: animate ? `${Math.sin(gradientAngle * 0.01) * 100 + 100}% ${Math.cos(gradientAngle * 0.01) * 100 + 100}%` : '0% 0%',
    transition: animate ? 'background-position 0.3s ease' : 'none',
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
  };

  return (
    <motion.h1
      className={`bg-gradient-to-r ${from} ${via} ${to} inline-block text-transparent bg-clip-text ${fontSize} ${fontWeight} ${className}`}
      style={gradientStyle}
      initial="initial"
      animate="animate"
      variants={textVariants}
    >
      {text}
    </motion.h1>
  );
}
