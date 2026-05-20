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
import ChatsPage from "./pages/chatsPage";
import CreateReportPage from './pages/createReportPage'
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminPage from "./pages/adminPage";




function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col min-h-screen bg-eia-fondo'>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/publicaciones" element={<PublicationPage />} />
          <Route path="/details/:id" element={<ListingDetailPage />} />

          {/* Rutas de Client */}
          <Route path="/perfil" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/crearListing" element={
            <ProtectedRoute>
              <AddListingPage />
            </ProtectedRoute>
          } />
          <Route path="/favoritos" element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          } />
          <Route path="/chat/:id" element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } />
          <Route path="/chats" element={
            <ProtectedRoute>
              <ChatsPage />
            </ProtectedRoute>
          } />
          <Route path="/reportListing/:id" element={
            <ProtectedRoute>
              <CreateReportPage />
            </ProtectedRoute>
          } />
          <Route path="/reportUser/:id" element={
            <ProtectedRoute>
              <CreateReportPage />
            </ProtectedRoute>
          } />

          {/* Rutas de Admin */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="Admin">
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App