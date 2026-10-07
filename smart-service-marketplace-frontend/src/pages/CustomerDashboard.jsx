import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "http://localhost:8084";

function CustomerDashboard() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // AI ASSISTANT
  // =========================

  const [aiRequest, setAiRequest] = useState("");
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadServices();
    loadBookings();
  }, []);

  // =========================
  // LOAD SERVICES
  // =========================

  const loadServices = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/services`
      );

      setServices(response.data);

    } catch (error) {
      console.error("Error loading services:", error);

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD MY BOOKINGS
  // =========================

  const loadBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/bookings/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(response.data);

    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  // =========================
  // AI RECOMMENDATION
  // =========================

  const getAIRecommendation = async () => {

    if (!aiRequest.trim()) {
      alert("Please describe the service you need.");
      return;
    }

    setAiLoading(true);
    setAiRecommendation("");

    try {

      const response = await axios.post(
        `${API_URL}/api/ai/recommend`,
        {
          request: aiRequest
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAiRecommendation(
        response.data.recommendation
      );

    } catch (error) {

      console.error(
        "AI recommendation failed:",
        error
      );

      if (error.response) {
        alert(
          error.response.data?.message ||
          "Unable to get AI recommendation."
        );
      } else {
        alert(
          "Unable to connect to the AI service."
        );
      }

    } finally {
      setAiLoading(false);
    }
  };

  // =========================
  // BOOK SERVICE
  // =========================

  const bookService = async (serviceId, serviceTitle) => {

    const bookingDate = window.prompt(
      `Enter booking date for ${serviceTitle} (YYYY-MM-DD):`
    );

    if (!bookingDate) {
      return;
    }

    const token = localStorage.getItem("token");

    try {

      await axios.post(
        `${API_URL}/api/bookings?serviceId=${serviceId}`,
        {
          bookingDate: bookingDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking created successfully!");

      loadBookings();

      document
        .getElementById("bookings")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    } catch (error) {

      console.error("Booking failed:", error);

      if (error.response) {

        alert(
          error.response.data?.message ||
          "Booking failed. Please try again."
        );

      } else {

        alert(
          "Unable to connect to the server."
        );

      }
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="dashboard-navbar">

        <div className="logo">
          <span>⚡</span> SmartService
        </div>

        <div className="dashboard-nav-links">

          <button>
            Dashboard
          </button>

          <button
            onClick={() =>
              document
                .getElementById("ai-assistant")
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            AI Assistant
          </button>

          <button
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Services
          </button>

          <button
            onClick={() =>
              document
                .getElementById("bookings")
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            My Bookings
          </button>

        </div>

        <button
          className="dashboard-logout"
          onClick={logout}
        >
          Logout
        </button>

      </nav>


      {/* =========================
          WELCOME
      ========================= */}

      <section className="dashboard-hero">

        <div>

          <p className="section-label">
            CUSTOMER DASHBOARD
          </p>

          <h1>
            Welcome back 👋
          </h1>

          <p>
            Find trusted professionals and book the
            services you need.
          </p>

        </div>

      </section>


      {/* =========================
          AI ASSISTANT
      ========================= */}

      <section
        className="ai-assistant-section"
        id="ai-assistant"
      >

        <div className="ai-assistant-card">

          <div className="ai-assistant-header">

            <div className="ai-icon">
              🤖
            </div>

            <div>

              <p className="section-label">
                AI POWERED
              </p>

              <h2>
                Smart Service Assistant
              </h2>

              <p>
                Tell us what you need and our AI will
                recommend the right service.
              </p>

            </div>

          </div>


          <div className="ai-input-area">

            <textarea
              value={aiRequest}
              onChange={(e) =>
                setAiRequest(e.target.value)
              }
              placeholder="Example: I have a leaking bathroom tap and need someone to fix it."
              rows="4"
            />

            <button
              className="ai-recommend-btn"
              onClick={getAIRecommendation}
              disabled={aiLoading}
            >

              {aiLoading
                ? "🤖 Getting Recommendation..."
                : "✨ Get AI Recommendation"}

            </button>

          </div>


          {aiRecommendation && (

            <div className="ai-result">

              <div className="ai-result-title">
                🤖 AI Recommendation
              </div>

              <p>
                {aiRecommendation}
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =========================
          SERVICES
      ========================= */}

      <section
        className="dashboard-services"
        id="services"
      >

        <div className="dashboard-heading">

          <div>

            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Available Services
            </h2>

          </div>

          <p>
            Choose a service and book it instantly.
          </p>

        </div>


        {loading ? (

          <div className="loading">
            Loading services...
          </div>

        ) : services.length === 0 ? (

          <div className="empty">
            No services available.
          </div>

        ) : (

          <div className="dashboard-service-grid">

            {services.map((service) => (

              <div
                className="dashboard-service-card"
                key={service.id}
              >

                <div className="dashboard-service-icon">

                  {service.category === "Home Repair"
                    ? "🔧"
                    : "🛠️"}

                </div>

                <p className="service-category">
                  {service.category}
                </p>

                <h3>
                  {service.title}
                </h3>

                <p className="dashboard-description">
                  {service.description}
                </p>

                <div className="dashboard-service-info">

                  <span>
                    📍 {service.location}
                  </span>

                  <strong>
                    ₹{service.price}
                  </strong>

                </div>

                <button
                  className="dashboard-book-btn"
                  onClick={() =>
                    bookService(
                      service.id,
                      service.title
                    )
                  }
                >
                  Book Now →
                </button>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* =========================
          MY BOOKINGS
      ========================= */}

      <section
        className="dashboard-bookings"
        id="bookings"
      >

        <div className="dashboard-heading">

          <div>

            <p className="section-label">
              BOOKINGS
            </p>

            <h2>
              My Bookings
            </h2>

          </div>

        </div>


        {bookings.length === 0 ? (

          <div className="no-bookings">

            <div>
              📅
            </div>

            <h3>
              No bookings yet
            </h3>

            <p>
              Your booked services will appear here.
            </p>

          </div>

        ) : (

          <div className="booking-list">

            {bookings.map((booking) => (

              <div
                className="booking-card"
                key={booking.id}
              >

                <div className="booking-icon">
                  📅
                </div>

                <div className="booking-details">

                  <h3>
                    {booking.service?.title}
                  </h3>

                  <p>
                    Booking Date:{" "}
                    {booking.bookingDate}
                  </p>

                  <p>
                    📍 {booking.service?.location}
                  </p>

                </div>

                <div
                  className={`booking-status ${
                    booking.status?.toLowerCase()
                  }`}
                >
                  {booking.status}
                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <div className="logo">
          <span>⚡</span> SmartService
        </div>

        <p>
          © 2026 SmartService Marketplace
        </p>

      </footer>

    </div>
  );
}

export default CustomerDashboard;