import React, {useEffect, useState} from 'react';
import './SaveRecipe.css';

import Auth from "../../../utils/auth";
import {API_URL} from "../../../utils/constants";

const SaveRecipe = ({recipe}) => {
  const [saved, setSaved] = useState(false);
  const user = Auth.getCurrentUser();

  useEffect(() => {
    fetch(`${API_URL}recipe/getSavedRecipes`, {
      "method": "GET",
      "headers": {
        "Authorization": Auth.authHeader()
      }
    }).then(response => response.json())
      .then(savedRecipes => {
        if (savedRecipes.filter(recipe => recipe?.id === recipe.id).length > 0) {
          setSaved(true);
        }
      })
  }, [])

  const addRecipe = () => {
    fetch(`${API_URL}recipe/addSavedRecipe?recipeId=${recipe?.id}`, {
      "method": "POST",
      "headers": {
        "Authorization": Auth.authHeader()
      }
    })
      .then((response) => {
        response.ok
          ? setSaved(true)
          : alert("An error occurred while saving the recipe, try again later.");
      })
  }

  const removeRecipe = () => {
    fetch(`${API_URL}recipe/removeSavedRecipe?recipeId=${recipe?.id}`, {
      "method": "DELETE",
      "headers": {
        "Authorization": Auth.authHeader()
      }
    })
      .then((response) => {
        response.ok
          ? setSaved(false)
          : alert("An error occurred while removing the recipe, try again later.");
      })
  }

  if (user.id === recipe?.recipeBook?.owner?.id) {
    return null;
  }

  else {
    if (saved) {
      return (
        <i onClick={() => removeRecipe()} className="bi bi-bookmark-fill"/>
      );
    } else {
      return (
        <i onClick={() => addRecipe()} className="bi bi-bookmark"/>
      );
    }
  }
};

export default SaveRecipe;
