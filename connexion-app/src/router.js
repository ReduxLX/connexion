import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Discussion from "./screens/Discussion/Discussion";
import Leaderboard from "./screens/Leaderboard/Leaderboard";
import About from "./screens/About/About";
import Signup from "./screens/Authentication/Signup";
import Login from "./screens/Authentication/Login";
import CreateTopic from "./screens/CreateTopic/CreateTopic";
import PostDetails from "./screens/PostDetails/PostDetails";

const routes = [
  { path: "/", Component: Home },
  { path: "/discussion", Component: Discussion },
  { path: "/leaderboard", Component: Leaderboard },
  { path: "/about", Component: About },
  { path: "/signup", Component: Signup },
  { path: "/login", Component: Login },
  { path: "/createtopic", Component: CreateTopic },
  { path: "/post", Component: PostDetails },
];

const Routes = () => {
  return (
    <Router>
      <Navbar />
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} exact>
          <Component />
        </Route>
      ))}
    </Router>
  );
};

export default Routes;
