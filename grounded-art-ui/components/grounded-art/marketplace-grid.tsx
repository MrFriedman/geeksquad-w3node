"use client";

import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MarketplaceItem {
  id: string;
  name: string;
  artist: string;
  price: string;
  image: string;
  likes: number;
  isLimited?: boolean;
}

interface MarketplaceGridProps {
  items: MarketplaceItem[];
}

function MarketplaceCard({ item }: { item: MarketplaceItem }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30">
      {/* Image */}
      <div className="relative aspect-square">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Limited badge */}
        {item.isLimited && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
              Limited
            </span>
          </div>
        )}

        {/* Like button */}
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all",
            isLiked
              ? "bg-primary text-primary-foreground"
              : "bg-background/60 text-foreground hover:bg-background/80"
          )}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            type="button"
            className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">by {item.artist}</p>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-bold text-primary">{item.price}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-xs">{isLiked ? item.likes + 1 : item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketplaceGrid({ items }: MarketplaceGridProps) {
  return (
    <div className="px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Digital Apparel</h2>
          <p className="text-sm text-muted-foreground">Artist-designed collectibles</p>
        </div>
        <button
          type="button"
          className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <MarketplaceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
