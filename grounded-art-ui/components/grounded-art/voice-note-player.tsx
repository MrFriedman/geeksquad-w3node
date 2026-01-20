"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceNotePlayerProps {
  artistName: string;
  duration: string;
  waveformData?: number[];
}

export function VoiceNotePlayer({
  artistName,
  duration,
  waveformData = [0.3, 0.5, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5, 0.7, 0.9, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4, 0.7, 0.5, 0.6, 0.8, 0.4, 0.5, 0.7, 0.6, 0.4],
}: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate audio playback
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const newProgress = p + 0.5;
          const totalSeconds = parseDuration(duration);
          const currentSeconds = Math.floor((newProgress / 100) * totalSeconds);
          setCurrentTime(formatTime(currentSeconds));
          return newProgress;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration]);

  const parseDuration = (dur: string): number => {
    const parts = dur.split(":");
    return Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1]);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (progress >= 100) setProgress(0);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-secondary/50 border border-border rounded-2xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Artist Voice Note</p>
          <p className="text-xs text-muted-foreground">{artistName} on their inspiration</p>
        </div>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center gap-1 h-12 mb-3">
        {waveformData.map((height, index) => {
          const isActive = (index / waveformData.length) * 100 <= progress;
          return (
            <div
              key={`wave-${height}-${index}`}
              className={cn(
                "flex-1 rounded-full transition-all duration-150",
                isActive ? "bg-primary" : "bg-muted-foreground/30"
              )}
              style={{ height: `${height * 100}%` }}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>
        
        {/* Progress bar */}
        <div className="flex-1">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground font-mono">{currentTime}</span>
            <span className="text-xs text-muted-foreground font-mono">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
