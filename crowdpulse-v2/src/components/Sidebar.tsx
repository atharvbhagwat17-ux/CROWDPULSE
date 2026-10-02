import { NavLink } from "react-router-dom";
import { LayoutDashboard, Video, Map, BarChart3, Bell, Waves, TrendingUp, Route as RouteIcon, FlaskConical } from "lucide-react";

const navItems = [
  { to: "/", label: "Command Center", icon: LayoutDashboard },
  { to: "/monitoring", label: "Live Monitoring", icon: Video },
  { to: "/venue-map", label: "Venue Map", icon: Map },
  { to: "/analytics", label: "Zone Analytics", icon: BarChart3 },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/forecast", label: "Congestion Forecast", icon: TrendingUp },
  { to: "/recommendations", label: "Recommended Actions", icon: RouteIcon },
  { to: "/what-if", label: "What-If Simulation", icon: FlaskConical },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-border bg-panel">
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-risk-ai/25 bg-risk-ai/10 text-risk-ai">
          <Waves size={18} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold leading-tight tracking-tight">
            Crowd<span className="text-risk-ai">Pulse</span>
          </div>
          <div className="mt-1 text-[9px] font-mono uppercase leading-none tracking-[0.14em] text-text-faint">
            Crowd Intelligence
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `group mx-1 flex min-h-10 items-center gap-3 rounded-md border px-3 text-[13px] font-medium transition-colors duration-150 ${
                isActive
                  ? "border-risk-info/30 bg-risk-info/10 text-risk-ai shadow-[inset_2px_0_0_#54a9f5]"
                  : "border-transparent text-text-muted hover:border-border/70 hover:bg-panel2/80 hover:text-text"
              }`
            }
          >
            <Icon size={17} className="shrink-0 text-current opacity-80 transition-opacity duration-150 group-hover:opacity-100" strokeWidth={1.75} />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border px-4 py-3 font-mono text-2xs text-text-faint">
        v0.1.0 — Part 1 build
      </div>
    </aside>
  );
}
