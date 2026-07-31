import type { AuthSession, UserRole } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

async function request<T>(path: string, body: Record<string, string>) {
  
  const response = await fetch(`${API_URL}/auth${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json()) as T & { message?: string };

  if (!response.ok) throw new Error(payload.message ?? "Something went wrong.");
  return payload;
}

export function register(input: { email: string; password: string; role: Exclude<UserRole, "ADMIN"> }) {
  return request<{ user: { id: string; email: string; role: UserRole } }>("/register", input);
}

export function login(input: { email: string; password: string }) {
  return request<AuthSession>("/login", input);
}

export function logout() {
  return request<{ message: string }>("/logout", {});
}
