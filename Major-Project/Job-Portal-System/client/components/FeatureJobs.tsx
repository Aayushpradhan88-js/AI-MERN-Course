import JobCard from "./JobCard";
import { jobs } from "../lib/dummy-data";

export default function FeaturedJobs() {
  return (
    <section className="px-6 md:px-12 py-10 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold mb-5">Featured jobs</h2>
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}