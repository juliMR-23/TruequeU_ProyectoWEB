import { useState } from "react";
import type { Listing } from "../types";

interface Filters {
  search: string;
  status: string;
  condition: string;
}

const INITIAL_FILTERS: Filters = {
  search: "",
  status: "",
  condition: "",
};

export function useFilters(listings: Listing[]) {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(INITIAL_FILTERS);

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  const filtered = listings.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = filters.status === "" || l.status === filters.status;
    const matchCondition = filters.condition === "" || l.condition === filters.condition;
    return matchSearch && matchStatus && matchCondition;
  });

  return { filters, setFilter, clearFilters, hasActiveFilters, filtered };
}