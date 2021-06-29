import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserReducer } from "./User/UserReducer";

const rootReducer = combineReducers({
  currentUser: UserReducer,
});

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(logger, thunk))
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
