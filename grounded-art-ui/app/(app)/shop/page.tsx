"use client";

import { MarketplaceGrid } from "@/components/grounded-art/marketplace-grid";

// Sample data - will be replaced with contract hooks
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

export default function ShopPage() {
  return (
    <div className="py-6">
      <MarketplaceGrid items={marketplaceItems} />
    </div>
  );
}
