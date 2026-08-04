import { DashboardBreadcrumb } from "@/components/dashboard/layout/dashboard-breadcrumb";
import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container";
import { DashboardShell } from "@/components/dashboard/layout/dashboard-shell";
import { DashboardNavbar } from "@/components/dashboard/navbar/dashboard-navbar";
import { DashboardSidebar } from "@/components/dashboard/sidebar/dashboard-sidebar";
import { StateCard } from "@/components/dashboard/cards/state-card";
import { DashboardChartCard } from "@/components/dashboard/charts/dashboard-chart-card";
import { DashboardTable } from "@/components/dashboard/tables/dashboard-table";
import { RoleHighlights } from "@/components/dashboard/widgets/role-highlights";
import { getDashboardConfig } from "@/lib/dashboard-config";

export default function RecruiterDashboardPage() {
  const config = getDashboardConfig("recruiter");

  return (
    <DashboardShell>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar role="recruiter" />
        <div className="flex min-h-screen flex-1 flex-col">
          <DashboardNavbar title={config.heading} description={config.description} />
          <DashboardContainer>
            <DashboardBreadcrumb items={[{ label: "Home" }, { label: "Recruiter" }, { label: "Overview" }]} />
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold">{config.heading}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{config.description}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {config.stats.map((stat) => (
                <StateCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  detail={stat.detail}
                  trend={stat.trend}
                  icon={stat.icon}
                />
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <DashboardChartCard title="Pipeline health" description="Your hiring funnel looks active and balanced." data={config.chartData} />
              <RoleHighlights title="Priority review" description="Actions to help the next batch of candidates move forward." highlights={config.highlights} />
            </div>

            <div className="mt-6">
              <DashboardTable title="Candidate queue" description="Recent profiles that need attention." rows={config.tableRows} />
            </div>
          </DashboardContainer>
        </div>
      </div>
    </DashboardShell>
  );
}
