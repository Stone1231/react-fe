import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import {
  ReactReduxContext as context,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { todos, visibilityFilter } from "./Todos/reducer";
import { user } from "./User/reducer";

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  user,
});

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const loggerMiddleware = createLogger();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const context = React.createContext(null);
export { context };

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(context);
export const useDispatch = createDispatchHook(context);
export const useSelector = createSelectorHook(context);

export const store = createStore(
  rootReducer,
  loadFromLocalStorage(),
  composeEnhancer(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));
