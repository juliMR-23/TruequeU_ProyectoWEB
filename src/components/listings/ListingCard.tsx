import { Link, Navigate, useNavigate } from "react-router-dom";
import { ListingStatusEnum, type Listing } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import FavoriteButton from "../ui/FavoriteButton";
import { useFavorites } from "../../hooks/useFavorites";
import { FaFlag } from "react-icons/fa";
import { LuCircleAlert } from "react-icons/lu";


type Props = {
    listing: Listing;
}

export default function ListingCard({ listing }: Props) {
    const isSold: boolean = listing.status.toUpperCase() === ListingStatusEnum.sold;
    const isReserved: boolean = listing.status.toUpperCase() === ListingStatusEnum.reserved
    const { isFavorite, toggle } = useFavorites();
    const navigate = useNavigate();
    // toma la primera imagen de la clase Listing, para poderla mostrar
    const coverImage = listing.images.find(img => img.order === 0) ?? listing.images[0];

    return (
        <article className="rounded-card border border-border bg-surface p-4 shadow-card rounded-2xl flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-3">
            <div className="relative mb-4">
                <img
                    src={coverImage.url}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-2xl"
                />
                <div className="absolute top-2 right-2">
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
            </div>

            <div className="flex items-start justify-between gap-3">
                <div>
                    {/* Titulo */}
                    <h3 className="m-0 text-base font-bold text-text">{listing.title}</h3>
                    {/* Categoria */}
                    <span className="mt-1 text-xs text-muted">{listing.category}</span>
                    {/* Descripción */}
                    <p className="mt-1 text-xs text-muted">{listing.description}</p>
                </div>
            </div>
            <div className="mt-3 space-y-2 text-sm text-text">
                <p className="m-0">
                    {/* Condición */}
                    <span className="font-bold">Condition:</span>{" "}
                    <span className="text-muted">{listing.condition}</span>
                </p>
                <p className="m-0">
                    {/* Ubicación */}
                    <span className="font-bold">Location:</span>{" "}
                    <span className="text-muted">
                        {listing.location}
                    </span>
                </p>
            </div>
            {/* Ir a detalles */}
            <div className="my-3 rounded-btn  bg-surface px-1 py-2 text-sm font-medium shadow-card hover:bg-gray-50">
                <Link to={`/details/${listing.id}`} className="text-eia-azul-claro font-extrabold">
                    Details
                </Link>
            </div>
            <div className="mt-auto flex items-center justify-between">
                {/* precio */}
                <p className="m-0 font-semibold text-text">${listing.price}</p>
                {/* <Button variant="primary" disabled={isSold} onClick={() => onAddToCart(listing)}>
          <FiShoppingCart />
          {isSold ? "Unavailable" : "Add"}
        </Button> */}
                {/* Añadir/quitar de favoritos */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => navigate(`/report/${listing.id}`)}
                        className="flex items-center gap-1 text-xs text-muted hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-50"
                        title="Denunciar publicación"
                    >
                        <LuCircleAlert className="w-5 h-5" />
                    </button>
                    <div className="bottom-2 right-2">
                        <FavoriteButton
                            listingId={listing.id}
                            isFavorite={isFavorite(listing.id)}
                            onToggle={toggle}
                        />
                    </div>
                </div>
            </div>
        </article>
    )
}