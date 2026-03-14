import { ListingStatusEnum, type Listing } from "../../types";
import Button from "../ui/Button";

type Props = {
    listing: Listing;
}

export default function ListingCard({ listing }: Props) {
    const isSold: boolean = listing.status === ListingStatusEnum.sold;

    return (
        <article className="rounded-card border border-border bg-surface p-4 shadow-card rounded-2xl">
            <div className="flex items-start justify-between gap-3">
                <div>
                    {/* Titulo */}
                    <h3 className="m-0 text-base font-semibold text-text">{listing.title}</h3>
                    {/* Categoria */}
                    <span className="mt-1 text-xs text-muted">{listing.category}</span>
                    {/* Descripción */}
                    <p className="mt-1 text-xs text-muted">{listing.description}</p>
                </div>
                {/* Muestra el estado: "SOLD_OUT" si está agotado, "AVAILABLE" si hay entradas */}
                {/* <Badge variant={isSold ? "danger" : "success"}> */}
                <div>
                    {isSold ? ListingStatusEnum.sold : ListingStatusEnum.available}
                </div>
                {/* </Badge> */}
            </div>
            <div className="mt-3 space-y-2 text-sm text-text">
                <p className="m-0">
                    <span className="font-semibold">Condition:</span>{" "}
                    <span className="text-muted">{listing.condition}</span>
                </p>
                <p className="m-0">
                    <span className="font-semibold">Location:</span>{" "}
                    <span className="text-muted">
                        {listing.location}
                    </span>
                </p>
            </div>

            {/* <div className="my-3 rounded-btn  bg-surface px-1 py-2 text-sm font-medium shadow-card hover:bg-gray-50">
        <Link to={`/listings/${listing.id}`}>
          Details
        </Link>
      </div> */}
            <div className="mt-4 flex items-center justify-between">
                <p className="m-0 font-semibold text-text">${listing.price}</p>
                {/* <Button variant="primary" disabled={isSold} onClick={() => onAddToCart(listing)}>
          <FiShoppingCart />
          {isSold ? "Unavailable" : "Add"}
        </Button> */}
            </div>
        </article>
    )
}