import Login from './pages/Login'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'
import OwnerPage from './pages/OwnerPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, RequireAuth } from './auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'

export const HOST = window.location.hostname === 'localhost' ? "http://localhost:4000/api" : '/api';

const queryClient = new QueryClient()

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" index element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<RequireAuth />}>
                <Route path="/" index element={<HomePage />} />
                <Route path="/me/images" element={<OwnerPage />} />
              </Route>
              <Route path="*" element={<NoRoute />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
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
