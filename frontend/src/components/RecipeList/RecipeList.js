import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './RecipeList.css';

import Auth from "../../utils/auth";

import ErrorCard from '../ErrorCard';

const RecipeList = ({bookId}) => {

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
      <div class="alert alert-primary" role="alert">
        You don't have any recipe created yet, &nbsp;
        <Link className="alert-link" to={`/newRecipe/${recipeBook.id}`}> Why don't you try creating one?</Link>
      </div>
    )
  }

  return(
    <div>
      Recipe book received: {recipeBook.title}
    </div>
  );
};

export default RecipeList;
