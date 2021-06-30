import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    background: theme.palette.primary.light,
  },
  barColorPrimary: {
    background: theme.palette.primary.dark,
  },
}));

function CustomLinearProgress() {
  const classes = useStyles();
  return (
    <LinearProgress
      classes={{
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
      }}
      // className={classes.progress_color}
    />
  );
}

export default CustomLinearProgress;
