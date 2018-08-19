import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store/config";
import AppRouter, { history } from "./routers/Router";
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
const jsx = (
  <Provider store={store}>
      <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
