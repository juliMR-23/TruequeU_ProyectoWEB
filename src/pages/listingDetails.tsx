import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaTag, FaBox } from "react-icons/fa";
import { ListingStatusEnum } from "../types";
import { useListingDetail } from "../hooks/useListingDetail";
import { useFavorites } from "../hooks/useFavorites";
import FavoriteButton from "../components/ui/FavoriteButton";
import Badge from "../components/ui/Badge";
import ImageCarousel from "../components/ui/ImageCarousel";
import StateMessage from "../components/ui/StateMessage";

export default function ListingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { listing, loading, notFound } = useListingDetail(Number(id));
    const { isFavorite, toggle } = useFavorites();


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

    const isSold = listing.status.toUpperCase() === ListingStatusEnum.sold;
    const isReserved = listing.status.toUpperCase() === ListingStatusEnum.reserved;

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
                    listingId={listing.id}
                    isFavorite={isFavorite(listing.id)}
                    onToggle={toggle}
                />
            </div>

            {/* Carrusel */}
            <ImageCarousel images={listing.images} />

            {/* Info principal */}
            <div className="mt-6 flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold text-text">{listing.title}</h1>
                <Badge variant={
                    isSold
                        ? "danger"
                        : isReserved
                            ? "info"
                            : "success"
                }>
                    {listing.status.toUpperCase()}
                </Badge>
            </div>
            {/* Precio */}
            <p className="mt-1 text-3xl font-bold text-eia-azul-claro">
                ${listing.price.toLocaleString("es-CO")}
            </p>

            {/* Detalles */}
            <div className="mt-4 flex flex-wrap gap-3">
                <span className="flex items-center gap-1 text-sm text-muted bg-surface border border-border px-3 py-1 rounded-full">
                    <FaTag className="w-3 h-3" /> {listing.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted bg-surface border border-border px-3 py-1 rounded-full">
                    <FaBox className="w-3 h-3" /> {listing.condition}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted bg-surface border border-border px-3 py-1 rounded-full">
                    <FaMapMarkerAlt className="w-3 h-3" /> {listing.location}
                </span>
            </div>

            {/* Descripción */}
            <div className="mt-6">
                <h2 className="text-base font-semibold text-text mb-2">Descripción</h2>
                <p className="text-sm text-muted leading-relaxed">{listing.description}</p>
            </div>

            {/* Botón contactar y denunciar */}
            <div className="mt-8 flex gap-1">
                <button
                    disabled={isSold || isReserved}
                    onClick={() => navigate(`/chat/${listing.ownerId}`)}
                    className="flex-2 py-3 rounded-2xl font-semibold text-white bg-eia-azul-claro hover:opacity-90 cursor-pointer transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isSold
                        ? "No disponible"
                        : isReserved
                            ? "Espera a que el producto vuelva a estar disponible o sea vendido"
                            : "Contacta al vendedor"}
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault(); // evita comportamientos extraños o refresh
                        e.stopPropagation(); //evita que interrumpa al otro boton (contactar)
                        navigate(`/report/${listing.id}`);
                    }}
                    className="flex-1 py-3 rounded-2xl font-semibold text-white bg-danger hover:opacity-90 cursor-pointer transition disabled:opacity-40"
                    title="Denunciar publicación"
                >
                    Denunciar publicación
                </button>
            </div>

        </main>
    );
}