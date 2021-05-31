import React, {useEffect, useState} from 'react';
import './RecipeEditor.css';

import {useHistory, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import Auth from "../../../utils/auth";
import {API_URL} from "../../../utils/constants";



const RecipeEditor = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipeBooks, setRecipeBooks] = useState([]);

  const history = useHistory();
  const { bookId, recipeId } = useParams();

  const { handleSubmit, register, errors, setValue } = useForm({
    reValidateMode: "onChange",
  });

  useEffect(() => {
    // Recipe Books fetching
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

    fetch(`http://localhost:8080/api/recipe/getRecipe/?recipeId=${recipeId}`, {
      method: "GET",
      headers: {
        Authorization: Auth.authHeader(),
      },
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        let {recipe} = data;
        setValue("title", recipe?.title);
        setValue("description", recipe?.description);
        setValue("ingredients", recipe?.ingredients);
        setValue("steps", recipe?.steps);
      });

  }, [bookId, recipeId]);


  const onSubmit = (formData) => {
    const recipeBookId = formData.recipeBook;
    delete formData.recipeBook;
    console.log(formData);

    // UI updates
    setLoading(true);
    setErrorMessage("");

    fetch(API_URL + `recipe/editRecipe/?recipeBookId=${recipeBookId}&recipeId=${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Auth.authHeader(),
      },
      body: JSON.stringify(formData),
      redirect: "follow",
    })
      .then(async (response) => {
        let data = await response.json();

        if (!response.ok) throw new Error(data.message);

        return data;
      })
      .then((data) => {
        console.log(`Server response: ${data}`);
        history.push("/myRecipes");
      })
      .catch((error) => {
        console.log(error.message);
        error.message === "Failed to fetch"
          ? setErrorMessage("Couldn't reach the server, try again.")
          : setErrorMessage(error.message);
      })
      .finally(() => {
        // UI updates
        setTimeout(() => {
          setLoading(false);
        }, 50);
      });
  };

  return (
    <div className="container">
      <form className='row' onSubmit={handleSubmit(onSubmit)}>
        <div className='col-md-4'>

          <h3 className='h3 mb-3 mx-auto fw-normal text-center'>
            Create a new recipe
          </h3>
          <div className='form-floating'>
            <input
              className='form-control'
              name='title'
              placeholder='Recipe title'
              ref={register({
                required: "Please fill this field",
                maxLength: {
                  value: 150,
                  message: "Title must be smaller than 150 characters",
                },
                minLength: {
                  value: 3,
                  message: "Title must be longer than 3 characters",
                },
              })}
            />
            <label htmlFor='title'>Recipe Title</label>
            <p className='form-error'>{errors.title?.message}</p>
          </div>

          <div className='form-floating'>
            <textarea
              className='form-control'
              name='description'
              id='description'
              placeholder='Briefly describe this book'
              ref={register({
                maxLength: {
                  value: 500,
                  message: "Description must be smaller than 500 characters",
                },
              })}
            />
            <label htmlFor='description'>Description</label>
            <p className='form-error'>{errors.description?.message}</p>
          </div>

          <div className='form-floating'>
            <select
              className=' form-select form-select-lg'
              name='recipeBook'
              id='recipeBook'
              ref={register({
                required: "Please select a recipe book",
              })}
            >
              {recipeBooks?.map((recipeBook) => (
                <option key={recipeBook.id} value={recipeBook.id} selected={recipeBook.id == bookId}>
                  {recipeBook.title}
                </option>
              ))}
            </select>
            <label htmlFor='recipeBook'>Recipe Book</label>
            <p className='form-error'>{errors.recipeBook?.message}</p>
          </div>

          <div className='form-floating'>
            <textarea
              className='form-control'
              name='ingredients'
              id='ingredients'
              placeholder='List the ingredients for this recipe'
              ref={register()}
            />
            <label htmlFor='description'>Ingredients</label>
            <p className='form-error'>{errors.ingredients?.message}</p>
          </div>

          <button className='w-100 btn btn-lg btn-primary' type='submit'>
            {loading ? <span className='spinner-border' /> : "Edit"}
          </button>
          {errorMessage && (
            <div className='alert alert-danger mt-3' role='alert'>
              {errorMessage}
            </div>
          )}
        </div>

        <div className='col-md-8'>
          <h3 className='h3 mb-3 mx-auto fw-normal text-center'>
            Specify the recipe steps
          </h3>

          <div className='form-floating'>
            <textarea
              className='form-control'
              name='steps'
              id='steps'
              placeholder='List the steps for this recipe'
              ref={register()}
            />
            <label htmlFor='description'>Steps</label>
            <p className='form-error'>{errors.steps?.message}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeEditor;
