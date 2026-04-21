"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Background() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const textY2 = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background">
      {/* Precision Grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Scanner Line */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="laser-line w-full opacity-10 animate-scan" />
      </div>

      {/* Parallax Background Texts */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        style={{ y: textY1 }}
        className="bg-text top-[-15%] left-[-5%] text-[30vw] sm:text-[25vw]"
      >
        Scheduler
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 2 }}
        style={{ y: textY2 }}
        className="bg-text top-[60%] right-[30%] sm:right-[60%] text-[20vw] sm:text-[17vw] rotate-90"
      >
        Engine
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 2 }}
        style={{ y: textY1 }}
        className="bg-text top-[120%] left-[5%] sm:left-[10%] text-[25vw] sm:text-[20vw]"
      >
        Connect
      </motion.div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent to-background opacity-90" />
    </div>
  );
}
