import { api } from "./api";
import type { ChatSummary, ChatDetail, Message } from "../types";

export const chatService = {

    
    CreateChat: async (sellerId: string): Promise<ChatDetail> => {
        return await api.post(`/chats/${sellerId}`);
    },

    getMyChats: async (): Promise<ChatSummary[]> => {
        return await api.get("/chats/me");
    },

    getChatById: async (chatId: string): Promise<ChatDetail> => {
        return await api.get(`/chats/${chatId}`);
    },

    getMessages: async (chatId: string): Promise<Message[]> => {
        return await api.get(`/chats/${chatId}/messages`);
    },

    sendMessage: async (chatId: string, content: string): Promise<Message> => {
        return await api.post(`/chats/${chatId}/messages`, JSON.stringify(content));
    }
};