import { NavLink } from "react-router-dom";
import { LayoutDashboard, Video, Map, BarChart3, Bell, Waves, TrendingUp, Route as RouteIcon } from "lucide-react";

const navItems = [
  { to: "/", label: "Command Center", icon: LayoutDashboard },
  { to: "/monitoring", label: "Live Monitoring", icon: Video },
  { to: "/venue-map", label: "Venue Map", icon: Map },
  { to: "/analytics", label: "Zone Analytics", icon: BarChart3 },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/forecast", label: "Congestion Forecast", icon: TrendingUp },
  { to: "/recommendations", label: "Recommended Actions", icon: RouteIcon },
];

export default function Sidebar() {
  return (
    <aside className="w-[240px] shrink-0 h-screen sticky top-0 bg-panel border-r border-border flex flex-col">
      <div className="h-14 flex items-center gap-2 px-4 border-b border-border">
        <Waves size={18} className="text-risk-info" strokeWidth={2} />
        <span className="font-semibold text-sm tracking-tight">CrowdPulse</span>
      </div>

      <nav className="flex-1 py-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-2 mb-0.5 px-3 py-2 rounded-sm text-sm transition-colors ${
                isActive
                  ? "bg-panel2 text-text border border-border"
                  : "text-text-muted hover:text-text hover:bg-panel2 border border-transparent"
              }`
            }
          >
            <Icon size={16} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border text-2xs text-text-faint font-mono">
        v0.1.0 — Part 1 build
      </div>
    </aside>
  );
}
