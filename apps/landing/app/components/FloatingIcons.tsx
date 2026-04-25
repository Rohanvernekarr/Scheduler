"use client";

import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Link as LinkIcon, 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  Lock,
  MousePointer2,
  Workflow
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

const ICONS = [
  Calendar, Clock, LinkIcon, Zap, Shield, Cpu, Globe, Lock, MousePointer2, Workflow
];

export function FloatingIcons() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  // Grid-based distribution to keep icons spaced apart
  const columns = 6;
  const rows = 5;
  const cellWidth = 100 / columns;
  const cellHeight = 100 / rows;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: columns * rows }).map((_, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        
        // Position in the middle of the grid cell with some random jitter
        const jitterX = (Math.random() - 0.5) * (cellWidth * 0.7);
        const jitterY = (Math.random() - 0.5) * (cellHeight * 0.7);
        
        const x = (col * cellWidth) + (cellWidth / 2) + jitterX;
        const y = (row * cellHeight) + (cellHeight / 2) + jitterY;

        const Icon = ICONS[i % ICONS.length];
        
        return (
          <InteractiveIcon 
            key={i} 
            Icon={Icon} 
            initialX={x} 
            initialY={y} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        );
      })}
    </div>
  );
}

function InteractiveIcon({ 
  Icon, 
  initialX, 
  initialY, 
  mouseX, 
  mouseY 
}: { 
  Icon: any, 
  initialX: number, 
  initialY: number, 
  mouseX: any, 
  mouseY: any 
}) {
  const [position] = useState({
    x: initialX,
    y: initialY,
  });
  
  const [floatingOffset] = useState({
    x: (Math.random() - 0.5) * 50,
    y: (Math.random() - 0.5) * 50,
    duration: 10 + Math.random() * 20
  });

  const iconRef = useRef<HTMLDivElement>(null);
  
  // Spring values for smooth motion
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });
  const springScale = useSpring(1, { stiffness: 100, damping: 15 });
  const springOpacity = useSpring(0.15, { stiffness: 100, damping: 20 });

  useAnimationFrame(() => {
    if (!iconRef.current || typeof window === 'undefined') return;

    const rect = iconRef.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;

    const distanceX = mouseX.get() - iconCenterX;
    const distanceY = mouseY.get() - iconCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const radius = 250; // Interaction radius

    if (distance < radius) {
      // Repulsion force
      const force = (1 - distance / radius);
      springX.set(-distanceX * force * 0.5);
      springY.set(-distanceY * force * 0.5);
      springScale.set(1 + force * 0.5);
      springOpacity.set(0.15 + force * 0.4);
    } else {
      springX.set(0);
      springY.set(0);
      springScale.set(1);
      springOpacity.set(0.15);
    }
  });

  return (
    <motion.div
      ref={iconRef}
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        x: springX,
        y: springY,
        scale: springScale,
        opacity: springOpacity,
      }}
      animate={{
        translateY: [0, floatingOffset.y, 0],
        translateX: [0, floatingOffset.x, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: floatingOffset.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative group">
        <Icon size={24 + Math.random() * 16} className="text-white/20 transition-colors group-hover:text-accent" strokeWidth={1.5} />
        <motion.div 
          style={{ opacity: useTransform(springScale, [1, 1.5], [0, 0.5]) }}
          className="absolute inset-0 bg-accent/10 blur-xl rounded-full"
        />
      </div>
    </motion.div>
  );
}
