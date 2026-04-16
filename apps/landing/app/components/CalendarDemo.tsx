"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "3:00 PM", "4:30 PM"];

export function CalendarDemo(): ReactNode {
  const today = new Date();
  const todayKey = toKey(today);

  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("default", { month: "long" });

  const days: (Date | null)[] = [];
  const firstDay = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= total; i++) days.push(new Date(year, month, i));

  const cellStyle = (d: Date | null, key: string): React.CSSProperties => {
    if (!d) return {};
    const past = key < todayKey;
    const sel = key === selectedDay;
    return {
      height: "34px", width: "100%",
      border: "none", borderRadius: "8px",
      background: sel ? "#f4f4f5" : "transparent",
      color: sel ? "#0a0a0a" : past ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.75)",
      fontSize: "13px", fontWeight: 600,
      cursor: past ? "not-allowed" : "pointer",
      transition: "all 0.12s",
      outline: key === todayKey && !sel ? "1px solid rgba(255,255,255,0.14)" : "none",
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "380px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <button onClick={() => setViewDate(new Date(year, month-1, 1))} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "7px", width: "28px", height: "28px", color: "#f4f4f5", fontSize: "15px" }}>‹</button>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#f4f4f5" }}>{monthName} {year}</span>
        <button onClick={() => setViewDate(new Date(year, month+1, 1))} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "7px", width: "28px", height: "28px", color: "#f4f4f5", fontSize: "15px" }}>›</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px", marginBottom: "4px" }}>
        {WEEK.map(d => <div key={d} style={{ textAlign: "center", fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.22)", textTransform: "uppercase", padding: "3px 0" }}>{d}</div>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px" }}>
        {days.map((d, i) => {
          if (!d) return <div key={i} />;
          const key = toKey(d);
          const past = key < todayKey;
          return <button key={i} disabled={past} onClick={() => { setSelectedDay(key); setSelectedSlot(null); }} style={cellStyle(d, key)}>{d.getDate()}</button>;
        })}
      </div>

      {selectedDay && (
        <div style={{ marginTop: "22px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "10px" }}>Pick a time</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {SLOTS.map(s => (
              <button key={s} onClick={() => setSelectedSlot(s)} style={{
                padding: "7px 13px", borderRadius: "8px", border: `1px solid ${selectedSlot===s ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.08)"}`,
                background: selectedSlot===s ? "rgba(255,255,255,0.08)" : "transparent",
                color: selectedSlot===s ? "#f4f4f5" : "rgba(255,255,255,0.4)",
                fontSize: "12px", fontWeight: 600, transition: "all .12s",
              }}>{s}</button>
            ))}
          </div>
          {selectedSlot && (
            <button style={{ marginTop: "14px", width: "100%", padding: "11px", background: "#f4f4f5", color: "#0a0a0a", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 800 }}>
              Confirm {selectedSlot} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
