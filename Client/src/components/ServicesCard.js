import React from "react";
import ServiceForm from "./ServiceForm";
import ServiceList from "./ServiceList";
const ServicesCard = ({ setServices }) => {
  return (
    <div className="card">
      <div className="card-header bg-success text-white">
        <h4>Manage Services</h4>
      </div>
      <div className="card-body">
        <ServiceForm setServices={setServices} />
      </div>
      <div className="card-body">
        <ServiceList setServices={setServices} />
      </div>
    </div>
  );
};

export default ServicesCard;
