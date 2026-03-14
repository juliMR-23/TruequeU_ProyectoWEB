
import ListingList from "../components/listings/ListingList";
import { ListingStatusEnum, type Listing } from "../types";
import listings from "../data/listings.json";

const mockListings = listings as Listing[];


export default function PublicationsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Publicaciones</h1>
      <ListingList listings={mockListings} />
    </main>
  );
}