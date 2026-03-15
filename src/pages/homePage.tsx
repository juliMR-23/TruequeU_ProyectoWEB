import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <main className='mx-auto max-w-6xl px-6 py-12'>
            <div className="flex flex-col items-center justify-center">
                <header className="text-center mb-10">
                    <p className="text-eia-gris text-[clamp(1.5rem,3vw,2rem)]">Un lugar para compartir</p>
                    <h1 className="font-bold text-eia-azul text-[clamp(3.4rem,8vw,6rem)]">Bienvenid@</h1>
                    {/* text[8vw] hace que crezca seún la pantalla, es fluido (vw=view width),
                    clamp le da max y min para que no sea desproporcional */}
                </header>
                
                <div className="flex flex-row items-center gap-6">
                    <Link to="/signup">
                        <Button variant='primary'>Registrarse</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant='outline'>Iniciar sesión</Button>
                    </Link>
                </div>
            </div>
        </main>

    );
}

