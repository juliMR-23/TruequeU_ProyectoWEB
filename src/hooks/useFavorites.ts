import { useState } from "react";

const STORAGE_KEY = "truequeU_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Se inicializa leyendo localStorage — persiste al recargar
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const toggle = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((fid) => fid !== id)  // quitar
        : [...prev, id];                     // agregar
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, toggle, isFavorite };
}