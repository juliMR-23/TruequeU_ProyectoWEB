// src/services/authService.ts
import { api } from "./api";

export const authService = {

    // POST /api/Auth/login
    // Recibe: { email, password }
    // Devuelve: { Token: "eyJhbGci..." }
    login: async (email: string, password: string) => {
        const response = await api.post("/Auth/login", { email, password });
        return response.token as string; // extrae solo el token del objeto
    },

    // POST /api/Auth/registerClient
    // Recibe: { email, password, nombreCliente, carreraCliente }
    // Devuelve: { message: "Cliente creado correctamente" }
    register: async (
        email: string,
        password: string,
        nombreCliente: string,
        carreraCliente: string
    ) => {
        return await api.post("/Auth/registerClient", {
            email,
            password,
            nombreCliente,
            carreraCliente
        });
    }
};