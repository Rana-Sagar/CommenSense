import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';
import './Login.css'
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://commen-sense.vercel.app/auth/login', {
        email,
        password
      });
      console.log(response);
 // Show sweet alert2 success message
 Swal.fire({
  icon: 'success',
  title: 'Login successfully',
  text: 'You have successfully Logged in'
});
//clear input fields
setEmail('');
setPassword('');
     
//use navigate to redirect to the image upload page
navigate("/ImageUpload");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
