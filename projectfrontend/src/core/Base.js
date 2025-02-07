import React from "react";
import Menu from "../core/Menu";
import "../styles.css";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-2",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className=" bg-dark text-white text-center">
        <h3 className="display-5"> {title} </h3>
        <p className="lead"> {description} </p>
      </div>
      <div className={className}> {children} </div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4> If you got any questions, feel free to reach out! </h4>
        <button className="btn btn-warning btn-lg"> Contact Us </button>
      </div>
      <div className="container">
        <span className="text-muted">
          With Lots of love -
          <span>
            <a
              href="https://www.dheethu12.me/"
              className="text-info font-weight-bold"
            >
              dheethu
            </a>
          </span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
