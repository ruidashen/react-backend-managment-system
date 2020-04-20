import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
/**
 * Core state object
 */
// export default createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
export default createStore(reducer, applyMiddleware(thunk));
