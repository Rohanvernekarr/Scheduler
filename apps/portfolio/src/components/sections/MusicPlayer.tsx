"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play, Music } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex items-center gap-1.5 bg-muted/40 rounded-full px-3 py-1.5 min-w-[100px] justify-center">
      <Music className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-[10px] font-medium text-muted-foreground">Vibe</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className="h-5  w-5 ml-1.5 "
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">
          {isPlaying ? "Pause music" : "Play music"}
        </span>
      </Button>
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        loop
        className="hidden"
      />
    </div>
  )
} 