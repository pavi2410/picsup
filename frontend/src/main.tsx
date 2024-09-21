import "@fontsource/poppins"; // 400
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';
import "tailwindcss/tailwind.css";
import './main.css';
import axios from "axios";

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

axios.defaults.withCredentials = true;

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <RouterProvider router={router} />
        <Toaster richColors />
      </NextUIProvider>
    </QueryClientProvider>
  </StrictMode>
);