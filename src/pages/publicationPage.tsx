import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingList from "../components/listings/ListingList";
import { type Listing } from "../types";
import listings from "../data/listings.json"; // Datos base
import Button from "../components/ui/Button";
import { FaList } from "react-icons/fa";


export default function PublicationPage() {
  // Estado para las publicaciones
  const [allListings, setAllListings] = useState<Listing[]>([]);

  useEffect(() => {
    // 1. Cargar los datos de prueba (JSON)
    const baseListings = listings as Listing[];

    // 2. Cargar los datos del LocalStorage
    const storedData = localStorage.getItem("eia_listings");
    const userListings: Listing[] = storedData ? JSON.parse(storedData) : [];

    // 3. Combinar ambos (los del usuario primero para que salgan arriba)
    setAllListings([...userListings, ...baseListings]);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* HEADER: Flexbox para alinear título y botón */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-eia-azul">Publicaciones</h1>
        
        {/* El botón ahora apunta a la ruta de creación */}
        <Link to="/crearListing">
          <Button variant="outline">Crear Publicación</Button>
        </Link>
      </header>

      {/* LISTADO: Pasa el estado dinámico en lugar del JSON estático */}
      <ListingList listings={allListings} />
    </main>
  );
}

function EmptyPublications() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-eia-gris gap-4">
      <FaList className="w-12 h-12" />
      <p className="text-lg">Todavía no hay publicaciones</p>
      <p className="text-sm">Espera a que alguien haga una publicación o crea una tú.</p>
    </div>
  );
}