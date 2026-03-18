import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useChat } from "../hooks/useChat";
import usersMock from "../data/users.json";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { messages, input, setInput, send, handleKeyDown, bottomRef } = useChat(Number(id));
  const user = usersMock.find((u) => u.id === Number(id));


  return (
    <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="text-muted hover:text-text transition cursor-pointer">
          <FaArrowLeft />
        </button>
        <div className="flex items-center gap-3">
          <img src="https://pbs.twimg.com/media/FY5DY-XX0AAxH_P.jpg" alt="listing" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <p className="text-sm font-semibold text-text leading-tight">{user?.name ?? "Usuario desconocido"}</p>
            <p className="text-xs text-muted">{user?.major}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border mb-4" />

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${msg.isMe
                ? "bg-eia-azul-claro text-white rounded-br-none"
                : "bg-surface border border-border text-text rounded-bl-none"
              }`}>
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.isMe ? "text-white/60" : "text-muted"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
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