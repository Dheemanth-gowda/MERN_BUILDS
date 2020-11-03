import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const goBack = () => {
    return (
      <div className="m-2">
        <Link
          className="btn btn-sm btn-success mb-2 text-white"
          to="/admin/dashboard"
        >
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return (
        <div className="alert alert-success" role="alert">
          Category Succesfully created!!!
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          There was an error in creating the category!!!
        </div>
      );
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        {successMessage()}
        {errorMessage()}
        <div className="form-group">
          <p className="lead mt-3">Enter the category </p>
          <input
            className="form-control my-3 bg-dark text-white"
            autoFocus
            required
            placeholder="Ex:Summer,Winter,etc"
            onChange={handleChange}
            value={name}
          ></input>
          <button onClick={onsubmit} className="btn mt-2 btn-outline-warning">
            Create Category
          </button>
        </div>
      </form>
    );
  };
  return (
    <div>
      <Base
        title="Create a new category"
        description="Add a specific category for the product you want to add"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          {goBack()}
          <div className="col-md-8 offset-md-2">{myCategoryForm()}</div>
        </div>
      </Base>
    </div>
  );
};

export default AddCategory;
