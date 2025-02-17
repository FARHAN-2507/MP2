import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/BookAppointment.css';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);
  const [userDetails, setUserDetails] = useState({ 
    name: '', 
    phone: '', 
    date: '', 
    time: '' 
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  useEffect(() => {
    if (location.state?.selectedServices) {
      setSelectedServices(location.state.selectedServices);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, phone, date, time } = userDetails;
    if (!name || !phone || !date || !time) {
      alert("Please fill in all fields");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Please select a future date");
      return false;
    }

    const [hours, minutes] = time.split(":").map(Number);
    if (hours < 10 || hours >= 20) {
      alert("Appointments are available only between 10 AM - 8 PM");
      return false;
    }

    if (selectedDate.toDateString() === today.toDateString()) {
      const now = new Date();
      const selectedTime = new Date();
      selectedTime.setHours(hours, minutes);
      if (selectedTime <= now) {
        alert("Please select a future time for today");
        return false;
      }
    }

    return true;
  };

  // ✅ Send OTP
  const sendOTP = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", {
        phone: userDetails.phone,
      });

      if (response.status === 200) {
        alert("OTP sent successfully!");
        setOtpSent(true);
        setShowOtpInput(true);
      }
    } catch (error) {
      alert("Failed to send OTP");
    }
  };

  // ✅ Verify OTP and Book Appointment
  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/verify-otp", {
        phone: userDetails.phone,
        otp,
      });

      if (response.status === 200) {
        alert("OTP verified! Booking confirmed.");
        handleBooking(); // Proceed with appointment booking
      }
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  // ✅ Book Appointment (Only After OTP Verification)
  const handleBooking = async () => {
    try {
      const serviceIds = selectedServices.map(service => service._id);
      
      const response = await axios.post('http://localhost:5000/api/appointments/add', {
        customerName: userDetails.name,
        contactNumber: userDetails.phone,
        service: serviceIds,
        appointmentDate: userDetails.date,
        appointmentTime: userDetails.time,
      });

      if (response.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/");
      }
    } catch (error) {
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="booking-page">
             <div style={{ marginTop: '90px' }}></div>

      {/* Banner Section */}
      <div className="booking-banner">
        <div className="banner-content">
          <h1>Book Your Perfect Look</h1>
          <p>Expert Stylists Await You</p>
        </div>
      </div>

      {/* Content Container */}
      <div className="booking-container">
        {/* Selected Services */}
        <div className="selected-services">
          <h3>Your Selected Services</h3>
          {selectedServices.length > 0 ? (
            <ul className="services-list">
              {selectedServices.map((service, index) => (
                <li key={index}>
                  <span>{service.name}</span>
                  <span>₹{service.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-services">No services selected</p>
          )}
        </div>

        {/* Borderless Form */}
        <div className="clean-form">
          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} className="form-input" />
          </div>
          <div className="form-group">
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} className="form-input" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <input type="date" name="date" onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <input type="time" name="time" onChange={handleInputChange} className="form-input" />
            </div>
          </div>

          {!otpSent ? (
            <button className="cta-button" onClick={sendOTP}>
              Send OTP & Confirm Appointment
            </button>
          ) : (
            <>
              <div className="form-group">
                <input type="text" name="otp" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} className="form-input" />
              </div>
              <button className="cta-button" onClick={verifyOTP}>
                Verify OTP & Book
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
