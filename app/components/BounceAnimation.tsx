"use client"

import { motion } from "framer-motion";
import React from "react";

interface BounceAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function BounceAnimation({ 
  children, 
  delay = 0, 
  className = ""
}: BounceAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 50, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: {
          y: {
            type: "spring",
            damping: 12,
            stiffness: 100,
            delay
          },
          opacity: {
            duration: 0.5,
            delay
          }
        }
      }}
      exit={{ y: 50, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
