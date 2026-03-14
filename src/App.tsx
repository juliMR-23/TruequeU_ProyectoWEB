import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUpPage'
import NotFoundPage from './pages/notFoundPage'
import Footer from './components/layout/footer'
import PublicationPage from './pages/publicationPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col min-h-screen bg-eia-fondo'>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/publicaciones' element={<PublicationPage/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App