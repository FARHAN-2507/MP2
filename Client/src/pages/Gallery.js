import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import "./styles/Gallery.css"; // Custom styling

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/images"); // Fetch images from the backend
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
                   <div style={{ marginTop: '120px' }}></div>

      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }} // Responsive
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000${image.imageUrl}`} // Ensure full URL
            alt={`Gallery ${index}`}
            className="gallery-img"
          />
        ))}
      </Masonry>
    </div>
  );
};

export default Gallery;
