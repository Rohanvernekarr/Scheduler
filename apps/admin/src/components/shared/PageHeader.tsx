interface PageHeaderProps {
  title: string;
  description?: string;
  count?: number;
}

export function PageHeader({ title, description, count }: PageHeaderProps) {
  return (
    <div className="mb-6">
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
  );
}
