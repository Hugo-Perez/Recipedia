import React, {useEffect, useState} from 'react';
import './SearchFetcher.css';

import {API_URL} from "../../../utils/constants";
import Auth from '../../../utils/auth';
import RecipeCard from "../../Recipe/RecipeCard";
import {Link} from "react-router-dom";

const SearchFetcher = ({filters}) => {

  const [recipes, setRecipes] = useState({});


  useEffect(() => {
    const URL = `${API_URL}recipe/searchRecipes/?searchText=${filters?.searchText}&page=${Number(filters?.page)-1}`
              + `&pageSize=24&sort=${filters.sort},${filters.order}&ingredients=${filters?.ingredients}`;

    fetch(URL, {
      method: "GET",
      headers: {
        Authorization: Auth.authHeader()
      }
    })
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, [filters])




  if (recipes?.content?.length === 0) {
    return(
      <div className="alert alert-primary" role="alert">
        No recipes have been found, try changing your parameters
      </div>
    );
  }

  else if (recipes?.content?.length > 0) {
    return (
      <>
        {recipes.content.map((recipe) => (
          <div key={`${recipe.id}`}>
            <Link className="recipe-link" to={`/recipe/${recipe.id}`}>
              <RecipeCard recipe={recipe} key={`${recipe.id}`}/>
            </Link>
          </div>
        ))}
      </>
    )
  }

  else {
    return (
      <div className="spinner"></div>
    )
  }
};

export default SearchFetcher;
