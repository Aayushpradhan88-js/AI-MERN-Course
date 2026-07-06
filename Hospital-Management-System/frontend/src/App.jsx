import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
