import React from "react";
import "./RecipeBookDisplay.css";

import { Link } from "react-router-dom";

const RecipeBookDisplay = ({ recipeBook }) => {
  return (
    <div className='col mx-auto mb-4'>
      <div className='card'>
        <div class='card-header'>
          <h5 className='card-title'>{recipeBook.title}</h5>
          <span className='text-muted'>{recipeBook.author}</span>
        </div>
        <div className='card-body'>
          <p className='card-text'>{recipeBook?.description}</p>

          <div
            className='btn-group mr-2'
            role='group'
            aria-label='product-links'
          >
            <Link
              to={`/recipebook/${recipeBook.id}`}
              className='btn btn-outline-primary'
            >
              View Recipes
            </Link>
            {localStorage.getItem("user") && (
              <Link
                to={`/edit/recipebook/${recipeBook.id}`}
                className='btn btn-outline-primary'
              >
                Edit Book
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeBookDisplay;
