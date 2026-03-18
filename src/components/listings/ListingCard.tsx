import { Link, useNavigate } from "react-router-dom";
import { ListingStatusEnum, type Listing } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import FavoriteButton from "../ui/FavoriteButton";
import { LuCircleAlert } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";


type Props = {
    listing: Listing;
    isFavorite: boolean;
    onToggle: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function ListingCard({ listing, isFavorite, onToggle, onDelete }: Props) {
    const isSold: boolean = listing.status.toUpperCase() === ListingStatusEnum.sold;
    const isReserved: boolean = listing.status.toUpperCase() === ListingStatusEnum.reserved
    const navigate = useNavigate();
    // toma la primera imagen de la clase Listing, para poderla mostrar
    const coverImage = listing.images.find(img => img.order === 0) ?? listing.images[0];

    return (
        <article className="rounded-card border border-border bg-white p-4 shadow-card rounded-2xl flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-3">
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
                    {/* Botón de eliminar (Solo si onDelete existe) */}
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete(listing.id);
                            }}
                            className="bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                            title="Eliminar publicación"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-start justify-between gap-3">
                <div>
                    {/* Titulo */}
                    <h3 className="m-0 font-bold text-lg">{listing.title}</h3>
                    {/* Categoria */}
                    <span className="mt-1 uppercase tracking-widest text-xs text-eia-gris">{listing.category}</span>
                </div>
            </div>
            <div className="flex justify-between my-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-eia-gris">
                    <p className="text-lg text-eia-azul-claro"> ${listing.price.toLocaleString("es-CO")}</p>
                    <p>|</p>
                    <p>{listing.condition}</p>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault(); // evita comportamientos extraños o refresh
                        e.stopPropagation(); //evita que interrumpa al otro boton (fav)
                        navigate(`/report/${listing.id}`);
                    }}
                    className="ml-auto text-eia-gris hover:text-red-500 hover:cursor-pointer transition px-2 py-1 rounded-lg"
                    title="Denunciar publicación"
                >
                    <LuCircleAlert className="w-5 h-5" />
                </button>
                <FavoriteButton
                    listingId={listing.id}
                    isFavorite={isFavorite}
                    onToggle={onToggle}
                />

            </div>
            {/* Ir a detalles */}
            <div className="my-2 w-full">
                <Link to={`/details/${listing.id}`}>
                    <Button variant="outline" className="w-full">Ver detalles</Button>
                </Link>
            </div>

        </article>
    )
}