import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

export const HOST = window.location.hostname === 'localhost' ? "http://localhost:4000/api" : '/api';

function App() {
  const [token, setToken] = useState(window.localStorage.getItem('user'));

  if (token) {
    return <HomePage />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={
            <NoRoute />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

function NoRoute() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate('/login')
  })
  return (
    <main style={{ padding: "1rem" }}>
      <p>There's nothing here!</p>
    </main>
  )
}

export default App
