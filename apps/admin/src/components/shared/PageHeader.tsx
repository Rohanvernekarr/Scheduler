import { RotateCw } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  count?: number;
  onRefresh?: () => void;
  isRefetching?: boolean;
}

export function PageHeader({ title, description, count, onRefresh, isRefetching }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
          {count !== undefined && (
            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={isRefetching}
          title="Reload data"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <RotateCw size={13} className={isRefetching ? "animate-spin" : ""} />
          {isRefetching ? "Reloading…" : "Reload"}
        </button>
      )}
    </div>
  );
}
