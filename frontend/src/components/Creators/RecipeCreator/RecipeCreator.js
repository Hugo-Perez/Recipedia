import React, { useState, useEffect } from "react";
import "./RecipeCreator.css";

import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Auth from "../../../utils/auth";
import { API_URL } from "../../../utils/constants";
import {storage} from "../../../firebase/firebase";

const RecipeCreator = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipeBooks, setRecipeBooks] = useState([]);
  const [file, setFile] = useState(null);
  //const [url, setURL] = useState("");

  const history = useHistory();
  const { bookId } = useParams();

  const { handleSubmit, register, errors, watch } = useForm({
    reValidateMode: "onChange",
  });

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

  const changeImage = (e) => {
    setFile(e.target.files[0]);
  }

  const uploadImage = async () => {
    return new Promise(function(resolve, reject) {
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, () => reject(), () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((imgURL) => resolve(imgURL));
      });
    });
  }

  const onSubmit = async (formData) => {
    // UI updates
    setLoading(true);
    setErrorMessage("");

    //Image uploading
    let url = await uploadImage().catch(() => "");

    console.log(url);

    const {recipeBook} = formData;
    delete formData.recipeBook;
    formData.imageURL = url ||"/images/recipe/default-recipe.png";
    console.log(formData);


    fetch(API_URL + `recipe/newRecipe?recipeBookId=${recipeBook}`, {
      method: "POST",
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
    <div id="recipe-creator" className="container bg-dark p-3 text-light">
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
              className=' form-select '
              name='recipeBook'
              id='recipeBook'
              ref={register({
                required: "Please select a recipe book",
              })}
            >
              {recipeBooks?.map((recipeBook) => (
                <option
                  value={recipeBook.id}
                  selected={recipeBook.id == bookId}
                >
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

          <div className='form-group mb-4'>
            <label htmlFor="image">Add a picture: </label>
            <input
              className="form-control"
              type="file"
              name="image"
              id="image"
              onChange={(e) => changeImage(e)}/>
          </div>

          <button className='w-100 btn btn-lg btn-primary' type='submit'>
            {loading ? <span className='spinner-border' /> : "Create"}
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
export default RecipeCreator;
