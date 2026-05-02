interface SectionHeadProps {
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  count?: number;
}

export function SectionHead({ icon: Icon, title, count }: SectionHeadProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={14} className="text-muted-foreground" />
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {count !== undefined && (
        <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
