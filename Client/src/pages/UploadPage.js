import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";

const UploadPage = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setError("You can upload up to 10 images at a time.");
      return;
    }
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
    setError("");
    setSuccess("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError("Please select at least one image.");
      return;
    }
  
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image); // Append the selected images
    });
  
    setUploading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/api/upload-multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setSuccess("Images uploaded successfully!");
      setImages([]); // Reset images after upload
      setPreviews([]); // Reset previews
    } catch (err) {
      setError("Error uploading images. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <Container className="upload-page mt-5">
             <div style={{ marginTop: '120px' }}></div>

      <Row className="justify-content-center">
        <Col md={8} className="p-4 border rounded shadow bg-white">
          <h3 className="text-center mb-4">Upload Your Images to Gallery</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Select Images (Max: 10)</Form.Label>
              <Form.Control type="file" multiple accept="image/*" onChange={handleFileChange} />
            </Form.Group>

            {previews.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mb-3">
                {previews.map((src, index) => (
                  <img key={index} src={src} alt={`Preview ${index}`} className="img-thumbnail" style={{ width: "100px", height: "100px" }} />
                ))}
              </div>
            )}

            <Button variant="primary" type="submit" disabled={uploading} className="w-100">
              {uploading ? <Spinner as="span" animation="border" size="sm" /> : "Upload Images"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPage;
