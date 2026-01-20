"use client";

import { useReadContract, useAccount } from "wagmi";
import { useState, useEffect } from "react";

// ArtworkRegistry ABI - ERC-721 compatible
const ARTWORK_REGISTRY_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "getArtworkData",
    outputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "artist", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "int256", name: "latitude", type: "int256" },
      { internalType: "int256", name: "longitude", type: "int256" },
      { internalType: "string", name: "location", type: "string" },
      { internalType: "string", name: "imageHash", type: "string" },
      { internalType: "bool", name: "isUnlocked", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Contract address - Update with your deployed contract address
// For Polygon Mumbai testnet or Scroll zkEVM testnet
const ARTWORK_REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_ARTWORK_REGISTRY_ADDRESS || 
  "0x0000000000000000000000000000000000000000";

// Chain configuration - Update based on your deployment
const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "80001"); // Polygon Mumbai default

interface ArtworkData {
  title: string;
  artist: string;
  description: string;
  latitude: number;
  longitude: number;
  location: string;
  imageHash: string;
  isUnlocked: boolean;
}

interface UseArtworkContractOptions {
  tokenId?: number;
  enabled?: boolean;
}

/**
 * Hook to read artwork data from ArtworkRegistry contract
 */
export function useArtworkContract(options: UseArtworkContractOptions = {}) {
  const { tokenId, enabled = true } = options;
  const { address } = useAccount();

  const [artworkData, setArtworkData] = useState<ArtworkData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read artwork data from contract
  const { data: contractData, isLoading: isReading } = useReadContract({
    address: ARTWORK_REGISTRY_ADDRESS as `0x${string}`,
    abi: ARTWORK_REGISTRY_ABI,
    functionName: "getArtworkData",
    args: tokenId !== undefined ? [BigInt(tokenId)] : undefined,
    query: {
      enabled: enabled && tokenId !== undefined,
    },
    chainId: CHAIN_ID,
  });

  // Parse contract data
  useEffect(() => {
    if (contractData && Array.isArray(contractData)) {
      try {
        const [
          title,
          artist,
          description,
          latitude,
          longitude,
          location,
          imageHash,
          isUnlocked,
        ] = contractData;

        setArtworkData({
          title: String(title),
          artist: String(artist),
          description: String(description),
          latitude: Number(latitude) / 1e6, // Assuming stored as int with 6 decimals
          longitude: Number(longitude) / 1e6,
          location: String(location),
          imageHash: String(imageHash),
          isUnlocked: Boolean(isUnlocked),
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to parse artwork data");
      }
    }
  }, [contractData]);

  useEffect(() => {
    setIsLoading(isReading);
  }, [isReading]);

  return {
    artworkData,
    isLoading,
    error,
    contractAddress: ARTWORK_REGISTRY_ADDRESS,
    chainId: CHAIN_ID,
  };
}

/**
 * Hook to fetch all artworks (requires totalSupply and tokenURI)
 */
export function useAllArtworks() {
  const { address } = useAccount();
  const [artworkIds, setArtworkIds] = useState<number[]>([]);
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get total supply
  const { data: totalSupply } = useReadContract({
    address: ARTWORK_REGISTRY_ADDRESS as `0x${string}`,
    abi: ARTWORK_REGISTRY_ABI,
    functionName: "totalSupply",
    chainId: CHAIN_ID,
  });

  // Fetch all artwork IDs
  useEffect(() => {
    if (totalSupply !== undefined) {
      const count = Number(totalSupply);
      setArtworkIds(Array.from({ length: count }, (_, i) => i + 1));
    }
  }, [totalSupply]);

  // This would need to be expanded to fetch each artwork
  // For now, return the structure
  return {
    artworkIds,
    artworks,
    isLoading,
    error,
    totalSupply: totalSupply ? Number(totalSupply) : 0,
  };
}
