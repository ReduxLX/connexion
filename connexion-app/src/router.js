import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Discussion from "./screens/Discussion/Discussion";
import Leaderboard from "./screens/Leaderboard/Leaderboard";
import About from "./screens/About/About";
import Signup from "./screens/Authentication/Signup";

const routes = [
  { path: "/", Component: Home },
  { path: "/discussion", Component: Discussion },
  { path: "/leaderboard", Component: Leaderboard },
  { path: "/about", Component: About },
  { path: "/signup", Component: Signup },
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
