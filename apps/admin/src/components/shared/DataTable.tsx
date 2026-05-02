import { useState, useEffect, type ReactNode } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../ui/table";
import { Pagination } from "../ui/pagination";
import { usePagination } from "../../hooks/usePagination";
import { useSearch } from "../../hooks/useSearch";
import { Loader2, Search, X } from "lucide-react";

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
  searchField?: (row: T) => string;
  searchPlaceholder?: string;
}

export function DataTable<T>({
  data, columns, isLoading, isError, errorMessage,
  pageSize = 20, rowKey,
  searchField, searchPlaceholder = "Search…",
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);

  const {
    query, setQuery, debouncedQuery, filtered, isFiltering,
  } = useSearch(data, searchField ?? (() => ""));

  // Reset to page 1 whenever the search query settles
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  // Use filtered data when a searchField is provided, otherwise use raw data
  const displayData = searchField ? filtered : data;

  const { paginated, state } = usePagination(displayData, page, pageSize);

  return (
    <div className="space-y-3">
      {searchField && (
        <div className="relative flex items-center">
          <Search
            size={14}
            className="absolute left-3 text-muted-foreground pointer-events-none"
          />
          <input
            id="users-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            autoComplete="off"
            spellCheck={false}
            className={[
              "w-full sm:w-72 h-9 pl-8 pr-8 text-sm rounded-md",
              "bg-zinc-900 border border-border text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-1 focus:ring-ring",
              "transition-colors",
            ].join(" ")}
          />
          {isFiltering && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={13} />
            </button>
          )}
          {isFiltering && !isLoading && (
            <span className="ml-3 text-xs text-muted-foreground whitespace-nowrap">
              {filtered?.length ?? 0} result{filtered?.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

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
                    {isFiltering
                      ? `No users match "${debouncedQuery}".`
                      : "No records found."}
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
    </div>
  );
}
