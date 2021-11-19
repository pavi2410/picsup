import React from 'react'
import ReactDOM from 'react-dom'
import "tailwindcss/tailwind.css"
import App from './App'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
