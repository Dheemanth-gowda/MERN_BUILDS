import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";

import { signin, isAutheticated, authenticate } from "../auth/helper";

const SignIn = () => {
  const [value, setvalue] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = value;

  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setvalue({ ...value, error: false, [name]: event.target.value });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setvalue({ ...value, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setvalue({ ...value, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setvalue({
              ...value,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("SignIn failed"));
  };

  const performRedirect = () => {
    //TODO need to look into this
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>redirect to admin</p>;
      } else {
        return <p>Redirect to normal User dashboard</p>;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const SignInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light"> Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control shadow p-3 rounded"
                type="text"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light"> Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control shadow p-3 rounded"
                type="text"
                value={password}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-outline-success btn-lg btn-lg active btn-block shadow p-2 mb-3 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="SignIn Page" description="Page to SignIn User">
      {loadingMessage()}
      {errorMessage()}
      {SignInForm()}
      {performRedirect()}
    </Base>
  );
};

export default SignIn;
