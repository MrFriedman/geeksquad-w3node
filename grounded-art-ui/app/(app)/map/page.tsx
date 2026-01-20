"use client";

import { useState, Suspense } from "react";
import { MapView } from "@/components/grounded-art/map-view";
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

export default function MapPage() {
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
      <div className="h-[calc(100vh-72px-96px)] px-4 py-4">
        <MapView
          artLocations={artLocations}
          onSelectArt={handleSelectArt}
          selectedArtId={selectedArtId}
        />
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
