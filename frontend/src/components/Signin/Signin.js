import React, { useState } from "react";
import "./Signin.css";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Auth from "../../utils/auth";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm({
    reValidateMode: "onChange",
  });

  const onSubmit = (formData) => {
    // UI updates
    setLoading(true);
    setErrorMessage("");

    Auth.login(formData)
      .then((response) => {
        switch (response.status) {
          case 401:
            throw new Error("Invalid login credentials, try again.");
            break;
          case 200:
            return response.json();
            break;
          default:
            throw new Error(
              "An unknown error occurred, try contacting the administrator."
            );
            break;
        }
      })
      .then((data) => {
        console.log(`Login response: ${data}`);
        if (data?.accessToken) {
          console.log("Saving user to localStorage");
          localStorage.setItem("user", JSON.stringify(data));
          history.push("/home");
          window.location.reload();
        }
      })
      .catch((error) => {
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

    console.log(`Is it loading? ${loading}`);
  };

  return (
    <div>
      <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
        <img
          className="d-block rounded-circle mx-auto mb-4 p-3 bg-dark bg-gradient"
          src="/images/logo.png"
          alt="Recipedia logo"
          width="100"
          height="100"
        />
        <h1 className="h3 mb-3 mx-auto fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            ref={register({
              required: "Please fill this field",
              maxLength: {
                value: 20,
                message: "Username must be smaller than 150 characters",
              },
              minLength: {
                value: 3,
                message: "Username must be 3 or more characters long",
              },
            })}
          />
          <label for="username">Username</label>
          <p className="form-error">{errors.username?.message}</p>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            ref={register({
              required: "Please fill this field",
              maxLength: {
                value: 50,
                message: "Password must be smaller than 50 characters",
              },
              minLength: {
                value: 8,
                message: "Password must be 8 characters or more",
              },
            })}
          />
          <label for="password">Password</label>
        </div>
        <p className="form-error">{errors.password?.message}</p>

        {/* 
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" name="remember" ref={register} /> Remember me
          </label>
        </div>
        */}

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          {loading ? <span className="spinner-border"></span> : "Sign in"}
        </button>

        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signin;
