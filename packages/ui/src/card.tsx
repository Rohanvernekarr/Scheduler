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
        "block p-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] transition-all duration-300 hover:border-white/10",
        href && "hover:bg-slate-900/60",
        className
      )}
    >
      {title && (
        <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h3>
      )}
      <div className="text-slate-400">
        {children}
      </div>
    </Component>
  );
};
