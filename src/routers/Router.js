import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Dashboard from "../components/pages/Dashboard";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <React.Fragment>
      <Switch>
        <Route path="/" component={Dashboard} exact />
      </Switch>
    </React.Fragment>
  </Router>
);

export default AppRouter;