import { useState, useEffect } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { FiAlertTriangle, FiFileText, FiPackage, FiUser } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import StateMessage from "../components/ui/StateMessage";
import { BsPersonSlash } from "react-icons/bs";
import { reportService } from "../services/reportService";


//mapeo local que funciona como enum
const ReportReasonMap = [//para el select de motivo
    { value: 0, label: "Contenido Inapropiado" },
    { value: 1, label: "Spam o Publicidad" },
    { value: 2, label: "Fraude o Estafa" },
    { value: 3, label: "Producto Falso o Réplica" },
    { value: 4, label: "Acoso o Abuso en el chat" },
    { value: 5, label: "Otro motivo" }
];

export default function CreateReportPage() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();

    //useMatch para manejar distinto users o listings (cambia ruta misma página)
    const matchListing = useMatch("/reportListing/:id");
    const matchUser = useMatch("/reportUser/:id");

    const targetId = matchListing?.params.id || matchUser?.params.id;
    const isListingReport = !!matchListing; // true si es publicación, false si es usuario

    //estados del formulario y de envío local
    const [reason, setReason] = useState<number>(0);
    const [comment, setComment] = useState("");
    const [formError, setFormError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    //redirigir tras un envío exitoso
    useEffect(() => {
        if (isSuccess)
            navigate(-1);
    }, [isSuccess, navigate]);

    if (authLoading) return (
        <main className="mx-auto max-w-xl px-6 py-24">
            <StateMessage type="loading" title="Verificando sesión..." />
        </main>
    );

    if (!user) return (
        <main className="mx-auto max-w-2xl px-6 py-24">
            <StateMessage
                type="empty"
                title="Ingresa para enviar un reporte"
                description="Debes ser parte de la comunidad EIA para denunciar una publicación o usuario."
                actionText="Registrarse"
                onAction={() => navigate("/signup")}
                icon={<BsPersonSlash size={32} className="text-eia-gris" />}
            />
        </main>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (comment.trim().length < 20 || comment.trim().length > 500) {
            setFormError("El comentario descriptivo debe tener entre 20 y 500 caracteres.");
            return;
        }

        try {
            await reportService.createReport({
                reportedUserId: isListingReport ? undefined : targetId,
                reportedListingId: isListingReport ? targetId : undefined,
                reason: reason,
                comment: comment.trim()
            });
            setIsSuccess(true);
        } catch (err: any) {
            setFormError(err?.message || "Error al enviar el reporte. Intenta de nuevo.");
        }
    };

    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <section className="bg-white shadow-xl rounded-2xl border border-danger/10 overflow-hidden">

                {/* Título adaptado al contexto de la ruta */}
                <div className="flex bg-danger py-6 px-10 text-white items-center gap-2">
                    <FiAlertTriangle size={28} />
                    <h1 className="text-2xl font-bold tracking-tight">
                        {isListingReport ? "Reportar publicación" : "Reportar usuario"}
                    </h1>
                </div>

                <div className="px-10 pb-8">

                    {/* Banner informativo para el estudiante */}
                    <div className="mb-6 flex flex-col p-3 gap-2">
                        <p className="italic text-eia-gris text-xs self-end">
                            <span className="text-danger font-bold">*</span> Campos obligatorios
                        </p>
                        <p className="text-md text-eia-azul font-medium">
                            {isListingReport
                                ? `Infracción detectada en la publicación con ID: ${targetId}`
                                : `Comportamiento indebido del estudiante con ID: ${targetId}`
                            }
                        </p>
                    </div>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                        {/* Selector dinámico mapeado */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold tracking-wider text-eia-azul-claro ml-1">
                                MOTIVO DE LA DENUNCIA<span className="text-danger">*</span>
                            </span>
                            <select
                                className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-4 py-3 text-md outline-none focus:border-eia-azul-claro"
                                value={reason}
                                onChange={(e) => setReason(Number(e.target.value))}
                            >
                                {ReportReasonMap.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Caja de texto con placeholders adaptados */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold tracking-wider text-eia-azul-claro ml-1">
                                COMENTARIO ADICIONAL<span className="text-danger">*</span>
                            </span>
                            <div className="relative">
                                <FiFileText className="absolute left-4 top-4 text-eia-gris" />
                                <textarea
                                    className={`w-full rounded-xl border-2 px-12 py-3 text-md outline-none transition-all min-h-[140px] ${formError ? 'border-danger bg-danger/5' : 'bg-eia-fondo border-eia-fondo focus:border-eia-azul-claro'}`}
                                    placeholder={isListingReport
                                        ? "Describe por qué este objeto rompe las reglas (datos falsos, categoría incorrecta, etc)..."
                                        : "Describe los detalles del abuso o infracción de este usuario..."
                                    }
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                        if (formError) setFormError("");
                                    }}
                                />
                            </div>
                            {formError && <span className="text-danger text-xs font-bold ml-1">{formError}</span>}
                        </label>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t pt-6 border-eia-fondo">
                            <Button type="submit" variant="danger" className="w-full max-w-xs">
                                Enviar Reporte
                            </Button>
                            <Button type="button" variant="outline" className="w-full max-w-xs" onClick={() => navigate(-1)}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}