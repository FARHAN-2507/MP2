import React from "react";
import "./styles/WhatsAppButton.css"; 

const WhatsAppButton = () => {
  const phoneNumber = "+918447600553"; 
  const message = encodeURIComponent("Hello! I need some assistance."); 

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
      />
    </a>
  );
};

export default WhatsAppButton;
