import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHighlight } from "@/lib/dashboard-config";

interface RoleHighlightsProps {
  title: string;
  description: string;
  highlights: DashboardHighlight[];
}

export function RoleHighlights({ title, description, highlights }: RoleHighlightsProps) {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{item.label}</p>
              <span className="text-sm font-semibold text-primary">{item.value}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
