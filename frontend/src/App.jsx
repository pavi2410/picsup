import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'
import OwnerPage from './pages/OwnerPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const HOST = window.location.hostname === 'localhost' ? "http://localhost:4000/api" : '/api';

function App() {
  const [token, setToken] = useState(window.localStorage.getItem('user'));

  if (token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/me/images" element={<OwnerPage />} />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NoRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

function NoRoute() {
  return (
    <main style={{ padding: "1rem" }}>
      <p>There's nothing here!</p>
      <p>Back to <a href="/">home</a></p>
    </main>
  )
}

export default App
