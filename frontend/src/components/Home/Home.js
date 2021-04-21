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
    .then((data) => console.log(data));
  }, [])
  return (
   <div>
     Hello, this is a Home component!
   </div>
  );
};

export default Home;
