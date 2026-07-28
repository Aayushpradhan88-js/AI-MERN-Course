import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout heading="Welcome back!" subheading="Login to get started">
      <form className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black"
        />

        <button
          type="submit"
          className="bg-black text-white rounded-lg py-3 text-sm font-medium mt-2"
        >
          Login
        </button>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <Link href="/register">Create an account</Link>
          <Link href="#">Forgot password?</Link>
        </div>
      </form>
    </AuthLayout>
  );
}