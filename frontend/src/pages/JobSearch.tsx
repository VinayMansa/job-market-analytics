import { useEffect, useState } from "react";
import { getJobs } from "../api/jobs";
import type { Job } from "../types";

export default function JobSearch() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getJobs({ search }).then((res) => setJobs(res.results));
  }, [search]);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <h1 className="text-xl font-medium mb-6">Search postings</h1>
      <input
        type="text"
        placeholder="Search by title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-hairline rounded px-4 py-2 mb-8 bg-transparent"
      />
      <ul className="flex flex-col gap-3">
        {jobs.map((job) => (
          <li key={job.id} className="border border-hairline rounded p-4">
            <p className="font-medium">{job.title} — {job.company}</p>
            <p className="text-sm text-muted">{job.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}