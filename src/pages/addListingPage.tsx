import { useState } from "react";
import { FiPlusCircle, FiType, FiFileText, FiPlus, FiTrash2, FiImage } from "react-icons/fi";
import { BsPersonSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { Categoria, Condicion, Estado, Ubicacion } from "../types";
import { useAuth } from "../hooks/useAuth";
import StateMessage from "../components/ui/StateMessage";
import { listingService } from "../services/listingService"


export default function AddListingPage() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    // agrupando los campos, menos imágenes que es más complejo
    const [formData, setFormData] = useState({
        titulo: "",
        categoria: Categoria.Libros,
        condicion: Condicion.Nuevo,
        descripcion: "",
        precio: 0,
        ubicacion: Ubicacion.SedePalmas,
    });

    const ubicacionLabels: Record<Ubicacion, string> = {
        [Ubicacion.SedePalmas]: "Sede Las Palmas",
        [Ubicacion.SedeZuniga]: "Sede Zúñiga"
    };

    // Estado independiente para las imágenes, son lista dinámica
    const [imageUrls, setImageUrls] = useState<string[]>([""]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    if (loading) return (
        <div className="py-20">
            <StateMessage type="loading" title="Cargando la página" />
        </div>
    );

    if (!user) return (
        <main className="mx-auto max-w-2xl px-6 py-24">
            <StateMessage
                type="empty"
                title="Ingresa para crear publicaciones"
                description="Debes ser parte de la comunidad EIA para publicar tus trueques."
                actionText="Registrarse"
                onAction={() => navigate("/signup")}
                icon={<BsPersonSlash size={32} className="text-eia-gris" />}
            />
        </main>
    );

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (formData.titulo.trim().length < 8 || formData.titulo.trim().length > 40)
            newErrors.titulo = "El título debe tener entre 8 y 40 caracteres";
        if (formData.descripcion.trim().length < 20 || formData.descripcion.trim().length > 500)
            newErrors.descripcion = "La descripción debe tener entre 20 y 500 caracteres";
        if (formData.precio < 0)
            newErrors.precio = "El precio no puede ser negativo";
        else if (formData.precio > 10000000)
            newErrors.precio = "El precio supera el tope (max:10.000.000)";

        // trim para que no acepte vacío ni solo espacios
        const validImages = imageUrls.filter(url => url.trim() !== "");
        if (validImages.length < 3)
            newErrors.images = "Debes agregar al menos 3 imágenes del objeto";
        if (validImages.length > 8)
            newErrors.images = "No puedes agregar más de 8 imágenes del objeto";

        return newErrors;
    };

    // Se usa (...) para crear una copia del array (no borra lo de antes) y añadir un nuevo elemento
    const addImageField = () => setImageUrls([...imageUrls, ""]);

    //(prev) para garantizar que es el estado más reciente
    // .map() crea un array nuevo y reemplaza el índice modificado.
    const updateImageUrl = (index: number, value: string) => {
        setImageUrls((prev) =>
            prev.map((url, i) => (i === index ? value : url))
        );
    };

    // //filter() genera un nuevo array excluyendo el elemento del índice seleccionado
    const removeImageField = (index: number) => {
        if (imageUrls.length > 1) {
            setImageUrls(imageUrls.filter((_, i) => i !== index));
        }
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();//evita que la página refresque
        const validationErrors = validate();

        //revisa errores (elementos de una lista)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            setSubmitting(true);
            await listingService.create({
                titulo: formData.titulo,
                descripcion: formData.descripcion,
                categoria: formData.categoria,
                condicion: formData.condicion,
                precio: formData.precio,
                ubicacion: formData.ubicacion,
                imageUrls: imageUrls.filter(url => url.trim() !== "")
            });
            navigate("/publicaciones");
        } catch (err) {
            setErrors({ general: "Error al crear la publicación. Intenta de nuevo." });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <section className="bg-white shadow-xl rounded-2xl border border-eia-azul/10 overflow-hidden">
                <div className="flex md:flex-row flex-col justify-between bg-eia-azul-claro py-6 px-10 text-white items-center">
                    <div className="flex items-center gap-2">
                        <FiPlusCircle size={28} />
                        <h1 className="text-2xl font-bold tracking-tight">Nueva Publicación</h1>
                    </div>
                    <span className="text-[10px] opacity-85 italic tracking-widest">
                        <span className="text-danger text-sm font-bold">*</span> Campos obligatorios
                    </span>
                </div>


                <div className="px-10 py-8">
                    {/* grid-cols-1 md:grid-cols-2 para diseño responsive (móvil/escritorio) */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={onSubmit}>

                        {errors.general && (
                            <p className="md:col-span-2 text-danger text-sm font-bold">{errors.general}</p>
                        )}
                        {/* md:col-span-2 hace que el campo ocupe el ancho completo en pantallas grandes */}
                        <label className="flex flex-col gap-1.5 md:col-span-2">
                            <span className="text-xs font-bold tracking-wider text-eia-azul-claro ml-1">
                                TÍTULO DEL OBJETO<span className="text-danger">*</span>
                            </span>
                            <div className="relative">
                                {/* posición absoluta para que "flote" */}
                                <FiType className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className={`w-full rounded-xl border-2 bg-eia-fondo px-12 py-3 text-md outline-none transition-all ${errors.titulo ? 'border-danger' : 'border-eia-fondo'}`}
                                    type="text" placeholder="Ej. Libro de Cálculo de Stewart"
                                    value={formData.titulo}
                                    // Sincronización
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                />
                            </div>
                            {errors.titulo && <span className="text-danger text-xs font-bold ml-1">{errors.titulo}</span>}
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold tracking-wider text-eia-azul-claro ml-1">
                                CATEGORÍA<span className="text-danger">*</span>
                            </span>
                            <select
                                className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-4 py-3 text-md outline-none"
                                value={formData.categoria}
                                onChange={(e) => setFormData({ ...formData, categoria: e.target.value as Categoria })}
                            >
                                {Object.values(Categoria).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold tracking-wider text-eia-azul-claro ml-1">
                                CONDICIÓN<span className="text-danger">*</span>
                            </span>
                            <select
                                className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-4 py-3 text-md outline-none"
                                value={formData.condicion}
                                onChange={(e) => setFormData({ ...formData, condicion: e.target.value as Condicion })}
                            >
                                {Object.values(Condicion).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </label>

                        <div className="md:col-span-2 flex flex-col gap-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">IMÁGENES DEL OBJETO (MÍNIMO 3)</span>
                            <div className="grid grid-cols-1 gap-3">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="relative flex-grow">
                                            <FiImage className="absolute left-4 top-4 text-eia-gris" />
                                            <input
                                                className={`w-full rounded-xl border-2 px-12 py-3 text-md outline-none transition-all ${errors.images ? 'border-danger/5 bg-danger/5' : 'bg-eia-fondo border-eia-fondo focus:border-eia-azul-claro'}`}
                                                type="url" placeholder="https://..."
                                                value={url}
                                                onChange={(e) => {
                                                    updateImageUrl(index, e.target.value)
                                                    if (errors.images) setErrors(prev => ({ ...prev, images: "" }))
                                                }}
                                            />
                                        </div>
                                        {imageUrls.length > 1 && (
                                            <button type="button" onClick={() => removeImageField(index)} className="text-danger p-2 hover:bg-danger/10 rounded-lg">
                                                <FiTrash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addImageField} className="flex items-center gap-2 text-eia-azul font-bold text-sm mt-2 hover:opacity-70">
                                <FiPlus /> Agregar otra imagen
                            </button>
                            {errors.images && <span className="text-danger text-xs font-bold ml-1">{errors.images}</span>}
                        </div>

                        <label className="flex flex-col gap-1.5 md:col-span-2">
                            <span className="text-xs font-bold tracking-wider text-eia-azul-claro ml-1">
                                DESCRIPCIÓN<span className="text-danger">*</span>
                            </span>
                            <div className="relative">
                                <FiFileText className="absolute left-4 top-4 text-eia-gris" />
                                <textarea
                                    className={`w-full rounded-xl border-2 bg-eia-fondo px-12 py-3 text-md outline-none transition-all min-h-[120px] ${errors.descripcion ? 'border-danger' : 'border-eia-fondo'}`}
                                    placeholder="Describe detalles, marcas de uso o especificaciones..."
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                />
                            </div>
                            {errors.descripcion && <span className="text-danger text-xs font-bold ml-1">{errors.descripcion}</span>}
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold tracking-wider text-eia-azul-claro ml-1">
                                PRECIO (COP)<span className="text-danger">*</span>
                            </span>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-eia-gris font-bold">$</span>
                                <input
                                    className={`w-full rounded-xl border-2 bg-eia-fondo px-10 py-3 text-md outline-none transition-all ${errors.precio ? 'border-danger' : 'border-eia-fondo'}`}
                                    type="number"
                                    placeholder="000"
                                    onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                                />
                                {errors.precio && (<span className="text-danger text-xs font-bold ml-1">{errors.precio}</span>)}
                            </div>
                        </label>

                        {/* UBICACIÓN */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold tracking-wider text-eia-azul-claro ml-1">
                                SEDE / CAMPUS<span className="text-danger">*</span>
                            </span>
                            <select
                                className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-4 py-3 text-md outline-none focus:border-eia-azul-claro/30 transition-all"

                                value={formData.ubicacion}
                                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value as Ubicacion })}
                            >
                                {Object.values(Ubicacion).map(u => (
                                    <option key={u} value={u}>{ubicacionLabels[u]}</option>
                                ))}
                            </select>
                        </label>
                        <div className="flex flex-col md:flex-row md:col-span-2 gap-4 justify-center items-center border-t pt-8 border-eia-fondo">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full max-w-xs"
                                disabled={submitting}
                            >
                                {submitting ? "Publicando..." : "Publicar Objeto"}
                            </Button>
                            <Button type="button" variant="outline" className="w-full max-w-xs" onClick={() => navigate(-1)}>Cancelar</Button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}