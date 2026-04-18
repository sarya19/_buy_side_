import { useState } from "react";
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from "../data/products";

export default function Products({ isAdmin }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "Electronics", status: "Active" });
  const [page, setPage] = useState(1);
  const PER_PAGE = 25;
  const canManageProducts = isAdmin;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAdd = () => { setEditProduct(null); setForm({ name: "", price: "", category: "Electronics", status: "Active" }); setShowModal(true); };
  const openEdit = (p) => { setEditProduct(p); setForm({ name: p.name, price: p.price, category: p.category, status: p.status }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editProduct) {
      setProducts(products.map((p) => p._id === editProduct._id ? { ...p, ...form, price: parseFloat(form.price) } : p));
    } else {
      setProducts([...products, { ...form, _id: Date.now().toString(), price: parseFloat(form.price), inventory: 0 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products</h1>
        <button className="btn btn-dark" onClick={openAdd}>+ Add Product</button>
      </div>

      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input placeholder="Search products..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>#</th><th>Product Name</th><th>Price</th><th>Category</th><th>Status</th>
              {canManageProducts && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.map((p, i) => (
              <tr key={p._id}>
                <td style={{ color: "var(--text-muted)" }}>{(page - 1) * PER_PAGE + i + 1}</td>
                <td className="product-name-cell">{p.name}</td>
                <td>₹{parseFloat(p.price).toFixed(2)}</td>
                <td style={{ color: "var(--text-muted)" }}>{p.category}</td>
                <td><span className={`status-badge ${p.status !== "Active" ? "status-inactive" : ""}`}>{p.status}</span></td>
                {canManageProducts && (
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn edit" onClick={() => openEdit(p)}>✏️</button>
                      <button className="icon-btn delete" onClick={() => handleDelete(p._id)}>🗑️</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span>Showing {paginated.length} product(s)</span>
          <div className="pagination">
            <button className="btn btn-outline btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
            <button className="btn btn-dark btn-sm" onClick={() => setPage(p => p + 1)} disabled={page * PER_PAGE >= filtered.length}>Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editProduct ? "Edit Product" : "Add Product"}</h2>
            <div className="form-group">
              <label>Product Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Leather Wallet" />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. 34.99" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{ width:"100%", padding:"10px 14px", border:"1.5px solid var(--border)", borderRadius:"var(--radius-sm)", fontFamily:"var(--font-body)", fontSize:"0.9rem" }}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                style={{ width:"100%", padding:"10px 14px", border:"1.5px solid var(--border)", borderRadius:"var(--radius-sm)", fontFamily:"var(--font-body)", fontSize:"0.9rem" }}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-dark" onClick={handleSave}>{editProduct ? "Save Changes" : "Add Product"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}