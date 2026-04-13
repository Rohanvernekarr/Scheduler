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
        "block p-6 bg-white border border-black rounded-[24px] transition-all duration-200",
        href && "hover:bg-slate-50",
        className
      )}
    >
      {title && (
        <h3 className="text-xl font-bold text-black mb-4 tracking-tight">
          {title}
        </h3>
      )}
      <div className="text-black/70">
        {children}
      </div>
    </Component>

  );
};
