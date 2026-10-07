import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8084/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("Login response:", response.data);

      // Get JWT token
      const token =
        response.data.token ||
        response.data.jwt ||
        response.data.accessToken;

      if (!token) {
        setError("Login successful, but token was not received.");
        return;
      }

      // Save token
      localStorage.setItem("token", token);

      // Decode JWT to get role
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const role =
        payload.role ||
        payload.roles ||
        payload.authorities;

      localStorage.setItem(
        "role",
        Array.isArray(role) ? role[0] : role
      );

alert("Login successful!");

if (role === "CUSTOMER") {
  navigate("/customer-dashboard");
} else if (role === "VENDOR") {
  navigate("/vendor-dashboard");
} else if (role === "ADMIN") {
  navigate("/admin-dashboard");
} else {
  navigate("/");
}
    } catch (error) {
      console.error(error);

      if (error.response) {
        setError(
          error.response.data?.error ||
          "Invalid email or password."
        );
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

      <div className="login-logo">
  <span>⚡</span> SmartService
</div>

        <h1>Welcome back</h1>

        <p className="login-subtitle">
          Login to your SmartService account
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Login;