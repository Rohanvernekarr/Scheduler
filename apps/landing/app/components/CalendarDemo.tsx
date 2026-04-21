"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");
const toKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
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
      setActiveLog((v) => (v + 1) % SYSTEM_LOGS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const today = new Date();
  const todayKey = toKey(today);


  const [viewDate, setViewDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(todayKey);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("default", { month: "long" });

  const days: (Date | null)[] = [];
  const firstDay = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= total; i++) days.push(new Date(year, month, i));

  const changeMonth = (offset: number) => {
    setDirection(offset);
    setViewDate(new Date(year, month + offset, 1));
  };

  const monthVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 24 : -24,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.01,
        delayChildren: 0.05,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 24 : -24,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.22, ease: "easeIn" },
    }),
  };

  const dayVariants: Variants = {
    enter: { scale: 0.9, opacity: 0, y: 4 },
    center: { scale: 1, opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="relative w-full max-w-[340px] sm:max-w-[440px] mx-auto p-2 sm:p-4 select-none"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center">
        <div className="w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 sm:mb-8 relative">
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all text-sm bg-transparent"
              onClick={() => changeMonth(-1)}
            >
              ‹
            </motion.button>

            <div className="relative flex-1 flex justify-center h-8 overflow-visible">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.span
                  key={`${month}-${year}`}
                  custom={direction}
                  initial={{ y: -8, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="font-semibold text-lg absolute text-white tracking-[0.08em] uppercase"
                >
                  {monthName} {year}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all text-sm bg-transparent"
              onClick={() => changeMonth(1)}
            >
              ›
            </motion.button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 mb-4 text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">
            {WEEK.map((d) => (
              <div key={d} className="text-center py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="relative h-[250px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={`${year}-${month}`}
                custom={direction}
                variants={monthVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="grid grid-cols-7 gap-1 absolute top-0 left-0 right-0 w-full"
              >
                {days.map((d, i) => {
                  if (!d) return <div key={i} className="h-8" />;
                  const key = toKey(d);
                  const past = key < todayKey;
                  const isSelected = key === selectedDay;
                  const isToday = key === todayKey;

                  return (
                    <motion.button
                      key={key}
                      variants={dayVariants}
                      whileHover={
                        !past
                          ? {
                              scale: 1.06,
                              y: -1,
                            }
                          : {}
                      }
                      whileTap={!past ? { scale: 0.96 } : {}}
                      disabled={past}
                      onClick={() => setSelectedDay(key)}
                      className={`group relative h-8 w-full rounded-lg text-xs flex items-center justify-center transition-all duration-200 ${
                        past
                          ? "opacity-10 cursor-not-allowed text-white/20"
                          : "cursor-pointer text-white/70 hover:text-white"
                      }`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {/* Selected background */}
                      {isSelected && (
                        <motion.div
                          layoutId="calendar-selection"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(153, 160, 161, 0.9), rgba(223, 231, 231, 0.9))",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                            mass: 0.7,
                          }}
                        />
                      )}

                      {/* Today outline when not selected */}
                      {!isSelected && isToday && (
                        <motion.div
                          layoutId="today-ring"
                          className="absolute inset-0 rounded-lg border border-zinc-400/80"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 28,
                            mass: 0.6,
                          }}
                        />
                      )}

                      <span
                        className={`relative z-10 transition-colors duration-200 ${
                          isSelected
                            ? "text-black font-bold"
                            : "font-semibold"
                        }`}
                      >
                        {d.getDate()}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* System logs – minimal pill */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30">
        {SYSTEM_LOGS.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={
              activeLog === i
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }
                : { opacity: 0, scale: 0.9, y: 4 }
            }
            transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 24 }}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-2.5 whitespace-nowrap border border-white/10 bg-black/40 backdrop-blur-sm ${
              activeLog === i ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <motion.span
              animate={activeLog === i ? { y: [0, -1, 0] } : { y: 0 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
              className="text-xs"
            >
              {log.emoji}
            </motion.span>
            <span className="tech-label text-[10px] text-white/80 tracking-[0.16em]">
              {log.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}