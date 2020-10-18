import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import SignUp from "./user/Signup";
import SignIn from "./user/Signin";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          {/* <Route component={}/> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
