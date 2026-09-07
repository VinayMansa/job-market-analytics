import { apiGet } from "./client";
import type { Stats } from "../types";

export function getStats(): Promise<Stats> {
  return apiGet<Stats>("/api/stats");
}