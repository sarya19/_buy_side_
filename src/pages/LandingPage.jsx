import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <main className="landing">
      <section className="hero-section">
        <div className="hero-card">
          <div className="hero-text">
            <h1>Your Home Essentials, Delivered Fresh</h1>
            <p>Discover quality household products that make life smoother. From kitchenware to decor — we've got you covered.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => navigate("/admin-login")}>Sign in as Admin</button>
              <button className="btn btn-outline" onClick={() => navigate("/shop")}>Browse as Shopper</button>
            </div>
          </div>
          <div className="hero-image">🏠</div>
        </div>
      </section>

      <section className="landing-quote">
        <blockquote>"Redefine comfort.<br />Redefine your space."</blockquote>
        <cite>Curated home essentials that whisper luxury in every corner.</cite>
      </section>

      <section className="landing-grid">
        <div className="landing-grid-inner">
          <div className="grid-main">
            <div className="grid-main-text">
              Everything your kitchen setup needs →
              <span>Handpicked for modern homes</span>
            </div>
          </div>
          <div className="grid-side">
            <div className="grid-card">Dinnerware<div className="price">from ₹69 →</div></div>
            <div className="grid-card">Food Storage & Organizers<div className="price">from ₹49 →</div></div>
            <div className="grid-card">Glassware<div className="price">from ₹49 →</div></div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>BuySide</h3>
            <p>Curated home essentials that bring comfort, class, and calm into every corner of your life.</p>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul><li>Kitchen</li><li>Home Decor</li><li>Storage</li><li>Cleaning</li></ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul><li>Help Center</li><li>Track Order</li><li>Shipping & Returns</li><li>FAQs</li></ul>
          </div>
          <div className="footer-subscribe footer-col">
            <h4>Stay Updated</h4>
            <p>Subscribe for fresh arrivals and exclusive offers.</p>
            <button className="btn btn-purple w-full">Join</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 BuySide. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </footer>
    </main>
  );
}