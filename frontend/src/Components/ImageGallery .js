import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Imagegellery.css'
const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('https://commen-sense.vercel.app/images')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleImageDownload = async (imageUrl) => {
    try {
      const response = await axios.get(`https://commen-sense.vercel.app/${imageUrl}`, { responseType: 'blob' });
  
      const blob = new Blob([response.data], { type: 'image/jpeg' }); // Adjust the MIME type if needed
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'image.jpg'; // Customize the downloaded file name
      link.click();
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img
            src={`https://commen-sense.vercel.app/${image.imageUrl}`}
            alt="gallery"
            className="gallery-image"
          />
          <div className="download-icon" onClick={() => handleImageDownload(image.imageUrl)}>
            <i className="fas fa-download"></i> {/* FontAwesome download icon */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
