"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface MockLocationToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  className?: string;
}

export function MockLocationToggle({
  enabled,
  onToggle,
  className,
}: MockLocationToggleProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-card border border-border rounded-xl p-4",
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
        <MapPin className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <Label htmlFor="mock-location" className="text-sm font-semibold">
          Mock Location
        </Label>
        <p className="text-xs text-muted-foreground">
          Enable to simulate being near artwork for demo purposes
        </p>
      </div>
      <Switch
        id="mock-location"
        checked={enabled}
        onCheckedChange={onToggle}
      />
    </div>
  );
}
