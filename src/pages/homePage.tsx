import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <main className='mx-auto max-w-6xl px-6 py-12'>
            <div className="flex flex-col items-center justify-center">
                <header className="text-center mb-10">
                    <p className="text-tx-suave text-2xl">Un lugar para compartir</p>
                    <h1 className="font-bold text-7xl text-eia-azul">Bienvenid@</h1>
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

