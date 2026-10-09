import { apiGet } from "./client";
import type { Profile, ProfileInput } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export function getProfile(): Promise<Profile> {
  return apiGet<Profile>("/api/profile");
}

export async function saveProfile(data: ProfileInput): Promise<Profile> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save profile");
  return res.json();
}