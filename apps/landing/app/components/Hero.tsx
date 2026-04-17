"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { CalendarDemo } from "./CalendarDemo";

const WORDS = ["TEAM MEET", "INTERVIEWS", "SYNC-UPS" , "CLIENT CALLS"];

function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = to / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) { setValue(to); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [to]);
  return <span className={className}>{value.toLocaleString()}{suffix}</span>;
}

export function Hero(): ReactNode {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const STATS = [
    { value: 2470, label: "Meetings Booked", suffix: "+" },
    { value: 1240, label: "Active Users", suffix: "+" },
    { value: 99, label: "Satisfaction", suffix: "%" },
  ];

  return (
    <section className="pt-32 pb-24 border-b border-border">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
          <div className="flex-1 max-w-2xl">
            <span className="tech-label mb-8 block">01 / System Entry</span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-[0.95] text-foreground uppercase">
              zero Friction <br />
              <span className="text-foreground/25">to schedule</span>
              <br />
              <span className="inline-block relative">
                <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom">
                  {WORDS.map((word, i) => (
                    <motion.span
                      key={word}
                      className="absolute left-0 whitespace-nowrap"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={
                        i === wordIndex
                          ? { y: "0%", opacity: 1 }
                          : i === (wordIndex - 1 + WORDS.length) % WORDS.length
                          ? { y: "-100%", opacity: 0 }
                          : { y: "100%", opacity: 0 }
                      }
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  <span className="invisible">{WORDS.reduce((a, b) => (a.length > b.length ? a : b))}</span>
                </span>
              </span>
            </h1>

            <p className="text-md text-foreground/40 leading-relaxed mb-12 max-w-xl font-medium">
              Schedule interviews, syncs, and check-ins in seconds. 
              Share your link and let people pick their own time. 
              Monolithic speed for modern workflows.
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-20">
              <a href="/schedule" className="bg-foreground text-background tech-heading text-md px-10 py-4 hover:opacity-90 transition-all border border-foreground shadow-2xl shadow-foreground/10">
                Get Your Link
              </a>
              <a href="#how" className="tech-label px-8 py-4 hover:text-foreground transition-all border border-border">
                Learn More
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-10 border-t border-border">
               {STATS.map((s) => (
                 <div key={s.label}>
                   <div className="flex items-center gap-2 mb-1">
                      <CountUp to={s.value} suffix={s.suffix} className="tech-heading text-2xl tabular-nums" />
                   </div>
                   <p className="tech-label">{s.label}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="hidden lg:block w-full max-w-sm relative group">
            <div className="absolute -inset-4 bg-foreground/5 -z-10 group-hover:bg-foreground/10 transition-colors" />
            <div className="glass p-2">
               <CalendarDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
