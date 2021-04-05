import React from "react";
import "./Signup.css";

import { useForm } from "react-hook-form";

const Signup = () => {
  const { handleSubmit, register, errors } = useForm({
    reValidateMode: "onChange",
  });

  const onSubmit = (formData) => {
    console.log(formData);
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

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
