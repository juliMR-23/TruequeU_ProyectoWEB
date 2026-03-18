import { FiUser, FiMail, FiBook, FiLogOut, FiPackage } from "react-icons/fi";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StateMessage from "../components/ui/StateMessage";
import { BsPersonSlash } from "react-icons/bs";
import { useState, useEffect } from "react";
import ListingList from "../components/listings/ListingList";
import { type Listing } from "../types";
import baseListingsJson from "../data/listings.json";

export default function ProfilePage() {
    const navigate = useNavigate();
    //manejo de usuarios
    const { user, logout, loading } = useAuth();
    const [myListings, setMyListings] = useState<Listing[]>([]);

    useEffect(() => {
        if (!user) return;

        // 1. Obtener datos de ambas fuentes
        const baseListings = baseListingsJson as Listing[];
        const storedData = localStorage.getItem("eia_listings");
        const localListings: Listing[] = storedData ? JSON.parse(storedData) : [];

        // 2. Combinar todo
        const allData = [...localListings, ...baseListings];

        // 3. FILTRAR: Solo las que pertenecen al usuario actual
        const filtered = allData.filter((item) => item.ownerId === user.id);

        setMyListings(filtered);
    }, [user]);

    const handleDeleteListing = (id: number) => {
    // 1. Confirmación simple (UX básica)
    if (!window.confirm("¿Estás seguro de que quieres eliminar este objeto?")) return;

    // 2. Obtener lo que hay en localStorage
    const storedData = localStorage.getItem("eia_listings");
    if (!storedData) return;

    const currentListings: Listing[] = JSON.parse(storedData);

    // 3. Filtrar para quitar el ID seleccionado
    const updatedListings = currentListings.filter(item => item.id !== id);

    // 4. Guardar de nuevo en localStorage
    localStorage.setItem("eia_listings", JSON.stringify(updatedListings));

    // 5. Actualizar el estado visual inmediatamente
    setMyListings(prev => prev.filter(item => item.id !== id));
};

    if (loading) {
        return (
            <StateMessage
                title="Cargando perfil"
                description="Se está buscando el usuario"
                type="loading"
            />
        );
    }

    // Estado vacío si no hay usuario
    if (!user) {
        return (
            <main className="mx-auto max-w-2xl px-6 py-24">
                <StateMessage
                    type="empty"
                    title="Acceso denegado"
                    description="Debes ingresar con un correo de la EIA para ver tu perfil."
                    actionText="Registrarse"
                    onAction={() => navigate("/signup")}
                    icon={<BsPersonSlash size={32} className="text-eia-gris" />}
                />
            </main>
        );
    }

    return (
        <main className="max-w-6xl flex flex-col items-safe-center mx-auto px-6 py-12">
            <div className="my-3 self-center w-full max-w-3xl bg-white shadow-xl rounded-2xl border border-eia-azul/10 overflow-hidden">
                <div className="bg-eia-azul-claro py-10 flex flex-col items-center text-white">
                    <div className="bg-white p-4 rounded-full mb-4">
                        <FiUser className="h-20 w-20 text-eia-azul-claro" />
                    </div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="opacity-80">Estudiante EIA</p>
                </div>

                <div className="p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-4 p-4 bg-eia-fondo rounded-xl">
                        <FiMail className="text-eia-azul-claro" size={24} />
                        <div>
                            <p className="text-xs font-bold text-eia-gris uppercase tracking-wider">Correo</p>
                            <p className="text-md text-eia-azul font-medium">{user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-eia-fondo rounded-xl">
                        <FiBook className="text-eia-azul-claro" size={24} />
                        <div>
                            <p className="text-xs font-bold text-eia-gris uppercase tracking-wider">Carrera</p>
                            <p className="text-md text-eia-azul font-medium">{user.major || "No especificada"}</p>
                        </div>
                    </div>

                    <Button
                        variant="danger"
                        onClick={logout}
                    >
                        <FiLogOut className="mr-2" /> Cerrar Sesión
                    </Button>
                </div>
            </div>
            <section className="mt-12">
        <h2 className="text-xl font-bold text-eia-azul-claro mb-6 flex items-center gap-2">
          <FiPackage /> Mis Publicaciones ({myListings.length})
        </h2>

        {myListings.length === 0 ? (
          <div className="bg-eia-fondo/30 rounded-2xl p-10">
            <StateMessage
              type="empty"
              title="Aún no has publicado nada"
              description="Anímate a subir tu primer objeto para intercambiar con otros compañeros."
              actionText="Crear publicación"
              onAction={() => navigate("/crearListing")}
            />
          </div>
        ) : (
          <ListingList listings={myListings} onDelete={handleDeleteListing} />
        )}
      </section>
        </main>
    );
}