import { NavLink } from "react-router-dom";
import { FiHome, FiList, FiUser } from "react-icons/fi";
import logo from '../../assets/logo.svg';

export default function Navbar() {
    const linkBase = "flex items-center gap-2 text-md tracking-wide transition-all duration-200 text-white/70 hover:text-white hover:text-shadow-xs hover:text-shadow-white";

    const activeClass = "text-white font-bold border-b-2 border-eia-azul-claro pb-1";

    return (
        <header className="w-full bg-eia-azul shadow-md sticky top-0 z-0">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">
                <NavLink to="/" className="flex items-center gap-3 group">
                    <img className="w-8 h-8 transition-transform group-hover:scale-110" src={logo} alt="logo" />
                    <h2 className="text-3xl font-bold tracking-widest text-white">
                        TRUEQUE U
                    </h2>
                </NavLink>
                
                <nav className="flex items-center gap-8" aria-label="Nav principal">
                    
                    <NavLink to={"/"} className={({ isActive }) => isActive ? `${linkBase} ${activeClass} ` : linkBase}>
                        <FiHome /> <span>Home</span>
                    </NavLink>
                    <NavLink to={"/publicaciones"} className={({ isActive }) => isActive ? `${linkBase} ${activeClass}` : linkBase}>
                        <FiList /> <span>Publicaciones</span>
                    </NavLink>

                    <NavLink to={"/perfil"} className={({ isActive }) => isActive ? `${linkBase} ${activeClass}` : linkBase}>
                        <FiUser /> <span>Perfil</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}