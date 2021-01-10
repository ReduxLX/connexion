import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

const UnauthorizedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Redirect to="/" /> : <Component {...props} />;
      }}
    ></Route>
  );
};

export default UnauthorizedRoute;
