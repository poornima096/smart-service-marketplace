import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8084/api/users/register",
        {
          name: name,
          email: email,
          password: password,
          role: role
        }
      );

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {
      console.error(error);

      if (error.response) {
        setError(
          error.response.data?.error ||
          error.response.data?.message ||
          "Registration failed."
        );
      } else {
        setError("Unable to connect to the server.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          <span>⚡</span> SmartService
        </div>

        <h1>Create account</h1>

        <p className="register-subtitle">
          Join SmartService Marketplace
        </p>

        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Account Type</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CUSTOMER">
              Customer
            </option>

            <option value="VENDOR">
              Vendor
            </option>
          </select>

          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <p className="already-account">
          Already have an account?
        </p>

        <button
          className="go-login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

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

export default Register;