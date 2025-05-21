"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingAnimationProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  duration?: number;
  delay?: number;
}

export default function FloatingAnimation({
  children,
  className = "",
  intensity = 10,
  duration = 4,
  delay = 0
}: FloatingAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{
        y: [-intensity, 0, intensity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay
      }}
    >
      {children}
    </motion.div>
  );
}
