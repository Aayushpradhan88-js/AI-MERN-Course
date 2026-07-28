export default function Hero() {
  return (
    <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-black leading-tight">
        Discover jobs that match your skills, not resume
      </h1>
      <p className="mt-4 text-gray-500 text-sm md:text-base">
        We match you with roles based on what you can actually do — skip the
        keyword games and apply to work you're genuinely a fit for.
      </p>

      <form className="mt-8 flex items-center gap-2 rounded-full border border-gray-200 shadow-sm p-2 max-w-lg mx-auto">
        <input type="text" placeholder="Search jobs" className="flex-1 px-4 py-2 text-sm outline-none bg-transparent" />
        <div className="w-px h-6 bg-gray-200" />
        <input type="text" placeholder="Location" className="flex-1 px-4 py-2 text-sm outline-none bg-transparent" />
        <button type="submit" aria-label="Search" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </form>
    </section>
  );
}