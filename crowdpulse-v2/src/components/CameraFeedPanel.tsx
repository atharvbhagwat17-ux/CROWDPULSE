import { VideoOff, Video } from "lucide-react";
import type { Camera, Zone } from "../types";
import RiskBadge from "./RiskBadge";
import PrototypeBadge from "./PrototypeBadge";

export default function CameraFeedPanel({ camera, zone }: { camera: Camera; zone?: Zone }) {
  return (
    <div className="relative w-full aspect-video bg-panel2 border border-border rounded-sm overflow-hidden flex items-center justify-center">
      {/* faint scanline texture so the placeholder reads as "camera", not empty space */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #E6E9ED 0px, transparent 1px, transparent 3px)" }}
      />

      <div className="flex flex-col items-center gap-2 text-text-faint">
        {camera.status === "ONLINE" ? <Video size={28} strokeWidth={1.25} /> : <VideoOff size={28} strokeWidth={1.25} />}
        <span className="text-2xs font-mono uppercase tracking-wider">Live Camera Feed</span>
      </div>

      {/* top overlay bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-3 py-2 bg-gradient-to-b from-base/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">{camera.name}</span>
          <span
            className={`text-2xs font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm border ${
              camera.status === "ONLINE"
                ? "border-risk-low/40 text-risk-low bg-risk-low/10"
                : "border-text-faint/40 text-text-faint bg-panel"
            }`}
          >
            {camera.status}
          </span>
        </div>
        <PrototypeBadge label="Simulated Feed" />
      </div>

      {/* bottom overlay bar */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-base/80 to-transparent font-mono text-2xs text-text-muted">
        <span>{camera.fps} FPS</span>
        <span>
          People: <span className="text-text">{camera.peopleDetected}</span>
        </span>
        <span>{zone?.name ?? "—"}</span>
        <RiskBadge risk={camera.risk} />
      </div>
    </div>
  );
}
