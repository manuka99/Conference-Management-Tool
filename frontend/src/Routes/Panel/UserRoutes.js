import React from "react";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";
import AuthRoute from "../../components/protectedRoutes/AuthRoute";
import GuestRoute from "../../components/protectedRoutes/GuestRoute";
import { ReviewerRoles } from "../../common/Roles";

// loadable
const ViewUsers = loadable(
  () => import("../../Pages/Protected/Users/ViewUsers"),
  {
    fallback: <ProgressBar />,
  }
);
const ViewUser = loadable(
  () => import("../../Pages/Protected/Users/ViewUser"),
  {
    fallback: <ProgressBar />,
  }
);

export default function UserRoutes() {
  return (
    <AuthRoute hasAnyRoles={ReviewerRoles} path="/users">
      <AuthRoute path="/roles/:role_name" element={<ViewUsers />} />
      <AuthRoute path="/:id" element={<ViewUser />} />
    </AuthRoute>
  );
}
