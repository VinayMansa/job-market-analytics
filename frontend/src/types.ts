export type Job = {
    id: number;
    title: string;
    company: string | null;
    location: string | null;
    salary_min: number | null;
    salary_max: number | null;
    remote: string | null;
    source: string;
    url: string | null;
    posted_at: string | null;
  };
  
  export type JobListResponse = {
    count: number;
    results: Job[];
  };
  
  export type Stats = {
    total_jobs: number;
    avg_salary_min: number | null;
    avg_salary_max: number | null;
    remote_breakdown: { remote: number; hybrid: number; onsite: number; unknown: number };
    top_locations: { location: string; count: number }[];
  };