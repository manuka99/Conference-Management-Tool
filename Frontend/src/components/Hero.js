import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "420px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(https://source.unsplash.com/random)` }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          image="https://source.unsplash.com/random"
          alt="hero"
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography variant="h4" color="inherit" gutterBottom>
              <strong>JULY 2021 TECH CONFERENCE</strong>
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              For more than 40 years, CMG’s international conference has been
              the source for education and peer-to-peer exchange for all things
              enterprise IT and infrastructure. It is the only conference of its
              kind where attendees can obtain real-world knowledge and training
              that is not vendor-run. IMPACT features sessions on the full scope
              of digital transformation technologies including Artificial
              Intelligence and Machine Learning.
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
