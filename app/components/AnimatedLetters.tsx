"use client"

import { motion } from "framer-motion";
import React from "react";

interface AnimatedLettersProps {
  text: string;
  className?: string;
  staggerDuration?: number;
  initialDelay?: number;
}

export default function AnimatedLetters({ 
  text, 
  className = "", 
  staggerDuration = 0.05,
  initialDelay = 0.2
}: AnimatedLettersProps) {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerDuration, 
        delayChildren: initialDelay * i,
      },
    }),
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      rotate: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={child}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
