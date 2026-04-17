"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    num: "01",
    title: "Global Scheduling",
    desc: "Create interviews, syncs, or check-ins in seconds with automated invites.",
  },
  {
    num: "02",
    title: "One-Click Booking",
    desc: "Share your availability link and let others book without back-and-forth emails.",
  },
  {
    num: "03",
    title: "Instant Integration",
    desc: "Everyone gets a professional calendar invite with zero manual configuration.",
  },
  {
    num: "04",
    title: "Real-time Dashboard",
    desc: "Track every upcoming and past meeting in one unified monolithic view.",
  },
];

export function Features(): ReactNode {
  return (
    <section id="features" className="py-24 border-b border-border overflow-hidden">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-xl">
            <span className="tech-label mb-4 block">02 / System Capabilities</span>
            <h2 className="tech-heading text-4xl md:text-5xl leading-tight text-foreground">
              A robust architecture <br />for your time.
            </h2>
          </div>
          <p className="text-foreground/40 max-w-xs text-md font-medium">
            Designed for high-density information and zero-friction scheduling.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
             hidden: { opacity: 0 },
             show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border"
        >
          {FEATURES.map(({ num, title, desc }) => (
            <motion.div
              key={title}
              variants={{
                 hidden: { opacity: 0, y: 20 },
                 show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="p-10 border-b md:border-b-0 md:border-r border-border hover:bg-foreground/5 transition-all group"
            >
              <p className="tech-label text-foreground/20 mb-10 group-hover:text-foreground transition-colors">
                {num} —
              </p>
              <h3 className="tech-heading text-lg text-foreground mb-4">
                {title}
              </h3>
              <p className="text-sm text-foreground/40 leading-relaxed font-medium">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
