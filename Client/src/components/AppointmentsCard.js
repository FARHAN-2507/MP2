import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const AppointmentsCard = () => {
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // ✅ Fetch Today's Appointments
  const fetchAppointmentsToday = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments/today");
      setAppointmentsToday(response.data);
    } catch (error) {
      console.error("Error fetching today's appointments:", error);
    }
  };

  // ✅ Fetch Appointments by Date
  const fetchAppointmentsByDate = async (date) => {
    try {
      if (!date) return;
      const response = await axios.get(`http://localhost:5000/api/appointments/by-date/${date}`);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error("Error fetching filtered appointments:", error);
    }
  };

  // ✅ Mark Appointment as Done
  const markAppointmentAsDone = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/appointments/mark-done/${id}`, { status: "completed" });
  
      if (response.data) {
        setAppointmentsToday((prev) =>
          prev.map((appt) => (appt._id === id ? { ...appt, status: "completed" } : appt))
        );
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };
  
  useEffect(() => {
    fetchAppointmentsToday();
  }, []);

  return (
    <div className="container mt-4">
      <div style={{ marginTop: '150px' }}></div>

      {/* ✅ Filter Section */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">Filter Appointments by Date</h5>
        </div>
        <div className="card-body">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              fetchAppointmentsByDate(e.target.value);
            }}
          />
        </div>
      </div>

      {/* ✅ Today's Appointments */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Today's Appointments</h4>
        </div>
        <div className="card-body">
          {appointmentsToday.length > 0 ? (
            <ul className="list-group">
              {appointmentsToday.map((appointment) => (
                <li key={appointment._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{appointment.customerName}</strong> <br />
                    <small className="text-muted">Time: {appointment.appointmentTime}</small> <br />
                    <small className="text-muted">Contact: {appointment.contactNumber}</small> <br />
                    <small className="text-muted">
                      Service: {appointment.service && appointment.service.length > 0 
                        ? appointment.service.map((s) => s.name).join(", ") 
                        : "N/A"}
                    </small> <br />
                    <span className={`badge ${appointment.status === "completed" ? "bg-success" : "bg-warning"}`}>
                      {appointment.status || "pending"}
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => markAppointmentAsDone(appointment._id)}
                    disabled={appointment.status === "completed"}
                  >
                    {appointment.status === "completed" ? "✔ Done" : "✔ Mark as Done"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No appointments for today.</p>
          )}
        </div>
      </div>

      {/* ✅ Filtered Appointments */}
      {selectedDate && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-info text-white">
            <h4 className="mb-0">Appointments for {moment(selectedDate).format("MMMM Do, YYYY")}</h4>
          </div>
          <div className="card-body">
            {filteredAppointments.length > 0 ? (
              <ul className="list-group">
                {filteredAppointments.map((appointment) => (
                  <li key={appointment._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{appointment.customerName}</strong> <br />
                      <small className="text-muted">Time: {appointment.appointmentTime}</small> <br />
                      <small className="text-muted">Contact: {appointment.contactNumber}</small> <br />
                      <small className="text-muted">
                        Service: {appointment.service && appointment.service.length > 0 
                          ? appointment.service.map((s) => s.name).join(", ") 
                          : "N/A"}
                      </small> <br />
                      <span className={`badge ${appointment.status === "completed" ? "bg-success" : "bg-warning"}`}>
                        {appointment.status || "pending"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No appointments found for this date.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsCard;
