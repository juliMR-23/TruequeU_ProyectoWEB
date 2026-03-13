import { useNavigate, Link } from "react-router-dom";
import StateMessage from "../components/ui/StateMessage";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <StateMessage
        type="empty"
        title="Página no encontrada"
        description="La ruta a la que intentas acceder no existe o ha sido movida."
        actionText="Volver al inicio"
        onAction={() => (window.location.href = "/")}
      />
      
      <div className="mt-6 text-center">
        <Link 
          to="/" 
          className="text-sm text-eia-azul-claro font-medium hover:underline hover:text-eia-azul transition-colors"
        >
          Regresar a TruequeU
        </Link>
      </div>
    </main>
  );
}