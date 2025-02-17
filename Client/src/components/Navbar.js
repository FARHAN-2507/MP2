import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../assets/LOGO1.png';
import './styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container-fluid container-lg">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img 
            src={logo1} 
            alt="Salon Logo" 
            className="navbar-logo me-2" 
          />
          
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-2">
              <Link className="nav-link position-relative" to="/Services">
                Services
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link position-relative" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link position-relative" to="/aboutus">
                About Us
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link 
                className="nav-link cta-button" 
                to="/book-appointment"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;