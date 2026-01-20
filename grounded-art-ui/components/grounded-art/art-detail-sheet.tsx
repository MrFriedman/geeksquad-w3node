"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  Share2,
  MapPin,
  Clock,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VoiceNotePlayer } from "./voice-note-player";
import { PolygonBadge } from "./polygon-badge";

interface ArtDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  art: {
    id: string;
    title: string;
    artist: string;
    image: string;
    description: string;
    location: string;
    distance: string;
    createdAt: string;
    likes: number;
    type: string;
  } | null;
}

export function ArtDetailSheet({ isOpen, onClose, art }: ArtDetailSheetProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!art) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close detail sheet"
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl max-h-[90vh] overflow-hidden transition-transform duration-500 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Drag handle */}
        <div className="sticky top-0 bg-card pt-3 pb-2 px-4 flex justify-center z-10">
          <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-20px)] pb-8">
          {/* Hero image */}
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={art.image || "/placeholder.svg"}
              alt={art.title}
              fill
              className="object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  "w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors",
                  isBookmarked
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/60 text-foreground hover:bg-background/80"
                )}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Art type badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wide">
                {art.type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 -mt-6 relative">
            {/* Title section */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground mb-1">{art.title}</h2>
              <p className="text-base text-primary font-medium">{art.artist}</p>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{art.distance}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{art.createdAt}</span>
              </div>
            </div>

            {/* Polygon verification badge */}
            <PolygonBadge className="mb-5" />

            {/* Voice note player */}
            <VoiceNotePlayer
              artistName={art.artist}
              duration="2:34"
            />

            {/* Description */}
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                About this piece
              </h3>
              <p
                className={cn(
                  "text-sm text-muted-foreground leading-relaxed",
                  !showFullDescription && "line-clamp-3"
                )}
              >
                {art.description}
              </p>
              {art.description.length > 150 && (
                <button
                  type="button"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="flex items-center gap-1 text-primary text-sm font-medium mt-2 hover:text-primary/80 transition-colors"
                >
                  {showFullDescription ? "Show less" : "Read more"}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      showFullDescription && "rotate-180"
                    )}
                  />
                </button>
              )}
            </div>

            {/* Location */}
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                Location
              </h3>
              <div className="bg-secondary/50 border border-border rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{art.location}</p>
                  <p className="text-xs text-muted-foreground">{art.distance} away</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Navigate
                </button>
              </div>
            </div>

            {/* Action bar */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  "flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors",
                  isLiked
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-secondary text-foreground border border-border hover:bg-secondary/80"
                )}
              >
                <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                <span>{isLiked ? art.likes + 1 : art.likes}</span>
              </button>
              <button
                type="button"
                className="flex-1 h-14 rounded-xl bg-secondary text-foreground border border-border flex items-center justify-center gap-2 font-semibold hover:bg-secondary/80 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
