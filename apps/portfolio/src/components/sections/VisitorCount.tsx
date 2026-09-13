"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/visitor-count")
        const data = await response.json()
        setCount(data.count)
      } catch (error) {
        console.error("Failed to fetch visitor count:", error)
      }
    }
    fetchCount()
  }, [])

  return (
    <div className="flex items-center gap-1.5 bg-muted/40 rounded-full px-3 py-1.5 min-w-[100px] justify-center">
      <Users className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-[10px] font-medium text-muted-foreground">Visitors</span>
      <span className="ml-1.5 text-sm font-bold text-foreground">{count !== null ? count.toLocaleString() : "-"}</span>
    </div>
  )
} 