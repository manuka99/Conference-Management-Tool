import { APP_USER_TOKEN } from "./AppConstants";
import store from "../Redux/store";
import {
  fetch_user_data_success,
  user_login,
  init_request_path,
  user_logout,
} from "../Redux";

export function isLoggedIn(roles = null) {
  const state = store.getState().currentUser;

  const user = state.user_data;

  let userAuth = false;
  let userRoleValidated = false;

  if (user && user._id) {
    userAuth = true;
    userRoleValidated = roles ? roleValidated(roles, user.role) : true;
  }

  console.log(userRoleValidated);
  console.log([roles].includes(user.role));
  console.log(roles);
  console.log(user.role);

  return { userAuth, userRoleValidated };
}

const roleValidated = (roles, user_role) => {
  if (roles.length !== 0 && user_role) return roles.includes(user_role);
  else return false;
};

export const authenticate = (user_data, token) => {
  localStorage.setItem(APP_USER_TOKEN, token);
  store.dispatch(fetch_user_data_success(user_data));
  store.dispatch(user_login());
  store.dispatch(init_request_path());
};

export const LogOut = () => {
  localStorage.removeItem(APP_USER_TOKEN);
  store.dispatch(fetch_user_data_success({}));
  store.dispatch(user_logout());
  store.dispatch(init_request_path());
};
