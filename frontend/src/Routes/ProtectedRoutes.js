import React from "react";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";
import AuthRoute from "../components/protectedRoutes/AuthRoute";
import GuestRoute from "../components/protectedRoutes/GuestRoute";
import { ProtectedRoles } from "../common/Roles";

// loadable
const Protected = loadable(() => import("../Pages/Protected/"), {
  fallback: <ProgressBar />,
});

const PanelHome = loadable(() => import("../Pages/Protected/Home"), {
  fallback: <ProgressBar />,
});

export const ProtectedRoutes = () => {
  return (
    <AuthRoute
      hasAnyRoles={ProtectedRoles}
      path="/protected"
      element={<Protected />}
    >
      <AuthRoute path="/" element={<PanelHome />} />
    </AuthRoute>
  );
};
