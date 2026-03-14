import { useState, useEffect } from "react";
import { listingService } from "../services/listingService";
import type { Listing } from "../types";

export function useListingDetail(id: number) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    listingService.getById(id).then((data) => {
      if (!data) setNotFound(true);
      else setListing(data);
      setLoading(false);
    });
  }, [id]);

  return { listing, loading, notFound };
}