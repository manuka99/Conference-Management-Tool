import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      position: "relative",
      display: "inline-block",
    },
    wrapperFullWidth: {
      position: "relative",
      display: "block",
      width: "100%",
    },
    buttonProgress: {
      // color: theme.palette.primary.main,
      position: "absolute",
      top: "20%",
      left: "45%",
    },
  })
);

function ButtonProgress({ loading, name, spinColor, ...rest }) {
  const classes = useStyles();
  return (
    <div
      className={rest.fullWidth ? classes.wrapperFullWidth : classes.wrapper}
    >
      <Button {...rest} disabled={loading}>
        {name}
      </Button>
      {loading && (
        <CircularProgress
          size={26}
          color={spinColor ? spinColor : rest.color}
          className={classes.buttonProgress}
        />
      )}
    </div>
  );
}

export default ButtonProgress;
