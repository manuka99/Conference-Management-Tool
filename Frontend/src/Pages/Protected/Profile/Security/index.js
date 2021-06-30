import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box, Divider } from "@material-ui/core";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import SaveIcon from "@material-ui/icons/Save";
import Api from "../../../../common/Api";
import swal from "sweetalert";
import Error from "../../../../components/alerts/Error";
import HelperTexts from "../../../../components/HelperTexts";

const initialPasswordData = {
  current_password: "",
  password: "",
  confirm_password: "",
  logOutAllDevices: false,
};

function Index() {
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({ ...initialPasswordData });
  const [errors, setErrors] = useState({});

  const updatePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(passwordData);
    Api()
      .patch("/auth/security", passwordData)
      .then((res) => {
        if (res.status === 200) {
          setPasswordData({
            ...initialPasswordData,
          });
          swal("", "User password was updated successfully", "success");
          setErrors({});
        }
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
      .finally(() => {
        setLoading(false);
      });
  };

  const formDataChanged = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleFormCheckLogoutOthers = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.checked });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Update user password
      </Typography>
      <Divider />
      {errors.msg && <Error message={errors.msg} />}
      <Box mt={1} mb={3}>
        <form autoComplete="off" onSubmit={updatePassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="current_password"
                  label="Current password"
                  type="password"
                  error={errors.current_password}
                  helperText={
                    errors.current_password && (
                      <HelperTexts texts={errors.current_password} />
                    )
                  }
                  inputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  onChange={formDataChanged}
                  fullWidth
                  value={passwordData.current_password}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="password"
                label="New password"
                type="password"
                fullWidth
                onChange={formDataChanged}
                helperText={
                  errors.password && <HelperTexts texts={errors.password} />
                }
                error={errors.password}
                disabled={
                  passwordData.current_password === undefined ||
                  passwordData.current_password.length < 8
                }
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                value={passwordData.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="confirm_password"
                label="Repeat password"
                type="password"
                fullWidth
                onChange={formDataChanged}
                error={errors.confirm_password}
                helperText={
                  errors.confirm_password && (
                    <HelperTexts texts={errors.confirm_password} />
                  )
                }
                disabled={
                  passwordData.password === undefined ||
                  passwordData.password.length < 8
                }
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                value={passwordData.confirm_password}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="logOutAllDevices"
                    value="yes"
                    onChange={handleFormCheckLogoutOthers}
                    checked={passwordData.logOutAllDevices}
                  />
                }
                label="Log out of all other connected devices"
              />
              {errors.firstName && <HelperTexts texts={errors.firstName} />}
            </Grid>
            <Grid item xs={12}>
              <ButtonProgress
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SaveIcon />}
                name="Update Password"
                loading={loading}
                type="submit"
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </React.Fragment>
  );
}

export default Index;
