import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Today's Appointments",
      color: "primary",
      path: "/appointments",
      icon: "bi-calendar-check",
    },
    {
      title: "Manage Staff Attendance",
      color: "secondary",
      path: "/staffattendancecard",
      icon: "bi-person-check",
    },
    {
      title: "Manage Services",
      color: "success",
      path: "/servicesCard",
      icon: "bi-tools",
    },
    {
      title: "Manage gallary",
      color: "danger",
      path: "/Uploadpage",
      icon: "bi-images",
    },
  ];

  return (
    <div className="container mt-5">
                   <div style={{ marginTop: '200px' }}></div>

      <h1 className="text-center mb-4 fw-bold text-uppercase">Admin Dashboard</h1>
      <div className="row justify-content-center">
        {sections.map((section, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div
              className={`card shadow-lg border-0 bg-${section.color} text-white`}
              onClick={() => navigate(section.path)}
              style={{
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div className="card-body text-center">
                <i className={`bi ${section.icon} display-4 mb-3`}></i>
                <h5 className="card-title fw-bold">{section.title}</h5>
                <p className="card-text">{section.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
