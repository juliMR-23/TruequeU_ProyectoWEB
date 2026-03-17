import { useState, useEffect } from "react";
import { useFavorites } from "./useFavorites";
import type { Listing } from "../types";
import { listingService } from "../services/listingService";
import { useAuth } from "./useAuth";

export function useFavoriteListings() {
  const { favorites, toggle, isFavorite } = useFavorites();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {

    // Usuario sin favoritos o no hay usuario activo
    if (favorites.length === 0 || !user) {
      setListings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    listingService.getByIds(favorites)
      .then((data) => {
        setListings(data);
      })
      .catch(() => {
        setListings([]); // Manejo básico de error
      })
      .finally(() => {
        setLoading(false);
      });
  }, [favorites, user]);

  return { listings, loading, toggle, isFavorite };
}