import { combineReducers } from "redux";
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from "./action-types";
import storageUtils from "../utils/storageUtils";
/**
 * reducer used to manage header title
 */
const initHeaderTitle = "Home";
function headerTitle(state = initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.title;
    default:
      return state;
  }
}

/**
 * reducer used to manage current logged in user
 */
const initUser = storageUtils.getUser() || {};
function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg;
      return { ...state, errorMsg };
    case RESET_USER:
      return {};
    default:
      return state;
  }
}
export default combineReducers({
  headerTitle,
  user,
});
