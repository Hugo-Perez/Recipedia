import React, { useEffect, useState } from "react";
import {Link, NavLink, useHistory, useParams} from "react-router-dom";
import "./Home.css";

import Auth from "../../utils/auth";

import RecipeFetcher from '../Recipe/RecipeFetcher';
import SavedRecipesView from '../Recipe/SavedRecipesView';

const Home = ({mode}) => {

  const [recipeBooks, setRecipeBooks] = useState([]);
  const {bookId} = useParams();
  const history = useHistory();

  const deleteRecipeBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this recipeBook?")) {
      fetch(`http://localhost:8080/api/recipe/deleteRecipeBook/?bookId=${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: Auth.authHeader(),
        },
        redirect: "follow",
      })
        .then(
          (response) => (response.status === 200)
            ? window.location.reload()
            : alert("An errorred ocurred while trying to delete this book, try again later")
        )
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/recipe/myRecipeBooks", {
      method: "POST",
      headers: {
        Authorization: Auth.authHeader(),
      },
      redirect: "follow",
    })
      .then(async (response) =>{
          let data = await response.json();

          if (response.status === 403) {
            Auth.logout();
            window.location.reload();
          }

          return data;
      })
      .then((data) => {
        setRecipeBooks(data)
        console.log(bookId)
        if (bookId === undefined) {
          let defaultBook = data.find((recipebook) => recipebook.deletable === false)
          history.push(`/home/${defaultBook.id}`);
        }
      })
      .catch((err) => console.error(err));
  }, []);



  return(
    <div className="container home-container bg-dark">
      <div className="row h-100 overflow-hidden">
        <div className="col-lg-4 pb-3">
          <nav className="navbar navbar-dark bg-dark sidebar align-content-between h-100 ">
            <ul className="nav nav-pills flex-column w-100 mx-1">
              {recipeBooks?.map((book) => (
                <li key={`${book.id}`} className="d-flex justify-content-between align-items-center my-1">
                  <NavLink className="nav-link text-truncate"  to={`/home/${book.id}`}>
                    {book.title}
                  </NavLink>
                  {book.deletable && [
                    <div>
                      <Link to={`/newRecipe/${book.id}`} type="button" className="btn btn-outline-success">
                        <i className="bi bi-plus-lg"/>
                      </Link>

                      <Link to={`/editRecipeBook/${book.id}`} type="button" className="btn btn-outline-warning">
                        <i className="bi bi-pencil-fill"/>
                      </Link>

                      <button onClick={() => deleteRecipeBook(book.id)} type="button" className="btn btn-outline-danger">
                        <i className="bi bi-x-lg"/>
                      </button>
                    </div>
                  ]}
                </li>
              ))}
            </ul>
            <div className="nav-pills w-100 mt-auto">
              <Link to="/mySavedRecipes" className="text-dark nav-link bg-light my-1 text-light ">
                <i className="bi bi-bookmarks-fill"/> Saved recipes
              </Link>
              <Link to="/newRecipeBook" className="text-dark nav-link bg-light my-1 text-light ">
                <i className="bi bi-plus-lg"/> Create a new recipe book
              </Link>
            </div>
          </nav>
        </div>
        <div className="col-lg-8 mh-100 overflow-auto cool-scrollbar">
          {(bookId)
          ? <RecipeFetcher bookId={bookId} />
          : (mode==="savedRecipes") ?<SavedRecipesView/> : <h1>no book</h1>}
        </div>
      </div>
    </div>
  );
};

export default Home;
