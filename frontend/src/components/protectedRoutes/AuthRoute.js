import { Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "../../common/auth";

function AuthRoute({ path, hasAnyRoles, ...rest }) {
  const { userAuth, userRoleValidated } = isLoggedIn(hasAnyRoles);

  return !userAuth ? (
    <Navigate to="/login" replace={true} />
  ) : !userRoleValidated ? (
    <Navigate to="/403" replace={false} />
  ) : (
    <Route {...rest} />
  );
}

export default AuthRoute;
