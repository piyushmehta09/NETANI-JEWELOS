import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/common/MainLayout'
import Home from './components/pages/Home'
import Products from './components/pages/Products'
import Cart from './components/pages/Cart'
import Contact from './components/pages/Contact'
import Login from './components/pages/Login'
import Registration from './components/pages/Registration'
import './index.css'
import Admin from './components/pages/Admin' // 👈 सुनिश्चित करें कि Capital A ही है

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Registration /> },
      { path: "admin", element: <Admin />}
    ],
  },
  { 
    
    path: "/admin",
    element: <Admin />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)