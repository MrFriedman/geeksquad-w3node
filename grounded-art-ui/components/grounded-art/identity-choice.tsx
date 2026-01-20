"use client";

import { useState } from "react";
import { User, Palette, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IdentityChoiceProps {
  onSelect: (identity: "collector" | "creator") => void;
}

export function IdentityChoice({ onSelect }: IdentityChoiceProps) {
  const [selected, setSelected] = useState<"collector" | "creator" | null>(
    null
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to Grounded Art
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your identity to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Collector Card */}
          <button
            type="button"
            onClick={() => {
              setSelected("collector");
              setTimeout(() => onSelect("collector"), 300);
            }}
            className={cn(
              "relative bg-card border-2 rounded-2xl p-8 text-left transition-all hover:scale-105 texture-fabric",
              selected === "collector"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            )}
          >
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Collector
            </h2>
            <p className="text-muted-foreground mb-6">
              Discover, collect, and support location-based artworks. Unlock
              exclusive content when you visit art in person.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <span>Explore as Collector</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          {/* Creator Card */}
          <button
            type="button"
            onClick={() => {
              setSelected("creator");
              setTimeout(() => onSelect("creator"), 300);
            }}
            className={cn(
              "relative bg-card border-2 rounded-2xl p-8 text-left transition-all hover:scale-105 texture-wood",
              selected === "creator"
                ? "border-accent bg-accent/10"
                : "border-border hover:border-accent/50"
            )}
          >
            <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
              <Palette className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Creator
            </h2>
            <p className="text-muted-foreground mb-6">
              Register your art, protect your IP, and earn directly from your
              work. Connect your art to physical locations.
            </p>
            <div className="flex items-center gap-2 text-accent font-semibold">
              <span>Register as Creator</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          You can change your identity later in settings
        </p>
      </div>
    </div>
  );
}
