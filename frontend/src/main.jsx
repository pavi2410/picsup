import React from 'react'
import { createRoot } from 'react-dom/client';
import "tailwindcss/tailwind.css"
import "@fontsource/poppins"; // 400
import App from './App'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);