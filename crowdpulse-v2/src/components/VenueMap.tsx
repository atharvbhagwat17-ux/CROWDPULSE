import type { Zone } from "../types";
import RiskBadge from "./RiskBadge";

const riskBorder: Record<string, string> = {
  LOW: "border-risk-low/55",
  MEDIUM: "border-risk-medium/60",
  HIGH: "border-risk-high/70",
  CRITICAL: "border-risk-high",
};

const riskGlow: Record<string, string> = {
  LOW: "bg-risk-low/[0.07] shadow-[inset_0_0_0_1px_rgba(63,181,121,0.16),0_6px_18px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_0_0_1px_rgba(63,181,121,0.25),0_10px_24px_rgba(0,0,0,0.25)]",
  MEDIUM: "bg-risk-medium/[0.08] shadow-[inset_0_0_0_1px_rgba(217,164,65,0.17),0_6px_18px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_0_0_1px_rgba(217,164,65,0.27),0_10px_24px_rgba(0,0,0,0.25)]",
  HIGH: "bg-risk-high/[0.09] shadow-[inset_0_0_0_1px_rgba(229,72,77,0.22),0_6px_18px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_0_0_1px_rgba(229,72,77,0.34),0_10px_24px_rgba(0,0,0,0.25)]",
  CRITICAL: "bg-risk-high/[0.13] shadow-[inset_0_0_0_1px_rgba(229,72,77,0.32),0_6px_18px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_0_0_1px_rgba(229,72,77,0.45),0_10px_24px_rgba(0,0,0,0.25)]",
};

export default function VenueMap({
  zones,
  onSelectZone,
  height = 420,
}: {
  zones: Zone[];
  onSelectZone?: (zone: Zone) => void;
  height?: number;
}) {
  return (
    <div
      data-command-light-card
      data-light-tone="info"
      className="command-glass-panel command-light-card relative isolate w-full overflow-hidden rounded-xl border border-risk-info/35"
      style={{ height }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, rgba(76,141,255,0.08), transparent 56%), radial-gradient(ellipse at 0% 100%, rgba(63,181,121,0.04), transparent 42%)",
        }}
      />
      {/* faint grid backdrop to read as a floor plan rather than empty space */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.10]" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E6E9ED" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* directional flow arrows: main corridor feeding into exits */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#62c9e5" opacity="0.8" />
          </marker>
        </defs>
        <line className="command-flow-line" x1="35%" y1="46%" x2="20%" y2="46%" stroke="#73d5eb" strokeWidth="2.25" opacity="0.82" markerEnd="url(#arrow)" />
        <line className="command-flow-line command-flow-line-delayed" x1="65%" y1="46%" x2="80%" y2="46%" stroke="#73d5eb" strokeWidth="2.25" opacity="0.82" markerEnd="url(#arrow)" />
        <line className="command-flow-line" x1="30%" y1="72%" x2="30%" y2="80%" stroke="#73d5eb" strokeWidth="2.25" opacity="0.82" markerEnd="url(#arrow)" />
        <line className="command-flow-line command-flow-line-delayed" x1="70%" y1="72%" x2="70%" y2="80%" stroke="#73d5eb" strokeWidth="2.25" opacity="0.82" markerEnd="url(#arrow)" />
      </svg>

      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() => onSelectZone?.(zone)}
          data-command-light-card
          data-light-tone={zone.risk.toLowerCase()}
          className={`command-zone command-light-card absolute z-[1] flex flex-col justify-between rounded-lg border bg-panel/75 p-2.5 text-left shadow-[inset_0_1px_0_rgba(220,245,255,0.08)] backdrop-blur-md transition-all duration-200 hover:z-10 hover:-translate-y-0.5 hover:bg-panel/90 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-risk-info/70 ${riskBorder[zone.risk]} ${riskGlow[zone.risk]}`}
          style={{
            left: `${zone.position.x * 100}%`,
            top: `${zone.position.y * 100}%`,
            width: `${zone.position.w * 100}%`,
            height: `${zone.position.h * 100}%`,
          }}
        >
          <div className="relative z-[1] flex items-start justify-between gap-1">
            <span className="text-xs font-semibold leading-tight text-text">{zone.name}</span>
            <RiskBadge risk={zone.risk} />
          </div>
          <div className="relative z-[1] font-mono text-2xs text-text-muted">
            Occ. <span className="font-semibold text-text">{zone.occupancy}</span>
            <span className="text-text-muted"> / {zone.capacity}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
