import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Services
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch services");
      setLoading(false);
    }
  };

  // ✅ Delete Service
  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/services/delete/${id}`);
      setServices(services.filter((service) => service._id !== id));
    } catch (err) {
      alert("Error deleting service");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Services List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : services.length > 0 ? (
        <ul className="list-group">
          {services.map((service) => (
            <li key={service._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{service.name}</strong> <br />
                <small className="text-muted">{service.category} - {service.subcategory}</small> <br />
                <small className="text-muted">Time: {service.time} | Price: ${service.price}</small>
              </div>
              <div>
                <img src={`http://localhost:5000${service.image}`} alt={service.name} width="50" height="50" className="rounded" />
                <button className="btn btn-danger btn-sm ms-3" onClick={() => deleteService(service._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
};

export default ServiceList;
