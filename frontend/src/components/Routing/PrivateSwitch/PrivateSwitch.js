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
import RecipeCreator from '../../Creators/RecipeCreator';
import RecipeView from '../../RecipeView';

const PrivateSwitch = ({logOut}) => {
  return (
    <Switch>
      {/* Logged in routes */}
      <Route exact path="/home/">
        <Home />
      </Route>
      <Route path="/home/:bookId">
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
      <Route path="/newRecipe/:bookId">
        <RecipeCreator />
      </Route>
      <Route path="/recipe/:recipeId">
        <RecipeView />
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
