import React from "react";
import "./PublicNav.css";

import {NavLink} from 'react-router-dom';

const PublicNav = () => {
  return (
    <div className="collapse navbar-collapse" id="navLinks">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/signin">
            <i className="bi bi-box-arrow-in-right me-2"/>
            Sign in
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/signup">
            <i className="bi bi-person-plus-fill my-auto me-2"/>
            Register
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PublicNav;
