import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string; search: string } } | null)?.from;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from ? from.pathname + from.search : "/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-65px)] grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-16 border-r border-hairline">
        <p className="font-mono text-sm text-teal mb-4">Welcome back</p>
        <h1 className="text-3xl font-medium leading-tight max-w-sm">
          Pick up where you left off.
        </h1>
        <p className="text-muted mt-4 max-w-sm leading-relaxed">
          Your saved searches, profile, and application tracker are waiting.
        </p>
      </div>

      <div className="flex flex-col justify-center px-8 md:px-16 py-16">
        <div className="max-w-sm w-full mx-auto md:mx-0">
          <h2 className="text-xl font-medium mb-8">Sign in</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-hairline rounded px-4 py-2.5 bg-transparent focus:outline-none focus:border-teal"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-hairline rounded px-4 py-2.5 bg-transparent focus:outline-none focus:border-teal"
                required
              />
            </label>
            {error && <p className="text-sm text-amber">{error}</p>}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={submitting}
              sx={{ mt: 1 }}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="text-sm text-muted mt-6">
            No account? <Link to="/register" className="text-teal">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}