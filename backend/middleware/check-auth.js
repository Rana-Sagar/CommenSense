// middleware/check-auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the "Authorization" header
    const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
    req.userId = decodedToken.userId; // Add the userId to the request object
    next(); // Continue to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
};
