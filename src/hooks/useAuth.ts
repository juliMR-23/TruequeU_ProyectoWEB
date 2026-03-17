import { useState, useEffect } from "react";
import type { User } from "../types";
import { userService } from "../services/userService";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("eia_logged_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const userData = await userService.login(email, pass);
    setUser(userData);
    localStorage.setItem("eia_logged_user", JSON.stringify(userData));
  };

  const register = async (newUser: Omit<User, "id">) => {
    const userData = await userService.register(newUser);
    setUser(userData);
    localStorage.setItem("eia_logged_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eia_logged_user");
    navigate("/login"); // Navegación sin recargar
  };

  return { user, login, register, logout, loading };
}