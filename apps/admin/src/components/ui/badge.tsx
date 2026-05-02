import * as React from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "destructive";

const variantClasses: Record<BadgeVariant, string> = {
  default:     "bg-primary text-primary-foreground",
  secondary:   "bg-secondary text-secondary-foreground border border-border",
  outline:     "border border-border text-foreground",
  success:     "bg-emerald-950 text-emerald-400 border border-emerald-900",
  destructive: "bg-red-950 text-red-400 border border-red-900",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
