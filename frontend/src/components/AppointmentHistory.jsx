import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/patient/appointments",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      Pending: { backgroundColor: "#ffc107", color: "#000" },
      Accepted: { backgroundColor: "#28a745", color: "#fff" },
      Rejected: { backgroundColor: "#dc3545", color: "#fff" },
    };
    return (
      <span
        style={{
          padding: "5px 15px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "bold",
          ...styles[status],
        }}
      >
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container appointment-history">
        <h2>Your Appointment History</h2>
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="container appointment-history" style={{ marginTop: "50px", marginBottom: "50px" }}>
      <h2>Your Appointment History</h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>Track and manage all your appointments at MediCare Plus Hospital</p>
      {appointments.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", marginTop: "30px" }}>
          You haven't booked any appointments yet. Schedule your first visit today!
        </p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="appointment-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <h3 style={{ margin: 0, color: "#333" }}>
                  Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                </h3>
                {getStatusBadge(appointment.status)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <p>
                  <strong>Department:</strong> {appointment.department}
                </p>
                <p>
                  <strong>Appointment Date:</strong> {formatDate(appointment.appointment_date)}
                </p>
                <p>
                  <strong>Patient:</strong> {appointment.firstName} {appointment.lastName}
                </p>
                <p>
                  <strong>Phone:</strong> {appointment.phone}
                </p>
                <p style={{ gridColumn: "1 / -1" }}>
                  <strong>Address:</strong> {appointment.address}
                </p>
                {appointment.status === "Rejected" && (
                  <p style={{ gridColumn: "1 / -1", color: "#dc3545", fontWeight: "bold" }}>
                    ❌ This appointment has been rejected by the admin.
                  </p>
                )}
                {appointment.status === "Accepted" && (
                  <p style={{ gridColumn: "1 / -1", color: "#28a745", fontWeight: "bold" }}>
                    ✅ Your appointment has been confirmed!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
