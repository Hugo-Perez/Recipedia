import React, { useState } from "react";
import "./Signup.css";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Auth from "../../utils/auth";

const Signup = () => {
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

    Auth.register(formData)
      .then(async (response) => {
        if (response.ok) {
          return response.text();
        } else if (response.status === 400) {
          let errorMsg = await response.text();
          throw new Error(errorMsg);
        }
      })
      .then((data) => {
        console.log(`Register response: ${data}`);
        Auth.login(formData)
          .then((response) => response.json())
          .then((data) => {
            console.log(`Login response: ${data}`);
            if (data?.accessToken) {
              console.log("Saving user to localStorage");
              localStorage.setItem("user", JSON.stringify(data));
              history.push("/home");
              window.location.reload();
            }
          });
      })
      .catch((error) => {
        error.message === "Failed to fetch"
          ? setErrorMessage("Couldn't reach the server, try again.")
          : setErrorMessage(JSON.parse(error.message).message);
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
      <form className="small-form" onSubmit={handleSubmit(onSubmit)}>
        <img
          className="d-block rounded-circle mx-auto mb-4 p-3 bg-dark bg-gradient"
          src="/images/logo.png"
          alt="Recipedia logo"
          width="100"
          height="100"
        />
        <h1 className="h3 mb-3 mx-auto fw-normal">Create a new account</h1>

        <div className="form-floating">
          <input
            className="form-control"
            name="email"
            placeholder="name@example.com"
            ref={register({
              required: "Please fill this field",
              maxLength: {
                value: 150,
                message: "Email must be smaller than 150 characters",
              },
              minLength: {
                value: 5,
                message: "Email must be longer than 5 characters",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Introduce a valid email address",
              },
            })}
          />
          <label for="email">Email address</label>
          <p className="form-error">{errors.email?.message}</p>
        </div>

        <div className="form-floating">
          <input
            className="form-control"
            name="username"
            placeholder="username"
            ref={register({
              required: "Please fill this field",
              maxLength: {
                value: 150,
                message: "Username must be smaller than 100 characters",
              },
              minLength: {
                value: 2,
                message: "Username must be longer than 2 characters",
              },
            })}
          />
          <label for="email">Username</label>
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
          <p className="form-error">{errors.password?.message}</p>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          {loading ? <span className="spinner-border"></span> : "Register"}
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

export default Signup;
