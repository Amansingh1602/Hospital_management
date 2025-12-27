import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBell, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const PatientDashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/patient/appointments",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
        
        // Create notifications for recent status changes
        const recentNotifications = data.appointments
          .filter(app => app.status !== "Pending")
          .slice(0, 5)
          .map(app => ({
            id: app._id,
            message: app.status === "Accepted" 
              ? `Your appointment with Dr. ${app.doctor.firstName} ${app.doctor.lastName} has been confirmed!`
              : `Your appointment with Dr. ${app.doctor.firstName} ${app.doctor.lastName} has been rejected.`,
            status: app.status,
            date: app.updatedAt || app.createdAt,
            department: app.department
          }));
        
        setNotifications(recentNotifications);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case "Accepted":
        return <FaCheckCircle style={{ color: "#28a745" }} />;
      case "Rejected":
        return <FaTimesCircle style={{ color: "#dc3545" }} />;
      default:
        return <FaClock style={{ color: "#ffc107" }} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Accepted":
        return "#d4edda";
      case "Rejected":
        return "#f8d7da";
      default:
        return "#fff3cd";
    }
  };

  const countByStatus = (status) => {
    return appointments.filter(app => app.status === status).length;
  };

  return (
    <section className="patient-dashboard page" style={{ minHeight: "100vh", padding: "50px 0" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Patient Dashboard</h1>
          <p style={{ fontSize: "18px", color: "#666" }}>Welcome back, {user?.firstName || "Patient"}! Manage your appointments at MediCare Plus Hospital.</p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "20px",
          marginBottom: "40px"
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: "2px solid #007bff"
          }}>
            <h3 style={{ fontSize: "16px", color: "#666", marginBottom: "10px" }}>Total Appointments</h3>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#007bff", margin: 0 }}>
              {appointments.length}
            </p>
          </div>
          
          <div style={{
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: "2px solid #28a745"
          }}>
            <h3 style={{ fontSize: "16px", color: "#666", marginBottom: "10px" }}>Confirmed</h3>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#28a745", margin: 0 }}>
              {countByStatus("Accepted")}
            </p>
          </div>
          
          <div style={{
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: "2px solid #ffc107"
          }}>
            <h3 style={{ fontSize: "16px", color: "#666", marginBottom: "10px" }}>Pending</h3>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#ffc107", margin: 0 }}>
              {countByStatus("Pending")}
            </p>
          </div>
          
          <div style={{
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: "2px solid #dc3545"
          }}>
            <h3 style={{ fontSize: "16px", color: "#666", marginBottom: "10px" }}>Rejected</h3>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#dc3545", margin: 0 }}>
              {countByStatus("Rejected")}
            </p>
          </div>
        </div>

        {/* Notifications Section */}
        <div style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "40px"
        }}>
          <h2 style={{ 
            fontSize: "24px", 
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <FaBell style={{ color: "#007bff" }} />
            Recent Notifications
          </h2>
          
          {loading ? (
            <p>Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>
              No new notifications. Your appointments are being processed.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: "20px",
                    borderRadius: "8px",
                    backgroundColor: getStatusColor(notification.status),
                    border: `1px solid ${notification.status === "Accepted" ? "#28a745" : "#dc3545"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                  }}
                >
                  <div style={{ fontSize: "24px" }}>
                    {getStatusIcon(notification.status)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "16px", fontWeight: "500" }}>
                      {notification.message}
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
                      Department: {notification.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Quick Actions</h2>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button
              onClick={() => window.location.href = "/appointment"}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Book New Appointment
            </button>
            <button
              onClick={() => window.location.href = "/appointment"}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              View All Appointments
            </button>
          </div>
        </div>

        {/* Recent Appointments */}
        {appointments.length > 0 && (
          <div style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginTop: "30px"
          }}>
            <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Recent Appointments</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #ddd" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Doctor</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Department</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((appointment) => (
                    <tr key={appointment._id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "12px" }}>
                        Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                      </td>
                      <td style={{ padding: "12px" }}>{appointment.department}</td>
                      <td style={{ padding: "12px" }}>
                        {new Date(appointment.appointment_date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span style={{
                          padding: "5px 15px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          backgroundColor: 
                            appointment.status === "Accepted" ? "#28a745" :
                            appointment.status === "Rejected" ? "#dc3545" : "#ffc107",
                          color: appointment.status === "Pending" ? "#000" : "#fff"
                        }}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientDashboard;
