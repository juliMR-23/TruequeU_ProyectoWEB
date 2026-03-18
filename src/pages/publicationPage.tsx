import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingList from "../components/listings/ListingList";
import { type Listing } from "../types";
import listings from "../data/listings.json";
import Button from "../components/ui/Button";
import StateMessage from "../components/ui/StateMessage";
import { useFavorites } from "../hooks/useFavorites";
import FilterBar from "../components/ui/FilterBar";
import { useFilters } from "../hooks/useFilters";


export default function PublicationPage() {
  // Estado para las publicaciones
  const [allListings, setAllListings] = useState<Listing[]>([]);
  // Estado para los favoritos, así actualiza en tiempo real
  const { isFavorite, toggle } = useFavorites();
  // Filtros
  const { filters, setFilter, clearFilters, hasActiveFilters, filtered } = useFilters(allListings);

  useEffect(() => {
    // 1. Cargar los datos de prueba (JSON)
    const baseListings = listings as Listing[];

    // 2. Cargar los datos del LocalStorage
    const storedData = localStorage.getItem("eia_listings");
    const userListings: Listing[] = storedData ? JSON.parse(storedData) : [];

    // 3. Combinar ambos (los del usuario primero para que salgan arriba)
    setAllListings([...userListings, ...baseListings]);
  }, []);

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
        status={filters.status}
        condition={filters.condition}
        onSearchChange={(v) => setFilter("search", v)}
        onStatusChange={(v) => setFilter("status", v)}
        onConditionChange={(v) => setFilter("condition", v)}
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