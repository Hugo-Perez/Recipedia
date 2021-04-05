import React from "react";
import "./Signin.css";

import { useForm } from "react-hook-form";

const Signin = () => {
  const { handleSubmit, register, errors } = useForm({
    reValidateMode: "onChange",
  });

  console.log(errors);

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

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" name="remember" ref={register} /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Signin;
