import { useState, useRef, useEffect } from "react";

export interface Message {
  id: number;
  text: string;
  isMe: boolean;
  time: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: 1, text: "Hola! Aquí irán nuestros mensajes?", isMe: false, time: "10:00" },
  { id: 2, text: "Sí! Cuando a los desarrolladores les de por implementarlo.", isMe: true, time: "10:02" },
  { id: 3, text: "Perfecto, solo hay que esperar a que aprendan back!", isMe: false, time: "10:05" },
];

export function useChat(listingId: number) {
  const storageKey = `truequeU_chat_${listingId}`;

  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem(storageKey);
    // Si ya hay mensajes guardados los usa, sino carga los mock
    return stored ? JSON.parse(stored) : MOCK_MESSAGES;
  });

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isMe: true,
      time: new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => {
      const updated = [...prev, newMessage];
      // Guarda en localStorage cada vez que llega un mensaje nuevo
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return { messages, input, setInput, send, handleKeyDown, bottomRef };
}