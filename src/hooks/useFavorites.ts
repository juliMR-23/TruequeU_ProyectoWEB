import { useState, useEffect } from "react";
// Importamos useAuth para saber quién está logueado
import { useAuth } from "./useAuth"; 

export function useFavorites() {
  const { user } = useAuth();
  
  // La llave depende de usuario (id)
  const STORAGE_KEY = user ? `fav_${user.id}`: "";

  const [favorites, setFavorites] = useState<number[]>([]);

  // Sincronizar cuando el usuario cambie
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, [STORAGE_KEY]); //lanza cada vez que el STORAGE_KEY cambia (login/logout)

  const toggle = (id: number) => {
    if (!user) return; // Manejar la lógica de aviso en el componente UI
    
    const updated = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];
    
    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, toggle, isFavorite };
}