import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygonMumbai, scrollSepolia } from "wagmi/chains";

// Configure supported chains
// Update these based on your deployment
export const supportedChains = [polygonMumbai, scrollSepolia];

// Get RainbowKit config
export const config = getDefaultConfig({
  appName: "Grounded Art",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: supportedChains,
  ssr: true, // Enable server-side rendering
});
