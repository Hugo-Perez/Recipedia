import React from 'react';
import './PrivateNav.css';

import {NavLink} from 'react-router-dom';

const PrivateNav = ({user}) => {
  return(
    <div className="collapse navbar-collapse" id="navLinks">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <NavLink className="nav-link" to="/searchRecipes">
            <i className="bi bi-search me-2"/>
            Search Recipes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/home">
            <i className="bi bi-journal-bookmark me-2"/>
            My Books
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/newRecipe">
            <i className="bi bi-plus-lg me-2"/>
            New Recipe
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/profile/${user.username}`}>
            <i className="bi bi-person-circle me-2"/>
            {user.username}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/logout`}>
            <i className="bi bi-box-arrow-right me-2"/>
            Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PrivateNav;
