import React from 'react';
import './RecipeSearch.css';

import SearchFetcher from "../SearchFetcher";
import {useForm} from "react-hook-form";
import {API_URL} from "../../../utils/constants";
import Auth from "../../../utils/auth";
import {useHistory} from "react-router-dom";

const RecipeSearch = () => {

  const { register, watch, setValue } = useForm({
    defaultValues: {
      searchText: "",
      ingredients: "",
      sort: "title",
      order: "asc",
      page: "1"
    }
  });

  const history = useHistory();
  const filters = watch();

  const getRandomRecipe = () => {
    const URL = `${API_URL}recipe/randomRecipe`;

    fetch(URL, {
      method: "GET",
      headers: {
        Authorization: Auth.authHeader()
      }
    })
      .then(response => response.json())
      .then(randomRecipe => history.push(`/recipe/${randomRecipe?.id}`))
      .catch(err => console.error(err));
  }

  return(
    <div className="container home-container bg-dark text-light p-4">
      <div className="row h-100 overflow-hidden">
        <div className="col-md-3">
          <div className="mb-2 display-6">Find your recipes:</div>

          <div className="form-group my-2">
            <label htmlFor="searchText">Search:</label>
            <input
              type="text"
              className="form-control"
              id="searchText"
              name="searchText"
              placeholder="Search by name or description"
              ref={register()}
            />
          </div>

          <div className="form-group my-2">
            <label htmlFor="type">Ingredients <small>(separated by commas)</small>:</label>
            <input
              type="text"
              className="form-control"
              id="ingredientsFilter"
              name="ingredients"
              placeholder="Type ingredients you have"
              ref={register()}
            />
          </div>

            <div className="form-group my-2">
              <label htmlFor="sort">Sort by:</label>
              <select id="sort" name="sort" className="form-control" ref={register()} defaultValue={"title"}>
                <option value="title">Title</option>
                <option value="views">Views</option>
              </select>
            </div>

            <div className="form-group my-2">
              <label htmlFor="order">Order: </label>
              <select id="order" name="order" className="form-control" ref={register()} defaultValue={"asc"}>
                <option value="asc">Ascendant  </option>
                <option value="desc">Descendant</option>
              </select>
            </div>

            <div className={"mt-4"}>
              <button type={"button"} onClick={() => getRandomRecipe()} className={"btn btn-light text-start w-100"}>
                <i className="bi bi-shuffle me-2"/>
                Get random recipe
              </button>
            </div>
          </div>
        <div className="col-md-9 mh-100 overflow-auto cool-scrollbar">
          <div className="d-flex justify-content-between align-items-center bg-dark pb-4 sticky-top mb-4">
            <div className="display-6">Recipes found:</div>
            <div role="group" aria-label="First group">
              <button type="button"
                      disabled={filters.page <= 1}
                      onClick={() => setValue("page", Number(filters.page) - 1)}
                      className="btn btn-primary mx-1">
                <i className="bi bi-arrow-left"/>
              </button>
              <input id="page" name="page" ref={register()} min="1" type="number" className="btn btn-primary mx-1" />
              <button type="button"
                      onClick={() => setValue("page", Number(filters.page) + 1)}
                      className="btn btn-primary mx-1">
                <i className="bi bi-arrow-right"/>
              </button>
            </div>
          </div>
          <div id="recipes" className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
            <SearchFetcher filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
