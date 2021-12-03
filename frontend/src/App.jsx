import { useState, createContext } from 'react'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const HOST = "http://localhost:4000";

function App() {
  // let navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem('user'));

  if (token) {
    return <HomePage />
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" index element={<Login setToken={setToken} />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
  )
}

export default App
