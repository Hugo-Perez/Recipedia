import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({recipe}) => {

  const getImageSrc = () => {
    return `/images/recipe/${recipe.image || "default-recipe.png"}`
  }

  return(
    <div class="card p-0 recipe-card m-auto" >
      <img src={getImageSrc()} class="card-img recipe-image" alt={recipe.title}/>
      <div class="card-body">
        <h5 class="card-title">{recipe.title}</h5>
      </div>
    </div>
  );
};

export default RecipeCard;
