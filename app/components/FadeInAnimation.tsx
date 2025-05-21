"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface FadeInAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  duration?: number;
  threshold?: number;
}

export default function FadeInAnimation({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.5,
  threshold = 0.1
}: FadeInAnimationProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold,
    triggerOnce: true
  });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  };

  const initial = {
    opacity: 0,
    ...directionMap[direction]
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0,
              transition: {
                duration,
                delay,
                ease: "easeOut"
              }
            }
          : initial
      }
    >
      {children}
    </motion.div>
  );
}
