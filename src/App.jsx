// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import { Login } from './components/Login'
// import { SignUp } from './components/SignUp'
// import { RecoverPass } from "./components/RecoverPass/index.jsx";

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import VerifyEmail from './components/Auth/VerifyEmail'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'

function App() {
  return (
      <Router>
          <Routes>
              {/* <Route path={'/login'} element={ <Login /> } />
              <Route path={'/recoverPass'} element={ <RecoverPass /> } />
              <Route path={'/signup'} element={ <SignUp /> } /> */}

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
      </Router>
  )
}

export default App
