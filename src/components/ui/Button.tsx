type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  type?: "button" | "submit";
  className?: string;
};

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
  className = "",
}: Props) {
  // El secreto está en border-2 fijo aquí y que cada variante defina su color de borde
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-md tracking-wide font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-eia-azul-claro/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-xl border-2";

  const variants = {
    primary: "bg-eia-azul border-eia-azul text-white hover:bg-eia-azul-claro hover:border-eia-azul-claro shadow-sm",
    
    secondary: "bg-tx-oscuro border-tx-oscuro text-white hover:bg-slate-700 hover:border-slate-700 focus:ring-slate-400",
    
    outline: "bg-transparent border-eia-azul text-eia-azul hover:bg-eia-azul hover:text-white focus:ring-eia-azul",
    
    danger: "bg-danger border-danger text-white hover:opacity-70 focus:ring-red-400 shadow-sm",
    
    success: "bg-success border-success text-white hover:opacity-80 focus:ring-emerald-400 shadow-sm",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}