import React, {useEffect, useState} from 'react';
import './RecipeView.css';

import {Link, useHistory, useParams} from 'react-router-dom';

import Auth from '../../../utils/auth.js';

const RecipeView = () => {

  const history = useHistory();

  const [recipe, setRecipe] = useState({});
  const [isOwner, setIsOwner] = useState({});
  const {recipeId} = useParams();

  //Random pastel color generation
  const bgColor = "hsla(" + ~~(360 * Math.random()) + ", 70%, 80%, 1)"

  const deleteRecipe = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      fetch(`http://localhost:8080/api/recipe/deleteRecipe/?recipeId=${recipe.id}`, {
        method: "DELETE",
        headers: {
          Authorization: Auth.authHeader(),
        },
        body: "",
        redirect: "follow",
      })
        .then((response) =>{ if(response.ok) history.push("/home")});
    }
  }

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

  return(
    <div className="container pb-4">
      <div className="row">
        {isOwner
          && [  
            <div className="col-sm-12 col-md-2">
              <div className="container-fluid bg-dark py-2 text-white">
                <img src={recipe.imageURL} className="img-fluid" alt={recipe.title}/>
                <h5 className="mx-auto">Owner actions</h5>
                <Link to={`/editRecipe/${recipe?.recipeBook?.id}/${recipe?.id}`} className="btn btn-outline-warning mx-auto my-2 w-100">Edit recipe</Link>
                <button onClick={() => deleteRecipe()} className="btn btn-outline-danger mx-auto my-2 w-100">Delete recipe</button>
              </div>
            </div>
          ]
        }
        <div className="col-sm-12 col-md-8 col-xl-8 mx-auto bg-dark text-white recipe-col">
          <div className="recipe-view-header d-flex flex-column mt-3" style={{backgroundImage: `url(${recipe.imageURL})`, backgroundColor: bgColor}}>
            <h3 className="recipe-image-txt display-5 px-1 mb-0"><i>{recipe?.title}</i></h3>
            <h3 className="recipe-image-txt lead px-1">{recipe?.description}</h3>
            <h3 className="recipe-image-txt lead px-1 mb-0 mt-auto"><Link to={`/profile/${recipe?.recipeBook?.author}`} className="link-azul">Author: {recipe?.recipeBook?.author}</Link></h3>
          </div>
          <hr/>
          <h3 className="lead">Ingredients:</h3>
          <p>{
            recipe?.ingredients?.split("\n").map(function(item, idx) {
              return (
                <span key={idx}>
                  {item}
                  <br/>
                </span>
              )
            })
          }</p>
          <hr/>
          <h3 className="lead">Steps:</h3>
          <p>
            {
              recipe?.steps?.split("\n").map(function(item, idx) {
                return (
                  <span key={idx}>
                    {item}
                    <br/>
                  </span>
                )
              })
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
