import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthLayout heading="Create account" subheading="Register to get started">
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
          placeholder="Create a password"
          className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black"
        />
        <select
          name="role"
          defaultValue=""
          className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black text-gray-600"
        >
          <option value="" disabled>Select role</option>
          <option value="CANDIDATE">Candidate</option>
          <option value="RECRUITER">Recruiter</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white rounded-lg py-3 text-sm font-medium mt-2"
        >
          Register
        </button>

        <p className="text-xs text-gray-500 text-center mt-1">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-medium">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}