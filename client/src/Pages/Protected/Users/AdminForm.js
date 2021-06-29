import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import swal from "sweetalert";
import Error from "../../../components/alerts/Error";
import HelperTexts from "../../../components/HelperTexts";
import Api from "../../../common/Api";
import ButtonProgress from "../../../components/common/ButtonProgress/ButtonProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2, 4, 6),
  },
}));

export default function AdminForm({ handleClose }) {
  const classes = useStyles();
  const [registerInfo, setRegisterInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleForm = (event) => {
    setRegisterInfo({
      ...registerInfo,
      [event.target.name]: event.target.value,
    });
    delete errors[event.target.name];
  };

  const registerSubmit = () => {
    setErrors({});
    setLoading(true);
    Api()
      .post("/reviewer/users", registerInfo)
      .then((res) => {
        const { user } = res.data.data;
        swal({
          title: "Successfully Registered",
          text: `User profile with email - ${user.email} was created successfully.`,
          icon: "success",
        });
        handleClose();
      })
      .catch(
        (err) =>
          err.response &&
          err.response.data &&
          setErrors({
            msg: err.response.data.data.msg,
            ...err.response.data.data.params,
          })
      )
      .finally(() => setLoading(false));
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper className={classes.paper}>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Typography variant="h6" gutterBottom>
          <strong>Administrator Profile</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          An Administrator provides office support to either an individual or
          team and is vital for the smooth-running of a business. Their duties
          may include fielding telephone calls, receiving and directing
          visitors, word processing, creating spreadsheets and presentations,
          and filing.
        </Typography>
        {errors.msg && <Error message={errors.msg} />}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              autoCapitalize
              variant="standard"
              required
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              value={registerInfo.firstName}
              InputLabelProps={{
                shrink: registerInfo.firstName ? true : false,
              }}
              onChange={handleForm}
              error={errors.firstName}
              helperText={
                errors.firstName && <HelperTexts texts={errors.firstName} />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              autoCapitalize
              required
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              value={registerInfo.lastName}
              InputLabelProps={{ shrink: registerInfo.lastName ? true : false }}
              onChange={handleForm}
              error={errors.lastName}
              helperText={
                errors.lastName && <HelperTexts texts={errors.lastName} />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={registerInfo.email}
              InputLabelProps={{ shrink: registerInfo.email ? true : false }}
              onChange={handleForm}
              error={errors.email}
              helperText={errors.email && <HelperTexts texts={errors.email} />}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="standard"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={registerInfo.password}
              InputLabelProps={{ shrink: registerInfo.password ? true : false }}
              onChange={handleForm}
              error={errors.password}
              helperText={
                errors.password && <HelperTexts texts={errors.password} />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              required
              fullWidth
              value={registerInfo.confirm_password}
              InputLabelProps={{
                shrink: registerInfo.confirm_password ? true : false,
              }}
              name="confirm_password"
              label="Repeat password"
              type="password"
              id="confirm_password"
              onChange={handleForm}
              error={errors.confirm_password}
              helperText={
                errors.confirm_password && (
                  <HelperTexts texts={errors.confirm_password} />
                )
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="standard"
              required
              fullWidth
              value={registerInfo.phone}
              InputLabelProps={{ shrink: registerInfo.phone ? true : false }}
              type="number"
              id="phone"
              label="Phone number"
              name="phone"
              onChange={handleForm}
              error={errors.phone}
              helperText={errors.phone && <HelperTexts texts={errors.phone} />}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-label">
                Select user type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Select user role"
                value={registerInfo.role}
                name="role"
                onChange={handleForm}
                error={errors.role}
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="EDITOR">Editor</MenuItem>
                <MenuItem value="REVIEWER">Reviewer</MenuItem>
              </Select>
              {errors.role && <HelperTexts texts={errors.role} />}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <ButtonProgress
              onClick={registerSubmit}
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              loading={loading}
              name="Create profile"
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
