import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-gray-100">
      <Link href="/" className="text-lg font-bold">
        Job<span className="text-orange-500">Z</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
      </nav>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/login" className="text-gray-700">Login</Link>
        <Link href="/register" className="px-4 py-2 rounded-full bg-black text-white font-medium">
          Register
        </Link>
      </div>
    </header>
  );
}