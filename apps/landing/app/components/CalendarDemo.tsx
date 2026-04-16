"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CalendarDemo(): ReactNode {
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
    <div className="w-full max-w-sm bg-background border border-border p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative tech markers */}
      <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-foreground/10" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-foreground/10" />

      <div className="flex items-center justify-between mb-10">
        <button 
          className="calendar-nav-btn"
          onClick={() => setViewDate(new Date(year, month-1, 1))}
        >
          ‹
        </button>
        <span className="tech-heading text-lg">
          {monthName} {year}
        </span>
        <button 
          className="calendar-nav-btn"
          onClick={() => setViewDate(new Date(year, month+1, 1))}
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {WEEK.map(d => (
          <div key={d} className="text-center tech-label py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (!d) return <div key={i} />;
          const key = toKey(d);
          const past = key < todayKey;
          const isSelected = key === selectedDay;
          const isToday = key === todayKey;

          return (
            <button 
              key={i} 
              disabled={past} 
              onClick={() => setSelectedDay(key)} 
              className={`calendar-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-border flex flex-col gap-4">
        <div>
          <p className="tech-label mb-2">Selected Segment</p>
          <p className="tech-heading text-xl">
            {selectedDay ? new Date(selectedDay + "T00:00:00").toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' }) : 'NULL'}
          </p>
        </div>
        <div className="flex justify-between items-center">
           <span className="tech-label text-[9px] text-foreground/20">SYSTEM_AUTH_REQUIRED</span>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-foreground/10 animate-pulse" />
              <span className="tech-label text-[9px]">LIVE_STREAM</span>
           </div>
        </div>
      </div>
    </div>
  );
}
