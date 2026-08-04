import Link from "next/link";
import { Building2, ChevronRight, Sparkles } from "lucide-react";

import { getNavigationForRole } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  role: string;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const items = getNavigationForRole(role);

  return (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-card/70 p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Building2 className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">Job Portal</p>
          <p className="text-sm text-muted-foreground">Role workspace</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background/80 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Sparkles className="size-4 text-primary" />
          <span>Dashboard access</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Everything you need for applications, hiring, or administration is here.
        </p>
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex h-10 items-center justify-start gap-2 rounded-2xl px-3 text-left text-sm transition-colors hover:bg-muted"
          >
            <item.icon className="size-4" />
            <span>{item.title}</span>
            <ChevronRight className="ml-auto size-4 opacity-60" />
          </Link>
        ))}
      </nav>

      <div className={cn("mt-auto rounded-2xl border border-border bg-background/70 p-4 text-sm") }>
        <p className="font-medium">Role-aware shell</p>
        <p className="mt-1 text-muted-foreground">
          The layout adapts to candidate, recruiter, and admin needs with consistent structure.
        </p>
      </div>
    </aside>
  );
}
