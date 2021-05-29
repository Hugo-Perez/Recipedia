import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./Home.css";

import Auth from "../../utils/auth";

import RecipeList from '../Recipe/RecipeList';
import RecipeFetcher from '../Recipe/RecipeFetcher';


const Home = () => {

  const [recipeBooks, setRecipeBooks] = useState([]);
  const {bookId} = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/api/recipe/myRecipeBooks", {
      method: "POST",
      headers: {
        Authorization: Auth.authHeader(),
      },
      body: "",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => setRecipeBooks(data));
  }, []);

  return(
    <div className="row">
      <div className="col-md-2">
        <nav class="navbar navbar-dark bg-dark sidebar">
          <div class="navbar-nav flex-column">
            {recipeBooks?.map((book) => (
              <NavLink className="nav-link ps-2 mb-2 overflow-hidden sidebar-link" key={`${book.id}`} to={`/home/${book.id}`}>
                {book.title}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
      <div className="col-md-8 offset-md-1">
        {(bookId) 
        ? <RecipeFetcher bookId={bookId} />
        : <h1>no book</h1>}
      </div>
    </div>
  );
};

export default Home;
