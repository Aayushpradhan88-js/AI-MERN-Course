import {
  BarChart3,
  Compass,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const roleNavigation: Record<string, NavigationItem[]> = {
  candidate: [
    { title: "Overview", href: "/candidate", icon: LayoutDashboard },
    { title: "Applications", href: "/candidate", icon: Compass },
    { title: "Resume", href: "/candidate", icon: Sparkles },
    { title: "Profile", href: "/candidate", icon: Users },
  ],
  recruiter: [
    { title: "Overview", href: "/recuriter", icon: LayoutDashboard },
    { title: "Jobs", href: "/recuriter", icon: BarChart3 },
    { title: "Applicants", href: "/recuriter", icon: Users },
    { title: "Profile", href: "/recuriter", icon: ShieldCheck },
  ],
  admin: [
    { title: "Overview", href: "/admin", icon: LayoutDashboard },
    { title: "Users", href: "/admin", icon: Users },
    { title: "Applicants", href: "/admin", icon: BarChart3 },
    { title: "Restrictions", href: "/admin", icon: ShieldCheck },
  ],
};

export function getNavigationForRole(role: string) {
  return roleNavigation[role] ?? roleNavigation.candidate;
}
