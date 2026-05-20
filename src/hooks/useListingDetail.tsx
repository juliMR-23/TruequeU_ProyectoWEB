import { useState, useEffect } from "react";
import { listingService } from "../services/listingService";
import type { ListingDetailDTO } from "../types";

export function useListingDetail(id: string) {
  const [listing, setListing] = useState<ListingDetailDTO | null>(null);
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