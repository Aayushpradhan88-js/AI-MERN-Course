import { redirect } from "next/navigation";

import { getSession } from "@/shared/auth/session";
import { getDashboardPath } from "@/lib/routes";

export default function DashboardRedirectPage() {
  const session = getSession();

  if (!session?.user?.role) {
    redirect("/login");
  }

  redirect(getDashboardPath(session.user.role));
}
