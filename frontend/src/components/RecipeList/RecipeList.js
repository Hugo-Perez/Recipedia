import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './RecipeList.css';

import Auth from "../../utils/auth";

import RecipeCard from '../RecipeCard';


const RecipeList = ({recipeBook}) => {

  if (recipeBook.recipes?.length <= 0) {
    return (
      <div class="alert alert-primary" role="alert">
        You don't have any recipe created yet, &nbsp;
        <Link className="alert-link" to={`/newRecipe/${recipeBook.id}`}> Why don't you try creating one?</Link>
      </div>
    )
  } else {
    console.log(recipeBook)
    return(
      <>
        {recipeBook.recipes?.map(recipe => (
          <div class="col">
            <RecipeCard recipe={recipe} key={`${recipe.id}`}/>
          </div>
        ))}
      </>
    );
  }

};

export default RecipeList;
