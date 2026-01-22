import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygonAmoy, scrollSepolia } from "wagmi/chains";

// Configure supported chains
// Update these based on your deployment
export const supportedChains = [polygonAmoy, scrollSepolia];

// Get RainbowKit config
export const config = getDefaultConfig({
  appName: "Grounded Art",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
    "MISSING_WALLETCONNECT_PROJECT_ID",
  chains: supportedChains,
  ssr: true, // Enable server-side rendering
});
