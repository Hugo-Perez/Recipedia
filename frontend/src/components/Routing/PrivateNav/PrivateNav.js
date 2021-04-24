import React from 'react';
import './PrivateNav.css';

import {NavLink} from 'react-router-dom';

const PrivateNav = ({user}) => {
  return(
    <div className="collapse navbar-collapse" id="navLinks">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/myrecipes">
            My Recipes
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to={`/profile/${user.username}`}>
            {user.username}
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to={`/logout`}>
            Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PrivateNav;
