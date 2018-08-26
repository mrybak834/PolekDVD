import React from "react";
import ReactDOM from "react-dom";
import AppRouter, { history } from "./routers/Router";
import { Provider } from "react-redux";
import configureStore from "./redux/store/config";
import CssBaseline from "@material-ui/core/CssBaseline";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './components/theme';
import './styles/styles.scss';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <AppRouter />
      </MuiThemeProvider>
    </React.Fragment>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));