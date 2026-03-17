import { useState } from "react";
import { FiPlusCircle, FiType, FiFileText, FiImage, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ListingStatusEnum, type Listing, type ListingImage } from "../types";


export default function AddListingPage() {
    const navigate = useNavigate();

    // agrupando los campos, menos imágenes que es más complejo
    const [formData, setFormData] = useState({
        title: "",
        category: "Libros",
        condition: "Nuevo",
        description: "",
        price: 0,           // Nuevo campo
        location: "Sede Las Palmas",
    });

    // Estado independiente para las imágenes, son lista dinámica
    const [imageUrls, setImageUrls] = useState<string[]>([""]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (formData.title.trim().length < 8 || formData.title.trim().length > 40)
            newErrors.title = "El título debe tener entre 8 y 40 caracteres";
        if (formData.description.trim().length < 12 || formData.title.trim().length > 150)
            newErrors.description = "La descripción debe tener entre 20 y 150 caracteres";

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

    //filter() genera un nuevo array excluyendo el elemento del índice seleccionado
    const removeImageField = (index: number) => {
        if (imageUrls.length > 1) {
            setImageUrls(imageUrls.filter((_, i) => i !== index));
        }
    };

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();//evita que la página refresque
        const validationErrors = validate();

        //revisa errores (elementos de una lista)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // Mapear las strings de URLs al formato de la interfaz ListingImage
        const validImages: ListingImage[] = imageUrls
            .filter(url => url.trim() !== "")
            .map((url, index) => ({
                id: Date.now() + index, // ID único para cada imagen
                url: url,
                order: index
            }));

        // Crear el objeto Listing 
        const newListing: Listing = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            category: formData.category,
            condition: formData.condition,
            price: formData.price,
            location: formData.location,
            status: ListingStatusEnum.available, // Usando Enum de types.ts
            ownerId: 12345, // ID ficticio del usuario, por ahora sin verificación real
            images: validImages
        };

        // Persistencia
        const existingData = localStorage.getItem("eia_listings");
        const listings = existingData ? JSON.parse(existingData) : [];

        localStorage.setItem("eia_listings", JSON.stringify([newListing, ...listings]));

        navigate("/publicaciones");
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <section className="bg-white shadow-xl rounded-2xl border border-eia-azul/10 overflow-hidden">
                <div className="bg-eia-azul-claro py-6 px-10 text-white flex items-center gap-3">
                    <FiPlusCircle size={28} />
                    <h1 className="text-2xl font-bold tracking-tight">Nueva Publicación</h1>
                </div>

                <div className="p-10">
                    {/* grid-cols-1 md:grid-cols-2 maneja el diseño responsivo (móvil/escritorio) */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={onSubmit}>

                        {/* md:col-span-2 hace que el campo ocupe el ancho completo en pantallas grandes */}
                        <label className="flex flex-col gap-1.5 md:col-span-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">TÍTULO DEL OBJETO</span>
                            <div className="relative">
                                {/* posición absoluta para que "flote" */}
                                <FiType className="absolute left-4 top-4 text-eia-gris" />
                                <input
                                    className={`w-full rounded-xl border-2 bg-eia-fondo px-12 py-3 text-md outline-none transition-all ${errors.title ? 'border-danger' : 'border-eia-fondo'}`}
                                    type="text" placeholder="Ej. Libro de Cálculo de Stewart"
                                    value={formData.title}
                                    // Sincronización
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            {errors.title && <span className="text-danger text-xs font-bold ml-1">{errors.title}</span>}
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">CATEGORÍA</span>
                            <select
                                className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-4 py-3 text-md outline-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Libros">Libros</option>
                                <option value="Útiles">Útiles</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Accesorios">Accesorios</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">ESTADO</span>
                            <select
                                className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-4 py-3 text-md outline-none"
                                value={formData.condition}
                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                            >
                                <option value="Nuevo">Nuevo</option>
                                <option value="Usado">Usado</option>
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
                                                className={`w-full rounded-xl border-2 bg-eia-fondo px-12 py-3 text-md outline-none transition-all ${errors.images ? 'border-danger/30' : 'border-eia-fondo'}`}
                                                type="url" placeholder="https://..."
                                                value={url} onChange={(e) => updateImageUrl(index, e.target.value)}
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
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">DESCRIPCIÓN</span>
                            <div className="relative">
                                <FiFileText className="absolute left-4 top-4 text-eia-gris" />
                                <textarea
                                    className={`w-full rounded-xl border-2 bg-eia-fondo px-12 py-3 text-md outline-none transition-all min-h-[120px] ${errors.description ? 'border-danger' : 'border-eia-fondo'}`}
                                    placeholder="Describe detalles, marcas de uso o especificaciones..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            {errors.description && <span className="text-danger text-xs font-bold ml-1">{errors.description}</span>}
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">PRECIO (COP)</span>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-eia-gris font-bold">$</span>
                                <input
                                    className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-10 py-3 text-md outline-none focus:border-eia-azul-claro/30 transition-all"
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                />
                            </div>
                        </label>

                        {/* UBICACIÓN / CAMPUS */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-eia-azul-claro ml-1">SEDE / CAMPUS</span>
                            <select
                                className="w-full rounded-xl border-2 border-eia-fondo bg-eia-fondo px-4 py-3 text-md outline-none focus:border-eia-azul-claro/30 transition-all"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            >
                                <option value="Sede Las Palmas">Sede Las Palmas</option>
                                <option value="Sede Zúñiga">Sede Zúñiga</option>
                            </select>
                        </label>
                        <div className="md:col-span-2 mt-8 flex flex-col md:flex-row gap-4 justify-center border-t pt-8 border-eia-fondo">
                            <Button type="submit" variant="primary" className="w-full max-w-xs">Publicar Objeto</Button>
                            {/* navigate(-1) es cosa de react-router, para volver a la pág anterior */}
                            <Button type="button" variant="outline" className="w-full max-w-xs" onClick={() => navigate(-1)}>Cancelar</Button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}