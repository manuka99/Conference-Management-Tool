import React from "react";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";
import AuthRoute from "../../components/protectedRoutes/AuthRoute";
import { EditorRoles } from "../../common/Roles";

// loadable
const ViewPosts = loadable(
  () => import("../../Pages/Protected/Posts/ViewPosts"),
  {
    fallback: <ProgressBar />,
  }
);

export default function PostRoutes() {
  return (
    <AuthRoute hasAnyRoles={EditorRoles} path="/posts">
      <AuthRoute path="/" element={<ViewPosts />} />
    </AuthRoute>
  );
}
