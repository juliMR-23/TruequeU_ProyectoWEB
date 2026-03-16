import { useState } from "react";
import { FiUserPlus, FiUser, FiMail, FiLock, FiBookOpen } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function SignUpPage() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); // Resetear error previo

    // 1. Verificación de campos vacíos
    if (!name.trim() || !email.trim() || !password.trim()) {
        setError("Todos los campos obligatorios deben estar llenos.");
        return;
    }

    // 2. Verificación de dominio institucional
    const eiaEmailRegex = /^.*@eia\.edu\.co$/;
    if (!eiaEmailRegex.test(email)) {
        setError("Debes usar un correo institucional válido (@eia.edu.co).");
        return;
    }

    // 3. Verificación de seguridad de contraseña (mínimo 6 caracteres)
    if (password.trim().length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    // Persistencia de sesión fake
    localStorage.setItem("eia_user", JSON.stringify({ name, email, major }));
    navigate("/");
}

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <section className="bg-white shadow-xl rounded-2xl border border-eia-azul/10 overflow-hidden">
                <div className="bg-eia-azul-claro py-6 px-10 text-white flex items-center gap-3">
                    <FiUserPlus size={28} />
                    <h1 className="text-2xl font-bold tracking-tight">Crear una nueva cuenta</h1>
                </div>

                <div className="p-10">
                    <header className="mb-8">
                        <h2 className="text-eia-azul font-bold text-2xl">Únete a TruequeU</h2>
                        <p className="text-tx-suave">Regístrate con tu correo institucional para comenzar.</p>
                    </header>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
                        {/* Nombre ocupa todo el ancho */}
                        <label className="flex flex-col gap-1.5 md:col-span-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">Nombre Completo</span>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-12 py-3 text-md outline-none"
                                    type="text" placeholder="Ej. Juan Pérez"
                                    value={name} onChange={(e) => setName(e.target.value)} required
                                />
                            </div>
                        </label>

                        {/* Email y Carrera en la misma fila */}
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
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">Carrera</span>
                            <div className="relative">
                                <FiBookOpen className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-12 py-3 text-md outline-none"
                                    type="text" placeholder="Ingeniería..."
                                    value={major} onChange={(e) => setMajor(e.target.value)}
                                />
                            </div>
                        </label>

                        {/* Password ocupa todo el ancho */}
                        <label className="flex flex-col gap-1.5 md:col-span-2">
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

                        {error && <p className="md:col-span-2 text-danger font-bold text-center bg-danger/10 py-3 rounded-xl border border-danger/20">{error}</p>}

                        <div className="md:col-span-2 mt-4 flex flex-col items-center">
                            <Button type="submit" variant="primary" className="w-full max-w-sm py-3 text-lg">
                                Registrarme
                            </Button>
                            <p className="mt-6 text-sm text-tx-suave">
                                ¿Ya tienes una cuenta? <Link className="text-eia-azul font-bold hover:underline" to="/login">Inicia sesión</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}