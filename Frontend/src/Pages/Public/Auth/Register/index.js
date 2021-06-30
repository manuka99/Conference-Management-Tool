import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useNavigate } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Link as Link_NAV } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
}));

export default function Index() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [subRole, setSubRole] = useState("");

  function submitRole() {
    switch (subRole) {
      case "RESEARCHER":
        return navigate("/public/auth/register/researcher");
      case "PRESENTER":
        return navigate("/public/auth/register/presenter");
      case "INNOVATOR":
        return navigate("/public/auth/register/innovator");
      case "ATTENDEE":
        return navigate("/public/auth/register/attendee");
      default:
        return null;
    }
  }

  const handleForm = (event) => {
    setSubRole(event.target.value);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <CssBaseline />
      <Grid container maxWidth="md" spacing={1}>
        <Grid item xs={8}>
          <Typography gutterBottom variant="h5">
            <b>Member Area</b>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Link component={Link_NAV} to="/public/auth/login" variant="body2">
            Already have an account? Sign In
          </Link>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
        <Grid item xs={12}>
          <CardActionArea style={{ marginTop: "20px" }}>
            <Typography gutterBottom variant="body2">
              <b> How to register?</b>
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Now organisations in the payments sector are facing a rapidly
              growing demand for instant access service options, driven by the
              world becoming more digital and consumers becoming more
              comfortable with transacting online. This trend is quickly
              becoming an expectation in the B2B payments space too with not
              only traditional banks finding themselves in this new digital
              ‘instant access’ realm. This trend is quickly becoming an
              expectation in the B2B payments space too with not only
              traditional banks finding themselves in this new digital ‘instant
              access’ realm;
            </Typography>
            <br />
            <Typography gutterBottom variant="body2">
              <b>How many user profiles?</b>
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              This trend is quickly becoming an expectation in the B2B payments
              space too with not only traditional banks finding themselves in
              this new digital ‘instant access’ realm;
            </Typography>
            <br />
            <Typography gutterBottom variant="body2">
              <b>Do your charge for these services?</b>
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              We charge only <b>LKR 500.00 </b>for our services.
            </Typography>
            <br />
            <Typography gutterBottom variant="body2">
              <b>How to pay?</b>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              You cn use our tested and secure payment gateway to make payments.
              To begin your transaction, please{" "}
              <a href="/public/payment" target="_blank">
                click here.
              </a>
            </Typography>
            <br />
            <br />
            <Typography gutterBottom variant="body2">
              <b>
                Stop thinking, select the best role that suits you and register
                now!
              </b>
            </Typography>
            <br />
          </CardActionArea>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel id="demo-simple-select-label">
              Select user type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Select user type"
              value={subRole}
              onChange={handleForm}
            >
              <MenuItem value="RESEARCHER">Researcher</MenuItem>
              <MenuItem value="PRESENTER">Presenter</MenuItem>
              <MenuItem value="ATTENDEE">Attendee</MenuItem>
              <MenuItem value="INNOVATOR">Innovator</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button color="primary" variant="contained" onClick={submitRole}>
            Begin registration
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
