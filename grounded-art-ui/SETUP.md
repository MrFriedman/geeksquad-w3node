# Grounded Art - Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set Up Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Get a WalletConnect Project ID from https://cloud.walletconnect.com/
   - Add your contract address (when deployed)

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## What's Been Implemented

### ✅ Completed Features

1. **Modular Route Structure**
   - `/` - Landing page with mission statement
   - `/explore` - Art discovery feed
   - `/map` - Interactive map view
   - `/shop` - Marketplace
   - `/alerts` - Activity feed
   - `/profile` - User profile
   - `/onboarding` - Identity choice (Collector vs Creator)

2. **Custom Design System**
   - Copper (#D97706), Ochre, Deep Indigo palette
   - Tactile texture utilities (clay, wood, fabric, earth)
   - Updated CSS variables in `globals.css`

3. **Web3 Integration**
   - RainbowKit setup with custom theme
   - Wagmi + Viem configuration
   - Support for Polygon Mumbai & Scroll Sepolia
   - Identity Choice screen component

4. **Geofencing**
   - `useGeofence` hook with proximity checking
   - Mock location toggle for demos
   - 50-meter radius verification
   - Integration in ArtDetailSheet

5. **Image Encryption Pipeline**
   - Image hashing utilities
   - AES-GCM encryption/decryption
   - Geofence-based key derivation
   - Unlock flow scaffolding

6. **Contract Hooks**
   - `useArtworkContract` for reading artwork data
   - `useAllArtworks` for fetching all artworks
   - ERC-721 compatible interface

## Next Steps

### 1. Install Web3 Dependencies

The package.json has been updated, but you need to install:

```bash
npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```

### 2. Deploy Smart Contract

Deploy your `ArtworkRegistry.sol` contract to Polygon Mumbai or Scroll Sepolia.

Required interface:
```solidity
function getArtworkData(uint256 tokenId) external view returns (
  string memory title,
  string memory artist,
  string memory description,
  int256 latitude,  // Stored as int with 6 decimals (e.g., -26204100 for -26.2041)
  int256 longitude,
  string memory location,
  string memory imageHash,
  bool isUnlocked
);
```

### 3. Update Contract Address

Add your deployed contract address to `.env.local`:
```
NEXT_PUBLIC_ARTWORK_REGISTRY_ADDRESS=0xYourContractAddress
```

### 4. Replace Sample Data

Update the following files to use contract hooks instead of hardcoded data:
- `app/(app)/map/page.tsx`
- `app/(app)/explore/page.tsx`
- `app/(app)/shop/page.tsx`

Example:
```typescript
// Replace hardcoded artLocations with:
const { artworkData, isLoading } = useArtworkContract({ tokenId: 1 });
```

### 5. Implement Image Storage

Set up IPFS or another storage solution for encrypted images:
- Upload encrypted images
- Store hash on-chain
- Implement `unlockImage` in `lib/image-hash.ts`

### 6. Add Voice Notes

Implement voice note storage and playback:
- Upload to IPFS or storage
- Store hash in contract metadata
- Update `VoiceNotePlayer` component

### 7. Dual Language Support

Add language switching:
- Create translation files
- Add language toggle in settings
- Update components to use translations

## File Structure

```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout (Web3 providers)
├── (app)/
│   ├── layout.tsx              # App layout (header, nav)
│   ├── explore/page.tsx
│   ├── map/page.tsx
│   ├── shop/page.tsx
│   ├── alerts/page.tsx
│   ├── profile/page.tsx
│   └── onboarding/page.tsx

components/
├── grounded-art/
│   ├── art-detail-sheet.tsx   # ✅ Geofence integrated
│   ├── map-view.tsx
│   ├── identity-choice.tsx    # ✅ New
│   ├── mock-location-toggle.tsx # ✅ New
│   └── ...
├── providers/
│   └── web3-provider.tsx      # ✅ New

hooks/
├── use-geofence.ts            # ✅ New
└── use-artwork-contract.ts    # ✅ New

lib/
├── web3-config.ts             # ✅ New
└── image-hash.ts              # ✅ New
```

## Environment Variables

Required:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - From WalletConnect Cloud
- `NEXT_PUBLIC_ARTWORK_REGISTRY_ADDRESS` - Your contract address
- `NEXT_PUBLIC_CHAIN_ID` - 80001 (Polygon) or 534351 (Scroll)

## Testing

1. **Test Geofencing**
   - Open an artwork detail sheet
   - Toggle "Mock Location" to simulate proximity
   - Verify content unlocks

2. **Test Web3 Connection**
   - Navigate to `/onboarding`
   - Select Collector or Creator
   - Connect wallet via RainbowKit

3. **Test Navigation**
   - Use bottom nav to switch between routes
   - Verify active state highlights correctly

## Troubleshooting

### RainbowKit not showing
- Check `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
- Verify Web3Provider is in root layout

### Contract reads failing
- Verify contract address is correct
- Check chain ID matches deployment
- Ensure contract has `getArtworkData` function

### Geofence not working
- Check browser permissions for location
- Enable mock location toggle for testing
- Verify coordinates are in correct format

## Design Notes

- All components use Shadcn/UI primitives
- Tactile textures applied via utility classes
- Color palette: Copper, Ochre, Deep Indigo
- Dark theme optimized for African art aesthetic
