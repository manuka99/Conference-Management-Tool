import React from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: ["Research", "Presenter", "Innovator", "Attendee"],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  grid: {
    display: "flex",
  },
  main: {
    backgroundColor: "grey",
  },
}));

export default function Copyright() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid
          container
          spacing={4}
          className={classes.grid}
          justify="space-evenly"
        >
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" style={{ color: "white" }} gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      variant="subtitle1"
                      style={{ color: "white" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" style={{ color: "white" }} align="center">
            {"Copyright ?? "}
            <Link color="inherit" href="/">
              <b>{"SLIIT Conference Management Tool "}</b>
            </Link>
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
