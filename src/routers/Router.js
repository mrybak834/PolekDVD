import React from "react";
import { Router, Route, Switch } from "react-router-dom";
// import { Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Dashboard from "../components/pages/Dashboard";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={Dashboard} exact />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
