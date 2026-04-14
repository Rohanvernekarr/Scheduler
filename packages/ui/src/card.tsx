import type { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  href?: string;
}

export const Card = ({ children, className, title, href }: CardProps) => {
  const Component = href ? "a" : "div";

  return (
    <Component
      href={href}
      className={cn(
        "block p-6 bg-[#111111] border border-white/[0.06] rounded-2xl transition-all duration-200",
        href && "hover:bg-white/5 hover:border-white/10",
        className
      )}
    >
      {title && (
        <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h3>
      )}
      <div className="text-white/70">
        {children}
      </div>
    </Component>
  );
};
