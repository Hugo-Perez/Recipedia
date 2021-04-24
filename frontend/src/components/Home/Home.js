import React, { useEffect, useState } from "react";
import "./Home.css";

import Auth from '../../utils/auth';

import { Link } from "react-router-dom";

const Home = () => {
  const [recipeBooks, setRecipeBooks] = useState({})

  useEffect(() => {
    
    fetch("http://localhost:8080/api/recipe/myRecipeBooks", {
      method: "POST",
      headers: { 
        "Authorization": Auth.authHeader()
      },
      body: "",
      redirect: "follow",
    })
    .then((response) => response.json())
    .then((data) => setRecipeBooks(data));
  }, [])


  //======================================
  //== CONDITIONALLY RENDERED COMPONENT ==
  //======================================

  if (!recipeBooks) {   // CASE 1: Can't get the recipebooks
    return (
      <div className="d-flex justify-content-center align-self-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (recipeBooks.length === 0) { // CASE 2: No recipe book is present
    return (
      <div className="d-flex justify-content-center align-self-center">
        <h1>Looks like you don't have any recipe books, why don't you try making one?</h1>
      </div>
    );
  } else { //
    return (
      <h1>Hi</h1>
    );
  }
};

export default Home;
