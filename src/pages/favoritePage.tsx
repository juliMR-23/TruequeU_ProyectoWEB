import { useFavoriteListings } from "../hooks/useFavoriteListings";
import ListingCard from "../components/listings/ListingCard";
import { FaRegHeart } from "react-icons/fa";

export default function FavoritesPage() {
  const { listings, loading } = useFavoriteListings();

  if (loading) return <p className="p-8 text-gray-400">Cargando...</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Mis favoritos</h1>
      <p className="text-gray-400 text-sm mb-6">
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
    <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
      <FaRegHeart className="w-12 h-12" />
      <p className="text-lg">Todavía no tienes favoritos</p>
      <p className="text-sm">Toca el corazón en cualquier publicación para guardarla aquí.</p>
    </div>
  );
}