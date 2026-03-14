import { useFavoriteListings } from "../hooks/useFavoriteListings";
import ListingCard from "../components/listings/ListingCard";
import { FiStar } from "react-icons/fi";

export default function FavoritesPage() {
  const { listings, loading } = useFavoriteListings();

  if (loading) return <p className="p-8 text-eia-gris">Cargando...</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl text-eia-azul font-bold mb-2">Mis favoritos</h1>
      <p className="text-eia-gris text-sm mb-6">
        {listings.length} {listings.length === 1 ? "publicación guardada" : "publicaciones guardadas"}
      </p>

      {listings.length === 0
        ? <EmptyFavorites />
        : (
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </section>
        )
      }
    </main>
  );
}

function EmptyFavorites() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-eia-gris gap-4">
      <FiStar className="w-15 h-15" />
      <p className="text-3xl font-bold text-eia-azul">Todavía no tienes favoritos</p>
      <p className="text-sm">Toca el ícono de estrella en cualquier publicación para verla aquí.</p>
    </div>
  );
}