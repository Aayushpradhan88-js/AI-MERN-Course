type Job = {
  initials: string;
  title: string;
  company: string;
  tags: string[];
  salary: string;
  rating: number;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 shadow-sm p-4 bg-white">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 font-bold flex items-center justify-center shrink-0">
          {job.initials}
        </div>
        <div>
          <h3 className="font-bold text-sm md:text-base">{job.title}</h3>
          <p className="text-xs md:text-sm text-gray-500">
            {job.company} · {job.tags.join(" · ")}
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold">{job.salary}</p>
        <p className="text-xs text-amber-500">★ {job.rating}</p>
        <button className="mt-1 px-4 py-1.5 rounded-full bg-black text-white text-xs font-medium">
          Apply
        </button>
      </div>
    </div>
  );
}