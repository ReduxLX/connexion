import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";
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
import CategoryPosts from "./screens/Categories/CategoryPosts";

const routes = [
  { path: "/", Component: Home },
  { path: "/?search=:search", Component: Home },
  { path: "/leaderboard", Component: Leaderboard },
  { path: "/about", Component: About },
  { path: "/signup", Component: Signup, exclusiveAccess: "Unauthorized" },
  { path: "/login", Component: Login, exclusiveAccess: "Unauthorized" },
  { path: "/profile", Component: Profile, exclusiveAccess: "Authorized" },
  {
    path: "/createtopic",
    Component: CreateTopic,
    exclusiveAccess: "Authorized",
  },
  { path: "/post/:id", Component: PostDetails },
  { path: "/categories", Component: AllCategories },
  { path: "/categories/:category", Component: CategoryPosts },
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
        } else if (exclusiveAccess === "Authorized") {
          return (
            <AuthorizedRoute
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
