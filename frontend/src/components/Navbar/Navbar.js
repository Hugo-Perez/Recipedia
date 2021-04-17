import React, { useEffect, useState } from "react";
import "./Navbar.css";

import Auth from '../../utils/auth';

import {NavLink} from 'react-router-dom';

import PublicNav from '../PublicNav';
import PrivateNav from '../PrivateNav';

const Navbar = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(Auth.getCurrentUser());
  }, []);

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
        {user ? <PrivateNav user={user}/> : <PublicNav/>}
      </div>
    </nav>
  );
};

export default Navbar;
