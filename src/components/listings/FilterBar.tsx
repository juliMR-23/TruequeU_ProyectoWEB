
import { FiRefreshCcw, FiSearch } from "react-icons/fi";
import Button from "../ui/Button";

// Este patrón se llama "lifting state up": el estado vive en el padre (App) y se pasa al hijo.
type Props = {
  searchTerm: string;
  onSearchTerm: (value: string) => void;
  genres: string[];
  selectedGenre: string;
  onSelectedGenre: (value: string) => void;
  cities: string[];
  selectedCity: string;
  onSelectedCity: (value: string) => void;
  onlyAvailable: boolean;
  onSetOnlyAvailable: (value: boolean) => void;
  onReset: () => void;

}

// Componente de la barra de filtros.
// Contiene: campo de búsqueda, selectores de género y ciudad, checkbox y botón de reset.
export default function FilterBar({
  searchTerm,
  onSearchTerm,
  genres,
  selectedGenre,
  onSelectedGenre,
  cities,
  selectedCity,
  onSelectedCity,
  onlyAvailable,
  onSetOnlyAvailable,
  onReset
}: Props) {
  const inputBase =
    "w-full bg-transparent text-sm outline-none placeholder:text-gray-400";
  const fieldBase =
    "rounded-input border border-border bg-surface px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-brand-300";

  return (
    <section className="mt-5 rounded-card border border-border bg-surface p-4 shadow-card">
      <div className="grid gap-3 lg:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="text-xs text-muted">Search</span>
          <div className={`flex items-center gap-2 ${fieldBase}`}>
            <FiSearch className="text-muted" />
            <input
              className={inputBase}
              type="text"
              value={searchTerm}
              placeholder="Title, venue, city..."
              onChange={(e) => onSearchTerm(e.target.value)}
            />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs text-muted">Genre</span>
          <select
            className={`cursor-pointer ${fieldBase}`}
            value={selectedGenre}
            onChange={(e) => onSelectedGenre(e.target.value)}
          >
            <option value="ALL">All</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs text-muted">City</span>
          <select
            className={`cursor-pointer ${fieldBase}`}
            value={selectedCity}
            onChange={(e) => onSelectedCity(e.target.value)}
          >
            <option value="ALL">All</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onSetOnlyAvailable(e.target.checked)}
          />
          Only available
        </label>

        <Button variant="secondary" onClick={onReset}>
          <FiRefreshCcw />
          Reset
        </Button>
      </div>
    </section>
  );
}