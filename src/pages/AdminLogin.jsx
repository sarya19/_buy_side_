import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError("");
      const data = await loginUser({ email, password });
      onLogin(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
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
          <h2>Admin Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="1234" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          </div>
          {error && <p style={{ color: "var(--danger)", fontSize: "0.82rem", marginBottom: "1rem" }}>⚠️ {error}</p>}
          <button className="btn btn-purple w-full" onClick={handleLogin}>Login</button>
          <p style={{ marginTop: "0.8rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            New admin user? <Link to="/admin-register">Create account</Link>
          </p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-illustration">🧑‍💼</div>
      </div>
    </div>
  );
}