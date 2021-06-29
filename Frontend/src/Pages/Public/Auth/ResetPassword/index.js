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
import Api from "../../../../common/Api";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Link as Link_NAV, useParams } from "react-router-dom";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import Error from "../../../../components/alerts/Error";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import HelperTexts from "../../../../components/HelperTexts";
import { authenticate } from "../../../../common/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
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
  user_details: {
    flexGrow: 1,
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

export default function Index() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { token, email, username } = useParams();
  const [resetInfo, setResetInfo] = useState({
    token,
    email,
    logOutAllDevices: false,
  });
  const [errors, setErrors] = useState({});

  const handleForm = (event) => {
    setResetInfo({
      ...resetInfo,
      [event.target.name]: event.target.value,
    });
  };

  const resetPassword = () => {
    setErrors({});
    Api()
      .patch(`/public/reset-password`, resetInfo)
      .then((res) => {
        const { user, token } = res.data.data;
        authenticate(user, token);
        swal("You have successfully changed your password.");
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

  const cancelPasswordReset = () => {
    navigate("/");
  };

  const handleLogOutAllDevices = (event) => {
    setResetInfo({ ...resetInfo, [event.target.name]: event.target.checked });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>

        <div className={classes.user_details}>
          <Grid container spacing={6} justify="center">
            <Grid item xs={1}>
              <Avatar />
            </Grid>
            <Grid item xs={7}>
              <Grid container direction="column">
                <Typography variant="body2">
                  <strong>{username}</strong>
                </Typography>
                <Typography variant="body2">{email}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <ButtonProgress
                type="button"
                fullWidth
                variant="outlined"
                color="secondary"
                name="cancel"
                size="small"
                handleButtonClick={cancelPasswordReset}
              />
            </Grid>
          </Grid>
        </div>

        {errors.msg && <Error message={errors.msg} />}

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleForm}
            error={errors.password ? true : false}
            helperText={
              errors.password && <HelperTexts texts={errors.password} />
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Repeat new password"
            type="password"
            id="confirm_password"
            onChange={handleForm}
            error={errors.confirm_password ? true : false}
            helperText={
              errors.confirm_password && (
                <HelperTexts texts={errors.confirm_password} />
              )
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={resetInfo.logOutAllDevices}
                onChange={handleLogOutAllDevices}
                name="logOutAllDevices"
              />
            }
            label="Logout from other devices?"
          />
          <FormHelperText>
            {errors.logOutAllDevices && (
              <HelperTexts texts={errors.logOutAllDevices} />
            )}
          </FormHelperText>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={resetPassword}
          >
            Change password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                component={Link_NAV}
                to="/public/auth/register"
                variant="body2"
              >
                Not a user? Register
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={Link_NAV}
                to="/public/auth//login"
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
