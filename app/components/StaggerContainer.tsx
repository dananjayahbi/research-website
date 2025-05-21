"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
}

export default function StaggerContainer({
  children,
  delay = 0.1,
  staggerDelay = 0.1,
  className = "",
  threshold = 0.1
}: StaggerContainerProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}
