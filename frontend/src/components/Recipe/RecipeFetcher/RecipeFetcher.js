import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import './RecipeFetcher.css';

import RecipeList from '../RecipeList';
import Auth from "../../../utils/auth";

const RecipeFetcher = ({bookId}) => {

  const [recipeBook, setRecipeBook] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/api/recipe/recipeBook/?bookId=${bookId}`, {
      method: "GET",
      headers: {
        Authorization: Auth.authHeader(),
      },
    })
      .then((response) => response.json())
      .then((data) => setRecipeBook(data));

      console.log(recipeBook);

  }, [bookId])

  if (recipeBook.recipes?.length <= 0) {
    return (
      <div className="alert alert-primary" role="alert">
        You don't have any recipe created yet, &nbsp;
        <Link className="alert-link" to={`/newRecipe/${recipeBook.id}`}> Why don't you try creating one?</Link>
      </div>
    )
  } else {
    return(
      <div id="recipes" className="row row-cols-1 g-4 overflow-auto">
        <RecipeList recipeBook={recipeBook}/>
      </div>
    );
  }

};

export default RecipeFetcher;
