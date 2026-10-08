import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://smart-service-marketplace-production.up.railway.app";

function AdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const customers = users.filter(
    (user) => user.role === "CUSTOMER" || user.role === "USER"
  );

  const vendors = users.filter(
    (user) => user.role === "VENDOR"
  );

  const admins = users.filter(
    (user) => user.role === "ADMIN"
  );

  return (
    <div className="admin-dashboard">

      <nav className="dashboard-navbar">
        <h2>Smart Service Marketplace</h2>

        <div>
          <span>Admin Panel</span>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">

        <h1>Admin Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage and monitor marketplace users
        </p>

        {/* Statistics */}

        <div className="admin-stats">

          <div className="admin-stat-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Customers</h3>
            <p>{customers.length}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Vendors</h3>
            <p>{vendors.length}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Admins</h3>
            <p>{admins.length}</p>
          </div>

        </div>

        {/* Users */}

        <div className="admin-users-section">

          <h2>Registered Users</h2>

          {loading && (
            <p>Loading users...</p>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}

          {!loading && !error && users.length === 0 && (
            <p>No users found.</p>
          )}

          {!loading && !error && users.length > 0 && (

            <div className="admin-table-wrapper">

              <table className="admin-users-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>

                  {users.map((user) => (

                    <tr key={user.id}>

                      <td>{user.id}</td>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>
                        <span
                          className={`role-badge ${user.role.toLowerCase()}`}
                        >
                          {user.role}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;