import React, { useState, useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import axios from 'axios'

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage("token");
  const [user, setUser] = useState(() => getUserFromToken(token));

  useEffect(() => {
    if (token) {
      setUser(getUserFromToken(token))
    }
  }, [token])

  axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = 'JWT ' + token;

    return config;
  });

  let value = { token, setToken, user };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}

export { AuthProvider, useAuth, RequireAuth };

function getUserFromToken(token) {
  if (!token) return;
  return JSON.parse(atob(token.split('.')[1], 'base64'));
};