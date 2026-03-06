export default function Navbar (){
    return(
        <header className="w-full bg-white flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
                <img className="w-20 h-20" src="https://media.istockphoto.com/id/2159032510/es/vector/icono-de-interruptor-s%C3%ADmbolo-de-flechas-de-sincronizaci%C3%B3n-ilustraci%C3%B3n-vectorial-de.jpg?s=612x612&w=0&k=20&c=hHU8HpgFlVvhZYMrXLLuM7cf8MYYSlEliJjRbzPNskM=" alt="logo"/>
                <h2 className="text-black text-3xl font-bold tracking-widest">TRUEQUE U</h2>
            </div>
            
            <nav className="flex gap-6">
                <a href="#" onClick={(e)=>e.preventDefault()}>Home</a>
                <a href="#" onClick={(e)=>e.preventDefault()}>Publishing</a>
                <a href="#" onClick={(e)=>e.preventDefault()}>Chat</a>
            </nav>
        </header>
    );
}