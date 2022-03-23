import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Demo from './pages/demo/Demo'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

const Paths = () => {
  return (
    <div>
      <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/demo" element={<Demo />} />
    </Routes>
    </div>
  )
}

export default Paths