import React from "react";
import { Route, Navigate } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";
import GuestRoute from "../components/protectedRoutes/GuestRoute";

const Auth = loadable(() => import("../Pages/Public/Auth/index"), {
  fallback: <ProgressBar />,
});

const Login = loadable(() => import("../Pages/Public/Auth/Login"), {
  fallback: <ProgressBar />,
});

const Register = loadable(() => import("../Pages/Public/Auth/Register"), {
  fallback: <ProgressBar />,
});
const Innovator = loadable(
  () => import("../Pages/Public/Auth/Register/Innovator"),
  {
    fallback: <ProgressBar />,
  }
);

const Researcher = loadable(
  () => import("../Pages/Public/Auth/Register/Researcher"),
  {
    fallback: <ProgressBar />,
  }
);

const Presenter = loadable(
  () => import("../Pages/Public/Auth/Register/Presenter"),
  {
    fallback: <ProgressBar />,
  }
);

const Attendee = loadable(
  () => import("../Pages/Public/Auth/Register/Attendee"),
  {
    fallback: <ProgressBar />,
  }
);

const RecoverPassword = loadable(
  () => import("../Pages/Public/Auth/RecoverPassword"),
  {
    fallback: <ProgressBar />,
  }
);

const ResetPassword = loadable(
  () => import("../Pages/Public/Auth/ResetPassword"),
  {
    fallback: <ProgressBar />,
  }
);

function AuthRoutes() {
  return (
    <Route path="/auth" element={<Auth />}>
      <GuestRoute path="/" element={<Navigate to="/public/auth/login" />} />
      <GuestRoute path="/login" element={<Login />} />
      <GuestRoute path="/register">
        <GuestRoute path="/" element={<Register />} />
        <GuestRoute path="/innovator" element={<Innovator />} />
        <GuestRoute path="/researcher" element={<Researcher />} />
        <GuestRoute path="/presenter" element={<Presenter />} />
        <GuestRoute path="/attendee" element={<Attendee />} />
      </GuestRoute>
      <GuestRoute path="/recover-password" element={<RecoverPassword />} />
      <GuestRoute
        path="/reset-password/:token/:email/:username"
        element={<ResetPassword />}
      />
    </Route>
  );
}

export default AuthRoutes;
