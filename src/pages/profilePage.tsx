import { FiUser, FiMail, FiBook, FiLogOut, FiPackage } from "react-icons/fi";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StateMessage from "../components/ui/StateMessage";
import { BsPersonSlash } from "react-icons/bs";
import { useState, useEffect } from "react";
import ListingList from "../components/listings/ListingList";
import type { Listing } from "../types";
import { useFavorites } from "../hooks/useFavorites";
import { listingService } from "../services/listingService";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, logout, loading } = useAuth();
    const [myListings, setMyListings] = useState<Listing[]>([]);
    const [listingsLoading, setListingsLoading] = useState(true);
    const { isFavorite, toggle } = useFavorites();

    useEffect(() => {
        if (!user) return;

        listingService.getByOwnerId(user.clientId)
            .then((data) => setMyListings(data))
            .catch(() => setMyListings([]))
            .finally(() => setListingsLoading(false));
    }, [user]);

    if (loading) return (
        <StateMessage title="Cargando perfil" description="Se está buscando el usuario" type="loading" />
    );

    const handleDeleteListing = async (id: string) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este objeto?")) return;

        try {
            await listingService.softDelete(id);
            setMyListings(prev => prev.filter(item => item.idListing !== id));
        } catch (err) {
            console.error("Error al eliminar listing:", err);
        }
    };

    if (!user) return (
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

    return (
        <main className="max-w-6xl flex flex-col items-safe-center mx-auto px-6 py-12">
            <div className="my-3 self-center w-full max-w-3xl bg-white shadow-xl rounded-2xl border border-eia-azul/10 overflow-hidden">
                <div className="bg-eia-azul-claro py-10 flex flex-col items-center text-white">
                    <div className="bg-white p-4 rounded-full mb-4">
                        <FiUser className="h-20 w-20 text-eia-azul-claro" />
                    </div>
                    <h1 className="text-2xl font-bold">{user.email}</h1>
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
                            <p className="text-xs font-bold text-eia-gris uppercase tracking-wider">Rol</p>
                            <p className="text-md text-eia-azul font-medium">{user.role || "No especificada"}</p>
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

                {listingsLoading ? (
                    <StateMessage type="loading" title="Cargando publicaciones" />
                ) : myListings.length === 0 ? (
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
                    <ListingList
                        listings={myListings}
                        isFavorite={isFavorite}
                        onToggle={toggle}
                        onDelete={handleDeleteListing}
                    />
                )}
            </section>
        </main>
    );
}