import { INCREMENT, DECREMENT } from "./action-types";
import { combineReducers } from "redux";
/**
 * Reducer: return a new state based on previous state and action
 */
export default function count(state = 1, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data;
    case DECREMENT:
      return state - action.data;
    default:
      return state;
  }
}
const initUser = {};
function user(state = initUser, action) {
  return state;
}

// export default combineReducers({
//   count,
//   user,
// });
