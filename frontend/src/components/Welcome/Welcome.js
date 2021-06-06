import React from 'react';
import './Welcome.css';

import {Link} from 'react-router-dom';

const Welcome = () => {
  return(
    <>
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="d-block rounded-circle mx-auto mb-4 p-3 bg-dark bg-gradient"
          src="/images/logo.png"
          alt="Recipedia logo"
          width="150"
          height="150"
        />
        <h1 className="display-5 fw-bold">A place to store all your recipes</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-1">
            Recipedia is the best page to create and store all your recipes. You
            can also share them with the rest of the world in a simple and fast
            manner.
          </p>
          <p className="lead mb-4">
            Sign in now and create your first cookbook!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              to="/signup"
              type="button"
              className="btn btn-outline-success btn-lg px-4 "
            >
              Create your account
            </Link>
            <span className="my-auto mx-1">{" or "}</span>
            <Link
              to="/signin"
              type="button"
              className="btn btn-outline-primary btn-lg px-4 "
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="/images/welcome/home.jpg"
              className="d-block mx-lg-auto img-fluid rounded"
              alt="placeholder"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">
              Why should you use Recipedia?
            </h1>
            <div className="lead">
              <ul>
                <li>
                  You can access your recipes, anywhere and from any device.
                </li>
                <li>
                  Organize your recipes by books, ingredients and more.
                </li>
                <li>
                  Save all the existing recipes from other pages in one place.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
