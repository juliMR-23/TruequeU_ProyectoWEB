type Props = {
  children: React.ReactNode;
  variant?: "success" | "danger" | "neutral" | "info";
};

export default function Badge({ children, variant = "neutral" }: Props) {
  const base = "inline-flex items-center rounded-full border px-2 py-1 text-xs font-bold";
  const variants = {
    success: "border-green-200 text-success bg-green-100",
    danger: "border-red-200 text-danger bg-red-100",
    neutral: "border-border text-muted bg-white",
    info: "border-border text-info bg-cyan-100"
  };

  return <span className={`${base}  ${variants[variant]}`}>{children}</span>;
}