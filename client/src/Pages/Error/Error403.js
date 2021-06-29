import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    width: 560,
    maxHeight: 300,
    height: "auto",
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
}));

export function Error403() {
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box mt={15}>
      <Typography align="center" variant={mobileDevice ? "h6" : "h4"}>
        403: Forbidden Error
      </Typography>
      <Typography align="center" variant="subtitle2">
        This happens when you're trying to open a resource that you're not
        allowed to access. You either tried some shady route or you came here by
        mistake.
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Error 406"
          className={classes.image}
          src="/static/images/error403.jpg"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          onClick={() => navigate("/", { state: {}, replace: true })}
          variant="outlined"
        >
          Back to home
        </Button>
      </div>
    </Box>
  );
}

export default Error403;
