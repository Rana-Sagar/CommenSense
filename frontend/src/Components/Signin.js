import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
import { useNavigate  } from "react-router-dom"; // Import Redirect component

function Signin() {
    const navigate = useNavigate(); 
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://commen-sense.vercel.app/signup', {
        fullname,
        email,
        password
      });

      console.log(response);
      //show sweet alert2 success message
      Swal.fire({
        icon: 'success',
        title: 'User registered successfully',
        text:'You have successfully registered'
      })
      //clear input fields
      setFullName('');
      setEmail('');
      setPassword('');
      // Use navigate to redirect to the login page
      navigate("/SignIn");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div className="app">
    
    <div className="form-container">
    <h1>User Registration</h1>
    <input
      type="text"
      placeholder="Full Name"
      value={fullname}
      onChange={(e) => setFullName(e.target.value)}
    />
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
    <button onClick={handleSignup}>Signup</button>
  </div>
  </div>
  );
}

export default Signin;
