
import ListingList from "../components/listings/ListingList";
import { ListingStatusEnum, type Listing } from "../types";
import listings from "../data/listings.json";
import { FaList } from "react-icons/fa";

const mockListings = listings as Listing[];

export default function PublicationsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Publicaciones</h1>
      {listings.length === 0
        ? <EmptyPublications />
        : (
          <ListingList listings={mockListings} />
        )
      }

    </main>
  );
}

function EmptyPublications() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
      <FaList className="w-12 h-12" />
      <p className="text-lg">Todavía no hay publicaciones</p>
      <p className="text-sm">Espera a que alguien haga una publicación o crea una tú.</p>
    </div>
  );
}