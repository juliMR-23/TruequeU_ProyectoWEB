import data from "../data/listings.json";
import type { Listing } from "../types";

// Función auxiliar para combinar JSON + LocalStorage
const _mergeData = (): Listing[] => {
  const baseListings = data as Listing[];
  const storedData = localStorage.getItem("eia_listings");
  const userListings: Listing[] = storedData ? JSON.parse(storedData) : [];
  
  // Retornamos ambos. userListings primero para que aparezcan de primero en la lista
  return [...userListings, ...baseListings];
};

export const listingService = {
  // Trae todos los listings (JSON + LocalStorage)
  getAll: () => {
    const all = _mergeData();
    return Promise.resolve(all);
  },

  // Trae un listing por su id buscando en ambas fuentes
  getById: (id: number) => {
    const all = _mergeData();
    return Promise.resolve(all.find(l => Number(l.id) === Number(id)));
  },

  // Trae varios listings por sus ids (Vital para FavoritesPage)
  getByIds: (ids: number[]) => {
    const all = _mergeData();
    // Forzamos comparación numérica por si acaso
    return Promise.resolve(all.filter(l => ids.includes(Number(l.id))));
  },

  // Trae solo los listings de un estado específico (ej. "AVAILABLE")
  getByStatus: (status: string) => {
    const all = _mergeData();
    return Promise.resolve(all.filter(l => l.status === status));
  },
};