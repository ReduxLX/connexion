import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UnauthorizedRoute from "./UnauthorizedRoute";
import Snackbar from "./components/Snackbar";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Leaderboard from "./screens/Leaderboard/Leaderboard";
import About from "./screens/About/About";
import Signup from "./screens/Authentication/Signup";
import Login from "./screens/Authentication/Login";
import Profile from "./screens/Profile/Profile";
import CreateTopic from "./screens/CreateTopic/CreateTopic";
import PostDetails from "./screens/PostDetails/PostDetails";
import AllCategories from "./screens/Categories/AllCategories";

const routes = [
  { path: "/", Component: Home },
  { path: "/leaderboard", Component: Leaderboard },
  { path: "/about", Component: About },
  { path: "/signup", Component: Signup, exclusiveAccess: "Unauthorized" },
  { path: "/login", Component: Login, exclusiveAccess: "Unauthorized" },
  { path: "/profile", Component: Profile },
  { path: "/createtopic", Component: CreateTopic },
  { path: "/post", Component: PostDetails },
  { path: "/categories", Component: AllCategories },
];

const Routes = () => {
  return (
    <Router>
      <Snackbar />
      <Navbar />
      {routes.map(({ path, Component, exclusiveAccess = "" }) => {
        if (exclusiveAccess === "Unauthorized") {
          return (
            <UnauthorizedRoute
              key={path}
              path={path}
              component={Component}
              exact
            />
          );
        } else {
          return (
            <Route key={path} path={path} exact>
              <Component />
            </Route>
          );
        }
      })}
    </Router>
  );
};

export default Routes;
