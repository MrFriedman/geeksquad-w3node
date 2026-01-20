"use client";

import { Bell } from "lucide-react";

// Sample data - will be replaced with contract hooks
const alerts = [
  {
    title: "New art nearby",
    desc: "Digital Ancestors is 1.2 km from you",
    time: "2h ago",
  },
  {
    title: "Price drop",
    desc: "Heritage Hoodie is now 0.08 ETH",
    time: "5h ago",
  },
  {
    title: "Artist update",
    desc: "Karabo Mokoena added a voice note",
    time: "1d ago",
  },
];

export default function AlertsPage() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Activity</h2>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div
            key={`alert-${i}`}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 texture-fabric"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {alert.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {alert.desc}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {alert.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
