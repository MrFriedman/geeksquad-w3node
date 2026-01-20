"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ArtPinProps {
  id: string;
  title: string;
  artist: string;
  image: string;
  x: number;
  y: number;
  isSelected?: boolean;
  onClick: () => void;
}

export function ArtPin({
  title,
  artist,
  image,
  x,
  y,
  isSelected,
  onClick,
}: ArtPinProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View ${title} by ${artist}`}
    >
      {/* Pin marker */}
      <div
        className={cn(
          "relative transition-all duration-300 ease-out",
          isSelected || isHovered ? "scale-110" : "scale-100"
        )}
      >
        {/* Pulse animation */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-primary/40 animate-ping",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-70"
          )}
          style={{ animationDuration: "2s" }}
        />

        {/* Outer ring */}
        <div
          className={cn(
            "w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            isSelected
              ? "border-primary bg-primary/20"
              : "border-primary/60 bg-card/80 group-hover:border-primary group-hover:bg-primary/10"
          )}
        >
          {/* Image thumbnail */}
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-background">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pin point */}
        <div
          className={cn(
            "absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent transition-colors duration-300",
            isSelected
              ? "border-t-primary"
              : "border-t-primary/60 group-hover:border-t-primary"
          )}
        />
      </div>

      {/* Hover tooltip */}
      <div
        className={cn(
          "absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 min-w-[140px] transition-all duration-200 shadow-lg",
          isHovered || isSelected
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        <p className="text-xs font-semibold text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{artist}</p>
      </div>
    </button>
  );
}
