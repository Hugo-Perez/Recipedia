import React, { useEffect, useState } from "react";
import "./MyRecipeBooks.css";

import Auth from "../../utils/auth";

import { Link } from "react-router-dom";

import RecipeBookList from '../RecipeBookList';

const MyRecipeBooks = () => {
  const [recipeBooks, setRecipeBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/recipe/myRecipeBooks", {
      method: "POST",
      headers: {
        Authorization: Auth.authHeader(),
      },
      body: "",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => setRecipeBooks(data));
  }, []);

  console.log(recipeBooks);
  //======================================
  //== CONDITIONALLY RENDERED COMPONENT ==
  //======================================

  if (!recipeBooks) {
    // CASE 1: Can't get the recipebooks
    return (
      <div className='d-flex justify-content-center align-self-center'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  } else if (recipeBooks.length === 0) {
    // CASE 2: No recipe book is present
    return (
      <div className='d-flex justify-content-center align-self-center'>
        <div class='card text-center'>
          <div class='card-body'>
            <h5 class='card-title'>You have no recipes</h5>
            <p class='card-text'>
              Looks like you don't have any recipe books, why don't you try
              making one?
            </p>
            <Link to={"/newRecipebook"} class='btn btn-primary'>
              Create a recipe
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (recipeBooks?.length > 0) {
    //
    return (        
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
      <RecipeBookList recipeBooks={recipeBooks} />
    </div>
    )
  }
  
};

export default MyRecipeBooks;
