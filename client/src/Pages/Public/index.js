import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../../components/common/AppBar";

function Index() {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default Index;
