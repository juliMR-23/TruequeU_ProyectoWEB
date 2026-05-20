import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { listingService } from "../services/listingService";

export function useFavorites() {
    const { user } = useAuth();
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    // Carga los favoritos al iniciar
    useEffect(() => {
    if (!user) {
        setFavoriteIds([]);
        return;
    }

    listingService.getFavorites()
        .then((data) => setFavoriteIds(data.map(l => l.idListing)))
        .catch(() => setFavoriteIds([]));
}, [user]);

    const toggle = async (listingId: string) => {
        if (!user) return;

        try {
            await listingService.toggleFavorite(listingId);
            // Actualiza el estado local optimístamente
            setFavoriteIds((prev) =>
                prev.includes(listingId)
                    ? prev.filter((id) => id !== listingId)
                    : [...prev, listingId]
            );
        } catch (err) {
            console.error("Error al togglear favorito:", err);
        }
    };

    // Un solo parámetro — busca en el estado interno
    const isFavorite = (listingId: string): boolean =>
        favoriteIds.includes(listingId);

    return { favoriteIds, toggle, isFavorite };
}