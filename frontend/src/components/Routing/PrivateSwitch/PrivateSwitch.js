import React from "react";
import "./PrivateSwitch.css";

import { 
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Home from '../../Home';
import Profile from '../../Profile';
import MyRecipes from '../../MyRecipes';

const PrivateSwitch = () => {
  return (
    <Switch>
      {/* Logged in routes */}
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/profile/:username">
        <Profile />
      </Route>
      <Route path="/myrecipes">
        <MyRecipes />
      </Route>

      {/* Fallback path */}
      <Redirect to="/home" />
    </Switch>
  );
};

export default PrivateSwitch;
