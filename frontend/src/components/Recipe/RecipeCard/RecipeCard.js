import React from 'react';
import './RecipeCard.css';

import Auth from '../../../utils/auth';

const RecipeCard = ({recipe}) => {

  //Random pastel generation
  const bgColor = "hsla(" + ~~(360 * Math.random()) + "," + "70%," + "80%,1)"



  return(
    <div className="card p-0 recipe-card m-auto " >
      <div style={{backgroundColor: bgColor}}>
        <img src={recipe.imageURL} className="card-img recipe-image" alt={recipe.title}/>
      </div>
      <div className="card-body">
        <h5 className="card-title text-truncate">
          {recipe.title}
        </h5>
      </div>
    </div>
  );
};

export default RecipeCard;
