import React from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import "../styles.css";

const AdminDashboard = () => {
  const {
    user: { name, role, email },
  } = isAutheticated();

  const adminLeft = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item text-center text-danger">
            {/*
          Use for opening the link in new tab
           target="_blank" */}
            <Link
              to="/admin/create/category"
              className="nav-link p-3 mb-2 bg-warning text-dark"
            >
              Create Category
            </Link>
          </li>
          <li className="list-group-item text-center text-danger">
            <Link
              to="/admin/categories"
              className="nav-link  p-3 mb-2 bg-warning text-dark"
            >
              Manage categories
            </Link>
          </li>
          <li className="list-group-item text-center text-danger">
            <Link
              to="/admin/create/product"
              className="nav-link  p-3 mb-2 bg-warning text-dark"
            >
              Create Product
            </Link>
          </li>
          <li className="list-group-item text-center text-danger">
            <Link
              to="/admin/products"
              className="nav-link p-3 mb-2 bg-info text-white"
            >
              Manage Products
            </Link>
          </li>
          <li className="list-group-item text-center text-danger">
            <Link
              to="/admin/orders"
              className="nav-link p-3 mb-2 bg-info text-white"
            >
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRight = () => {
    return (
      <div>
        <div className="card mb-4">
          <h4 className="card-header text-center"> Admin Information</h4>
          <ul className="list-group">
            <div className="container p-3  mt-3 ">
              <li className="list-group-item m-5">
                <span className="badge badge-success p-2 mr-5">Name: </span>
                {name}
              </li>
              <li className="list-group-item m-5">
                <span className="badge badge-success p-2 mr-5">Email: </span>
                {email}
              </li>
            </div>
            <li className="list-group-item">
              <span className="badge badge-danger p-2 mr-5">ADMIN AREA</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return (
    <Base
      title="Admin Dashboard Page"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row mb-4">
        <div className="col-3">{adminLeft()}</div>

        <div className="col-9">{adminRight()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
