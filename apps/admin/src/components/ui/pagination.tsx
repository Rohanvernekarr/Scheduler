import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import type { PaginationState } from "../../hooks/usePagination";

interface PaginationProps {
  state: PaginationState;
  onPageChange: (page: number) => void;
}

export function Pagination({ state, onPageChange }: PaginationProps) {
  const { page, totalPages, totalItems, startIndex, endIndex, canPrev, canNext } = state;

  if (totalItems === 0) return null;

  const pages: number[] = [];
  const delta = 2;
  const left = Math.max(1, page - delta);
  const right = Math.min(totalPages, page + delta);
  for (let i = left; i <= right; i++) pages.push(i);

  return (
    <div className="flex items-center justify-between px-1 py-3 border-t border-border">
      <p className="text-xs text-muted-foreground">
        {startIndex + 1}–{endIndex} of {totalItems}
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" onClick={() => onPageChange(page - 1)} disabled={!canPrev}>
          <ChevronLeft size={14} />
        </Button>
        {left > 1 && (
          <>
            <Button variant="ghost" size="icon" onClick={() => onPageChange(1)} className="text-xs">1</Button>
            {left > 2 && <span className="text-muted-foreground text-xs px-1">…</span>}
          </>
        )}
        {pages.map(p => (
          <Button
            key={p} size="icon" variant={p === page ? "default" : "ghost"}
            onClick={() => onPageChange(p)} className="text-xs"
          >
            {p}
          </Button>
        ))}
        {right < totalPages && (
          <>
            {right < totalPages - 1 && <span className="text-muted-foreground text-xs px-1">…</span>}
            <Button variant="ghost" size="icon" onClick={() => onPageChange(totalPages)} className="text-xs">{totalPages}</Button>
          </>
        )}
        <Button variant="outline" size="icon" onClick={() => onPageChange(page + 1)} disabled={!canNext}>
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
