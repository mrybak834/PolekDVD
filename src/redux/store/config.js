import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Enables redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const configureStore = () => {
  const store = createStore(
    combineReducers({}),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;
