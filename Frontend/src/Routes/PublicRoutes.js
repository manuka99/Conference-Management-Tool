import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";
import AuthRoute from "../components/protectedRoutes/AuthRoute";
import GuestRoute from "../components/protectedRoutes/GuestRoute";
import AuthRoutes from "./AuthRoutes";
import { PaymentRoutes } from "./PaymentRoutes";

// loadable
const Public = loadable(() => import("../Pages/Public/index"), {
  fallback: <ProgressBar />,
});

const Landing = loadable(() => import("../Pages/Public/Landing/"), {
  fallback: <ProgressBar />,
});

const FileViewer = loadable(() => import("../Pages/Public/FileViewer"), {
  fallback: <ProgressBar />,
});

export const PublicRoutes = () => {
  return (
    <Route path="/public" element={<Public />}>
      <Route path="/" element={<Landing />} />
      {AuthRoutes()}
      {PaymentRoutes()}
      <Route path="/file/view/:name" element={<FileViewer />} />
    </Route>
  );
};
