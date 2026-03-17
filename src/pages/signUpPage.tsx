import { useState } from "react";
import { FiUserPlus, FiUser, FiMail, FiLock, FiBookOpen } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

// Definimos la forma de nuestro objeto de errores
interface FormErrors {
    name?: string;
    email?: string;
    major?: string;
    password?: string;
}//para que cada error "apunte" al campo y el display sea junto a los cuadros de texto

export default function SignUpPage() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { register } = useAuth(); //extrae la funcion que necesita
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState<FormErrors>({});

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({}); // Reset errores
        setIsSubmitting(true);

        const newErrors: FormErrors = {};

        // Validaciones locales
        if (!name.trim()) newErrors.name = "El nombre es obligatorio.";

        const eiaEmailRegex = /^.*@eia\.edu\.co$/; // dominio institucional
        if (!email.trim()) newErrors.email = "El correo es obligatorio.";
        else if (!eiaEmailRegex.test(email)) {
            newErrors.email = "Usa tu correo institucional @eia.edu.co";
        }
        if (!major.trim()) newErrors.major = "Indica tu carrera actual.";

        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/;
        if (password.length < 6) {
            newErrors.password = "Mínimo 6 caracteres.";
        } else if (!passRegex.test(password)) {
            newErrors.password = "Debe incluir mayúsculas, minúsculas y números.";
        }
        // Si hay errores frena todo
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }
        try {
            await register({ name, email, major, password });
            navigate("/");
        } catch (err: any) {
            setErrors({ email: err || "El correo ya está registrado o hubo un error." });
        } finally {
            setIsSubmitting(false);
        }
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
                                    className={`w-full rounded-xl border-2 px-12 py-3 text-md outline-none transition-all ${errors.name ? "border-danger bg-danger/5" : "border-eia-fondo bg-eia-fondo"}`}
                                    type="text" placeholder="Ej. Juan Pérez"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                                    }}
                                />
                            </div>
                            {errors.name && <span className="text-danger text-xs font-bold ml-1">{errors.name}</span>}
                        </label>

                        {/* Email y Carrera en la misma fila */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">Correo Institucional</span>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className={`w-full rounded-xl border-2 px-12 py-3 text-md outline-none transition-all ${errors.email ? "border-danger bg-danger/5" : "border-eia-fondo bg-eia-fondo"}`}
                                    type="email" placeholder="usuario@eia.edu.co"
                                    value={email} 
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                    }}
                                />
                            </div>
                            {errors.email && <span className="text-danger text-xs font-bold ml-1">{errors.email}</span>}
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">Carrera</span>
                            <div className="relative">
                                <FiBookOpen className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className={`w-full rounded-xl border-2 px-12 py-3 text-md outline-none transition-all ${errors.major ? "border-danger bg-danger/5" : "border-eia-fondo bg-eia-fondo"}`}
                                    type="text" placeholder="Ingeniería..."
                                    value={major} 
                                    onChange={(e) => {
                                        setMajor(e.target.value);
                                        if (errors.major) setErrors(prev => ({ ...prev, major: undefined }));
                                    }}
                                />
                            </div>
                            {errors.major && <span className="text-danger text-xs font-bold ml-1">{errors.major}</span>}
                        </label>

                        {/* Password ocupa todo el ancho */}
                        <label className="flex flex-col gap-1.5 md:col-span-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">Contraseña</span>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className={`w-full rounded-xl border-2 px-12 py-3 text-md outline-none transition-all ${errors.password ? "border-danger bg-danger/5" : "border-eia-fondo bg-eia-fondo"}`}
                                    type="password" placeholder="••••••••"
                                    value={password} 
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                                    }}
                                />
                            </div>
                            {errors.password && <span className="text-danger text-xs font-bold ml-1">{errors.password}</span>}
                        </label>

                        <div className="md:col-span-2 mt-4 flex flex-col items-center">
                            <Button type="submit" variant="primary"
                                className="w-full max-w-sm py-3 text-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creando cuenta..." : "Registrarme"}
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