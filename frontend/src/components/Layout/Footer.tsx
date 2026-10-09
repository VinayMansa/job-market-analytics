import { Link } from "react-router-dom";
import { BRAND } from "../../brand";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
        <p className="font-bold text-lg tracking-tight">{BRAND.name}</p>
          <p className="text-sm text-hairline/70 mt-3 max-w-xs leading-relaxed">
            Search European tech roles, read the market, and track every application in one place.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-hairline/60 text-xs uppercase tracking-wide mb-1">Product</span>
          <Link to="/jobs" className="hover:underline">Search jobs</Link>
          <Link to="/dashboard" className="hover:underline">Market dashboard</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-hairline/60 text-xs uppercase tracking-wide mb-1">Account</span>
          <Link to="/login" className="hover:underline">Log in</Link>
          <Link to="/register" className="hover:underline">Create account</Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-8 py-5 text-xs text-hairline/60">
          Job data via Adzuna. Built as a portfolio project.
        </div>
      </div>
    </footer>
  );
}