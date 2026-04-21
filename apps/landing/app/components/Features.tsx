"use client";

import { motion } from "framer-motion";
import { Globe, MousePointer2, Zap, BarChart3, Shield, Cpu, Layers, Workflow } from "lucide-react";

const FEATURES = [
  {
    icon: <Globe className="w-5 h-5 text-accent" />,
    title: "Global Sync Engine",
    desc: "Automated coordination across 24+ time zones with sub-millisecond precision. Never miscalculate a meeting time again.",
    specs: ["UTC+12 Coverage", "Dynamic DST Adjustments", "Low-latency Sync"],
    delay: 0.1
  },
  {
    icon: <MousePointer2 className="w-5 h-5 text-accent" />,
    title: "One-Click Deployment",
    desc: "Generate professional booking interfaces instantly. Share a secure link and let your network book into your controlled windows.",
    specs: ["Custom URL Slugs", "Vanity Domains", "Instant Verification"],
    delay: 0.2
  },
  {
    icon: <Workflow className="w-5 h-5 text-accent" />,
    title: "Autonomous Workflows",
    desc: "Integrate directly with your calendar. Automated invites, reminders, and follow-ups handled by the core scheduling engine.",
    specs: ["Google/Outlook Native", "Webhook Support", "Auto-Reminders"],
    delay: 0.3
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
    title: "Analytics Dashboard",
    desc: "Granular data on booking conversion and meeting density. Visualize your availability trends in a unified technical interface.",
    specs: ["Real-time Reporting", "Conversion Tracking", "Exportable Data"],
    delay: 0.4
  },
  {
    icon: <Shield className="w-5 h-5 text-accent" />,
    title: "Enterprise Encryption",
    desc: "Your data is encrypted end-to-end. We maintain the highest technical standards for privacy and coordination security.",
    specs: ["AES-256 Bit Encryption", "SOC2 Compliance", "Zero-Knowledge Storage"],
    delay: 0.5
  },
  {
    icon: <Cpu className="w-5 h-5 text-accent" />,
    title: "Logic Processing",
    desc: "Advanced availability conflict resolution. The engine scans for overlaps and prioritizes your optimal working blocks.",
    specs: ["Conflict Detection", "Priority Buffer", "Multi-Calendar Scan"],
    delay: 0.6
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 border-b border-border relative overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0">
        <span className="text-[35vw] sm:text-[25vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap">
          calender
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 relative">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
              <span className="tech-label text-accent text-[10px]">System_Core_v2.0</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tight leading-none"
            >
              Technical <span className="text-subtle">Precision.</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-subtle text-sm max-w-xs leading-relaxed border-l border-white/10 pl-6"
          >
            Optimized coordination modules for high-performance scheduling workflows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-black p-8 hover:z-10 transition-all duration-300 border-r border-b border-white/5 last:border-0"
            >
              {/* Radial Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_rgba(59,130,246,0.06)_0%,_transparent_70%)] pointer-events-none" 
                   onMouseMove={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                     e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                   }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 tech-border rounded-xl group-hover:border-accent transition-all duration-300 bg-white/[0.02]">
                    {feature.icon}
                  </div>
                  <span className="text-[9px] font-mono text-white/10 group-hover:text-white/30 transition-colors">
                    MOD_{index + 1}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-subtle text-xs leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {feature.specs.slice(0, 2).map(spec => (
                      <div key={spec} className="flex items-center gap-2">
                        <div className="w-0.5 h-0.5 bg-accent/40 rounded-full" />
                        <span className="tech-label text-[8px] text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
