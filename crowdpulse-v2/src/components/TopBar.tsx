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
    <header className="h-14 border-b border-border bg-panel flex items-center justify-between px-5 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Riverside Music Festival — Main Grounds</span>
        <span className="flex items-center gap-1.5 text-2xs font-mono uppercase tracking-wider text-risk-high border border-risk-high/40 bg-risk-high/10 px-1.5 py-0.5 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-risk-high animate-pulse-dot" />
          Live
        </span>
      </div>

      <div className="flex items-center gap-5">
        <span className="font-mono text-sm text-text-muted tabular-nums">{time}</span>

        <span className="flex items-center gap-1.5 text-2xs text-risk-low">
          <Wifi size={14} strokeWidth={1.75} />
          Connected
        </span>

        <button className="relative text-text-muted hover:text-text transition-colors">
          <Bell size={17} strokeWidth={1.75} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-risk-high text-[9px] font-mono flex items-center justify-center text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 text-text-muted">
          <CircleUserRound size={20} strokeWidth={1.5} />
          <span className="text-sm">Ops Team</span>
        </div>
      </div>
    </header>
  );
}
