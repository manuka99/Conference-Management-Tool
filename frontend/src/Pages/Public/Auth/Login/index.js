import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Api from "../../../../util/Api";
import swal from "sweetalert";
import HelperTexts from "../../../../components/HelperTexts";
import { useNavigate } from "react-router";
import { Link as Link_NAV } from "react-router-dom";
import Error from "../../../../components/alerts/Error";
import { authenticate } from "../../../../util/auth";

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
  const [loginInfo, setLoginInfo] = useState({});
  const [errors, setErrors] = useState({});

  const handleForm = (event) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  const loginSubmit = () => {
    setErrors({});
    Api()
      .post("/public/login", loginInfo)
      .then((res) => {
        const { user, token } = res.data.data;
        authenticate(user, token);
        swal("You have successfully Logged In");
      })
      .catch(
        (err) =>
          err.response &&
          err.response.data &&
          setErrors({
            msg: err.response.data.data.msg,
            ...err.response.data.data.params,
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
          Sign in
        </Typography>
        {errors.msg && <Error message={errors.msg} />}
        <form className={classes.form} noValidate>
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
            helperText={errors.email && <HelperTexts texts={errors.email} />}
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
            helperText={
              errors.password && <HelperTexts texts={errors.password} />
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                component={Link_NAV}
                to="/public/auth/recover-password"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={Link_NAV}
                to="/public/auth/register"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
