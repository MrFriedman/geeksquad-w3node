"use client";

export default function ProfilePage() {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-4 texture-clay" />
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
              className="w-full bg-card border border-border rounded-xl p-4 text-left font-medium text-foreground hover:bg-secondary transition-colors texture-wood"
            >
              {item}
            </button>
          )
        )}
      </div>
    </div>
  );
}
