import usersMock from "../data/users.json";
import { type User } from "../types";

const DB_KEY = "truequeU_users_db";

export const userService = {
    getAllUsers: (): User[] => {
        const stored = localStorage.getItem(DB_KEY);
        const registeredUsers = stored ? JSON.parse(stored) : [];//revisa si hay datos (localStorage) y guarda en una lista
        return [...(usersMock as User[]), ...registeredUsers];//datos mock de users.json + datos locales
    },

    register: async (newUser: Omit<User, "id">): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const allUsers = userService.getAllUsers();

                // --- VALIDACIÓN DE DUPLICADOS ---
                const exists = allUsers.some(u => u.email.toLowerCase() === newUser.email.toLowerCase());

                if (exists) {
                    reject("Este correo ya está registrado en la plataforma.");
                    return;
                }

                const userWithId: User = { ...newUser, id: Date.now() };
                const stored = localStorage.getItem(DB_KEY);
                const registeredUsers = stored ? JSON.parse(stored) : [];

                localStorage.setItem(DB_KEY, JSON.stringify([...registeredUsers, userWithId]));
                resolve(userWithId);
            }, 1000);//simulamos espera para loading
        })
    },

    login: async (email: string, pass: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const allUsers = userService.getAllUsers();
                
                // Buscamos coincidencia de email y contraseña
                const user = allUsers.find(
                    u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass
                );

                if (user) {
                    resolve(user);
                } else {
                    reject("Correo o contraseña incorrectos.");
                }
            }, 1000); //tmb simulamos espera
    })
}};