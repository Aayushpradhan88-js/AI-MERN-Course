import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StateCardProps {
  title: string;
  value: string;
  detail: string;
  trend: string;
  icon: React.ElementType;
  className?: string;
}

export function StateCard({ title, value, detail, trend, icon: Icon, className }: StateCardProps) {
  return (
    <Card className={cn("border-border/70", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-xl bg-primary/10 p-2 text-primary">
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
          <ArrowUpRight className="size-4" />
          <span>{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}
