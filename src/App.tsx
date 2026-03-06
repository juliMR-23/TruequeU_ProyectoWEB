import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <main>
        <p>Un lugar para compartir</p>
        <h1>Bienvenido!</h1>
      </main>
    </>
  )
}

export default App
