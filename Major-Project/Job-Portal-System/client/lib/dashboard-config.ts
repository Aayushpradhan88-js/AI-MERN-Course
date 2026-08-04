import {
  BadgeCheck,
  BriefcaseBusiness,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardRole = "candidate" | "recruiter" | "admin";

export interface DashboardStat {
  title: string;
  value: string;
  detail: string;
  trend: string;
  icon: LucideIcon;
}

export interface DashboardHighlight {
  label: string;
  value: string;
  description: string;
}

export interface DashboardTableRow {
  label: string;
  meta: string;
  status: string;
  accent: "default" | "secondary" | "destructive" | "outline";
}

export interface DashboardRoleConfig {
  role: DashboardRole;
  name: string;
  heading: string;
  description: string;
  stats: DashboardStat[];
  chartData: Array<{ name: string; value: number }>;
  highlights: DashboardHighlight[];
  tableRows: DashboardTableRow[];
}

const dashboardConfigs: Record<DashboardRole, DashboardRoleConfig> = {
  candidate: {
    role: "candidate",
    name: "Candidate Workspace",
    heading: "Candidate Dashboard",
    description: "Track applications, stay visible to recruiters, and keep your pipeline moving.",
    stats: [
      {
        title: "Applications",
        value: "18",
        detail: "3 active this week",
        trend: "+12%",
        icon: BriefcaseBusiness,
      },
      {
        title: "Profile Strength",
        value: "92%",
        detail: "Ready for outreach",
        trend: "+4%",
        icon: BadgeCheck,
      },
      {
        title: "Interviews",
        value: "4",
        detail: "2 upcoming",
        trend: "+2",
        icon: Sparkles,
      },
      {
        title: "Connections",
        value: "27",
        detail: "New recruiter chats",
        trend: "+8",
        icon: Users,
      },
    ],
    chartData: [
      { name: "Mon", value: 12 },
      { name: "Tue", value: 18 },
      { name: "Wed", value: 16 },
      { name: "Thu", value: 24 },
      { name: "Fri", value: 20 },
      { name: "Sat", value: 28 },
      { name: "Sun", value: 22 },
    ],
    highlights: [
      {
        label: "Resume review",
        value: "Today",
        description: "Refresh your experience section before the recruiter call.",
      },
      {
        label: "Follow-up",
        value: "Tomorrow",
        description: "Send a note to the team that reviewed your latest application.",
      },
      {
        label: "Portfolio",
        value: "Ready",
        description: "Share your latest case study with hiring managers.",
      },
    ],
    tableRows: [
      {
        label: "Senior Product Designer",
        meta: "Northstar Labs • Hybrid",
        status: "Interviewing",
        accent: "default",
      },
      {
        label: "Frontend Engineer",
        meta: "BrightMint • Remote",
        status: "Applied",
        accent: "secondary",
      },
      {
        label: "Operations Lead",
        meta: "Loop Studio • Onsite",
        status: "Needs review",
        accent: "destructive",
      },
    ],
  },
  recruiter: {
    role: "recruiter",
    name: "Recruiter Workspace",
    heading: "Recruiter Dashboard",
    description: "Monitor opportunities, review candidates, and keep hiring moving smoothly.",
    stats: [
      {
        title: "Open roles",
        value: "12",
        detail: "5 are trending",
        trend: "+3",
        icon: BriefcaseBusiness,
      },
      {
        title: "Qualified leads",
        value: "46",
        detail: "New matches overnight",
        trend: "+14%",
        icon: Users,
      },
      {
        title: "Screenings",
        value: "9",
        detail: "3 scheduled today",
        trend: "+2",
        icon: Sparkles,
      },
      {
        title: "Approval rate",
        value: "81%",
        detail: "Healthy pipeline",
        trend: "+5%",
        icon: BadgeCheck,
      },
    ],
    chartData: [
      { name: "Mon", value: 10 },
      { name: "Tue", value: 14 },
      { name: "Wed", value: 17 },
      { name: "Thu", value: 19 },
      { name: "Fri", value: 23 },
      { name: "Sat", value: 16 },
      { name: "Sun", value: 18 },
    ],
    highlights: [
      {
        label: "Shortlist",
        value: "24",
        description: "Review the latest matching candidates before the team sync.",
      },
      {
        label: "Interview slots",
        value: "6",
        description: "Confirm interviewer availability for tomorrow morning.",
      },
      {
        label: "Offer stage",
        value: "3",
        description: "Advance top candidates with a prepared outreach package.",
      },
    ],
    tableRows: [
      {
        label: "Lina Patel",
        meta: "Product Design • 4.5 years",
        status: "Shortlisted",
        accent: "default",
      },
      {
        label: "Owen Hall",
        meta: "Frontend • 6 years",
        status: "Screening",
        accent: "secondary",
      },
      {
        label: "Rina Gomez",
        meta: "Operations • 7 years",
        status: "Needs follow-up",
        accent: "destructive",
      },
    ],
  },
  admin: {
    role: "admin",
    name: "Admin Command Center",
    heading: "Admin Dashboard",
    description: "Review platform health, manage access, and keep every team aligned.",
    stats: [
      {
        title: "Active users",
        value: "1.2k",
        detail: "Daily engagement is strong",
        trend: "+9%",
        icon: LayoutDashboard,
      },
      {
        title: "Moderation queue",
        value: "31",
        detail: "Needs review",
        trend: "+6",
        icon: ShieldCheck,
      },
      {
        title: "Role changes",
        value: "14",
        detail: "Pending approvals",
        trend: "+3",
        icon: Users,
      },
      {
        title: "System health",
        value: "98.7%",
        detail: "Stable platform uptime",
        trend: "+0.3%",
        icon: BadgeCheck,
      },
    ],
    chartData: [
      { name: "Mon", value: 18 },
      { name: "Tue", value: 22 },
      { name: "Wed", value: 19 },
      { name: "Thu", value: 25 },
      { name: "Fri", value: 28 },
      { name: "Sat", value: 24 },
      { name: "Sun", value: 26 },
    ],
    highlights: [
      {
        label: "Access review",
        value: "12",
        description: "Clear pending role changes before the weekly review.",
      },
      {
        label: "Support backlog",
        value: "7",
        description: "Resolve account issues from the last 24 hours.",
      },
      {
        label: "Audit trail",
        value: "Live",
        description: "Keep compliance reports current and export ready.",
      },
    ],
    tableRows: [
      {
        label: "Platform health",
        meta: "Core services • Nominal",
        status: "Stable",
        accent: "default",
      },
      {
        label: "Hiring policy updates",
        meta: "Compliance • Review required",
        status: "Pending",
        accent: "secondary",
      },
      {
        label: "User verification backlog",
        meta: "Trust • 8 items",
        status: "Attention",
        accent: "destructive",
      },
    ],
  },
};

export function getDashboardConfig(role: DashboardRole | string) {
  const normalizedRole = role as DashboardRole;

  return dashboardConfigs[normalizedRole] ?? dashboardConfigs.candidate;
}

export function getDashboardRoleLabel(role: DashboardRole | string) {
  const config = getDashboardConfig(role);

  return config.name;
}
