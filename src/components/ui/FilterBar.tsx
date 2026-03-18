import { ListingStatusEnum } from "../../types";
import { FiSearch, FiX } from "react-icons/fi";

type Props = {
  search: string;
  status: string;
  condition: string;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onConditionChange: (v: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

export default function FilterBar({
  search, status, condition,
  onSearchChange, onStatusChange, onConditionChange,
  onClear, hasActiveFilters
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">

      {/* Búsqueda por nombre */}
      <div className="relative flex-1 min-w-48">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar publicación..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-xl text-text outline-none focus:border-eia-azul-claro transition"
        />
      </div>

      {/* Filtro por estado */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="py-2 px-3 text-sm bg-surface border border-border rounded-xl text-text outline-none focus:border-eia-azul-claro transition"
      >
        <option value="">Todos los estados</option>
        <option value={ListingStatusEnum.available}>Disponible</option>
        <option value={ListingStatusEnum.reserved}>Reservado</option>
        <option value={ListingStatusEnum.sold}>Vendido</option>
      </select>

      {/* Filtro por condición */}
      <select
        value={condition}
        onChange={(e) => onConditionChange(e.target.value)}
        className="py-2 px-3 text-sm bg-surface border border-border rounded-xl text-text outline-none focus:border-eia-azul-claro transition"
      >
        <option value="">Todas las condiciones</option>
        <option value="new">Nuevo</option>
        <option value="used">Usado</option>
      </select>

      {/* Botón limpiar — solo aparece si hay filtros activos */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-sm text-muted hover:text-red-500 transition px-3 py-2 rounded-xl hover:bg-red-50 border border-border"
        >
          <FiX className="w-4 h-4" />
          Limpiar
        </button>
      )}

    </div>
  );
}