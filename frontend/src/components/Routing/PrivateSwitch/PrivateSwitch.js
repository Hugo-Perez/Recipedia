import React from "react";
import "./PrivateSwitch.css";

import { 
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Home from '../../Home';
import ProfileFetcher from '../../ProfileFetcher';
import MyRecipes from '../../MyRecipes';
import BookCreator from '../../Creators/BookCreator';

const PrivateSwitch = ({logOut}) => {
  return (
    <Switch>
      {/* Logged in routes */}
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/profile/:username">
        <ProfileFetcher />
      </Route>
      <Route path="/myrecipes">
        <MyRecipes />
      </Route>
      <Route path="/newRecipebook">
        <BookCreator />
      </Route>
      <Route path="/logout">
        {() => logOut()}
      </Route>

      {/* Fallback path */}
      <Redirect to="/home" />
    </Switch>
  );
};

export default PrivateSwitch;
