import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import type { Prediction } from "../types";

export default function ForecastChart({ prediction }: { prediction: Prediction }) {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={prediction.timeline} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#232832" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#7C8592", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: "#232832" }} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: "#7C8592", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} width={28} />
          <ReferenceLine y={65} stroke="#E5484D" strokeDasharray="3 3" strokeOpacity={0.4} />
          <Tooltip
            contentStyle={{ background: "#171B22", border: "1px solid #232832", borderRadius: 2, fontSize: 12 }}
            labelStyle={{ color: "#E6E9ED" }}
            formatter={(value: number) => [`${value}`, "Risk score"]}
          />
          <Line type="monotone" dataKey="riskScore" stroke="#4C8DFF" strokeWidth={2} dot={{ r: 3, fill: "#4C8DFF" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
