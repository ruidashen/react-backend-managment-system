import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from "./action-types";
import { reqLogin } from "../api/index";
import storageUtils from "../utils/storageUtils";
export const setHeadTitle = (title) => ({ type: SET_HEAD_TITLE, title });

export const login = (username, password) => {
  return async (dispatch) => {
    const result = await reqLogin(username, password);
    if (result.status === 0) {
      const user = result.data;
      storageUtils.saveUser(user);
      dispatch(receiveUser(user));
    } else {
      const errorMsg = result.msg;
      dispatch(showErrorMsg(errorMsg));
    }
  };
};

export const logout = () => {
  storageUtils.removeUser();
  return { type: RESET_USER };
};
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });
export const receiveUser = (user) => ({ type: RECEIVE_USER, user });
