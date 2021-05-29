import React from "react";
import "./PrivateSwitch.css";

import { 
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Home from '../../Home';
import ProfileFetcher from '../../ProfileFetcher';
import MyRecipeBooks from '../../MyRecipeBooks';
import BookCreator from '../../Creators/BookCreator';
import RecipeCreator from '../../Creators/RecipeCreator';
import RecipeView from '../../Recipe/RecipeView';
import RecipeEditor from "../../Recipe/RecipeEditor";

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
      <Route path="/myRecipeBooks">
        <MyRecipeBooks />
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
      <Route path="/editRecipe/:bookId/:recipeId">
        <RecipeEditor />
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
