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
import Admin from './components/pages/Admin' 
import AboutUs from './components/pages/About-us'

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
      { path: "admin", element: <Admin />},
      { path: "about-us", element: <AboutUs />}
    ],
  },
  { 
    path: "/admin",
    element: <Admin />
  },
], {
  // ── 🌐 गिटहब सब-फ़ोल्डर राउटिंग को सिंक करने के लिए बेसनेम ──
  basename: "/NETANI-JEWELOS" 
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)