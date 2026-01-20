"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { MarketplaceGrid } from "@/components/grounded-art/marketplace-grid";
import { ArtDetailSheet } from "@/components/grounded-art/art-detail-sheet";
import Loading from "@/app/loading";

// Sample data - will be replaced with contract hooks
const artLocations = [
  {
    id: "1",
    title: "Ubuntu Rising",
    artist: "Karabo Mokoena",
    image: "/images/mural-1.jpg",
    x: 35,
    y: 40,
    type: "mural" as const,
    description:
      "A powerful 12-meter mural celebrating the spirit of Ubuntu and collective humanity. The piece draws inspiration from traditional Ndebele patterns merged with contemporary street art techniques, creating a visual dialogue between ancestral wisdom and modern urban expression. The vibrant colors represent the diverse voices of our community coming together as one.",
    location: "44 Fox Street, Maboneng",
    distance: "0.3 km",
    createdAt: "March 2024",
    likes: 847,
  },
  {
    id: "2",
    title: "Golden Horizon",
    artist: "Thandi Nkosi",
    image: "/images/art-pin-1.jpg",
    x: 65,
    y: 55,
    type: "sculpture" as const,
    description:
      "A bronze sculpture installation exploring themes of migration and hope. The piece stands 3 meters tall and captures the essence of movement and aspiration.",
    location: "Arts on Main, Johannesburg",
    distance: "0.8 km",
    createdAt: "January 2024",
    likes: 523,
  },
  {
    id: "3",
    title: "Digital Ancestors",
    artist: "Sipho Mabena",
    image: "/images/art-pin-2.jpg",
    x: 50,
    y: 25,
    type: "installation" as const,
    description:
      "An immersive digital art installation that bridges traditional African spirituality with cutting-edge technology. LED displays and projection mapping create an otherworldly experience.",
    location: "Keyes Art Mile",
    distance: "1.2 km",
    createdAt: "February 2024",
    likes: 1024,
  },
  {
    id: "4",
    title: "Rhythm & Roots",
    artist: "Amahle Dlamini",
    image: "/images/art-pin-3.jpg",
    x: 20,
    y: 65,
    type: "mural" as const,
    description:
      "A celebration of African music heritage through visual art. This mural incorporates traditional instruments and dance motifs in a dynamic composition.",
    location: "Braamfontein District",
    distance: "0.5 km",
    createdAt: "December 2023",
    likes: 692,
  },
];

const marketplaceItems = [
  {
    id: "m1",
    name: "Heritage Hoodie",
    artist: "Karabo Mokoena",
    price: "0.08 ETH",
    image: "/images/apparel-1.jpg",
    likes: 234,
    isLimited: true,
  },
  {
    id: "m2",
    name: "Roots Tee",
    artist: "Thandi Nkosi",
    price: "0.03 ETH",
    image: "/images/apparel-2.jpg",
    likes: 156,
    isLimited: false,
  },
];

export default function ExplorePage() {
  const [selectedArtId, setSelectedArtId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const selectedArt = artLocations.find((art) => art.id === selectedArtId);

  const handleSelectArt = (id: string) => {
    setSelectedArtId(id);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedArtId(null), 300);
  };

  return (
    <>
      <div className="px-4 py-6 space-y-6">
        {/* Featured section */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Featured This Week
          </h2>
          <div
            className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group texture-earth"
            onClick={() => handleSelectArt("1")}
            onKeyDown={(e) => e.key === "Enter" && handleSelectArt("1")}
            tabIndex={0}
            role="button"
          >
            <Image
              src="/images/mural-1.jpg"
              alt="Ubuntu Rising"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="px-2.5 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full mb-2 inline-block">
                Featured
              </span>
              <h3 className="text-xl font-bold text-foreground">
                Ubuntu Rising
              </h3>
              <p className="text-sm text-muted-foreground">
                by Karabo Mokoena • 0.3 km away
              </p>
            </div>
          </div>
        </section>

        {/* Nearby art */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Nearby Art</h2>
            <button
              type="button"
              className="text-sm text-primary font-medium"
            >
              See All
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {artLocations.slice(1).map((art) => (
              <div
                key={art.id}
                className="flex-shrink-0 w-[160px] cursor-pointer group"
                onClick={() => handleSelectArt(art.id)}
                onKeyDown={(e) => e.key === "Enter" && handleSelectArt(art.id)}
                tabIndex={0}
                role="button"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                  <Image
                    src={art.image || "/placeholder.svg"}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {art.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {art.distance}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Marketplace preview */}
        <MarketplaceGrid items={marketplaceItems.slice(0, 2)} />
      </div>

      <Suspense fallback={<Loading />}>
        <ArtDetailSheet
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
          art={selectedArt || null}
        />
      </Suspense>
    </>
  );
}
