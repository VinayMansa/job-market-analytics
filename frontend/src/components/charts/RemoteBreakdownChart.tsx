import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Stats } from "../../types";

export default function RemoteBreakdownChart({ breakdown }: { breakdown: Stats["remote_breakdown"] }) {
  const data = [
    { type: "Remote", count: breakdown.remote },
    { type: "Hybrid", count: breakdown.hybrid },
    { type: "Onsite", count: breakdown.onsite },
    { type: "Unknown", count: breakdown.unknown },
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D3D1C7" vertical={false} />
        <XAxis dataKey="type" tick={{ fontSize: 12, fill: "#6B6A63" }} axisLine={{ stroke: "#D3D1C7" }} />
        <YAxis tick={{ fontSize: 12, fill: "#6B6A63" }} axisLine={{ stroke: "#D3D1C7" }} />
        <Tooltip />
        <Bar dataKey="count" fill="#0F6E56" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}