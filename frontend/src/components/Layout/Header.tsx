import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { BRAND } from "../../brand";

function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="#0F6E56" />
      <circle cx="14" cy="14" r="6" fill="none" stroke="#D6EBE2" strokeWidth="2" />
      <circle cx="14" cy="14" r="1.8" fill="#D6EBE2" />
      <path d="M14 14 L21 7" stroke="#D6EBE2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
    isActive ? "bg-mint text-midnight" : "text-muted hover:text-ink hover:bg-black/5"
  }`;

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  function handleLogout() {
    setAnchor(null);
    logout();
    navigate("/");
  }

  const initial = (user?.full_name || user?.email || "?").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur border-b border-hairline">
      <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-bold text-lg tracking-tight">{BRAND.name}</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-1">
              <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
              <NavLink to="/jobs" className={navClass}>Search</NavLink>
              <NavLink to="/profile" className={navClass}>Profile</NavLink>
            </nav>

            <button
              onClick={(e) => setAnchor(e.currentTarget)}
              aria-label="Account menu"
              className="ml-3 rounded-full"
            >
              <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 14, fontWeight: 600 }}>
                {initial}
              </Avatar>
            </button>

            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <div className="px-4 py-2">
                <Typography variant="caption" color="text.secondary">Signed in as</Typography>
                <Typography variant="body2" component="span" sx={{ fontWeight: 600 }}>{user.email}</Typography>
              </div>
              <Divider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button component={Link} to="/login" color="inherit">
              Log in
            </Button>
            <Button component={Link} to="/register" variant="contained">
              Get started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}