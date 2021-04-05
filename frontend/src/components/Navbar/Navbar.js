import React from "react";
import "./Navbar.css";

import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/home">
          <img src="/images/logo.png" alt="Recipedia logo" width="27" height="27" className="d-inline-block align-text-top me-2"/>
          Recipedia
        </NavLink>  
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navLinks"
          aria-controls="navLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navLinks">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/signin">
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/signup">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
