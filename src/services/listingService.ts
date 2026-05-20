import type { ListingCardDTO, ListingDetailDTO, CreateListingDTO } from "../types";
import { api } from "./api"



export const listingService = {

  // GET /api/Listing — catálogo público
  getAll: async (): Promise<ListingCardDTO[]> => {
    return await api.get("/Listing");
  },

  // GET /api/Listing/{id} — detalle público
  getById: async (id: string): Promise<ListingDetailDTO> => {
    return await api.get(`/Listing/${id}`);
  },

  // GET /api/Listing/owner/{ownerId} — listings de un usuario
  getByOwnerId: async (ownerId: string): Promise<ListingCardDTO[]> => {
    return await api.get(`/Listing/owner/${ownerId}`);
  },

  // POST /api/Listing — crear listing
  create: async (listing: CreateListingDTO): Promise<ListingCardDTO> => {
    console.log("Mandando al back:", listing);
    return await api.post("/Listing", listing);
  },

  // PUT /api/Listing/changeStatus — cambiar estado
  changeStatus: async (listingId: string, nuevoEstado: string): Promise<void> => {
    return await api.put("/Listing/changeStatus", { listingId, nuevoEstado });
  },

  // PATCH /api/Listing/{id}/softDelete — eliminar
  softDelete: async (id: string): Promise<void> => {
    return await api.delete(`/Listing/${id}/softDelete`);
  },

  // POST /api/Listing/{id}/favorite — toggle favorito
  toggleFavorite: async (id: string): Promise<void> => {
    return await api.post(`/Listing/${id}/favorite`);
  },
  getFavorites: async (): Promise<ListingCardDTO[]> => {
    return await api.get("/Listing/favorites");
  },


  //ANTERIORES DEL FRONT (falta el de favoritos que se le olvidó a Julian en el controller)

  // Trae varios listings por sus ids (Vital para FavoritesPage)
  // getByIds: (ids: number[]) => {
  //   const all = _mergeData();
  //   // Forzamos comparación numérica por si acaso
  //   return Promise.resolve(all.filter(l => ids.includes(Number(l.idListing))));
  // },

  // // Trae solo los listings de un estado específico (ej. "AVAILABLE")
  // getByStatus: (status: string) => {
  //   const all = _mergeData();
  //   return Promise.resolve(all.filter(l => l.estado === status));
  // },
};