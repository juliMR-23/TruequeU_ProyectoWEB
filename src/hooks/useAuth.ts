import { useState, useEffect } from "react";
import type { AuthUser } from "../types";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("eia_logged_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // 1. Llama al back y recibe el token
    const token = await authService.login(email, password);

    // 2. Decodifica el payload del JWT para sacar los datos del usuario
    const payload = JSON.parse(atob(token.split(".")[1]));

    // 3. Construye el objeto usuario con los claims del token
    const userData: AuthUser = {
      email: payload.email,
      clientId: payload.ClientId,
      role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };

    // 4. Guarda el token para las requests y el usuario para la UI
    localStorage.setItem("eia_token", token);
    localStorage.setItem("eia_logged_user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (
    email: string,
    password: string,
    nombreCliente: string,
    carreraCliente: string
  ) => {
    // Solo registra — no hace login automático
    // El usuario debe hacer login después
    await authService.register(email, password, nombreCliente, carreraCliente);
  };

  const logout = () => {
    // Limpia todo
    localStorage.removeItem("eia_token");
    localStorage.removeItem("eia_logged_user");
    setUser(null);
    navigate("/login");
  };

  return { user, login, register, logout, loading };
}