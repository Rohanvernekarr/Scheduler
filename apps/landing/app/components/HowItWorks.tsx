"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Configure Availability",
    desc: "Set your rules and generate your unique link.",
  },
  {
    num: "02",
    title: "Distribute Access",
    desc: "Share the link with participants or embed it.",
  },
  {
    num: "03",
    title: "Automate Invites",
    desc: "System sends invites and syncs to all calendars.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 border-b border-border relative overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute top-[20%] right-0 translate-x-1/4 select-none pointer-events-none z-0">
        <span className="text-[15vw] font-black text-white/[0.015] tracking-tighter uppercase whitespace-nowrap rotate-90">
          Process
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-24">
          <div className="lg:w-1/3">
            <span className="tech-label mb-4 block">Process</span>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Simple Protocol.</h2>
            <p className="text-subtle">
              The systematic approach to modern meeting coordination. 
              Zero manual input required after initial setup.
            </p>
          </div>
          
          <div className="lg:w-2/3 space-y-12">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-8 group"
              >
                <span className="font-mono text-accent text-sm font-bold pt-1">{step.num}</span>
                <div>
                  <h3 className="font-bold mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                  <p className="text-subtle text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
