import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Demo from './pages/demo/Demo'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import EmailConfirm from './components/email/EmailConfirm'

const Paths = () => {
  return (
    <div>
      <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/*" element={<Unknown />} />
    </Routes>
    </div>
  )
}

function Unknown() {
  return <div>Error 404 | Page not found!</div>
}

export default Paths