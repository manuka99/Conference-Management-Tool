import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Api from "../../../../common/Api";
import Error from "../../../../components/alerts/Error";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import swal from "sweetalert";
import Paper from "@material-ui/core/Paper";
import Copyright from "../../../../components/Copyright";
import HelperTexts from "../../../../components/HelperTexts";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
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
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = React.useState({});

  const classes = useStyles();

  const handleForm = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setErrors({ ...errors, [event.target.name]: null });
  };

  const submitForm = (event) => {
    setErrors({});
    event.preventDefault();
    setLoading(true);
    Api()
      .post("/public/recover-password", userData)
      .then((res) => {
        if (res.status === 200) {
          swal(
            "",
            `Password reset link has been set to the email address: ${userData.email}`,
            "success"
          );
        }
      })
      .catch((err) => {
        err.response &&
          err.response.data &&
          setErrors({
            msg: err.response.data.data.msg,
            ...err.response.data.data.params,
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          style={{ height: "48px", width: "48px" }}
        />
        <Typography variant="h5" gutterBottom>
          Reset your password
        </Typography>
        <Typography variant="body2">
          Enter your user account's verified email address and we will send you
          a password reset link.
        </Typography>
        {errors.msg && <Error message={errors.msg} />}
        <form className={classes.form} onSubmit={submitForm}>
          <TextField
            error={errors.email}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleForm}
            helperText={errors.email && <HelperTexts texts={errors.email} />}
          />
          <Box mt={1} mb={2}>
            <ButtonProgress
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              name="Send password reset email"
              loading={loading}
            />
          </Box>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Container>
  );
}
