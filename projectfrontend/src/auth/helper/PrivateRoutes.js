import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const privateRoute = ({children,...rest})=>{
return (
    <Route>
        {...rest}
        render={({location})=>
        }
    </Route>
)
} 

export default privateRoute