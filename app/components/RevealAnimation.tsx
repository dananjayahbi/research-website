"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface RevealAnimationProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

export default function RevealAnimation({
  children,
  className = "",
  threshold = 0.1,
  delay = 0
}: RevealAnimationProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold,
    triggerOnce: true
  });

  return (
    <div className={`relative overflow-hidden ${className}`} ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? { opacity: 1, transition: { duration: 0.5, delay } }
            : { opacity: 0 }
        }
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ x: "-100%" }}
        animate={
          isInView
            ? {
                x: "100%",
                transition: {
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay
                }
              }
            : { x: "-100%" }
        }
      />
    </div>
  );
}
