import { PRODUCTS } from "../data/products";

const CATEGORY_STATS = [
  { name: "Accessories", trend: "+2%", amount: "₹28,097", pct: 72, up: true },
  { name: "Electronics", trend: "-3%", amount: "₹42,844", pct: 90, up: false },
  { name: "Home", trend: "+11%", amount: "₹4,742", pct: 20, up: true },
  { name: "Fitness", trend: "+5%", amount: "₹3,848", pct: 18, up: true },
  { name: "Footwear", trend: "-3%", amount: "₹17,748", pct: 50, up: false },
  { name: "Clothing", trend: "-3%", amount: "₹11,286", pct: 35, up: false },
];

const avgPrice = (PRODUCTS.reduce((s, p) => s + p.price, 0) / PRODUCTS.length).toFixed(2);
const totalInventory = PRODUCTS.reduce((s, p) => s + p.inventory, 0);

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="congratulations-card">
        <div className="congrats-left">
          <h3>Congratulations Arya! 🎉</h3>
          <p style={{fontSize:"0.8rem", opacity:0.7}}>You're the top seller of the month!</p>
          <div className="big-number">₹1,13,374.05</div>
          <div className="trend">+66% from last month</div>
        </div>
        <button className="view-sales-btn">View Sales</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Products <span className="stat-badge-green">+5.4%</span></div>
          <div className="stat-value">{PRODUCTS.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Price <span className="stat-badge-green">+11%</span></div>
          <div className="stat-value">₹{avgPrice}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Inventory <span className="stat-badge-red">+7.2%</span></div>
          <div className="stat-value">{totalInventory.toLocaleString()}</div>
        </div>
      </div>

      <div className="revenue-card">
        <h3>Total Revenue</h3>
        <div className="sub">Income this month</div>
        <div className="revenue-split">
          <div className="rev-item"><label>Offline</label><span>₹79,361,835</span></div>
          <div className="rev-item"><label>Online</label><span>₹34,012,215</span></div>
        </div>
        <div className="chart-placeholder">📊 Revenue chart (connect Chart.js later)</div>
      </div>

      <div className="returning-card">
        <h3>Returning Customers</h3>
        <div className="big-pct">42% <span className="pct-trend">+7.0%</span></div>
        <div className="chart-placeholder">📈 Chart coming soon</div>
      </div>

      <div className="category-card">
        <h3>Sales by Category</h3>
        <div className="sub">Top selling product categories</div>
        {CATEGORY_STATS.map((cat) => (
          <div key={cat.name} className="category-bar-row">
            <div className="cat-label">{cat.name} <span className={`cat-badge ${cat.up ? "up" : "down"}`}>{cat.trend}</span></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${cat.pct}%` }} /></div>
            <div className="cat-amount">{cat.amount}</div>
          </div>
        ))}
      </div>

      <div className="recent-products">
        <div className="recent-products-header">
          <h3>Recent Products</h3>
          <span>Showing {PRODUCTS.length} items</span>
        </div>
        <table className="rp-table">
          <thead>
            <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Inventory</th></tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p._id}>
                <td><div className="img-placeholder">IMG</div></td>
                <td>{p.name}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{p.category}</td>
                <td style={{ fontWeight: 600 }}>₹{p.price}</td>
                <td style={{ color: "var(--text-muted)" }}>{p.inventory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}