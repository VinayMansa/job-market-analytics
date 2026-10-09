import { useEffect, useState } from "react";
import { getProfile, saveProfile } from "../api/profile";
import type { ProfileInput } from "../types";
import { Button } from "@mui/material";

const EMPTY: ProfileInput = {
  headline: "",
  skills: "",
  experience_level: "",
  preferred_location: "",
  open_to_remote: true,
  desired_salary_min: null,
  desired_salary_max: null,
  resume_text: "",
};

export default function Profile() {
  const [form, setForm] = useState<ProfileInput>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getProfile()
      .then((p) => setForm(p))
      .catch(() => {}) // no profile yet — that's fine, keep the empty form
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof ProfileInput>(key: K, value: ProfileInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await saveProfile(form);
    setSaved(true);
  }

  if (loading) return <p className="p-8 text-muted">Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto px-8 py-10">
      <h1 className="text-xl font-medium mb-2">Your profile</h1>
      <p className="text-sm text-muted mb-8">
        Used to personalize your job feed and, later, match you against listings.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Headline</span>
          <input
            type="text"
            placeholder="e.g. Backend Engineer, 4 years"
            value={form.headline ?? ""}
            onChange={(e) => update("headline", e.target.value)}
            className="border border-hairline rounded px-4 py-2 bg-transparent"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Skills</span>
          <input
            type="text"
            placeholder="Python, React, SQL"
            value={form.skills ?? ""}
            onChange={(e) => update("skills", e.target.value)}
            className="border border-hairline rounded px-4 py-2 bg-transparent"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Experience level</span>
          <select
            value={form.experience_level ?? ""}
            onChange={(e) => update("experience_level", e.target.value)}
            className="border border-hairline rounded px-4 py-2 bg-transparent"
          >
            <option value="">Select...</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Preferred location</span>
          <input
            type="text"
            placeholder="e.g. Berlin, or Remote"
            value={form.preferred_location ?? ""}
            onChange={(e) => update("preferred_location", e.target.value)}
            className="border border-hairline rounded px-4 py-2 bg-transparent"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.open_to_remote}
            onChange={(e) => update("open_to_remote", e.target.checked)}
          />
          <span className="text-sm">Open to remote roles</span>
        </label>

        <div className="flex gap-3">
          <label className="flex flex-col gap-1 flex-1">
            <span className="text-sm font-medium">Desired salary min</span>
            <input
              type="number"
              value={form.desired_salary_min ?? ""}
              onChange={(e) => update("desired_salary_min", e.target.value ? Number(e.target.value) : null)}
              className="border border-hairline rounded px-4 py-2 bg-transparent"
            />
          </label>
          <label className="flex flex-col gap-1 flex-1">
            <span className="text-sm font-medium">Desired salary max</span>
            <input
              type="number"
              value={form.desired_salary_max ?? ""}
              onChange={(e) => update("desired_salary_max", e.target.value ? Number(e.target.value) : null)}
              className="border border-hairline rounded px-4 py-2 bg-transparent"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Resume (paste as text for now)</span>
          <textarea
            rows={6}
            value={form.resume_text ?? ""}
            onChange={(e) => update("resume_text", e.target.value)}
            className="border border-hairline rounded px-4 py-2 bg-transparent"
          />
        </label>

        <Button type="submit" variant="contained" size="large">
  Save profile
</Button>
        {saved && <p className="text-sm text-teal">Profile saved.</p>}
      </form>
    </div>
  );
}