import { useState, useEffect, useMemo } from "react";

export function useSearch<T>(
  data: T[] | undefined,
  field: (item: T) => string,
  debounceMs = 300
) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce: only update the effective query after the user stops typing
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query.trim()), debounceMs);
    return () => clearTimeout(id);
  }, [query, debounceMs]);

  const filtered = useMemo(() => {
    if (!data) return undefined;
    if (!debouncedQuery) return data;
    const lower = debouncedQuery.toLowerCase();
    return data.filter((item) =>
      field(item).toLowerCase().includes(lower)
    );
  }, [data, debouncedQuery, field]);

  return {
    query,
    setQuery,
    debouncedQuery,
    filtered,
    isFiltering: debouncedQuery.length > 0,
  };
}
