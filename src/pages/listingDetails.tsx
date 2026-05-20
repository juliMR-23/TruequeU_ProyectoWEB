import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaTag, FaBox } from "react-icons/fa";
import { Estado } from "../types";
import { useListingDetail } from "../hooks/useListingDetail";
import { useFavorites } from "../hooks/useFavorites";
import FavoriteButton from "../components/ui/FavoriteButton";
import Badge from "../components/ui/Badge";
import StateMessage from "../components/ui/StateMessage";
import { chatService } from "../services/chatService";
import { useAuth } from "../hooks/useAuth";

export default function ListingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { listing, loading, notFound } = useListingDetail(id ?? "");
    const { isFavorite, toggle } = useFavorites();
    const { user } = useAuth();

    if (loading)
        return (
            <div className="py-20">
                <StateMessage type="loading" title="Cargando detalles" description="Buscando la publicación" />
            </div>
        );

    if (notFound || !listing) return (
        <main className="mx-auto max-w-2xl px-6 py-24">
            <StateMessage
                type="empty"
                title="Publicación no encontrada"
                actionText="Volver"
                onAction={() => navigate(-1)}
            />
        </main>
    );

    const isOwner = user?.clientId === listing.ownerId;
    const isSold = listing.estado === Estado.Intercambiado;
    const isReserved = listing.estado === Estado.Reservado;

    const handleContactSeller = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        try {
            // Crea o recupera el chat con el owner del listing
            const chat = await chatService.CreateChat(listing.ownerId);
            navigate(`/chat/${chat.chatId}`);
        } catch (err) {
            console.error("Error al iniciar chat:", err);
        }
    };

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">

            {/* Header con botón volver */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-muted hover:text-text transition cursor-pointer"
                >
                    <FaArrowLeft />
                    Volver
                </button>
                <FavoriteButton
                    listingId={listing.idListing}
                    isFavorite={isFavorite(listing.idListing)}
                    onToggle={toggle}
                />
            </div>

            {/* Carrusel */}
            {/* <ImageCarousel images={listing.images} /> */}
            {/* Placeholder imagen */}
            <div className="w-full h-64 bg-eia-fondo rounded-2xl flex items-center justify-center text-eia-gris text-sm mb-6">
                Sin imagen
            </div>

            {/* Info principal */}
            <div className="mt-6 flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold text-text">{listing.titulo}</h1>
                <Badge variant={isSold ? "danger" : isReserved ? "info" : "success"}>
                    {listing.estado}
                </Badge>
            </div>
            {/* Precio */}
            <p className="mt-1 text-3xl font-bold text-eia-azul-claro">
                ${listing.precio.toLocaleString("es-CO")}
            </p>

            {/* Detalles */}
            <div className="mt-4 flex flex-wrap gap-3">
                <span className="flex items-center gap-1 text-sm text-muted bg-surface border border-border px-3 py-1 rounded-full">
                    <FaTag className="w-3 h-3" /> {listing.categoria}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted bg-surface border border-border px-3 py-1 rounded-full">
                    <FaBox className="w-3 h-3" /> {listing.condicion}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted bg-surface border border-border px-3 py-1 rounded-full">
                    <FaMapMarkerAlt className="w-3 h-3" /> {listing.ubicacion}
                </span>
            </div>

            {/* Descripción */}
            <div className="mt-6">
                <h2 className="text-base font-semibold text-text mb-2">Descripción</h2>
                <p className="text-sm text-muted leading-relaxed">{listing.descripcion}</p>
            </div>

            {/* Botones — solo si no eres el dueño */}
            {!isOwner ? (
                <div className="mt-8 flex gap-1">
                    <button
                        disabled={isSold || isReserved}
                        onClick={handleContactSeller}
                        className="flex-2 py-3 rounded-2xl font-semibold text-white bg-eia-azul-claro hover:opacity-90 cursor-pointer transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isSold ? "No disponible"
                            : isReserved ? "No disponible temporalmente"
                                : "Contacta al vendedor"}
                    </button>
                    <button
                        onClick={() => navigate(`/reportListing/${listing.idListing}`)}
                        className="flex-1 py-3 rounded-2xl font-semibold text-white bg-danger hover:opacity-90 cursor-pointer transition"
                    >
                        Denunciar
                    </button>
                </div>
            ) : (
                // Mensaje si eres el dueño
                <div className="mt-8 p-4 bg-eia-fondo rounded-2xl text-center">
                    <p className="text-eia-gris text-sm font-medium">
                        Esta es tu publicación
                    </p>
                </div>
            )}

        </main>
    );
}