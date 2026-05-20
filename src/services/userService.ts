import type { AuthUser } from "../types";

export const userService = {

    getCurrentUser: (): AuthUser | null => {
        const saved = localStorage.getItem("eia_logged_user");
        return saved ? JSON.parse(saved) : null;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem("eia_token");
    },

    hasRole: (role: string): boolean => {
        const user = userService.getCurrentUser();
        return user?.role === role;
    }
};