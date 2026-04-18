import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function AdminRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setError("");
      setSuccess("");
      await registerUser(form);
      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/admin-login"), 800);
    } catch (err) {
      setError(err.message || "Could not create account.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-brand-icon">🛍️</div>
          <span>BuySide Admin</span>
        </div>

        <div className="login-form-box">
          <h2>Create Admin Account</h2>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            />
          </div>

          {error && (
            <p style={{ color: "var(--danger)", fontSize: "0.82rem", marginBottom: "1rem" }}>
              ⚠️ {error}
            </p>
          )}

          {success && (
            <p style={{ color: "#188038", fontSize: "0.82rem", marginBottom: "1rem" }}>
              {success}
            </p>
          )}

          <button className="btn btn-purple w-full" onClick={handleRegister}>
            Create Account
          </button>

          <p style={{ marginTop: "0.8rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Already have an account? <Link to="/admin-login">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-illustration">👩‍💻</div>
      </div>
    </div>
  );
}
