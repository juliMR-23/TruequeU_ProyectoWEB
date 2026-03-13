import { FiLoader, FiAlertTriangle, FiInbox } from "react-icons/fi";
import Button from "./Button"; 

type Props = {
  title: string;
  type: "empty" | "loading" | "error";
  description?: string;
  actionText?: string;
  onAction?: () => void;
};

export default function StateMessage({ 
  title, 
  type, 
  description, 
  actionText, 
  onAction 
}: Props) {
  
  const Icon = type === "loading" ? FiLoader : type === "error" ? FiAlertTriangle : FiInbox;

  const styles = {
    error: {
      ring: "border-danger/20 bg-danger/5 text-danger",
      border: "border-danger/30"
    },
    loading: {
      ring: "border-eia-azul-claro/20 bg-eia-azul-claro/5 text-eia-azul-claro",
      border: "border-eia-azul-claro/30"
    },
    empty: {
      ring: "border-eia-gris/20 bg-white text-eia-gris",
      border: "border-eia-gris/30"
    }
  };

  const currentStyle = styles[type];

  return (
    <div className={`rounded-xl border border-dashed p-8 text-center bg-white shadow-sm ${currentStyle.border}`}>
      <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 ${currentStyle.ring}`}>
        <Icon size={24} className={type === "loading" ? "animate-spin" : ""} />
      </div>
      <h2 className="text-xl font-bold text-eia-azul leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-md text-tx-suave max-w-xs mx-auto">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant={type === "error" ? "danger" : "outline"} 
            onClick={onAction}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}