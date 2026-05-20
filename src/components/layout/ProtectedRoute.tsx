import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import StateMessage from "../ui/StateMessage";

interface Props {
    children: React.ReactNode;
    requiredRole?: string; // si se pasa, verifica el rol
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="py-20">
            <StateMessage type="loading" title="Verificando sesión" />
        </div>
    );

    // No hay sesión → redirige a login
    if (!user) return <Navigate to="/login" replace />;

    // Hay sesión pero no tiene el rol requerido → redirige a home
    if (requiredRole && user.role !== requiredRole)
        return <Navigate to="/" replace />;

    return <>{children}</>;
}