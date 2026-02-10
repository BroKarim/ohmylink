"use client";

import { BarChart3 } from "lucide-react";

export function AnalyticsTabSoon() {
  return (
    <div className="relative min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="grid grid-cols-4 gap-4 p-4 grayscale blur-[2px]">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl border border-white/10 bg-white/5" />
          ))}
          <div className="col-span-4 h-48 rounded-xl border border-white/10 bg-white/5" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground">Advanced Analytics</h3>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed">We are building a powerful dashboard to help you track clicks, visitors, and growth in real-time.</p>
        </div>

        <div className="mt-2">
          <span className="bg-primary/10 text-primary text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-primary/20 shadow-sm">Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
