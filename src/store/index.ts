import { applyMiddleware, combineReducers, createStore, Reducer, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import formDataReducer from "./reducers/formDataReducer";
import formErrorsReducer from "./reducers/formErrorsReducer";


/**
 * ===== REGISTER REDUCERS HERE ===== *
 * Main reducer object to define store.
 * @type {Reducer<any>}
 */
const rootReducer: Reducer = combineReducers({
	formData: formDataReducer,
	formErrors: formErrorsReducer
});

// Create store with reducers, initial state and any middleware.
const middleware: StoreEnhancer = composeWithDevTools(applyMiddleware(logger, reduxThunk));

// export const store: Store = createStore(rootReducer, middleware);
export const store = createStore(rootReducer, middleware);
