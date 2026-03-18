import type { Listing } from "../../types";
import ListingCard from "./ListingCard";

type Props = {
  listings: Listing[];
  isFavorite: (id: number) => boolean;
  onToggle: (id: number) => void;
}

export default function ListingList({ listings, isFavorite, onToggle }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <ListingCard
          key={l.id}
          listing={l}
          isFavorite={isFavorite(l.id)} 
          onToggle={onToggle}            
        />
      ))}
    </section>
  );
}