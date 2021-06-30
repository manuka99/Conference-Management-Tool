import React from "react";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";
import AuthRoute from "../../components/protectedRoutes/AuthRoute";
import { ProtectedRoles } from "../../common/Roles";

// loadable
const Profile = loadable(() => import("../../Pages/Protected/Profile"), {
  fallback: <ProgressBar />,
});

const Account = loadable(
  () => import("../../Pages/Protected/Profile/Account/index"),
  {
    fallback: <ProgressBar />,
  }
);

const Security = loadable(
  () => import("../../Pages/Protected/Profile/Security/index"),
  {
    fallback: <ProgressBar />,
  }
);

const Devices = loadable(
  () => import("../../Pages/Protected/Profile/Devices/ActiveSessions"),
  {
    fallback: <ProgressBar />,
  }
);

export default function ProfileRoutes() {
  return (
    <AuthRoute
      hasAnyRoles={ProtectedRoles}
      path="/profile"
      element={<Profile />}
    >
      <AuthRoute path="/" element={<Account />} />
      <AuthRoute path="/security" element={<Security />} />
      <AuthRoute path="/devices" element={<Devices />} />
    </AuthRoute>
  );
}
