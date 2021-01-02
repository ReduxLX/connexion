import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home/Home";
import About from "./screens/About/About";

const routes = [
  { path: "/", Component: Home },
  { path: "/about", Component: About },
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
      {/* <Footer /> */}
    </Router>
  );
};

export default Routes;
