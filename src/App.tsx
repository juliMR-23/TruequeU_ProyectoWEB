import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center">
        <main className="text-3xl text-center m-10">
          <p>Un lugar para compartir</p>
          <h1 className="font-bold text-6xl">Bienvenid@!</h1>
        </main>
        <div className="flex flex-row items-center gap-6">
          <button className="bg-black text-white font-semibold tracking-wide p-2 rounded-lg">
            Registrarse
          </button>
          <button className="bg-black text-white font-semibold tracking-wide p-2 rounded-lg">
            Iniciar sesión
          </button>
        </div>
      </div>
    </>
  )
}

export default App
