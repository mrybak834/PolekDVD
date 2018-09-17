import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Dashboard from "../components/pages/Dashboard";
import Login from '../components/pages/Login';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <React.Fragment>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} exact />
      </Switch>
    </React.Fragment>
  </Router>
);

export default AppRouter;