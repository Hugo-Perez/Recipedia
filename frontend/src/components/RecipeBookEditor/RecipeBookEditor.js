import React, {useEffect} from 'react';
import './RecipeBookEditor.css';
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {API_URL} from "../../utils/constants";
import Auth from "../../utils/auth";

const RecipeBookEditor = () => {
  const [recipeBook, setRecipeBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { handleSubmit, register, errors, watch } = useForm({
    reValidateMode: "onChange",
  });
  const watchPrivacy = watch("privacy");

  const onSubmit = (formData) => {
    // UI updates
    setLoading(true);
    setErrorMessage("");

    fetch(API_URL + "recipe/editRecipeBook", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Auth.authHeader(),
      },
      body: JSON.stringify(formData),
      redirect: "follow",
    })
      .then  (async (response) => {
        let data = await response.json();

        if (!response.ok)
          throw new Error(data.message);

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

  useEffect(() => {
    // Getting Recipe Book from backend
    fetch("http://localhost:8080/api/recipe/myRecipeBooks", {
      method: "GET",
      headers: {
        Authorization: Auth.authHeader(),
      },
      body: "",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => setRecipeBook(data));

  })

  return (
    <div>
      <form className='small-form' onSubmit={handleSubmit(onSubmit)}>
        <img
          className='d-block rounded-circle mx-auto mb-4 p-3 bg-dark bg-gradient'
          src='/images/logo.png'
          alt='Recipedia logo'
          width='100'
          height='100'
        />
        <h1 className='h3 mb-3 mx-auto fw-normal'>Editing {recipeBook.title}</h1>

        <div className='form-floating'>
          <input
            className='form-control'
            name='title'
            placeholder='Book title'
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
          <label for='title'>Book title</label>
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
          <label for='description'>Description</label>
          <p className='form-error'>{errors.description?.message}</p>
        </div>

        <div className='form-check form-switch mb-3'>
          <input
            className='form-check-input form-control'
            type='checkbox'
            name='privacy'
            ref={register()}
          />
          <label for='privacy'>{watchPrivacy ? "Private" : "Public"}</label>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          {loading ? <span className='spinner-border'/> : "Create"}
        </button>
        {errorMessage && (
          <div className='alert alert-danger mt-3' role='alert'>
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default RecipeBookEditor;
