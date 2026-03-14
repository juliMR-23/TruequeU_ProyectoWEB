import { useState, useEffect } from "react";
import { useFavorites } from "./useFavorites";
import type { Listing } from "../types";
import { listingService } from "../services/listingService";

export function useFavoriteListings() {
  const { favorites, toggle, isFavorite } = useFavorites();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setListings([]);
      setLoading(false);
      return;
    }
    listingService.getByIds(favorites).then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, [favorites]);

  return { listings, loading, toggle, isFavorite };
}