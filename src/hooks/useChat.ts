import { useState, useEffect, useRef } from "react";
import { chatService } from "../services/chatService";
import type { Message } from "../types";

export function useChat(chatId: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Carga los mensajes al abrir el chat
    useEffect(() => {
        if (!chatId) return;

        setLoading(true);
        chatService.getMessages(chatId)
            .then((data) => setMessages(data))
            .catch(() => setMessages([]))
            .finally(() => setLoading(false));
    }, [chatId]);

    // Scroll automático al último mensaje
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = async () => {
        const text = input.trim();
        if (!text) return;

        try {
            const newMessage = await chatService.sendMessage(chatId, text);
            setMessages((prev) => [...prev, newMessage]);
            setInput("");
        } catch (err) {
            console.error("Error al enviar mensaje:", err);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return { messages, input, setInput, send, handleKeyDown, bottomRef, loading };
}