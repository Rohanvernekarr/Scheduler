"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function TimeSpent() {
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const currentTime = Date.now()
      const elapsed = Math.floor((currentTime - startTime) / 1000)
      setTimeSpent(elapsed)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes > 0 ? minutes + 'm ' : ''}${remainingSeconds}s`
  }

  return (
    <div className="flex items-center gap-1.5 bg-muted/40 rounded-full px-3 py-1.5 min-w-[100px] justify-center">
      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-[10px] font-medium text-muted-foreground">TimeSpent</span>
      <span className="ml-1.5 text-sm font-bold text-foreground">{formatTime(timeSpent)}</span>
    </div>
  )
} 