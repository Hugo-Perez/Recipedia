import React, {useEffect, useState} from 'react';
import './RecipeView.css';

import {useParams} from 'react-router-dom';

import Auth from '../../utils/auth.js';
import Functions from '../../utils/functions.js';

const RecipeView = () => {

  const [recipe, setRecipe] = useState({});
  const [isOwner, setIsOwner] = useState({});
  const {recipeId} = useParams();
  

  useEffect(() => {
    fetch(`http://localhost:8080/api/recipe/getRecipe/?recipeId=${recipeId}`, {
      method: "GET",
      headers: {
        Authorization: Auth.authHeader(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data.recipe)
        setIsOwner(data.isOwner)
      });

  }, [recipeId])

  console.log(recipe);
  console.log(Functions.objectEquals(Auth.getCurrentUser, recipe.owner));

  return(
    <div className="container">
      <div className="row"> 
        {isOwner
          && [  
            <div className="col-sm-12 col-md-2">
              <div className="container-fluid bg-dark py-2 text-white"> 
                <h5 className="mx-auto">Owner actions</h5>
                <button className="btn btn-outline-warning mx-auto my-2 w-100">Edit recipe</button>
                <button className="btn btn-outline-danger mx-auto my-2 w-100">Delete recipe</button>
              </div>
            </div>
          ]
        }
        <div className="col-sm-12 col-md-8 col-xl-8 mx-auto bg-dark text-white">
          <h3 className="display-5"><i>{recipe.title}</i></h3>
          <h3 className="lead">{recipe.description}</h3>
          <hr/>
          <h3 className="lead">Ingredients:</h3>
          <p>{recipe.ingredients}</p>
          <hr/>
          <h3 className="lead">Steps:</h3>
          <p>{recipe.steps}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
