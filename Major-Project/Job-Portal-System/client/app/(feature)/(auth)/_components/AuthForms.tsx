"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { login, register } from "@/shared/auth/api";
import { saveSession } from "@/shared/auth/session";

function ErrorMessage({ message }: { message: string }) {
  return message ? <p className="text-sm text-red-600">{message}</p> : null;
}

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");
    try {
      await register({ email: String(form.get("email")), password: String(form.get("password")), role: form.get("role") as "CANDIDATE" | "RECRUITER" });
      router.push("/login");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to register.");
    } finally {
      setSubmitting(false);
    }
  }

  return <AuthLayout heading="Create account" subheading="Register to get started"><form onSubmit={submit} className="flex flex-col gap-4"><input required type="email" name="email" placeholder="Enter your email" className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black" /><input required minLength={8} type="password" name="password" placeholder="Create a password" className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black" /><select required name="role" defaultValue="" className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black text-gray-600"><option value="" disabled>Select role</option><option value="CANDIDATE">Candidate</option><option value="RECRUITER">Recruiter</option></select><ErrorMessage message={error} /><button disabled={submitting} type="submit" className="bg-black text-white rounded-lg py-3 text-sm font-medium mt-2 disabled:opacity-60">{submitting ? "Registering..." : "Register"}</button><p className="text-xs text-gray-500 text-center mt-1">Already have an account? <Link href="/login" className="text-black font-medium">Login</Link></p></form></AuthLayout>;
}

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");
    try {
      saveSession(await login({ email: String(form.get("email")), password: String(form.get("password")) }));
      router.replace("/dashboard");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to log in.");
    } finally {
      setSubmitting(false);
    }
  }

  return <AuthLayout heading="Welcome back!" subheading="Login to get started"><form onSubmit={submit} className="flex flex-col gap-4"><input required type="email" name="email" placeholder="Enter your email" className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black" /><input required type="password" name="password" placeholder="Enter your password" className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black" /><ErrorMessage message={error} /><button disabled={submitting} type="submit" className="bg-black text-white rounded-lg py-3 text-sm font-medium mt-2 disabled:opacity-60">{submitting ? "Logging in..." : "Login"}</button><div className="flex justify-between text-xs text-gray-500 mt-1"><Link href="/register">Create an account</Link><Link href="#">Forgot password?</Link></div></form></AuthLayout>;
}

//sifjpoawer
