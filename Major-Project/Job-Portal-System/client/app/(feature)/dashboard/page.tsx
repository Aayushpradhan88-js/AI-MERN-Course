"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, getSession } from "@/shared/auth/session";
import { logout } from "@/shared/auth/api";
import type { AuthSession } from "@/shared/auth/types";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const activeSession = getSession();
    if (!activeSession) router.replace("/login");
    else setSession(activeSession);
  }, [router]);

  async function handleLogout() {
    try { await logout(); } catch { /* Local logout still succeeds if the API is unavailable. */ }
    clearSession();
    router.replace("/login");
  }

  if (!session) return null;

  return <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center p-6"><section className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"><p className="text-sm text-gray-500">{session.user.role}</p><h1 className="mt-2 text-3xl font-bold">Welcome{session.user.name ? `, ${session.user.name}` : ""}</h1><p className="mt-2 text-gray-600">{session.user.email}</p><button onClick={handleLogout} className="mt-8 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white">Logout</button></section></main>;
}
