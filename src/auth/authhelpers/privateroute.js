import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from ".";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = isAuthenticated();
  return (
    <Route
      {...rest}
      render={(props) =>
        (isAuthenticated() && user.role!==1) ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
