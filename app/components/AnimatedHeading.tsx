'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedLetters from './AnimatedLetters';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  staggerDuration?: number;
  initialDelay?: number;
}

export default function AnimatedHeading({
  text,
  className = '',
  staggerDuration = 0.05,
  initialDelay = 0.2
}: AnimatedHeadingProps) {
  const [gradientAngle, setGradientAngle] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  // Array of color combinations for gradient
  const colorSchemes = [
    {from: 'from-blue-600', via: 'via-purple-600', to: 'to-indigo-600'},
    {from: 'from-red-500', via: 'via-orange-500', to: 'to-yellow-500'},
    {from: 'from-green-500', via: 'via-emerald-500', to: 'to-teal-500'},
    {from: 'from-purple-600', via: 'via-pink-500', to: 'to-red-500'},
    {from: 'from-cyan-500', via: 'via-blue-500', to: 'to-indigo-500'}
  ];

  useEffect(() => {
    // Animate the gradient angle
    const angleInterval = setInterval(() => {
      setGradientAngle((prev) => (prev + 1) % 360);
    }, 20);

    // Change color scheme every 3 seconds
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorSchemes.length);
    }, 3000);

    return () => {
      clearInterval(angleInterval);
      clearInterval(colorInterval);
    };
  }, [colorSchemes.length]);

  const currentColors = colorSchemes[colorIndex];
  
  const gradientStyle = {
    backgroundSize: '200% 200%',
    backgroundPosition: `${Math.sin(gradientAngle * 0.01) * 100 + 100}% ${Math.cos(gradientAngle * 0.01) * 100 + 100}%`,
    transition: 'background-position 0.3s ease',
  };

  return (
    <motion.h2
      className={`text-4xl md:text-5xl font-bold tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r ${currentColors.from} ${currentColors.via} ${currentColors.to} ${className}`}
      style={gradientStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedLetters 
        text={text} 
        staggerDuration={staggerDuration} 
        initialDelay={initialDelay}
      />
    </motion.h2>
  );
}
