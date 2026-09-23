import type { Zone } from "../types";
import RiskBadge from "./RiskBadge";

const riskBorder: Record<string, string> = {
  LOW: "border-risk-low/50",
  MEDIUM: "border-risk-medium/50",
  HIGH: "border-risk-high/60",
  CRITICAL: "border-risk-high",
};

const riskGlow: Record<string, string> = {
  LOW: "shadow-[inset_0_0_0_1px_rgba(63,181,121,0.15)]",
  MEDIUM: "shadow-[inset_0_0_0_1px_rgba(217,164,65,0.15)]",
  HIGH: "shadow-[inset_0_0_0_1px_rgba(229,72,77,0.2)]",
  CRITICAL: "shadow-[inset_0_0_0_1px_rgba(229,72,77,0.3)]",
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
      className="relative w-full bg-panel2 border border-border rounded-sm overflow-hidden"
      style={{ height }}
    >
      {/* faint grid backdrop to read as a floor plan rather than empty space */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E6E9ED" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* directional flow arrows: main corridor feeding into exits */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#4C8DFF" opacity="0.55" />
          </marker>
        </defs>
        <line x1="35%" y1="46%" x2="20%" y2="46%" stroke="#4C8DFF" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrow)" />
        <line x1="65%" y1="46%" x2="80%" y2="46%" stroke="#4C8DFF" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrow)" />
        <line x1="30%" y1="72%" x2="30%" y2="80%" stroke="#4C8DFF" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrow)" />
        <line x1="70%" y1="72%" x2="70%" y2="80%" stroke="#4C8DFF" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrow)" />
      </svg>

      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() => onSelectZone?.(zone)}
          className={`absolute flex flex-col justify-between p-2.5 rounded-sm border bg-panel/90 backdrop-blur-[1px] text-left transition-colors hover:bg-panel2 ${riskBorder[zone.risk]} ${riskGlow[zone.risk]}`}
          style={{
            left: `${zone.position.x * 100}%`,
            top: `${zone.position.y * 100}%`,
            width: `${zone.position.w * 100}%`,
            height: `${zone.position.h * 100}%`,
          }}
        >
          <div className="flex items-start justify-between gap-1">
            <span className="text-xs font-medium leading-tight">{zone.name}</span>
            <RiskBadge risk={zone.risk} />
          </div>
          <div className="font-mono text-2xs text-text-muted">
            Occ. <span className="text-text">{zone.occupancy}</span>
            <span className="text-text-faint"> / {zone.capacity}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
