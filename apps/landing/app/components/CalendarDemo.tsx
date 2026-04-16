"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const SYSTEM_LOGS = [
  { emoji: "⚡", text: "SYNCING GATEWAY", delay: 0 },
  { emoji: "🔒", text: "ENCRYPTING DATA", delay: 2 },
  { emoji: "📟", text: "BUFFERING SLOTS", delay: 4 },
];

export function CalendarDemo(): ReactNode {
  const [activeLog, setActiveLog] = useState(0);
  
  useEffect(() => {
    const id = setInterval(() => {
      setActiveLog(v => (v + 1) % SYSTEM_LOGS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const today = new Date();
  const todayKey = toKey(today);

  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(todayKey);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("default", { month: "long" });

  const days: (Date | null)[] = [];
  const firstDay = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= total; i++) days.push(new Date(year, month, i));

  return (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xs bg-background border border-border p-6 shadow-2xl relative overflow-visible group"
      >
        <div className="absolute -inset-px bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-foreground/10" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-foreground/10" />

        <div className="flex items-center justify-between mb-6 relative">
          <button 
            className="calendar-nav-btn"
            onClick={() => setViewDate(new Date(year, month-1, 1))}
          >
            ‹
          </button>
          <span className="tech-heading text-md">
            {monthName} {year}
          </span>
          <button 
            className="calendar-nav-btn"
            onClick={() => setViewDate(new Date(year, month+1, 1))}
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2 relative">
          {WEEK.map(d => (
            <div key={d} className="text-center tech-label py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 relative">
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const key = toKey(d);
            const past = key < todayKey;
            const isSelected = key === selectedDay;
            const isToday = key === todayKey;

            return (
              <motion.button 
                key={i} 
                whileHover={!past ? { scale: 1.1, y: -2 } : {}}
                whileTap={!past ? { scale: 0.95 } : {}}
                disabled={past} 
                onClick={() => setSelectedDay(key)} 
                className={`calendar-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
              >
                {d.getDate()}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3 relative">
          <div>
            <p className="tech-label mb-1">Status</p>
            <p className="tech-heading text-lg">
              {selectedDay ? new Date(selectedDay + "T00:00:00").toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' }) : 'NULL'}
            </p>
          </div>
          <div className="flex justify-between items-center">
             <span className="tech-label text-[8px] text-foreground/20 italic tracking-widest">GATEWAY_V1_ACTIVE</span>
             <div className="flex items-center gap-1.5 bg-foreground/5 px-1.5 py-0.5 rounded-sm border border-foreground/10">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500" />
                </span>
                <span className="tech-label text-[8px]">LIVE_DB</span>
             </div>
          </div>
        </div>

        <div className="absolute -bottom-6 -right-3 z-30">
          {SYSTEM_LOGS.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={activeLog === i ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 10 }}
              transition={{ duration: 0.4, ease: "anticipate" }}
              className={`absolute bottom-0 right-0 flex items-center gap-2 bg-background/95 border border-foreground/10 glass rounded-lg px-3 py-1.5 whitespace-nowrap shadow-2xl ${activeLog === i ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <span className="text-xs">{log.emoji}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-foreground/60">{log.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute -top-3 -left-3 z-30 flex items-center gap-2 bg-background/95 border border-foreground/10 glass rounded-lg px-3 py-1.5 shadow-2xl shadow-foreground/5 cursor-default"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-foreground/80">🚀 Optimized</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
