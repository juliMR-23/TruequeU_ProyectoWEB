import { useFavoriteListings } from "../hooks/useFavoriteListings";
import ListingCard from "../components/listings/ListingCard";
import { FiStar } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import StateMessage from "../components/ui/StateMessage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function FavoritesPage() {
  const { listings, loading } = useFavoriteListings();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="py-20">
        <StateMessage type="loading" title="Cargando favoritos" description="Se están buscando los datos" />
      </div>
    );
  }

  //no logueado:
  if (!user) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24">
        <StateMessage
          type="empty"
          title="Ingresa para ver favoritos"
          description="Debes ser parte de la comunidad EIA para guardar y ver tus objetos deseados."
          actionText="Registrarse"
          onAction={() => navigate("/signup")}
        />
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl text-eia-azul font-bold mb-2">Mis favoritos</h1>
      <p className="text-eia-gris text-sm mb-6">
        {listings.length} {listings.length === 1 ? "publicación guardada" : "publicaciones guardadas"}
      </p>

      {listings.length === 0
        ? <main className="mx-auto max-w-2xl px-6 py-2">
          <StateMessage
            type="empty"
            title="Tu lista está vacía"
            description="Toca el ícono de estrella en cualquier publicación para guardarla aquí."
            actionText="Explorar trueques"
            onAction={() => navigate("/publicaciones")}
          />
        </main>
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