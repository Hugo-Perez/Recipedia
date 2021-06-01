import React, { useEffect, useState } from "react";
import {Link, NavLink, useParams} from "react-router-dom";
import "./Home.css";

import Auth from "../../utils/auth";

import RecipeFetcher from '../Recipe/RecipeFetcher';

const Home = () => {

  const [recipeBooks, setRecipeBooks] = useState([]);
  const {bookId} = useParams();

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
      .then((data) => setRecipeBooks(data))
      .catch((err) => console.error(err));
  }, []);

  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-3 pb-3">
          <nav className="navbar navbar-dark bg-dark sidebar">
            <ul className="nav nav-pills flex-column w-100 mx-1">
              {recipeBooks?.map((book) => (
                <li className="d-flex justify-content-between align-items-center my-1">
                  <NavLink className="nav-link overflow-hidden" key={`${book.id}`} to={`/home/${book.id}`}>
                    {book.title}
                  </NavLink>
                  {book.deletable && [
                    <div className="btn-group">
                      <Link to={`/editRecipeBook/${book.id}`} type="button" className="btn btn-outline-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-pencil-fill" viewBox="0 0 16 16">
                          <path
                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                      </Link>

                      <button onClick={() => deleteRecipeBook(book.id)} type="button" className="btn btn-outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-lg" viewBox="0 0 16 16">
                          <path
                            d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                        </svg>
                      </button>
                    </div>
                  ]}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-sm-12 col-md-7 col-lg-8 offset-md-1">
          {(bookId)
          ? <RecipeFetcher bookId={bookId} />
          : <h1>no book</h1>}
        </div>
      </div>
    </div>
  );
};

export default Home;
