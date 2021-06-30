import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../../components/common/AppBar";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright";

function Index() {
  return (
    <div className="Home">
      <Container maxWidth="lg">
        <div className="bgcl">
          <AppBar />
          <Outlet />
          <Copyright />
        </div>
      </Container>
    </div>
  );
}

export default Index;
