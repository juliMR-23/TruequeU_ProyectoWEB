import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-eia-azul text-white mt-auto">
      <div className="mx-auto max-w-7xl px-8 py-5">
        
        <div className="flex justify-between gap-8">
          
          <div className="flex flex-col gap-1 max-w-xl text-left">
            <h2 className="text-eia-azul-claro font-bold tracking-widest text-xl">
              TRUEQUE U
            </h2>
            <p className="text-white/70 text-sm">
              Fomentando la economía circular y el apoyo entre estudiantes de la Universidad EIA.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-sm text-white/80">
            <a href="https://github.com/juliMR-23/TruequeU_ProyectoWEB" target="_blank" 
              className="flex items-center gap-2 hover:text-eia-azul-claro"
            >
              <FiGithub className="w-5 h-5" />
              <span>Repositorio del Proyecto</span>
            </a>
            <a href="https://www.eia.edu.co" target="_blank" className="flex items-center gap-2 hover:text-eia-azul-claro">
              <FiExternalLink className="w-5 h-5" />
              <span>Sitio Web EIA</span>
            </a>
          </div>
        </div>

        
        <div className="mt-5 pt-5 border-t border-white/10 text-center text-xs gap-4 text-white/40 tracking-widest">
          <p>© 2026 UNIVERSIDAD EIA • PROYECTO INGENIERÍA WEB • EQUIPO 9</p>
        </div>
      </div>
    </footer>
  );
}