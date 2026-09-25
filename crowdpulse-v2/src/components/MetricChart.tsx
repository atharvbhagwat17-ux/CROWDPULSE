import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { CrowdMetricPoint } from "../types";

interface Series {
  dataKey: keyof CrowdMetricPoint;
  name: string;
  color: string;
}

export default function MetricChart({
  data,
  series,
  height = 160,
}: {
  data: CrowdMetricPoint[];
  series: Series[];
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#232832" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: "#7C8592", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: "#232832" }} tickLine={false} />
          <YAxis tick={{ fill: "#7C8592", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} width={30} />
          <Tooltip
            contentStyle={{ background: "#171B22", border: "1px solid #232832", borderRadius: 2, fontSize: 12 }}
            labelStyle={{ color: "#E6E9ED" }}
          />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 11, color: "#7C8592" }} />}
          {series.map((s) => (
            <Line key={s.dataKey} type="monotone" dataKey={s.dataKey} name={s.name} stroke={s.color} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
