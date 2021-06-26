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

export function Error404() {
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box mt={15}>
      <Typography align="center" variant={mobileDevice ? "h6" : "h4"}>
        404: The page you are looking for isn’t here
      </Typography>
      <Typography align="center" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Error 404"
          className={classes.image}
          src="/images/undraw_page_not_found_su7k.svg"
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

export default Error404;
