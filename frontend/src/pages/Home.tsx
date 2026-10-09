import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroPreview from "../components/HeroPreview";
import Footer from "../components/Layout/Footer";
import { Button, Chip } from "@mui/material";

const MARKETS = [
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "IT", name: "Italy" },
  { code: "PL", name: "Poland" },
  { code: "AT", name: "Austria" },
];

const ROLES = [
  "Software engineer",
  "Data analyst",
  "Product manager",
  "Backend engineer",
  "Machine learning",
  "DevOps",
];

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const FEATURES = [
  {
    title: "Real postings, one search",
    body: "Listings from across Europe in a single feed. Filter by title, company, location and work arrangement.",
    icon: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  },
  {
    title: "A market you can read",
    body: "Salary ranges, remote share and the busiest hiring locations, so you know where the leverage is.",
    icon: "M4 20V10M10 20V4M16 20v-8M2 20h20",
  },
  {
    title: "A feed built around you",
    body: "Set your skills, level and salary expectations once. Your profile shapes what you see.",
    icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  },
  {
    title: "Every application, tracked",
    body: "Move roles from saved to applied to interviewing to offer. No more spreadsheet archaeology.",
    icon: "M3 4h18v16H3zM9 4v16M15 4v16",
  },
];

const PROOF = [
  { value: "7", label: "European markets covered" },
  { value: "Live", label: "Postings pulled from source" },
  { value: "1", label: "Profile drives your whole feed" },
  { value: "5", label: "Tracker stages, saved to offer" },
];

const BARS = [
  { code: "GB", pct: 100 },
  { code: "DE", pct: 78 },
  { code: "FR", pct: 61 },
  { code: "NL", pct: 52 },
  { code: "IT", pct: 34 },
  { code: "PL", pct: 29 },
  { code: "AT", pct: 18 },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function goSearch(term: string) {
    navigate(`/jobs?search=${encodeURIComponent(term)}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    goSearch(query.trim());
  }

  return (
    <div>
      {/* Hero */}
      <section className="dot-grid border-b border-hairline">
        <div className="max-w-5xl mx-auto px-8 pt-16 pb-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="font-mono text-sm text-teal mb-4">European tech job market</p>
            <h1 className="text-4xl md:text-5xl font-medium leading-[1.1]">
              Find the role. Read the market. Track the hunt.
            </h1>
            <p className="text-lg text-muted mt-5 leading-relaxed">
              Search real postings across seven European markets, see where hiring is
              actually happening, and keep every application in one pipeline.
            </p>
            <form
          onSubmit={handleSubmit}
  className="mt-8 flex items-center border border-ink rounded-full bg-paper pl-6 pr-1.5 py-1.5"
>
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Job title or company"
    className="flex-1 bg-transparent py-2 focus:outline-none"
  />
  <Button type="submit" variant="contained" size="large">
    Search
  </Button>
</form>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted mr-1 py-1">Popular:</span>
              {ROLES.slice(0, 4).map((r) => (
  <Chip key={r} label={r} variant="outlined" clickable onClick={() => goSearch(r)} />
))}
            </div>
          </div>

          <HeroPreview />
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-b border-hairline">
        <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {PROOF.map((p) => (
            <div key={p.label}>
              <span className="font-mono text-3xl text-teal">{p.value}</span>
              <p className="text-sm text-muted mt-1">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <h2 className="text-2xl font-medium max-w-md">Everything between "looking" and "hired".</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-12">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-lg bg-mint text-midnight flex items-center justify-center">
                <Icon d={f.icon} />
              </span>
              <div>
                <h3 className="font-medium">{f.title}</h3>
                <p className="text-sm text-muted mt-1 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dark market band */}
      <section className="bg-midnight text-paper">
        <div className="max-w-5xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="font-mono text-sm text-mint mb-3">Market intelligence</p>
            <h2 className="text-3xl font-medium leading-tight">
              Know where the openings are before you apply.
            </h2>
            <p className="text-mint/80 mt-4 leading-relaxed">
              The dashboard turns raw postings into salary ranges, remote share and
              hiring hotspots, refreshed as new listings come in.
            </p>
            <Button
  component={Link}
  to="/register"
  variant="contained"
  size="large"
  sx={{ mt: 4, bgcolor: "#F6F8F7", color: "#0A3D31", "&:hover": { bgcolor: "#D6EBE2" } }}
>
  Explore the dashboard
</Button>
          </div>

          <div className="border border-white/15 rounded-lg p-6">
            <p className="text-sm text-mint/80 mb-5">Postings by market</p>
            <div className="flex flex-col gap-3">
              {BARS.map((b) => (
                <div key={b.code} className="flex items-center gap-3">
                  <span className="font-mono text-xs w-6 text-mint/80">{b.code}</span>
                  <div className="flex-1 h-2.5 rounded bg-white/10">
                    <div className="h-2.5 rounded bg-mint" style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-mint/60 mt-5">Illustrative preview</p>
          </div>
        </div>
      </section>

      {/* Browse */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <h2 className="text-2xl font-medium">Start your job search</h2>
        <p className="text-muted mt-2">Jump straight into a role, or see the markets we cover.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-medium text-muted mb-4">Browse by role</h3>
            <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => (
  <Chip
    key={r}
    label={r}
    variant="outlined"
    clickable
    onClick={() => goSearch(r)}
    sx={{ fontSize: 14, height: 36 }}
  />
))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted mb-4">Markets covered</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {MARKETS.map((m) => (
                <div key={m.code} className="flex items-center gap-3 border-b border-hairline pb-2">
                  <span className="font-mono text-xs text-teal w-6">{m.code}</span>
                  <span className="text-sm">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-midnight text-paper">
        <div className="max-w-5xl mx-auto px-8 py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl font-medium">Start with your profile.</h2>
            <p className="text-mint/80 mt-2">Free to use. Takes about two minutes.</p>
          </div>
          <Button
  component={Link}
  to="/register"
  variant="contained"
  size="large"
  sx={{ bgcolor: "#F6F8F7", color: "#0A3D31", "&:hover": { bgcolor: "#D6EBE2" } }}
>
  Create your account
</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}