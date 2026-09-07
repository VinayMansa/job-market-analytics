import { apiGet } from "./client";
import type { JobListResponse } from "../types";

export type JobFilters = {
  search?: string;
  location?: string;
  remote?: string;
};

export function getJobs(filters: JobFilters = {}): Promise<JobListResponse> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.location) params.set("location", filters.location);
  if (filters.remote) params.set("remote", filters.remote);

  const query = params.toString();
  return apiGet<JobListResponse>(`/api/jobs${query ? `?${query}` : ""}`);
}