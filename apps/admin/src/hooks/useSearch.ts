import { useState, useEffect, useMemo, useRef } from "react";

export function useSearch<T>(
  data: T[] | undefined,
  field: (item: T) => string,
  debounceMs = 300,
  onSettle?: () => void
) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Keep a stable ref to onSettle so changing it doesn't retrigger the debounce
  const onSettleRef = useRef(onSettle);
  useEffect(() => { onSettleRef.current = onSettle; });

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query.trim());
      onSettleRef.current?.();
    }, debounceMs);
    return () => clearTimeout(id);
  }, [query, debounceMs]);

  const filtered = useMemo(() => {
    if (!data) return undefined;
    if (!debouncedQuery) return data;
    const lower = debouncedQuery.toLowerCase();
    return data.filter((item) => field(item).toLowerCase().includes(lower));
  }, [data, debouncedQuery, field]);

  return {
    query,
    setQuery,
    debouncedQuery,
    filtered,
    isFiltering: debouncedQuery.length > 0,
  };
}
