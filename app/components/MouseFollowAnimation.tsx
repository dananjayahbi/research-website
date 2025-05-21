'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MouseFollowAnimationProps {
  color?: string;
  size?: number;
  border?: string;
  latency?: number;
  showOnlyOnLinks?: boolean;
  disableOnMobile?: boolean;
}

export default function MouseFollowAnimation({
  color = 'rgba(59, 130, 246, 0.5)', // Default blue color with transparency
  size = 30,
  border = '1px solid rgba(59, 130, 246, 0.8)',
  latency = 0.1,
  showOnlyOnLinks = false,
  disableOnMobile = true
}: MouseFollowAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for smooth cursor movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics to make cursor movement smooth
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show cursor when mouse enters the page
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Update cursor position with mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
    };

    // Check if mouse is hovering over a link
    const handleLinkHover = () => {
      if (showOnlyOnLinks) {
        const links = document.querySelectorAll('a, button');
        
        links.forEach(link => {
          link.addEventListener('mouseenter', () => setIsHoveringLink(true));
          link.addEventListener('mouseleave', () => setIsHoveringLink(false));
        });
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    
    if (showOnlyOnLinks) {
      handleLinkHover();
      // Force a recheck when DOM might have changed
      const observer = new MutationObserver(handleLinkHover);
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY, size, showOnlyOnLinks]);

  if (disableOnMobile && isMobile) return null;

  // Only show if visible and (showing for all elements or specifically hovering a link)
  const shouldShow = isVisible && (!showOnlyOnLinks || isHoveringLink);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        backgroundColor: color,
        border: border,
        opacity: shouldShow ? 1 : 0,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isHoveringLink ? 1.2 : 1,
        opacity: shouldShow ? 1 : 0,
      }}
      transition={{
        scale: { duration: 0.2 },
        opacity: { duration: 0.2 },
      }}
    />
  );
}
