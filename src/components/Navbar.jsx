import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ cartCount }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
     <div className="navbar-brand">
  <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
    <span className="logo-icon">🛒</span>
    <span>BuySide</span>
  </Link>
</div>
      <ul className="navbar-links">
        <li><Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link></li>
        <li><Link to="/products" className={isActive("/products")}>Products</Link></li>
        <li><Link to="/admin-login" className={isActive("/admin-login")}>Admin</Link></li>
        <li><Link to="/shop" className={isActive("/shop")}>Shop</Link></li>
      </ul>
      <div className="navbar-right">
        <Link to="/shop">
          <button className="btn-icon">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </Link>
        <button className="profile-btn">👤 Profile</button>
      </div>
    </nav>
  );
}