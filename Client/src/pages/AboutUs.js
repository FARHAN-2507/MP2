import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScissors, faBrush, faSmile } from '@fortawesome/free-solid-svg-icons';
import "./styles/AboutUs.css";
import Footer from '../components/Footer';
import owner2 from '../assets/owner2.JPG';
import emp1 from '../assets/emp1.jpg';
import emp2 from '../assets/emp2.jpg';
import emp3 from '../assets/emp3.jpg';
import about from '../assets/about.jpg';


const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section mb-5">
        <div className="container-fluid p-0">
          <div className="hero-image position-relative">
            <img 
              src={about} 
              alt="Salon Interior" 
              className="img-fluid"
            />
            <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
              <div className="container text-center text-white">
                <h1 className="display-4 fw-bold">Welcome to Touch N Shine</h1>
                <p className="lead">Where Beauty Meets Elegance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-4">Our Story</h2>
              <p className="lead">
              Established in 2017, Touch N Shine has been transforming clients with exceptional beauty services
            for over a decent period. Our passion for creativity and commitment to quality has made us one of the
            most trusted salons in the city.
              </p>
              <p>
              We believe everyone deserves to feel beautiful and confident. Our team of expert stylists stays updated
            with the latest trends and techniques to bring you the best in hair, skin, and nail care. We focus on
            personalized services tailored to each client’s unique needs. Whether it's a quick trim, a glamorous
            makeover, or a full beauty treatment, we strive to exceed your expectations every time.
              </p>
              <p>
              Our salon is equipped with state-of-the-art tools and products to ensure a luxurious experience. From
            soothing spa treatments to bold and beautiful haircuts, we aim to create an environment where you can
            relax, unwind, and leave feeling your best. We pride ourselves on offering exceptional service and
            care, ensuring you always look and feel your absolute best.
              </p>
            </div>
            <div className="col-md-6">
              <img 
                src={owner2}
                alt="Salon Services" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section mb-5 bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Meet Our Experts</h2>
          <div className="row">
            {[
              {name: 'Kavita ', role: 'Master Stylist', img: emp1},
              {name: 'Sony', role: 'Color Specialist', img: emp2},
              {name: 'Deepika', role: 'Skincare Expert', img: emp3}
            ].map((member, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 border-0">
                  <img 
                    src={member.img} 
                    className="card-img-top rounded-circle mx-auto mt-4" 
                    alt={member.name}
                    style={{width: '200px', height: '200px', objectFit: 'cover'}}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{member.name}</h5>
                    <p className="card-text text-muted">{member.role}</p>
                    <p className="card-text">10+ years experience</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section mb-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="row">
            {[
              {icon: faScissors, title: 'Hair Styling', description: 'Custom cuts, coloring, and treatments'},
              {icon: faBrush, title: 'Makeup Artistry', description: 'Professional makeup for all occasions'},
              {icon: faSmile, title: 'Spa Services', description: 'Relaxing facials and skin treatments'}
            ].map((service, index) => (
              <div className="col-md-4 text-center mb-4" key={index}>
                <FontAwesomeIcon icon={service.icon} size="3x" className="mb-3 text-primary" />
                <h4>{service.title}</h4>
                <p className="text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
     <Footer />
    </div>
  );
};

export default AboutUs;