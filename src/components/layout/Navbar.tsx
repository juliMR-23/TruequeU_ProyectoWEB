import logo from '../../assets/logo.svg';

export default function Navbar (){
    return(
        <header className="w-full bg-black flex items-center justify-between px-6 py-3 text-white">
            <div className="flex items-center gap-3">
                <img className="w-10 h-10" src={logo} alt="logo"/>
                <h2 className="text-3xl font-bold tracking-widest">TRUEQUE U</h2>
            </div>
            <nav className="flex gap-6">
                <a className="hover:underline" href="#" onClick={(e)=>e.preventDefault()}>Home</a>
                <a className="hover:underline" href="#" onClick={(e)=>e.preventDefault()}>Publishing</a>
                <a className="hover:underline" href="#" onClick={(e)=>e.preventDefault()}>Chat</a>
            </nav>
        </header>
    );
}