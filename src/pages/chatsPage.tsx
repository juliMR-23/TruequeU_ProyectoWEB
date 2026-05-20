import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMessageSquare } from "react-icons/fi";
import { chatService } from "../services/chatService";
import { useAuth } from "../hooks/useAuth";
import type { ChatSummary } from "../types";
import StateMessage from "../components/ui/StateMessage";

export default function ChatsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [chats, setChats] = useState<ChatSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        chatService.getMyChats()
            .then((data) => {
                console.log("Chats recibidos:", data); // ← agrega esto
                setChats(data);
            })
            .catch((err) => {
                console.error("Error:", err); // ← y esto
                setChats([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="py-20">
            <StateMessage type="loading" title="Cargando conversaciones" />
        </div>
    );

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-eia-azul mb-6 flex items-center gap-2">
                <FiMessageSquare /> Mis conversaciones
            </h1>

            {chats.length === 0 ? (
                <StateMessage
                    type="empty"
                    title="Aún no tienes conversaciones"
                    description="Contacta a un vendedor desde el detalle de una publicación."
                    actionText="Ver publicaciones"
                    onAction={() => navigate("/publicaciones")}
                />
            ) : (
                <section className="flex flex-col gap-3">
                    {chats.map((chat) => (
                        <button
                            key={chat.chatId}
                            onClick={() => navigate(`/chat/${chat.chatId}`)}
                            className="w-full text-left bg-white rounded-2xl border border-border p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                        >
                            <div className="flex items-center gap-4">
                                {/* Avatar con inicial */}
                                <div className="w-12 h-12 rounded-full bg-eia-azul-claro flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    {chat.otherParticipantName.charAt(0).toUpperCase()}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-semibold text-eia-azul truncate">
                                            {chat.otherParticipantName}
                                        </p>
                                        {/* Fecha del último mensaje */}
                                        {chat.lastMessageAt && (
                                            <p className="text-xs text-muted flex-shrink-0">
                                                {new Date(chat.createdAt + "Z").toLocaleTimeString("es-CO", {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between gap-2 mt-1">
                                        {/* Preview del último mensaje */}
                                        <p className="text-sm text-muted truncate">
                                            {chat.lastMessagePreview ?? "Sin mensajes aún"}
                                        </p>

                                        {/* Badge de no leídos */}
                                        {chat.unreadCount > 0 && (
                                            <span className="bg-eia-azul-claro text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                                                {chat.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </section>
            )}
        </main>
    );
}