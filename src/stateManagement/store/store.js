import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "../middlewares/logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers/rootReducer";

export let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
console.log(store.getState());

store.subscribe(() => console.log(store.getState(), "store has been changed."));
