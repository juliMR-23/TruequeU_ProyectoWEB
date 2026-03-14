import data from "../data/listings.json";
import type { Listing } from "../types";

const listings: Listing[] = data as Listing[];

export const listingService = {
  // Trae todos los listings
  getAll: () => Promise.resolve(listings),

  // Trae un listing por su id
  getById: (id: number) => Promise.resolve(listings.find(l => l.id === id)),

  // Trae varios listings por sus ids (usado en FavoritesPage)
  getByIds: (ids: number[]) => Promise.resolve(listings.filter(l => ids.includes(l.id))),

  // Trae solo los listings de un estado específico
  getByStatus: (status: string) => Promise.resolve(listings.filter(l => l.status === status)),
};