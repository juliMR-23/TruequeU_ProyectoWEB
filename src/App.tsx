import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/homePage'
import NotFoundPage from './pages/notFoundPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-eia-fondo'>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
