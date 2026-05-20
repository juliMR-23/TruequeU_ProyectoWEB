import { api } from "./api";
import type { ModerationLog } from "../types";

export const moderationLogService = {
    getAll: async (role?: string, action?: string, resultCode?: string): Promise<ModerationLog[]> => {
        const params = new URLSearchParams();
        if (role) params.append("role", role);
        if (action) params.append("action", action);
        if (resultCode) params.append("resultCode", resultCode);

        const query = params.toString() ? `?${params.toString()}` : "";
        return await api.get(`/moderation-logs${query}`);
    }
};