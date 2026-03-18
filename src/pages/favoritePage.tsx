import { useFavoriteListings } from "../hooks/useFavoriteListings";
import ListingCard from "../components/listings/ListingCard";
import { BsPersonSlash } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import StateMessage from "../components/ui/StateMessage";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";



export default function FavoritesPage() {
  const { listings, loading } = useFavoriteListings();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isFavorite, toggle } = useFavorites();
  const favoritedListings = listings.filter(l => isFavorite(l.id));



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
          icon={<BsPersonSlash size={32} className="text-eia-gris" />}
        />
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl text-eia-azul font-bold mb-2">Mis favoritos</h1>
      <p className="text-eia-gris text-sm mb-6">
        {favoritedListings.length} {favoritedListings.length === 1 ? "publicación guardada" : "publicaciones guardadas"}      </p>

      {favoritedListings.length === 0
        ? <main className="mx-auto max-w-2xl px-6 py-2">
          <StateMessage
            type="empty"
            title="Aún no hay favoritos"
            description="Toca el ícono de estrella en cualquier publicación para guardarla aquí."
            actionText="Explorar trueques"
            onAction={() => navigate("/publicaciones")}
            icon={<FiStar size={30} className="text-eia-gris" />}
          />
        </main>
        : (
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favoritedListings.map((l) => (
              <ListingCard
                key={l.id}
                listing={l}
                isFavorite={isFavorite(l.id)}
                onToggle={toggle}
              />
            ))}
          </section>
        )
      }
    </main>
  );
}