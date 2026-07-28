import { testimonials } from "../lib/dummy-data";

export default function Testimonials() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="py-14 bg-gray-50 overflow-hidden">
      <h2 className="text-lg font-bold text-center mb-8">What people are saying</h2>

      <div className="marquee-row overflow-hidden">
        <div className="flex gap-5 w-max animate-marquee">
          {loop.map((t, i) => (
            <div key={i} className="w-72 shrink-0 rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-700">"{t.quote}"</p>
              <div className="mt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}