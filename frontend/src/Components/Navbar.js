import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink exact to="/" className="nav-link" activeClassName="active">SignUp</NavLink>
        </li>
        <li>
          <NavLink to="/SignIn" className="nav-link" activeClassName="active">SignIn</NavLink>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;