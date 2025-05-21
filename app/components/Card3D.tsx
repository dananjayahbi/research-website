'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  borderRadius?: string;
  glareOpacity?: number;
  shadow?: string;
  scale?: number;
  disabled?: boolean;
}

export default function Card3D({
  children,
  className = '',
  intensity = 15, // Higher intensity = more rotation
  borderRadius = 'rounded-xl',
  glareOpacity = 0.1,
  shadow = 'shadow-xl',
  scale = 1.03,
  disabled = false
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for smooth interpolation
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Apply spring physics for smoother movement
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Glare effect position
  const glareX = useTransform(rotateX, [-intensity, intensity], ['-50%', '150%']);
  const glareY = useTransform(rotateY, [-intensity, intensity], ['-50%', '150%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the card center (in %)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Convert to rotation angles (-intensity to +intensity degrees)
    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHovered(false);
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      className={`relative overflow-hidden ${borderRadius} ${shadow} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      whileHover={disabled ? {} : { scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare effect */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white to-transparent pointer-events-none"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            backgroundPosition: `${glareX}% ${glareY}%`,
            backgroundSize: '200% 200%',
          }}
        />
      )}
    </motion.div>
  );
}
