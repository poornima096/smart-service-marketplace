import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

const API_URL = "http://localhost:8084";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
  path="/customer-dashboard"
  element={<CustomerDashboard />}
/>
<Route
  path="/vendor-dashboard"
  element={<VendorDashboard />}
/>
<Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>
    </Routes>

    
  );
}

function Home() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchServices = async () => {
    if (!search.trim()) {
      fetchServices();
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/services/search?title=${encodeURIComponent(search)}`
      );

      setServices(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span>⚡</span> SmartService
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
<button
  className="register-btn"
  onClick={() => navigate("/register")}
>
  Register
</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" id="home">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ Trusted Local Services
          </div>

          <h1>
            Find the right
            <span> service </span>
            for your needs
          </h1>

          <p>
            Discover trusted professionals for home repair,
            electrical work, plumbing and more.
          </p>

          {/* SEARCH */}
          <div className="search-box">

            <input
              type="text"
              placeholder="What service are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchServices();
                }
              }}
            />

            <button onClick={searchServices}>
              🔍 Search
            </button>

          </div>

          {/* POPULAR SEARCHES */}
          <div className="popular">

            <span>Popular:</span>

            <button
              onClick={() => {
                setSearch("AC");
              }}
            >
              AC Repair
            </button>

            <button
              onClick={() => {
                setSearch("Plumbing");
              }}
            >
              Plumbing
            </button>

            <button
              onClick={() => {
                setSearch("Electrician");
              }}
            >
              Electrician
            </button>

          </div>

        </div>

        {/* HERO CARD */}
        <div className="hero-card">

          <div className="hero-icon">
            🛠️
          </div>

          <h3>
            Professional Services
          </h3>

          <p>
            Find skilled professionals near you.
          </p>

          <div className="hero-stat">

            <strong>
              {services.length}+
            </strong>

            <span>
              Services available
            </span>

          </div>

        </div>

      </section>

      {/* SERVICES */}
      <section
        className="services-section"
        id="services"
      >

        <div className="section-heading">

          <div>

            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Available Services
            </h2>

          </div>

          <p>
            Find professionals who can help you get the job done.
          </p>

        </div>

        {loading ? (

          <div className="loading">
            Loading services...
          </div>

        ) : services.length === 0 ? (

          <div className="empty">
            No services found.
          </div>

        ) : (

          <div className="service-grid">

            {services.map((service) => (

              <div
                className="service-card"
                key={service.id}
              >

                <div className="service-icon">

                  {service.category === "Home Repair"
                    ? "🔧"
                    : "🛠️"}

                </div>

                <div className="service-category">
                  {service.category}
                </div>

                <h3>
                  {service.title}
                </h3>

                <p className="description">
                  {service.description}
                </p>

                <div className="service-info">

                  <span>
                    📍 {service.location}
                  </span>

                  <strong>
                    ₹{service.price}
                  </strong>

                </div>

                <button
                  className="book-btn"
                  onClick={() => navigate("/login")}
                >
                  View Service →
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ABOUT */}
      <section
        className="about-section"
        id="about"
      >

        <div>

          <p className="section-label">
            WHY SMARTSERVICE?
          </p>

          <h2>
            Everything you need in one marketplace.
          </h2>

        </div>

        <div className="features">

          <div className="feature">

            <span>🔐</span>

            <h3>
              Secure
            </h3>

            <p>
              JWT-based secure authentication.
            </p>

          </div>

          <div className="feature">

            <span>⭐</span>

            <h3>
              Trusted
            </h3>

            <p>
              Connect with registered service providers.
            </p>

          </div>

          <div className="feature">

            <span>📅</span>

            <h3>
              Easy Booking
            </h3>

            <p>
              Book services and track your bookings.
            </p>

          </div>

          <div className="feature">

            <span>🤖</span>

            <h3>
              AI Powered
            </h3>

            <p>
              Smart service recommendations coming soon.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer>

        <div className="logo">
          <span>⚡</span> SmartService
        </div>

        <p>
          © 2026 SmartService Marketplace. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;