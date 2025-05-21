'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number;
}

export default function ParallaxAnimation({
  children,
  offset = 50,
  className = '',
  direction = 'up',
  speed = 0.3
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Calculate the parallax effect based on direction
  const getParallaxValue = (progress: MotionValue<number>) => {
    switch (direction) {
      case 'up':
        return useTransform(progress, [0, 1], [offset, -offset]);
      case 'down':
        return useTransform(progress, [0, 1], [-offset, offset]);
      case 'left':
        return useTransform(progress, [0, 1], [offset, -offset]);
      case 'right':
        return useTransform(progress, [0, 1], [-offset, offset]);
      default:
        return useTransform(progress, [0, 1], [offset, -offset]);
    }
  };

  // Apply the appropriate transform based on direction
  const motionProps = {
    ...(direction === 'up' || direction === 'down'
      ? { y: getParallaxValue(scrollYProgress) }
      : { x: getParallaxValue(scrollYProgress) }),
  };

  return (
    <motion.div
      ref={ref}
      style={{
        ...motionProps,
        transition: `transform ${speed}s cubic-bezier(0.2, 0.8, 0.2, 1)`,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
