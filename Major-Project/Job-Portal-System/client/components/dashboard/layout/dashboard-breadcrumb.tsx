import { ChevronRight } from "lucide-react";

interface DashboardBreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
}

export function DashboardBreadcrumb({ items }: DashboardBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 ? <ChevronRight className="size-4" /> : null}
          <span className={index === items.length - 1 ? "font-medium text-foreground" : ""}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}
