import * as React from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "default" | "ghost" | "outline" | "destructive";
type ButtonSize    = "sm" | "md" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  default:     "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost:       "hover:bg-accent hover:text-accent-foreground",
  outline:     "border border-border hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:   "h-8 px-3 text-xs rounded",
  md:   "h-9 px-4 text-sm rounded-md",
  icon: "h-8 w-8 rounded",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-medium transition-colors",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
