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
    const [isSubmitting, setIsSubmitting] = useState(false); //estado para el botón, desactivar mientras hace promesa-respuesta
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({}); // Limpia errores previos
        setIsSubmitting(true);

        const newErrors: { email?: string; password?: string } = {};
        //para poder validar el campo del error

        try {
            // Validaciones locales
            const eiaEmailRegex = /^.*@eia\.edu\.co$/;
            if (!email.trim()) {
                newErrors.email = "El correo es obligatorio.";
            } else if (!eiaEmailRegex.test(email)) {
                newErrors.email = "Usa tu correo institucional @eia.edu.co";
            }

            if (!password.trim()) {
                newErrors.password = "La contraseña es obligatoria.";
            } else if (password.length < 6) {
                newErrors.password = "Mínimo 6 caracteres.";
            }

            // Si hay errores locales, los guardamos y frenamos
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return; // Aquí el finally se encargará de habilitar el botón
            }

            // Intento de login real
            await login(email, password);
            navigate("/");

        } catch (err: any) {
            // Error de "backend" (credenciales incorrectas)
            // Lo asignamos al password o creamos un error general
            setErrors({ password: err || "Credenciales no válidas." });
        } finally {
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
                                    className={`w-full rounded-xl border-2 px-12 py-3 text-md outline-none transition-all ${errors.email
                                        ? "border-danger bg-danger/5"
                                        : "border-eia-fondo bg-eia-fondo"
                                        }`}
                                    type="email" placeholder="usuario@eia.edu.co"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        // Si existe un error en este campo, lo borramos del objeto
                                        if (errors.email) {
                                            setErrors(prev => ({ ...prev, email: undefined }));
                                        }
                                    }}
                                />
                            </div>
                            {errors.email && <span className="text-danger text-xs font-bold ml-1 mt-1">{errors.email}</span>}
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">Contraseña</span>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className={`w-full rounded-xl border-2 px-12 py-3 text-md outline-none transition-all ${errors.password
                                        ? "border-danger bg-danger/5"
                                        : "border-eia-fondo bg-eia-fondo"
                                        }`}
                                    type="password" placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) {
                                            setErrors(prev => ({ ...prev, password: undefined }));
                                        }
                                    }}
                                />
                            </div>
                            {errors.password && <span className="text-danger text-xs font-bold ml-1 mt-1">{errors.password}</span>}
                        </label>

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