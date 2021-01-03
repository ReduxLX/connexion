import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import CombinedNavbar from "./components/CombinedNavbar";
import Home from "./screens/Home/Home";
import Discussion from "./screens/Discussion/Discussion";
import Leaderboard from "./screens/Leaderboard/Leaderboard";
import About from "./screens/About/About";

const routes = [
  { path: "/", Component: Home },
  { path: "/discussion", Component: Discussion },
  { path: "/leaderboard", Component: Leaderboard },
  { path: "/about", Component: About },
];

const Routes = () => {
  return (
    <Router>
      <CombinedNavbar />
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} exact>
          <Component />
        </Route>
      ))}
    </Router>
  );
};

export default Routes;
