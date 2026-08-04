export const dashboardRoutes = {
  candidate: [
    { label: "Overview", href: "/candidate" },
    { label: "Applications", href: "/candidate" },
    { label: "Resume", href: "/candidate" },
    { label: "Profile", href: "/candidate" },
  ],
  recruiter: [
    { label: "Overview", href: "/recuriter" },
    { label: "Jobs", href: "/recuriter" },
    { label: "Applicants", href: "/recuriter" },
    { label: "Profile", href: "/recuriter" },
  ],
  admin: [
    { label: "Overview", href: "/admin" },
    { label: "Users", href: "/admin" },
    { label: "Applicants", href: "/admin" },
    { label: "Restrictions", href: "/admin" },
  ],
} as const;

const dashboardPathMap = {
  candidate: "/candidate",
  recruiter: "/recuriter",
  admin: "/admin",
} as const;

export function getDashboardRouteLinks(role: keyof typeof dashboardRoutes) {
  return dashboardRoutes[role] ?? dashboardRoutes.candidate;
}

export function getDashboardPath(role?: string) {
  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === "candidate") return dashboardPathMap.candidate;
  if (normalizedRole === "recruiter" || normalizedRole === "recuriter") return dashboardPathMap.recruiter;
  if (normalizedRole === "admin") return dashboardPathMap.admin;

  return dashboardPathMap.candidate;
}
