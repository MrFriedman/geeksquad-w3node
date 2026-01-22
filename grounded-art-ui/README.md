# Grounded Art

A decentralized, location-based platform for African artists to register real-world art (murals, etc.) as encrypted on-chain assets. The app uses blockchain "quietly" to provide IP protection and ethical income for creators.

## Mission

**"Art tethered to the Earth, owned by the Soul"**

Grounded Art connects African artists with collectors through location-based, blockchain-protected artworks. Every piece tells a story, every story is anchored in place.

## Features

- 🗺️ **Location-Based Discovery**: Find art near you on an interactive map
- 🔒 **IP Protection**: Every artwork is registered on-chain as an ERC-721 NFT
- 📍 **Geofencing**: Unlock full artwork lore and high-resolution images only when within 50 meters
- 🎨 **Tactile Design**: African-inspired palette (Copper, Ochre, Deep Indigo) with texture utilities
- 💰 **Ethical Income**: Direct payments to artists, no intermediaries
- 🎤 **Voice Notes**: Artists can add voice notes to their artwork
- 🌍 **Dual Language**: Support for local languages + English

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with custom tactile textures
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **Web3**: RainbowKit + Wagmi + Viem
- **Blockchain**: Polygon Amoy / Scroll Sepolia (testnet)

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Set up environment variables:

Copy `.env.example` to `.env.local` and fill in values:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_ARTWORK_REGISTRY_ADDRESS=your_contract_address
NEXT_PUBLIC_CHAIN_ID=80002  # Polygon Amoy or 534351 for Scroll Sepolia
```

3. Get a WalletConnect Project ID:

- Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
- Create a new project
- Copy your Project ID to `.env.local`

4. Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
grounded-art-ui/
├── app/
│   ├── (app)/              # App routes (protected)
│   │   ├── explore/        # Explore page
│   │   ├── map/            # Map view
│   │   ├── shop/           # Marketplace
│   │   ├── alerts/         # Activity feed
│   │   ├── profile/        # User profile
│   │   ├── onboarding/     # Identity choice screen
│   │   └── layout.tsx      # App layout with header/nav
│   ├── page.tsx            # Landing page
│   └── layout.tsx          # Root layout with Web3 providers
├── components/
│   ├── grounded-art/       # App-specific components
│   │   ├── art-detail-sheet.tsx
│   │   ├── map-view.tsx
│   │   ├── identity-choice.tsx
│   │   └── ...
│   ├── providers/          # Context providers
│   │   └── web3-provider.tsx
│   └── ui/                 # Shadcn/UI components
├── hooks/
│   ├── use-geofence.ts     # Geofencing logic
│   └── use-artwork-contract.ts  # Contract reading hooks
└── lib/
    ├── web3-config.ts      # Wagmi/RainbowKit config
    └── image-hash.ts       # Image encryption utilities
```

## Key Features Implementation

### Geofencing

The `useGeofence` hook handles proximity checking:

```typescript
import { useGeofence } from "@/hooks/use-geofence";

const {
  isWithinRange,
  distance,
  toggleMockLocation,
  checkGeofence,
} = useGeofence({
  targetLat: -26.2041,
  targetLng: 28.0473,
  radiusMeters: 50,
  enableMockLocation: true, // For demo
});
```

### Contract Integration

Read artwork data from the ArtworkRegistry contract:

```typescript
import { useArtworkContract } from "@/hooks/use-artwork-contract";

const { artworkData, isLoading, error } = useArtworkContract({
  tokenId: 1,
  enabled: true,
});
```

### Image Encryption

High-resolution images are encrypted and only unlocked after geofence verification:

```typescript
import { unlockImage, verifyGeofence } from "@/lib/image-hash";

// Verify geofence
const proof = await verifyGeofence(artworkId, userLat, userLng);

// Unlock image
const imageUrl = await unlockImage(imageHash, artworkId, userAddress, proof);
```

## Design System

### Colors

- **Primary (Copper)**: `#D97706` - Warm, tactile, earthy
- **Accent (Ochre)**: Golden earth tone
- **Indigo**: Deep spiritual blue
- **Background**: Deep charcoal

### Textures

Apply tactile textures using utility classes:

- `.texture-clay` - Clay-like surface
- `.texture-wood` - Wood grain
- `.texture-fabric` - Fabric weave
- `.texture-earth` - Earthy gradient

## Smart Contract

The app expects an `ArtworkRegistry` contract (ERC-721 compatible) with the following interface:

```solidity
function getArtworkData(uint256 tokenId) external view returns (
  string memory title,
  string memory artist,
  string memory description,
  int256 latitude,
  int256 longitude,
  string memory location,
  string memory imageHash,
  bool isUnlocked
);
```

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Custom Domain

Update `next.config.mjs` if needed for custom domains.

## Contributing

This is a private project. For questions or contributions, please contact the maintainers.

## License

Proprietary - All rights reserved
