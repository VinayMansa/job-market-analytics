import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm ${isActive ? "text-ink font-medium" : "text-muted"} hover:text-ink transition-colors`;

export default function Header() {
  return (
    <header className="border-b border-hairline">
      <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
        <span className="font-mono text-sm">job-market-analytics</span>
        <nav className="flex gap-6">
          <NavLink to="/" className={linkClass} end>Dashboard</NavLink>
          <NavLink to="/jobs" className={linkClass}>Search</NavLink>
        </nav>
      </div>
    </header>
  );
}