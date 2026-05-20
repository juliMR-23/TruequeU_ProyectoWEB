import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { chatService } from "../services/chatService";
import type { ChatDetail } from "../types";
import StateMessage from "../components/ui/StateMessage";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { messages, input, setInput, send, handleKeyDown, bottomRef, loading } = useChat(id ?? "");
  const [chatDetail, setChatDetail] = useState<ChatDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    chatService.getChatById(id)
      .then((data) => setChatDetail(data))
      .catch(() => setChatDetail(null));
  }, [id]);

  // Determina quién es el otro participante
  const otherParticipant = chatDetail
    ? user?.clientId === chatDetail.buyerId
      ? { name: chatDetail.sellerName, puntuacion: chatDetail.sellerPuntuacion }
      : { name: chatDetail.buyerName, puntuacion: chatDetail.buyerPuntuacion }
    : null;

  if (loading) return (
    <div className="py-20">
      <StateMessage type="loading" title="Cargando chat" />
    </div>
  );

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col h-screen">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="text-muted hover:text-text transition cursor-pointer">
          <FaArrowLeft />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-eia-azul-claro flex items-center justify-center text-white font-bold text-sm">
            {otherParticipant?.name.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="text-sm font-semibold text-text leading-tight">
              {otherParticipant?.name ?? "Cargando..."}
            </p>
            <p className="text-xs text-muted">
              ⭐ {otherParticipant?.puntuacion.toFixed(1) ?? ""}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border mb-4" />

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-4">
        {messages.length === 0 && (
          <p className="text-center text-muted text-sm mt-8">
            Aún no hay mensajes — ¡sé el primero en escribir!
          </p>
        )}
        {messages.map((msg) => {
          const isMe = msg.senderId === user?.clientId;
          return (
            <div key={msg.messageId} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${isMe
                ? "bg-eia-azul-claro text-white rounded-br-none"
                : "bg-surface border border-border text-text rounded-bl-none"
                }`}>
                {!isMe && (
                  <p className="text-xs font-bold mb-1 opacity-70">{msg.senderName}</p>
                )}
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 ${isMe ? "text-white/60" : "text-muted"}`}>
                  {new Date(msg.createdAt).toLocaleTimeString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-surface border border-border rounded-2xl px-4 py-2 text-sm text-text outline-none focus:border-eia-azul-claro transition"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="bg-eia-azul-claro text-white p-3 rounded-full hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaPaperPlane className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}