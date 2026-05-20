import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingList from "../components/listings/ListingList";
import type { Listing } from "../types";
import Button from "../components/ui/Button";
import StateMessage from "../components/ui/StateMessage";
import { useFavorites } from "../hooks/useFavorites";
import FilterBar from "../components/ui/FilterBar";
import { useFilters } from "../hooks/useFilters";
import { listingService } from "../services/listingService";


export default function PublicationPage() {
  // Estado para las publicaciones
  const [allListings, setAllListings] = useState<Listing[]>([]);
  // Estado para los favoritos, así actualiza en tiempo real
  const { isFavorite, toggle } = useFavorites();
  // Filtros
  const { filters, setFilter, clearFilters, hasActiveFilters, filtered } = useFilters(allListings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listingService.getAll()
      .then((data) => setAllListings(data))
      .catch(() => setAllListings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="py-20">
      <StateMessage type="loading" title="Cargando publicaciones" />
    </div>
  );

  if (allListings.length === 0) return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <StateMessage
        title="Aún no hay publicaciones"
        description="Espera a que alguien haga una publicación o crea una tú."
        type="empty" />
    </main>
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* HEADER: Flexbox para alinear título y botón */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-eia-azul">Publicaciones</h1>

        {/*botón para la creación */}
        <Link to="/crearListing">
          <Button variant="outline">Crear Publicación</Button>
        </Link>
      </header>
      {/* Barra de filtros */}
      <FilterBar
        search={filters.search}
        status={filters.estado}
        condition={filters.condicion}
        onSearchChange={(v) => setFilter("search", v)}
        onStatusChange={(v) => setFilter("estado", v)}
        onConditionChange={(v) => setFilter("condicion", v)}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
      {/* Contador de resultados */}
      <p className="text-sm text-muted mb-4">
        {filtered.length} {filtered.length === 1 ? "publicación" : "publicaciones"}
        {hasActiveFilters && " encontradas"}
      </p>

      {/* Lista filtrada — pasa filtered en lugar de allListings */}
      {filtered.length === 0
        ? <StateMessage
          title="Sin resultados"
          description="No hay publicaciones que coincidan con los filtros."
          type="empty"
        />
        : <ListingList listings={filtered} isFavorite={isFavorite} onToggle={toggle} />
      }
    </main>
  );
}