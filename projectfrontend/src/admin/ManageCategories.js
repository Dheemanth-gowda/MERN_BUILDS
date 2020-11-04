import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getAllCategory, deleteCategory } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";

const ManageCategories = () => {
  const [value, setValue] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getAllCategory().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValue(data);
      }
    });
  };

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

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

  return (
    <Base title="Product Manage Page" description="">
      <div className="container bg-white p-3">
        {goBack()}
        <div className="d-flex p-4 bg-warning">
          <div className="mr-auto p-2">
            <span className="badge badge-success p-2 "> CATEGORIES </span>
          </div>
          <div className="p-2">
            <span className="badge badge-success p-2 "> UPDATES </span>
          </div>
          <div className="p-2">
            <span className="badge badge-success p-2 "> DELETE </span>
          </div>
        </div>
        {value.map((category, index) => {
          return (
            <div key={index} className="d-flex p-4">
              <div className="mr-auto p-2">
                <span className=" p-2 text-dark"> {category.name} </span>
              </div>
              <div className="p-2">
                <Link
                  className="btn btn-success"
                  to={`/category/${category._id}/${user._id}`}
                >
                  <span className=""> Update </span>
                </Link>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    deleteThisCategory(category._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default ManageCategories;
