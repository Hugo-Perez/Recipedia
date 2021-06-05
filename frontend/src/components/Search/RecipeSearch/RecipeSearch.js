import React from 'react';
import './RecipeSearch.css';

import SearchFetcher from "../SearchFetcher";
import {useForm} from "react-hook-form";

const RecipeSearch = () => {

  const { register, watch, setValue } = useForm({
    defaultValues: {
      searchText: "",
      type: "",
      sort: "title",
      order: "asc",
      page: "1"
    }
  });
  const filters = watch();
  console.log(filters)

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
            <label htmlFor="type">Recipe types:</label>
            <select id="type" name="type" className="form-control" ref={register()} defaultValue={""}>
              <option value="">Select a category</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="fitness">Fitness</option>
              <option value="traditional">Traditional</option>
            </select>
          </div>

            <div className="form-group my-2">
              <label htmlFor="sort">Sort by:</label>
              <select id="sort" name="sort" className="form-control" ref={register()} defaultValue={"title"}>
                <option value="title">Title</option>
                <option value="views">Views</option>
              </select>
            </div>

            <div className="form-group my-2">
              <label htmlFor="order">Order:</label>
              <select id="order" name="order" className="form-control" ref={register()} defaultValue={"asc"}>
                <option value="asc">Ascendant</option>
                <option value="desc">Descendant</option>
              </select>
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
