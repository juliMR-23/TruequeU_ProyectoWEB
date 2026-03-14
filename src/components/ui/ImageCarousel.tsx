import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { ListingImage } from "../../types";

type Props = {
  images: ListingImage[];
};

export default function ImageCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative h-100 w-full rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">

      {/* Imagen activa */}
      <img
        src={images[current].url}
        alt={`Imagen ${current + 1}`}
        className="w-full h-full object-contain transition-all duration-300"
      />

      {/* Botón anterior */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition cursor-pointer"
      >
        <FaChevronLeft />
      </button>

      {/* Botón siguiente */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition cursor-pointer"
      >
        <FaChevronRight />
      </button>

      {/* Indicadores (puntitos) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Contador */}
      <span className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
        {current + 1} / {images.length}
      </span>

    </div>
  );
}