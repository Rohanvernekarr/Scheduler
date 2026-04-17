"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "INITIATE",
    desc: "Pick a type, add participants, and set your agenda in seconds.",
  },
  {
    num: "02",
    title: "DISTRIBUTE",
    desc: "Share your availability link. No login, no friction - just booking.",
  },
  {
    num: "03",
    title: "SYNC",
    desc: "Automated invites fly out to everyone instantly. Zero ping-pong.",
  },
  {
    num: "04",
    title: "TRACK",
    desc: "Your monolithic dashboard keeps everything in one unified view.",
  },
];

export function HowItWorks(): ReactNode {
  return (
    <section id="how" className="py-24 bg-foreground/[0.02] overflow-hidden">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-24"
        >
          <span className="tech-label mb-4 block">03 / Operation Manual</span>
          <h2 className="tech-heading text-4xl md:text-5xl leading-tight">
            The systematic <br />flow of scheduling.
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
             hidden: { opacity: 0 },
             show: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="flex flex-col gap-px bg-border border border-border"
        >
          {STEPS.map(({ num, title, desc }) => (
            <motion.div 
              key={num} 
              variants={{
                 hidden: { opacity: 0, scaleY: 0.8, originY: 0 },
                 show: { opacity: 1, scaleY: 1, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="bg-background flex flex-col md:flex-row items-center group transition-colors hover:bg-zinc-900/80"
            >
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border min-w-[120px] flex justify-center">
                 <span className="tech-heading text-3xl text-white opacity-60 group-hover:text-foreground transition-colors">{num}</span>
              </div>
              <div className="flex-1 p-8 md:p-12">
                 <h3 className="tech-heading text-2xl mb-2">{title}</h3>
                 <p className="text-foreground/40 font-medium max-w-lg">{desc}</p>
              </div>
              <div className="p-8 md:p-12 text-white opacity-60 hidden lg:block">
                 <span className="tech-heading">ACTIVE_PROTOCOL</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-10 bg-foreground text-background p-10"
        >
          <div>
            <h3 className="tech-heading text-3xl mb-2">Ready to deploy?</h3>
            <p className="font-bold opacity-60">No setup fees. No friction. Start now.</p>
          </div>
          <a href="/schedule" className="bg-background text-foreground tech-heading px-10 py-5 border border-background hover:bg-background/90 transition-all text-center w-full sm:w-auto">
            Get Your Link →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
