import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
  listingId: number;
  isFavorite: boolean;
  onToggle: (id: number) => void;
};

export default function FavoriteButton({ listingId, isFavorite, onToggle }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // evita que el click abra el listing
        onToggle(listingId);
      }}
      className="p-1 rounded-full bg-white/80 hover:bg-white transition cursor-pointer"
      aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      {isFavorite
        ? <FaStar className="text-yellow-500 w-5 h-5" />
        : <FaRegStar className="text-gray-400 w-5 h-5 hover:text-yellow-300" />
      }
    </button>
  );
}