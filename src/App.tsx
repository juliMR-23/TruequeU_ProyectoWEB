import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUpPage'
import NotFoundPage from './pages/notFoundPage'
import PublicationPage from './pages/publicationPage'
import AddListingPage from './pages/addListingPage'
import FavoritesPage from './pages/favoritePage'
import ListingDetailPage from './pages/listingDetails'
import ProfilePage from './pages/profilePage'
import ChatPage from './pages/chatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col min-h-screen bg-eia-fondo'>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/publicaciones" element={<PublicationPage/>}/>
          <Route path="/crearListing" element={<AddListingPage/>}/>
          <Route path="/favoritos" element={<FavoritesPage/>}/>
          <Route path="/details/:id" element={<ListingDetailPage/>}/>
          <Route path="/perfil" element={<ProfilePage/>}/>
          <Route path="/chat/:id" element={<ChatPage/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App