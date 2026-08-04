"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("min-h-screen bg-background", className)}
    >
      {children}
    </motion.div>
  );
}
