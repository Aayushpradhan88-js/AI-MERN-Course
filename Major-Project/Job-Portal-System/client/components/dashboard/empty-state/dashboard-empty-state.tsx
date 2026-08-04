import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
}

export function DashboardEmptyState({ title, description, actionLabel }: DashboardEmptyStateProps) {
  return (
    <Card className="border-dashed border-border/80">
      <CardContent className="flex flex-col items-start gap-3 p-8">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {actionLabel ? <Button>{actionLabel}</Button> : null}
      </CardContent>
    </Card>
  );
}
