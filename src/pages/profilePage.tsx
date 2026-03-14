import { FiUser, FiMail, FiBook, FiLogOut } from "react-icons/fi";
import Button from "../components/ui/Button";
import { BsPersonFillSlash } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    // 1. Recuperar los datos del localStorage
    const storedUser = localStorage.getItem("eia_user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("eia_user");
        window.location.href = "/login";
    };

    // Estado vacío si no hay usuario
    if (!user) {
        return (
            <main className="flex flex-col items-center justify-center py-24 gap-4">
                <BsPersonFillSlash className="h-50 w-50"/>
                <p className="text-eia-gris text-md">Aún no hay un usuario activo.</p>
                <div className="flex flex-row items-center gap-6">
                    <Link to="/signup">
                        <Button variant='primary'>Registrarse</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant='outline'>Iniciar sesión</Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <div className="bg-white shadow-xl rounded-2xl border border-eia-azul/10 overflow-hidden">
                <div className="bg-eia-azul-claro py-10 flex flex-col items-center text-white">
                    <div className="bg-white p-4 rounded-full mb-4">
                        <FiUser className="h-20 w-20 text-eia-azul-claro"/>
                    </div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="opacity-80">Estudiante EIA</p>
                </div>

                <div className="p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-4 p-4 bg-eia-fondo rounded-xl">
                        <FiMail className="text-eia-azul-claro" size={24} />
                        <div>
                            <p className="text-xs font-bold text-eia-gris uppercase tracking-wider">Correo</p>
                            <p className="text-md text-eia-azul font-medium">{user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-eia-fondo rounded-xl">
                        <FiBook className="text-eia-azul-claro" size={24} />
                        <div>
                            <p className="text-xs font-bold text-eia-gris uppercase tracking-wider">Carrera</p>
                            <p className="text-md text-eia-azul font-medium">{user.major || "No especificada"}</p>
                        </div>
                    </div>

                    <Button 
                        variant="danger" 
                        onClick={handleLogout}
                    >
                        <FiLogOut className="mr-2" /> Cerrar Sesión
                    </Button>
                </div>
            </div>
        </main>
    );
}