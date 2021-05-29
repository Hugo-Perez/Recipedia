import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({recipe}) => {

  const getImageSrc = () => {
    return `/images/recipe/${recipe.image || "default-recipe.png"}`
  }

  return(
    <div className="card p-0 recipe-card m-auto" >
      <img src={getImageSrc()} className="card-img recipe-image" alt={recipe.title}/>
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
      </div>
    </div>
  );
};

export default RecipeCard;
