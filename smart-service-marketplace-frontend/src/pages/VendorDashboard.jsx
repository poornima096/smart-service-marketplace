import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "http://localhost:8084";

function VendorDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
const [showAddService, setShowAddService] = useState(false);

const [serviceTitle, setServiceTitle] = useState("");
const [serviceDescription, setServiceDescription] = useState("");
const [serviceCategory, setServiceCategory] = useState("Home Repair");
const [servicePrice, setServicePrice] = useState("");
const [serviceLocation, setServiceLocation] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/bookings/vendor`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(response.data);

    } catch (error) {
      console.error(
        "Error loading vendor bookings:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

const addService = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      `${API_URL}/api/services`,
      {
        title: serviceTitle,
        description: serviceDescription,
        category: serviceCategory,
        price: servicePrice,
        location: serviceLocation
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Service added successfully!");

    setServiceTitle("");
    setServiceDescription("");
    setServiceCategory("Home Repair");
    setServicePrice("");
    setServiceLocation("");

    setShowAddService(false);

  } catch (error) {
    console.error("Error adding service:", error);

    alert(
      error.response?.data?.message ||
      "Unable to add service."
    );
  }
};



  const updateBookingStatus = async (
    bookingId,
    status
  ) => {
    try {
      await axios.put(
        `${API_URL}/api/bookings/${bookingId}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(
        `Booking ${status.toLowerCase()} successfully!`
      );

      loadBookings();

    } catch (error) {
      console.error(
        "Error updating booking:",
        error
      );

      alert("Unable to update booking.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="vendor-dashboard">

      {/* NAVBAR */}

      <nav className="dashboard-navbar">

        <div className="logo">
          <span>⚡</span> SmartService
        </div>

      <div className="dashboard-nav-links">

  <button>
    Dashboard
  </button>

  <button
    onClick={() => setShowAddService(true)}
  >
    Add Service
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
    Bookings
  </button>

</div>

        <button
          className="dashboard-logout"
          onClick={logout}
        >
          Logout
        </button>

      </nav>


      {/* HERO */}

      <section className="vendor-hero">

        <p className="section-label">
          VENDOR DASHBOARD
        </p>

        <h1>
          Manage your services & bookings 👋
        </h1>

        <p>
          View customer requests and manage your
          service bookings.
        </p>

      </section>




{/* ADD SERVICE */}

{showAddService && (
  <section className="add-service-section">

    <div className="add-service-card">

      <h2>Add New Service</h2>

      <p>
        Offer a new service to customers.
      </p>

      <form onSubmit={addService}>

        <label>Service Title</label>

        <input
          type="text"
          placeholder="Example: AC Repair"
          value={serviceTitle}
          onChange={(e) =>
            setServiceTitle(e.target.value)
          }
          required
        />

        <label>Description</label>

        <textarea
          placeholder="Describe your service"
          value={serviceDescription}
          onChange={(e) =>
            setServiceDescription(e.target.value)
          }
          required
        />

        <label>Category</label>

        <select
          value={serviceCategory}
          onChange={(e) =>
            setServiceCategory(e.target.value)
          }
        >
          <option value="Home Repair">
            Home Repair
          </option>

          <option value="Electrical">
            Electrical
          </option>

          <option value="Plumbing">
            Plumbing
          </option>

          <option value="Cleaning">
            Cleaning
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <label>Price</label>

        <input
          type="number"
          placeholder="Example: 500"
          value={servicePrice}
          onChange={(e) =>
            setServicePrice(e.target.value)
          }
          required
        />

        <label>Location</label>

        <input
          type="text"
          placeholder="Example: Bangalore"
          value={serviceLocation}
          onChange={(e) =>
            setServiceLocation(e.target.value)
          }
          required
        />

        <div className="add-service-actions">

          <button
            type="submit"
            className="save-service-btn"
          >
            Add Service
          </button>

          <button
            type="button"
            className="cancel-service-btn"
            onClick={() => setShowAddService(false)}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>

  </section>
)}


      {/* BOOKING SECTION */}

      <section
        className="vendor-bookings"
        id="bookings"
      >

        <div className="dashboard-heading">

          <div>

            <p className="section-label">
              CUSTOMER REQUESTS
            </p>

            <h2>
              Bookings
            </h2>

          </div>

          <p>
            Manage bookings from your customers.
          </p>

        </div>


        {loading ? (

          <div className="loading">
            Loading bookings...
          </div>

        ) : bookings.length === 0 ? (

          <div className="no-bookings">

            <div>
              📅
            </div>

            <h3>
              No bookings yet
            </h3>

            <p>
              Customer bookings will appear here.
            </p>

          </div>

        ) : (

          <div className="vendor-booking-list">

            {bookings.map((booking) => (

              <div
                className="vendor-booking-card"
                key={booking.id}
              >

                <div className="vendor-booking-icon">
                  📅
                </div>

                <div className="vendor-booking-details">

                  <h3>
                    {booking.service?.title}
                  </h3>

                  <p>
                    Customer:{" "}
                    {booking.user?.name}
                  </p>

                  <p>
                    Date:{" "}
                    {booking.bookingDate}
                  </p>

                  <p>
                    📍{" "}
                    {booking.service?.location}
                  </p>

                </div>

                <div className="vendor-booking-actions">

                  <span
                    className={`booking-status ${
                      booking.status?.toLowerCase()
                    }`}
                  >
                    {booking.status}
                  </span>

                  {booking.status === "PENDING" && (
                    <div className="vendor-action-buttons">

                      <button
                        className="accept-btn"
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "ACCEPTED"
                          )
                        }
                      >
                        ✓ Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "REJECTED"
                          )
                        }
                      >
                        ✕ Reject
                      </button>

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* FOOTER */}

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

export default VendorDashboard;