import { useState, useEffect } from "react";
import { useFavorites } from "./useFavorites";
import type { ListingCardDTO  } from "../types";
import { listingService } from "../services/listingService";
import { useAuth } from "./useAuth";

export function useFavoriteListings() {
    const { toggle, isFavorite } = useFavorites();
    const [listings, setListings] = useState<ListingCardDTO []>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setListings([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        listingService.getFavorites()
            .then((data) => setListings(data))
            .catch(() => setListings([]))
            .finally(() => setLoading(false));
    }, [user]);

    return { listings, loading, toggle, isFavorite };
}