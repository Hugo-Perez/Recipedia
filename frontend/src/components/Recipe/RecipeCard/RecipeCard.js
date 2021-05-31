import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({recipe}) => {

  const getDefaultImage = (e) => {
    e.target.src = "/images/recipe/default-recipe.png";
  }

  return(
    <div className="card p-0 recipe-card m-auto" >
      <img src={`/images/recipe/${recipe.id}.png`} onError={(e) => getDefaultImage(e)} className="card-img recipe-image" alt={recipe.title}/>
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
      </div>
    </div>
  );
};

export default RecipeCard;
