"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    tag: "CONFIG_PHASE",
    title: "Define Availability Protocol",
    desc: "Establish your operational parameters. Set custom rules, buffer zones, and priority windows within the core engine.",
  },
  {
    num: "02",
    tag: "LINK_DISTRIBUTION",
    title: "Deploy Access Gateway",
    desc: "Generate your unique synchronization link. Distribute it via secure channels or embed it directly into your stack.",
  },
  {
    num: "03",
    tag: "AUTO_EXECUTION",
    title: "Autonomous Scheduling",
    desc: "The system handles the handshake. Real-time conflict resolution and automated invite dispatch across all connected nodes.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-32 border-b border-border relative overflow-hidden bg-black/20">
      {/* background Text */}
      <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 select-none pointer-events-none z-0">
        <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap rotate-90">
          Process
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* Left */}
          <div className="lg:w-1/3 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="tech-label text-accent">Workflow_Architecture</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight"
            >
              System <br />
              <span className="text-subtle">Protocol.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-subtle leading-relaxed max-w-sm"
            >
              A systematic approach to eliminate coordination friction. 
              Zero manual input required after initial synchronization.
            </motion.p>
          </div>
          
          {/* Right*/}
          <div className="lg:w-2/3 space-y-2 relative">
          
            <div className="absolute left-[23px] top-10 bottom-10 w-[1px] bg-gradient-to-b from-accent/50 via-white/5 to-transparent z-0 hidden sm:block" />

            {STEPS.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative z-10 flex flex-col sm:flex-row gap-8 p-8 rounded-3xl hover:bg-white/[0.02] transition-all duration-500 group"
              >
                {/* Number Orb */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-500">
                  <span className="font-mono text-accent text-sm font-black">{step.num}</span>
                </div>

                <div className="flex-grow pt-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="tech-label text-[10px] text-white/20 group-hover:text-accent/40 transition-colors uppercase tracking-[0.2em]">
                      {step.tag}
                    </span>
                    <div className="h-[1px] w-8 bg-white/5 group-hover:w-16 transition-all duration-500" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-subtle text-base leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-300 max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
