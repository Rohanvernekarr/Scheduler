"use client";

import { motion } from "framer-motion";
import { Globe, MousePointer2, Zap, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: <Globe className="w-4 h-4" />,
    title: "Global Sync",
    desc: "Automated invites across any time zone.",
  },
  {
    icon: <MousePointer2 className="w-4 h-4" />,
    title: "One-Click",
    desc: "Share your link and let others book instantly.",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "Integration",
    desc: "Professional calendar invites with zero manual setup.",
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    title: "Analytics",
    desc: "Track every meeting in a unified interface.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 border-b border-border relative overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
        <span className="text-[15vw] font-black text-white/[0.01] tracking-tighter uppercase whitespace-nowrap">
          Capabilities
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 tech-border rounded-md group-hover:border-accent transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-sm tracking-tight">{feature.title}</h3>
              </div>
              <p className="text-sm text-subtle leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
