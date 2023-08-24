import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2"; 
import './Image.css'
import ImageGallery from './ImageGallery ';
const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    axios.post('https://commen-sense.vercel.app/upload', formData)
      .then(response => {
        console.log(response.data);
        // Handle success or show a message to the user
         //show sweet alert2 success message
      Swal.fire({
        icon: 'success',
        title: 'Image uploaded successfully',
        text:'uploaded successfully'
      })
      })
      
      .catch(error => {
        console.error(error);
        // Handle error or show an error message to the user
      });
  };

  return (
    <div className="image-upload-container">
    <h2>Image Upload</h2>
    <div className="upload-section">
      <input type="file" id="file-input" onChange={handleFileChange} />

      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
    </div>
    <ImageGallery />
  </div>
  );
};

export default ImageUpload;
