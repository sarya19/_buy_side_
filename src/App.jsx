import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ShopPage from "./pages/ShopPage";

export default function App() {
  const [adminUser, setAdminUser] = useState(null);
  const isAdmin = adminUser?.role === "admin";
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <Router>
      <Navbar cartCount={cart.reduce((s, p) => s + p.qty, 0)} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
  path="/admin-login"
  element={<AdminLogin onLogin={setAdminUser} />}
/>
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products isAdmin={isAdmin} />} />
        <Route path="/shop" element={<ShopPage addToCart={addToCart} cart={cart} />} />
      </Routes>
    </Router>
  );
}