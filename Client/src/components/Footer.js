import React from "react";
import './styles/Footer.css';  // Import the external CSS

const Footer = () => {
  return (
    <footer>
      <div className="container py-4">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              We are a premium salon offering world-class services to enhance
              your style and confidence. Your satisfaction is our priority!
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="text-light">
                  Services
                </a>
              </li>
              <li>
                <a href="/aboutus" className="text-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="/book-appointment" className="text-light">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/login" className="text-light">
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>
              <i className="bi bi-telephone-fill me-2"></i> +91 8447600553
            </p>
            <p>
              <i className="bi bi-envelope-fill me-2"></i> farhanakthar99@gmail.com
            </p>
            <p>
              <i className="bi bi-geo-alt-fill me-2"></i> 
              B3/63 Ground Floor, Sector - 6 Rohini, New Delhi - 110085
            </p>
          </div>
        </div>

        <hr className="bg-light" />

        {/* Footer Bottom Section */}
        <div className="text-center footer-bottom">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Touch N Shine Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
