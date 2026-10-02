import { useEffect, useState } from "react";
import { Wifi, Bell, CircleUserRound } from "lucide-react";

export default function TopBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-4 border-b border-border bg-panel/95 px-4 shadow-[0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm sm:px-5 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="truncate text-sm font-semibold text-text"> Music Festival — Main Grounds</span>
        <span className="flex shrink-0 items-center gap-2 rounded-sm border border-risk-ai/35 bg-risk-ai/10 px-2 py-1 text-2xs font-mono font-semibold uppercase tracking-wider text-risk-ai">
          <span className="h-2 w-2 rounded-full bg-risk-ai animate-pulse-dot" />
          LIVE
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-5">
        <span className="font-mono text-xs text-text-muted tabular-nums sm:text-sm">{time}</span>

        <span className="flex items-center gap-1.5 rounded-sm border border-risk-low/25 bg-risk-low/5 px-2 py-1 text-2xs font-medium text-risk-low">
          <Wifi size={14} strokeWidth={1.75} />
          Connected
        </span>

        <button aria-label="Notifications" className="relative rounded-md p-2 text-text-muted transition-colors hover:bg-panel2 hover:text-text">
          <Bell size={17} strokeWidth={1.75} />
          <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-panel bg-risk-high text-[9px] font-mono text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 text-text-muted">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-panel2 text-risk-ai">
            <CircleUserRound size={18} strokeWidth={1.5} />
          </span>
          <span className="hidden text-sm font-medium text-text-muted sm:inline">Ops Team</span>
        </div>
      </div>
    </header>
  );
}
