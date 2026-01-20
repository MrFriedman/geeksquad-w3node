"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnectModal } from "@rainbow-me/rainbowkit";
import { IdentityChoice } from "@/components/grounded-art/identity-choice";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();
  const [identity, setIdentity] = useState<"collector" | "creator" | null>(
    null
  );

  // Check if user is already connected
  useEffect(() => {
    if (isConnected && identity) {
      // Store identity in localStorage
      localStorage.setItem("grounded-art-identity", identity);
      // Redirect to appropriate page
      router.push(identity === "creator" ? "/profile" : "/explore");
    }
  }, [isConnected, identity, router]);

  const handleIdentitySelect = async (selectedIdentity: "collector" | "creator") => {
    setIdentity(selectedIdentity);
    
    // If not connected, open wallet connection
    if (!isConnected && openConnectModal) {
      openConnectModal();
    } else if (isConnected) {
      // Store identity and redirect
      localStorage.setItem("grounded-art-identity", selectedIdentity);
      router.push(selectedIdentity === "creator" ? "/profile" : "/explore");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!identity ? (
        <IdentityChoice onSelect={handleIdentitySelect} />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Connecting your wallet...
            </h2>
            <p className="text-muted-foreground">
              Please complete the connection in the modal
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
