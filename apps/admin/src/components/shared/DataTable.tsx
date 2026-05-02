import { useState, type ReactNode } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../ui/table";
import { Pagination } from "../ui/pagination";
import { usePagination } from "../../hooks/usePagination";
import { Loader2 } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  className?: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  data?: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  pageSize?: number;
  rowKey: (row: T) => string;
}

export function DataTable<T>({
  data, columns, isLoading, isError, errorMessage,
  pageSize = 20, rowKey,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const { paginated, state } = usePagination(data, page, pageSize);

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-zinc-900 hover:bg-zinc-900">
              {columns.map(col => (
                <TableHead
                  key={col.key}
                  className={`text-xs font-semibold text-muted-foreground uppercase tracking-wider h-11 ${col.className ?? ""}`}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Loading…</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-destructive text-sm">
                  {errorMessage ?? "Failed to load data."}
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground text-sm">
                  No records found.
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && paginated.map(row => (
              <TableRow key={rowKey(row)} className="border-border hover:bg-zinc-900/60 transition-colors">
                {columns.map(col => (
                  <TableCell key={col.key} className={`py-3 text-sm ${col.className ?? ""}`}>
                    {col.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination state={state} onPageChange={setPage} />
    </div>
  );
}
