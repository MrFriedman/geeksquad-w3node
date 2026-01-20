"use client";

import { Map, ShoppingBag, User, Compass, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "explore", icon: Compass, label: "Explore" },
  { id: "map", icon: Map, label: "Map" },
  { id: "shop", icon: ShoppingBag, label: "Shop" },
  { id: "alerts", icon: Bell, label: "Alerts" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-card/95 backdrop-blur-lg border-t border-border z-30">
      <div className="flex items-center justify-around py-2 px-4 pb-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[60px] py-2 px-3 rounded-xl transition-all",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className={cn(
                  "relative p-2 rounded-xl transition-all",
                  isActive && "bg-primary/15"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-all",
                    isActive && "scale-110"
                  )}
                />
                {item.id === "alerts" && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-card" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-all",
                  isActive ? "opacity-100" : "opacity-70"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
