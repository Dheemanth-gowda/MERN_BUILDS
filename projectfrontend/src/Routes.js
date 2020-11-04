import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import SignUp from "./user/Signup";
import SignIn from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/user/dashboard" component={UserDashboard} />
          <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute path="/admin/create/category" component={AddCategory} />
          <AdminRoute path="/admin/categories" component={ManageCategories} />
          <AdminRoute path="/admin/create/product" component={AddProduct} />
          <AdminRoute path="/admin/products" component={ManageProducts} />
          <AdminRoute
            path="/admin/product/update/:productId"
            component={UpdateProduct}
          />
          <AdminRoute
            path="/admin/category/:categoryId/:userId"
            component={UpdateCategory}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
