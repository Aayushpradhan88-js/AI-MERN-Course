import { ReactNode } from "react";

interface DashboardContainerProps {
  children: ReactNode;
}

export function DashboardContainer({ children }: DashboardContainerProps) {
  return <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-4 py-6 md:px-6 lg:px-8">{children}</div>;
}
