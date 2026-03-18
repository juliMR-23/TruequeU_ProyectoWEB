import type { Listing } from "../../types";
import ListingCard from "./ListingCard";

// Tipo de las props: recibe un arreglo de conciertos
type Props = {
  listings: Listing[];
  onDelete?: (id: number) => void; // Recibe la función opcional
}

// Componente que renderiza la lista (grid) de tarjetas de conciertos.
// Usa .map() para recorrer el arreglo y crear un ConcertCard por cada concierto.
// La prop "key" es necesaria en React para identificar cada elemento de la lista de forma única.
export default function ListingList({ listings, onDelete }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Concerts list">
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} onDelete={onDelete} // Se la pasa a la tarjeta
        />
      ))}
    </section>
  );
}