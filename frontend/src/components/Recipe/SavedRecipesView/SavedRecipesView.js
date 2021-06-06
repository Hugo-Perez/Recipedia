import React, {useEffect, useState} from 'react';
import './SavedRecipesView.css';
import Auth from "../../../utils/auth";
import {Link} from "react-router-dom";
import RecipeList from "../RecipeList";
import {API_URL} from "../../../utils/constants";
import RecipeCard from "../RecipeCard";

const SavedRecipesView = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}recipe/getSavedRecipes`, {
      method: "GET",
      headers: {
        Authorization: Auth.authHeader(),
      },
    })
      .then((response) => response.json())
      .then((data) => setSavedRecipes(data));
  }, [])

  if (savedRecipes?.length <= 0) {
    return (
      <div className="alert w-75 mx-auto mt-5 alert-primary" role="alert">
        <p>You don't have any recipe saved yet.</p>
        <p>To save a another user's recipe click on the icon next to it's title.</p>
      </div>
    )
  } else {
    return(
      <div id="recipes" className="row py-2 row-cols-md-1 g-3">
        {savedRecipes?.map(recipe => (
          <div key={recipe.id}>
            <Link className="recipe-link" to={`/recipe/${recipe.id}`}>
              <RecipeCard recipe={recipe} key={`${recipe.id}`}/>
            </Link>
          </div>
        ))}
      </div>
    );
  }
};

export default SavedRecipesView;
