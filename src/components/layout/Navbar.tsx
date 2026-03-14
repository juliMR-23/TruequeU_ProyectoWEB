import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiList, FiStar, FiUser, FiMenu, FiX } from "react-icons/fi";
import logo from '../../assets/logo.svg';

export default function Navbar() {
    // Estado para controlar la visibilidad del menú en móviles
    const [isOpen, setIsOpen] = useState(false);

    // Estilos base para los links (Escritorio)
    const linkBase = "flex items-center gap-2 text-md tracking-wide transition-all duration-200 text-white/70 hover:text-white";
    const activeClass = "text-white font-bold border-b-2 border-eia-azul-claro pb-1 md:pb-0";

    // Función para cerrar el menú al hacer clic en un link
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="w-full bg-eia-azul shadow-md sticky top-0 z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                
                <NavLink to="/" className="flex items-center gap-3 group z-50" onClick={closeMenu}>
                    <img className="w-8 h-8 transition-transform group-hover:scale-110" src={logo} alt="logo" />
                    <h2 className="text-xl md:text-2xl font-bold tracking-widest text-white">
                        TRUEQUE U
                    </h2>
                </NavLink>

                {/* BOTÓN HAMBURGUESA: Solo visible en móvil */}
                <button 
                    className="text-white text-3xl md:hidden z-50 focus:outline-none p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
                
                {/* NAVEGACIÓN: Lógica combinada */}
                <nav className={`
                    /* MÓVIL*/
                    ${isOpen ? "flex" : "hidden"} 
                    absolute top-full left-0 w-full bg-eia-azul flex-col gap-6 px-8 py-10 border-t border-white/10
                    
                    /*ESCRITORIO */
                    md:static md:flex md:flex-row md:gap-8 md:p-0 md:border-none md:w-auto md:opacity-100 md:visible md:translate-y-0
                `} aria-label="Nav principal">
                    
                    <NavLink 
                        to={"/"} 
                        onClick={closeMenu}
                        className={({ isActive }) => isActive ? `${linkBase} ${activeClass}` : linkBase}
                    >
                        <FiHome /> <span>Home</span>
                    </NavLink>

                    <NavLink 
                        to={"/publicaciones"} 
                        onClick={closeMenu}
                        className={({ isActive }) => isActive ? `${linkBase} ${activeClass}` : linkBase}
                    >
                        <FiList /> <span>Publicaciones</span>
                    </NavLink>
                    <NavLink to={"/favoritos"} onClick={closeMenu} className={({ isActive }) => isActive ? `${linkBase} ${activeClass}` : linkBase}>
                        <FiStar /> <span>Favoritos</span>
                    </NavLink>
                    <NavLink 
                        to={"/perfil"} 
                        onClick={closeMenu}
                        className={({ isActive }) => isActive ? `${linkBase} ${activeClass}` : linkBase}
                    >
                        <FiUser /> <span>Perfil</span>
                    </NavLink>
                </nav>
            </div>

            {/* OVERLAY: para estilo "opaco" y cerrar el menú si toca afuera */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 md:hidden -z-10" 
                    onClick={closeMenu}
                />
            )}
        </header>
    );
}