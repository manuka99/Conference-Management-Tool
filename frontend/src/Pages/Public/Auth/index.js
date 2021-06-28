import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1, 0),
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4, 0, 8),
  },
}));

function Index() {
  const classes = useStyles();
  return (
    <div className="App Auth">
      <Container
        component="main"
        style={{ maxWidth: "800px" }}
        className={classes.container}
      >
        <Paper className={classes.paper}>
          <Outlet />
        </Paper>
      </Container>
    </div>
  );
}

export default Index;
