import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
    const navigate = useNavigate();
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button className="text-muted hover:text-text transition">
          <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer"/>
        </button>
        <div className="flex items-center gap-3">
          <img
            src="https://pbs.twimg.com/media/FY5DY-XX0AAxH_P.jpg"
            alt="listing"
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            {/* titulo */}
            <p className="text-sm font-semibold text-text leading-tight">Objeto mimimi</p>
            {/* precio */}
            <p className="text-xs text-muted">$100000000000</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border mb-4" />

      {/* Historial de mensajes */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-4">

        {/* Mensaje del otro */}
        <div className="flex justify-start">
          <div className="max-w-xs px-4 py-2 rounded-2xl rounded-bl-none text-sm bg-surface border border-border text-text">
            <p>Hola! Aqui es donde irán nuestro mensajes?</p>
            <p className="text-xs mt-1 text-muted">10:00</p>
          </div>
        </div>

        {/* Mensaje mío */}
        <div className="flex justify-end">
          <div className="max-w-xs px-4 py-2 rounded-2xl rounded-br-none text-sm bg-eia-azul-claro text-white">
            <p>Sí! Cuando a los desarrolladores les de por implementarlo.</p>
            <p className="text-xs mt-1 text-white/60">10:02</p>
          </div>
        </div>

        {/* Mensaje del otro */}
        <div className="flex justify-start">
          <div className="max-w-xs px-4 py-2 rounded-2xl rounded-bl-none text-sm bg-surface border border-border text-text">
            <p>Perfecto, solo hay que esperar a que aprendan back!</p>
            <p className="text-xs mt-1 text-muted">10:05</p>
          </div>
        </div>

      </div>

      {/* Input */}
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-surface border border-border rounded-2xl px-4 py-2 text-sm text-text outline-none focus:border-eia-azul-claro transition"
        />
        <button className="bg-eia-azul-claro text-white p-3 rounded-full hover:opacity-90 transition">
          <FaPaperPlane className="w-4 h-4" />
        </button>
      </div>

    </main>
  );
}