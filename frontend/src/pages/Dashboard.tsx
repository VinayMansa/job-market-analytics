import { useEffect, useState } from "react";
import { getStats } from "../api/stats";
import type { Stats } from "../types";
import StatBlock from "../components/StatBlock";
import RemoteBreakdownChart from "../components/charts/RemoteBreakdownChart";
import TopLocationsChart from "../components/charts/TopLocationsChart";

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStats().then(setStats).catch(() => setError("Could not load stats"));
  }, []);

  if (error) return <p className="p-8 text-amber">{error}</p>;
  if (!stats) return <p className="p-8 text-muted">Loading market data...</p>;

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <header className="mb-10">
        <h1 className="text-xl font-medium">Job market analytics</h1>
        <p className="text-sm text-muted mt-1">Live figures from ingested postings</p>
      </header>

      <div className="flex mb-12 pb-8 border-b border-hairline">
        <StatBlock label="tracked postings" value={stats.total_jobs.toLocaleString()} />
        <div className="pl-8">
          <StatBlock
            label="avg salary range"
            value={
              stats.avg_salary_min && stats.avg_salary_max
                ? `$${Math.round(stats.avg_salary_min / 1000)}k–$${Math.round(stats.avg_salary_max / 1000)}k`
                : "—"
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="border border-hairline rounded p-5">
          <h2 className="text-sm font-medium mb-4">Work arrangement</h2>
          <RemoteBreakdownChart breakdown={stats.remote_breakdown} />
        </section>
        <section className="border border-hairline rounded p-5">
          <h2 className="text-sm font-medium mb-4">Top locations</h2>
          <TopLocationsChart locations={stats.top_locations} />
        </section>
      </div>
    </div>
  );
}