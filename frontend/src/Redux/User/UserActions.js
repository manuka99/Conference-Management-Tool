import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  USER_LOGIN,
  USER_LOGOUT,
  INIT_REQUEST_PATH,
} from "./UserActionTypes";
import api from "../../common/Api";
import { authenticate } from "../../common/auth";

export const fetch_user_data_success = (userData) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: userData,
  };
};

export const fetch_user_data_error = (error) => {
  return {
    type: FETCH_USER_ERROR,
    payload: error,
  };
};

export const fetch_user_data_request = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const user_login = () => {
  return {
    type: USER_LOGIN,
  };
};

export const user_logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const init_request_path = () => {
  return {
    type: INIT_REQUEST_PATH,
  };
};

//side effects
export const fetch_user_data = () => {
  return (dispatch) => {
    dispatch(fetch_user_data_request());
    api()
      .get("/public/validate-token")
      .then((res) => {
        const { user } = res.data.data;
        dispatch(fetch_user_data_success(user));
        user && user._id && dispatch(user_login());
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetch_user_data_error(error));
        dispatch(user_logout());
      });
  };
};
