import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";
import AuthRoute from "../components/protectedRoutes/AuthRoute";
import GuestRoute from "../components/protectedRoutes/GuestRoute";
import AuthRoutes from "./AuthRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";

// loadable
const Error403 = loadable(() => import("../Pages/Error/Error403"), {
  fallback: <ProgressBar />,
});
const Error404 = loadable(() => import("../Pages/Error/Error404"), {
  fallback: <ProgressBar />,
});
const Error406 = loadable(() => import("../Pages/Error/Error406"), {
  fallback: <ProgressBar />,
});
const Error500 = loadable(() => import("../Pages/Error/Error500"), {
  fallback: <ProgressBar />,
});

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace={false} to="/public" />} />
      {PublicRoutes()}
      {ProtectedRoutes()}
      <Route path="/403" element={<Error403 />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="/406" element={<Error406 />} />
      <Route path="/500" element={<Error500 />} />
      <Route path="/*" element={<Navigate to="/404" replace={true} />} />
    </Routes>
  );
};
