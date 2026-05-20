import type { Listing } from "../../types";
import ListingCard from "./ListingCard";

type Props = {
  listings: Listing[];
  isFavorite: (id: string) => boolean;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void; // Recibe la función opcional
}

export default function ListingList({ listings, isFavorite, onToggle, onDelete }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <ListingCard
          key={l.idListing}
          listing={l}
          isFavorite={isFavorite(l.idListing)}
          onToggle={onToggle}
          onDelete={onDelete} // Se la pasa a la tarjeta
        />
      ))}
    </section>
  );
}