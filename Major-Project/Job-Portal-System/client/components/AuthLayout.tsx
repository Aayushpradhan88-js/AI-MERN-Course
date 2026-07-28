export default function AuthLayout({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
        {/* left panel */}
        <div className="hidden md:flex flex-col items-center justify-center gap-6 bg-gray-900 p-10">
          <div className="w-40 h-40 rounded-3xl bg-orange-500/10 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-orange-500" />
          </div>
          <p className="text-white text-sm text-center max-w-[220px]">
            Discover jobs that match your skills, not resume.
          </p>
        </div>

        {/* right panel */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <p className="text-lg font-bold mb-8">
            Job<span className="text-orange-500">Z</span>
          </p>

          <h1 className="text-2xl font-black">{heading}</h1>
          <p className="text-sm text-gray-500 mt-1 mb-6">{subheading}</p>

          {children}

          <div className="flex justify-center gap-4 mt-8 text-xs text-gray-400">
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}