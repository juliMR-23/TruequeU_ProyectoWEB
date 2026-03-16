import { useState } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";//hook, lo usamos para el login real

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); //estado para el botón, desactivar mientras hace promesa-respuesta

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        if (!email.trim() || !password.trim()) {
            setError("Credenciales incompletas.");
            setIsSubmitting(false);
            return;
        }
        const eiaEmailRegex = /^.*@eia\.edu\.co$/;
        if (!eiaEmailRegex.test(email)) {
            setError("El formato del correo es incorrecto (debe ser @eia.edu.co).");
            return;
        }
        if (password.trim().length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            //servicio login real a través del hook
            await login(email, password);
            navigate("/"); // Éxito
        } catch (err: any) {
            //captura error: reject de la promesa
            setError(err || "Error al iniciar sesión.");
        } finally {
            //vuelve a habilitar el botón
            setIsSubmitting(false);
        }
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <section className="bg-white shadow-xl rounded-2xl border border-eia-azul/10 overflow-hidden">
                <div className="bg-eia-azul-claro py-6 px-10 text-white flex items-center gap-3">
                    <FiLogIn size={28} />
                    <h1 className="text-2xl font-bold tracking-tight">Acceso al Sistema</h1>
                </div>

                <div className="p-10 flex flex-col items-center">
                    <header className="mb-8 text-center">
                        <h2 className="text-eia-azul font-bold text-2xl">Bienvenido de nuevo</h2>
                        <p className="text-tx-suave">Ingresa tus datos institucionales para continuar.</p>
                    </header>

                    <form className="w-full max-w-2xl flex flex-col gap-6" onSubmit={onSubmit}>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">Correo Institucional</span>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-12 py-3 text-md outline-none"
                                    type="email" placeholder="usuario@eia.edu.co"
                                    value={email} onChange={(e) => setEmail(e.target.value)} required
                                />
                            </div>
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">Contraseña</span>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-12 py-3 text-md outline-none"
                                    type="password" placeholder="••••••••"
                                    value={password} onChange={(e) => setPassword(e.target.value)} required
                                />
                            </div>
                        </label>

                        {error && <p className="text-danger font-bold text-center bg-danger/10 py-3 rounded-xl border border-danger/20">{error}</p>}

                        <div className="mt-4 flex flex-col items-center">
                            <Button type="submit" variant="primary"
                            className="w-full max-w-sm py-3 text-lg"
                            disabled={isSubmitting}//deshabilita si está cargando
                            >
                                {isSubmitting ? "Entrando..." : "Entrar"}
                            </Button>
                            <p className="mt-6 text-sm text-tx-suave">
                                ¿No tienes cuenta? <Link className="text-eia-azul font-bold hover:underline" to="/signup">Regístrate aquí</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}