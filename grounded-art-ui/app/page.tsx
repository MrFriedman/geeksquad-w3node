"use client";

import { useState, Suspense } from "react";
import { MapView } from "@/components/grounded-art/map-view";
import { ArtDetailSheet } from "@/components/grounded-art/art-detail-sheet";
import { MarketplaceGrid } from "@/components/grounded-art/marketplace-grid";
import { BottomNav } from "@/components/grounded-art/bottom-nav";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import Loading from "./loading";

// Sample data
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
  {
    id: "m3",
    name: "Ubuntu Cap",
    artist: "Sipho Mabena",
    price: "0.025 ETH",
    image: "/images/apparel-3.jpg",
    likes: 89,
    isLimited: true,
  },
  {
    id: "m4",
    name: "Ancestral Joggers",
    artist: "Amahle Dlamini",
    price: "0.06 ETH",
    image: "/images/apparel-4.jpg",
    likes: 178,
    isLimited: false,
  },
];

export default function GroundedArtApp() {
  const [activeTab, setActiveTab] = useState("map");
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-20 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-primary-foreground"
                aria-hidden="true"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                Grounded Art
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">
                Discover • Collect • Connect
              </p>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="relative w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary/50"
              aria-label="Profile"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-[72px] pb-24">
        {activeTab === "map" && (
          <div className="h-[calc(100vh-72px-96px)]">
            <MapView
              artLocations={artLocations}
              onSelectArt={handleSelectArt}
              selectedArtId={selectedArtId}
            />
          </div>
        )}

        {activeTab === "explore" && (
          <div className="px-4 py-6 space-y-6">
            {/* Featured section */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Featured This Week
              </h2>
              <div
                className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group"
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
        )}

        {activeTab === "shop" && (
          <div className="py-6">
            <MarketplaceGrid items={marketplaceItems} />
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="px-4 py-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Activity</h2>
            <div className="space-y-3">
              {[
                {
                  title: "New art nearby",
                  desc: "Digital Ancestors is 1.2 km from you",
                  time: "2h ago",
                },
                {
                  title: "Price drop",
                  desc: "Heritage Hoodie is now 0.08 ETH",
                  time: "5h ago",
                },
                {
                  title: "Artist update",
                  desc: "Karabo Mokoena added a voice note",
                  time: "1d ago",
                },
              ].map((alert, i) => (
                <div
                  key={`alert-${i}`}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {alert.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {alert.desc}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {alert.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="px-4 py-6">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-4" />
              <h2 className="text-xl font-bold text-foreground">Art Explorer</h2>
              <p className="text-sm text-muted-foreground">
                0x7a2c...9f3e
              </p>
              <div className="flex items-center gap-6 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Collected</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">48</p>
                  <p className="text-xs text-muted-foreground">Visited</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-xs text-muted-foreground">Liked</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {["My Collection", "Saved Locations", "Transaction History", "Settings"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className="w-full bg-card border border-border rounded-xl p-4 text-left font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </main>

      {/* Art detail sheet */}
      <Suspense fallback={<Loading />}>
        <ArtDetailSheet
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
          art={selectedArt || null}
        />
      </Suspense>

      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
