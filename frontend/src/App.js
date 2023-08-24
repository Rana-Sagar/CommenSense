import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from './Components/Signin';// Update the path to your Signup component
import Login from "./Components/Login"; // Update the path to your Login component
import ImageUpload from "./Components/ImageUpload";
import Navbar from "./Components/Navbar";
import './App.css';
const App = () => {
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Signin/>}></Route>
    <Route path="/SignIn" element={<Login/>}></Route>
    <Route path="/ImageUpload" element={<ImageUpload/>}></Route>
    
    </Routes>
    </Router>
    </>
  )
}

export default App