import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import { Button } from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(email, password);
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-65px)] grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-16 border-r border-hairline">
        <p className="font-mono text-sm text-teal mb-4">Get started</p>
        <h1 className="text-3xl font-medium leading-tight max-w-sm">
          Two minutes, then your feed is yours.
        </h1>
        <p className="text-muted mt-4 max-w-sm leading-relaxed">
          Set up a profile once — skills, level, location — and every search
          and match after that reflects it.
        </p>
      </div>

      <div className="flex flex-col justify-center px-8 md:px-16 py-16">
        <div className="max-w-sm w-full mx-auto md:mx-0">
          <h2 className="text-xl font-medium mb-8">Create account</h2>
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
                minLength={8}
              />
              <span className="text-xs text-muted mt-0.5">At least 8 characters</span>
            </label>
            {error && <p className="text-sm text-amber">{error}</p>}
            <Button type="submit" variant="contained" size="large" fullWidth disabled={submitting} sx={{ mt: 1 }}>
  {submitting ? "Creating account..." : "Create account"}
</Button>
          </form>
          <p className="text-sm text-muted mt-6">
            Already have an account? <Link to="/login" className="text-teal">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}