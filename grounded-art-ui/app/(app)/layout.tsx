"use client";

import { BottomNav } from "@/components/grounded-art/bottom-nav";
import { Bell, Menu, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Map pathname to active tab
  const getActiveTab = () => {
    if (pathname === "/explore") return "explore";
    if (pathname === "/map") return "map";
    if (pathname === "/shop") return "shop";
    if (pathname === "/alerts") return "alerts";
    if (pathname === "/profile") return "profile";
    return "map";
  };

  const handleTabChange = (tab: string) => {
    router.push(`/${tab}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-20 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center texture-clay">
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
              onClick={() => router.push("/profile")}
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
        {children}
      </main>

      {/* Bottom navigation */}
      <BottomNav activeTab={getActiveTab()} onTabChange={handleTabChange} />
    </div>
  );
}
