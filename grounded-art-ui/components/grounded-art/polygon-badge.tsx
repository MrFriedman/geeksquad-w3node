"use client";

import { CheckCircle2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PolygonBadgeProps {
  tokenId?: string;
  contractAddress?: string;
  className?: string;
}

export function PolygonBadge({
  tokenId = "#4821",
  contractAddress = "0x7a2c...9f3e",
  className,
}: PolygonBadgeProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-[#8247E5]/20 to-[#8247E5]/5 border border-[#8247E5]/30 rounded-xl p-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Polygon logo */}
        <div className="w-10 h-10 rounded-lg bg-[#8247E5]/20 flex items-center justify-center">
          <svg
            viewBox="0 0 38 33"
            fill="none"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              d="M28.8 12.3L19.8 6.5C19.3 6.2 18.7 6.2 18.2 6.5L9.2 12.3C8.7 12.6 8.4 13.2 8.4 13.8V25.3C8.4 25.9 8.7 26.5 9.2 26.8L18.2 32.6C18.7 32.9 19.3 32.9 19.8 32.6L28.8 26.8C29.3 26.5 29.6 25.9 29.6 25.3V13.8C29.6 13.2 29.3 12.6 28.8 12.3Z"
              fill="#8247E5"
            />
            <path
              d="M24.5 16.7L19.5 13.5C19.2 13.3 18.8 13.3 18.5 13.5L13.5 16.7C13.2 16.9 13 17.2 13 17.6V24C13 24.4 13.2 24.7 13.5 24.9L18.5 28.1C18.8 28.3 19.2 28.3 19.5 28.1L24.5 24.9C24.8 24.7 25 24.4 25 24V17.6C25 17.2 24.8 16.9 24.5 16.7Z"
              fill="#fff"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Verified on Polygon</span>
            <CheckCircle2 className="w-4 h-4 text-[#8247E5]" />
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground font-mono">Token {tokenId}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground font-mono truncate">
              {contractAddress}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-[#8247E5]/20 flex items-center justify-center text-[#8247E5] hover:bg-[#8247E5]/30 transition-colors"
          aria-label="View on Polygon"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
