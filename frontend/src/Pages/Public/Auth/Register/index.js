import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Api from "../../../../util/Api";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Link as Link_NAV } from "react-router-dom";
import Error from "../../../../components/alerts/Error";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Index() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({});
  const [errors, setErrors] = useState({});

  const handleForm = (event) => {
    setRegisterInfo({
      ...registerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const registerSubmit = () => {
    setErrors({});
    Api()
      .post("/auth/register", registerInfo)
      .then((res) => {
        swal("You have successfully Registered");
      })
      .catch(
        (err) =>
          err.response &&
          err.response.data &&
          setErrors({
            message: err.response.data.message,
            ...err.response.data.errors,
          })
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User registration
        </Typography>
        {errors.message && <Error message={errors.message} />}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fname"
            label="First name"
            name="fname"
            autoComplete="fname"
            autoFocus
            onChange={handleForm}
            error={errors.fname}
            helperText={errors.fname && errors.fname.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lname"
            label="Last name"
            name="lname"
            autoComplete="lname"
            autoFocus
            onChange={handleForm}
            error={errors.lname}
            helperText={errors.lname && errors.lname.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address line 1"
            name="address"
            autoComplete="address"
            autoFocus
            onChange={handleForm}
            error={errors.address}
            helperText={errors.address && errors.address.message}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="date_Of_birth"
            label="Date of birth"
            name="date_Of_birth"
            autoComplete="date_Of_birth"
            autoFocus
            onChange={handleForm}
            error={errors.date_Of_birth}
            helperText={errors.date_Of_birth && errors.date_Of_birth.message}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleForm}
            error={errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone number"
            name="phone"
            autoComplete="phone"
            autoFocus
            onChange={handleForm}
            error={errors.phone}
            helperText={errors.phone && errors.phone.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleForm}
            error={errors.password}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeat_password"
            label="Repeat password"
            type="repeat_password"
            id="repeat_password"
            onChange={handleForm}
            error={errors.repeat_password}
            helperText={
              errors.repeat_password && errors.repeat_password.message
            }
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerSubmit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              <Link
                component={Link_NAV}
                to="/public/auth/recover-password"
                variant="body2"
              >
                {"Forgot password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={Link_NAV}
                to="/public/auth/login"
                variant="body2"
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
