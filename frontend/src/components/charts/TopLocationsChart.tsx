import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Stats } from "../../types";

export default function TopLocationsChart({ locations }: { locations: Stats["top_locations"] }) {
  const data = locations.map((l) => ({
    location: l.location.length > 18 ? l.location.slice(0, 18) + "…" : l.location,
    count: l.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D3D1C7" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: "#6B6A63" }} axisLine={{ stroke: "#D3D1C7" }} />
        <YAxis dataKey="location" type="category" tick={{ fontSize: 12, fill: "#6B6A63" }} axisLine={{ stroke: "#D3D1C7" }} width={110} />
        <Tooltip />
        <Bar dataKey="count" fill="#BA7517" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}