"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Snail } from "lucide-react";

export function AnimatedInsect() {
  const [position, setPosition] = useState({ x: 20, y: 20 });

  useEffect(() => {
    const moveInsect = () => {
      setPosition((prev) => {
        
        const stepX = (Math.random() * 6) - 3;
        const stepY = (Math.random() * 6) - 3;

        const newX = Math.min(Math.max(prev.x + stepX, 5), 95);
        const newY = Math.min(Math.max(prev.y + stepY, 10), 90);

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveInsect, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      transition={{
        duration: 3, 
        ease: "linear", 
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Snail className="h-6 w-6 text-primary drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
}
