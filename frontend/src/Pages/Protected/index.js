import React, { useState, useEffect, createContext } from "react";
import { Box } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import {
  CssBaseline,
  MainDashStyles,
} from "../../components/common/assets/StyleImports";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SideNavBar from "../../components/common/SideNavigation/SideNavBar";
import TopNavBar from "../../components/common/TopNavBar";
export const PanelContext = createContext(null);

function Index() {
  const classes = MainDashStyles();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Administration Dashboard";
  }, []);

  return (
    <PanelContext.Provider value={{ setLoading: setLoading }}>
      <div className={classes.root}>
        <CssBaseline />

        <TopNavBar open={open} handleDrawerOpen={handleDrawerOpen} />

        <SideNavBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />

        <main className={`${classes.content} ${open && classes.constentShift}`}>
          <div className={classes.toolbar} />

          <Breadcrumb />

          <Box mb={6}>
            <Outlet />
          </Box>
        </main>
      </div>
    </PanelContext.Provider>
  );
}

export default Index;
