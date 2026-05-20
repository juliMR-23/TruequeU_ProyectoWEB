import { useState } from "react";
import type { ListingCardDTO } from "../types";

interface Filters {
  search: string;
  estado: string;
  condicion: string;
}

const INITIAL_FILTERS: Filters = {
  search: "",
  estado: "",
  condicion: "",
};

export function useFilters(listings: ListingCardDTO []) {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(INITIAL_FILTERS);

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  const filtered = listings.filter((l) => {
    const matchSearch = l.titulo.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = filters.estado === "" || l.estado === filters.estado;
    const matchCondition = filters.condicion === "" || l.condicion === filters.condicion;
    return matchSearch && matchStatus && matchCondition;
  });

  return { filters, setFilter, clearFilters, hasActiveFilters, filtered };
}