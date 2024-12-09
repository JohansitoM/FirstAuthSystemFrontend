
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'
import ProtectedRoute from "./components/ProtectedRoute";
import RecoverPass from "./components/Auth/RecoverPass";
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import VerifyEmail from './components/Auth/VerifyEmail'
import ResetPassword from './components/Auth/ResetPassword'
import UsersPage from './components/UsersPage'

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/recoverPass" element={<RecoverPass />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />

              <Route path='/' element={<Navigate to="/login" />}></Route>
          </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
