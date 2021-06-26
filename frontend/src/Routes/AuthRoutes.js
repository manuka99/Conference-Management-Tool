import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";
import AuthRoute from "../components/protectedRoutes/AuthRoute";
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
      <GuestRoute path="/register" element={<Register />} />
      <GuestRoute path="/recover-password" element={<RecoverPassword />} />
      <GuestRoute
        path="/reset-password/:token/:email/:username"
        element={<ResetPassword />}
      />
    </Route>
  );
}

export default AuthRoutes;
