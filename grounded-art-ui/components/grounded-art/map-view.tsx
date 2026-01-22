"use client";

import { useState } from "react";
import { ArtPin } from "./art-pin";
import { MapPin, Navigation, Plus, Minus } from "lucide-react";

interface ArtLocation {
  id: string;
  title: string;
  artist: string;
  image: string;
  x: number;
  y: number;
  type: "mural" | "sculpture" | "installation";
}

interface MapViewProps {
  artLocations: ArtLocation[];
  onSelectArt: (id: string) => void;
  selectedArtId: string | null;
}

export function MapView({ artLocations, onSelectArt, selectedArtId }: MapViewProps) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Map background - Mapbox style dark theme */}
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Dark map tiles simulation */}
        <div className="absolute inset-0 bg-[#191a1a]">
          {/* Grid lines for streets */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            {/* Major roads */}
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="#3d4040" strokeWidth="4" />
            <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="#3d4040" strokeWidth="4" />
            <line x1="25%" y1="0%" x2="25%" y2="100%" stroke="#3d4040" strokeWidth="4" />
            <line x1="70%" y1="0%" x2="70%" y2="100%" stroke="#3d4040" strokeWidth="4" />
            
            {/* Minor roads */}
            <line x1="0%" y1="15%" x2="100%" y2="15%" stroke="#2a2d2d" strokeWidth="2" />
            <line x1="0%" y1="45%" x2="100%" y2="45%" stroke="#2a2d2d" strokeWidth="2" />
            <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="#2a2d2d" strokeWidth="2" />
            <line x1="0%" y1="90%" x2="100%" y2="90%" stroke="#2a2d2d" strokeWidth="2" />
            <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="#2a2d2d" strokeWidth="2" />
            <line x1="45%" y1="0%" x2="45%" y2="100%" stroke="#2a2d2d" strokeWidth="2" />
            <line x1="55%" y1="0%" x2="55%" y2="100%" stroke="#2a2d2d" strokeWidth="2" />
            <line x1="85%" y1="0%" x2="85%" y2="100%" stroke="#2a2d2d" strokeWidth="2" />
            
            {/* Diagonal street */}
            <line x1="0%" y1="100%" x2="50%" y2="20%" stroke="#3d4040" strokeWidth="3" />
            
            {/* Park/green space */}
            <rect x="60%" y="35%" width="20%" height="20%" fill="#1f2d1f" rx="4" />
            
            {/* Water feature */}
            <ellipse cx="15%" cy="70%" rx="10%" ry="8%" fill="#1a2733" />
          </svg>
          
          {/* Building blocks */}
          <div className="absolute top-[5%] left-[30%] w-[12%] h-[8%] bg-[#232626] rounded-sm" />
          <div className="absolute top-[8%] left-[50%] w-[15%] h-[6%] bg-[#252828] rounded-sm" />
          <div className="absolute top-[35%] left-[5%] w-[8%] h-[12%] bg-[#232626] rounded-sm" />
          <div className="absolute top-[50%] left-[30%] w-[10%] h-[8%] bg-[#282b2b] rounded-sm" />
          <div className="absolute top-[65%] left-[50%] w-[12%] h-[10%] bg-[#232626] rounded-sm" />
          <div className="absolute top-[80%] left-[15%] w-[20%] h-[8%] bg-[#252828] rounded-sm" />
          <div className="absolute top-[20%] left-[75%] w-[15%] h-[10%] bg-[#232626] rounded-sm" />
          
          {/* Location labels */}
          <div className="absolute top-[62%] left-[63%] text-[10px] text-muted-foreground/50 font-mono">
            Heritage Park
          </div>
          <div className="absolute top-[73%] left-[8%] text-[10px] text-muted-foreground/50 font-mono">
            River Walk
          </div>
        </div>
        
        {/* Art pins */}
        {artLocations.map((art) => (
          <ArtPin
            key={art.id}
            {...art}
            isSelected={selectedArtId === art.id}
            onClick={() => onSelectArt(art.id)}
          />
        ))}
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
          className="w-10 h-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center text-foreground hover:bg-card transition-colors"
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
          className="w-10 h-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center text-foreground hover:bg-card transition-colors"
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors mt-2"
          aria-label="Center on my location"
        >
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Search/filter bar */}
      <div className="absolute top-4 left-4 right-20">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl px-4 py-3 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Johannesburg, SA</span>
        </div>
      </div>

      {/* Art type legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Murals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Sculptures</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-3" />
            <span className="text-xs text-muted-foreground">Digital</span>
          </div>
        </div>
      </div>

      {/* Nearby indicator */}
      <div className="absolute bottom-4 right-4 bg-primary rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
        <span className="text-sm font-semibold text-primary-foreground">
          {artLocations.length} nearby
        </span>
      </div>
    </div>
  );
}
