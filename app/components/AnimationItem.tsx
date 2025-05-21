"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationItemProps {
  children: ReactNode;
  className?: string;
}

export default function AnimationItem({
  children,
  className = ""
}: AnimationItemProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}
