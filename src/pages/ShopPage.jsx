import { useState } from "react";
import { PRODUCTS } from "../data/products";

export default function ShopPage({ addToCart, cart }) {
  const [cartOpen, setCartOpen] = useState(false);
  const cartTotal = cart.reduce((s, p) => s + p.price * p.qty, 0).toFixed(2);

  return (
    <div className="shop-page">
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1rem" }}>
        <button className="btn btn-dark btn-sm" onClick={() => setCartOpen(!cartOpen)}>
          🛒 Cart ({cart.reduce((s, p) => s + p.qty, 0)})
        </button>
      </div>

      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-card-image">{product.name.split(" ").slice(0, 2).join(" ")}</div>
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p className="desc">{product.description}</p>
              <div className="product-card-footer">
                <span className="product-price">₹{product.price.toFixed(2)}</span>
                <span className="product-category">{product.category}</span>
              </div>
              <button className="btn btn-primary btn-sm w-full" style={{ marginTop:"10px" }} onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartOpen && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3>Your Cart</h3>
            <button className="icon-btn" onClick={() => setCartOpen(false)}>✕</button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart"><div style={{ fontSize:"2rem", marginBottom:"8px" }}>🛒</div><p>Your cart is empty</p></div>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-img">IMG</div>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <div className="price">₹{item.price.toFixed(2)}</div>
                    <div className="cart-item-qty">Qty: {item.qty}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total"><span>Total</span><span>₹{cartTotal}</span></div>
              <button className="btn btn-dark w-full">Checkout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}