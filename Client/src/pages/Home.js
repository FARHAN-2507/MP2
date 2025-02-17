import React from 'react';
import b1 from '../assets/b1.jpg';
import b2 from '../assets/b2.jpg';
import b3 from '../assets/b3.jpg';
import owner from '../assets/owner.jpg';
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
       <div style={{ marginTop: '90px' }}></div>

       {/* Image Slider */}
       <div className="p-4 m-4">
  <div id="imageSlider" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img 
          src={b1}
          className="d-block w-100" 
          alt="Salon Hair Styling" 
        />
      </div>
      <div className="carousel-item">
        <img 
          src={b2}
          className="d-block w-100" 
          alt="Spa Services" 
        />
      </div>
      <div className="carousel-item">
        <img 
          src={b3} 
          className="d-block w-100" 
          alt="Makeup and Skincare" 
        />
      </div>
      
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#imageSlider" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#imageSlider" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>

      {/* Stats Banner with Rounded Corners */}
      <div className="container my-5">
        <div className="bg-light rounded-4 py-5 text-center shadow-sm">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <i className="bi bi-award fs-1 text-warning"></i>
                <h3 className="mt-3">5+ Awards</h3>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <i className="bi bi-patch-check fs-1 text-primary"></i>
                <h3 className="mt-3">Certified Experts</h3>
              </div>
              <div className="col-md-4">
                <i className="bi bi-hourglass-split fs-1 text-success"></i>
                <h3 className="mt-3">10+ Years</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
          <h2 className="display-5 mb-4">Meet Our Founder</h2>
          <p className="lead">
            <strong>Tannu</strong>, our award-winning stylist and founder, has been transforming 
            clients' looks since 2014. With a passion for beauty and precision, She trained 
            at the prestigious VLCC Beauty Academy and brings different techniques to our salon.
          </p>
          <p>
            "Our mission is to enhance your natural beauty while providing a relaxing, 
            luxurious experience. We use only premium products and stay updated with 
            the latest trends through continuous education."
          </p>
          <button className="btn btn-dark btn-lg" onClick={() => window.location.href='/aboutus'}>Read Full Story</button>
            </div>
            <div className="col-md-6">
          <div className="ratio ratio-1x1">
            <img 
              src={owner} 
              alt="Jessica Monroe, Salon Owner" 
              className="img-fluid rounded-circle shadow" 
              style={{ objectFit: 'cover' }}
            />
          </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Client Experiences</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              
              {/* Testimonial Slide 1 */}
              <div className="carousel-item active">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100 shadow border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-star-fill text-warning me-2"></i>
                          <h5 className="mb-0">Best in Rohini</h5>
                        </div>
                        <p className="text-muted">"I've been coming here for years! She is the true artists and the atmosphere is always welcoming."</p>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i className="bi bi-person-circle fs-4 text-secondary"></i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Kavita</h6>
                            <small className="text-muted">Regular Client</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Add more testimonials following the same structure */}
                  <div className="col-md-4">
                    <div className="card h-100 shadow border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-star-fill text-warning me-2"></i>
                          <h5 className="mb-0">Perfect Wedding Look</h5>
                        </div>
                        <p className="text-muted">"The team created my dream wedding hairstyle and makeup. They listened carefully to all my requests!"</p>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i className="bi bi-person-circle fs-4 text-secondary"></i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Rosy </h6>
                            <small className="text-muted">Bride</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card h-100 shadow border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-star-fill text-warning me-2"></i>
                          <h5 className="mb-0">Skin Transformation</h5>
                        </div>
                        <p className="text-muted">"The facial treatments completely revived my skin. Professional service with amazing results!"</p>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i className="bi bi-person-circle fs-4 text-secondary"></i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Vibha Gols</h6>
                            <small className="text-muted">Skincare Client</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Slide 2 */}
              <div className="carousel-item">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100 shadow border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-star-fill text-warning me-2"></i>
                          <h5 className="mb-0">Color Expert</h5>
                        </div>
                        <p className="text-muted">"Finally found a stylist who understands color theory! My highlights look natural and gorgeous."</p>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i className="bi bi-person-circle fs-4 text-secondary"></i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Richa Arora</h6>
                            <small className="text-muted">Coloring Client</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card h-100 shadow border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-star-fill text-warning me-2"></i>
                          <h5 className="mb-0">Haircut</h5>
                        </div>
                        <p className="text-muted">"Always get a precise cut and great styling advice."</p>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i className="bi bi-person-circle fs-4 text-secondary"></i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Latika Jaiswal</h6>
                            <small className="text-muted">Regular Client</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card h-100 shadow border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-star-fill text-warning me-2"></i>
                          <h5 className="mb-0">Party Makeup</h5>
                        </div>
                        <p className="text-muted">"Best and Affordable in Rohini"</p>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i className="bi bi-person-circle fs-4 text-secondary"></i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Deepika aggarwal</h6>
                            <small className="text-muted">Regular Client</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;