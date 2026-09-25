import { FlaskConical } from "lucide-react";

export default function PrototypeBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-2xs font-mono uppercase tracking-wider text-risk-info border border-risk-info/40 bg-risk-info/10 px-2 py-1 rounded-sm">
      <FlaskConical size={12} strokeWidth={2} />
      {label}
    </span>
  );
}
