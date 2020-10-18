import React from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";

function Home() {
  console.log("API Is", API);
  return (
    <Base title="Home Page" description="Welcome to the home Page">
      <h1 className="text-white"> Welcome to Home page!!! </h1>
    </Base>
  );
}

export default Home;
