import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import SaveIcon from "@material-ui/icons/Save";
import Api from "../../../../common/Api";
import swal from "sweetalert";
import EditIcon from "@material-ui/icons/Edit";
import Error from "../../../../components/alerts/Error";
import CustomLinearProgress from "../../../../components/Progress/CustomLinearProgress";
import HelperTexts from "../../../../components/HelperTexts";

function Index() {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [editData, setEditData] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setLoading(true);
    setErrors({});
    Api()
      .get("/auth/profile")
      .then((res) => {
        setUserData({ ...res.data.data.user });
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoading(false);
        setEditData(false);
      });
  };

  const updateUserProfile = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    setErrors({});
    Api()
      .patch("/auth/profile", userData)
      .then((res) => {
        if (res.status === 200) {
          swal("", "User profile was successfully updated.", "success");
          fetchUserData();
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
        setBtnLoading(false);
      });
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: null });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile Details
      </Typography>
      {loading ? (
        <CustomLinearProgress />
      ) : (
        <Box mt={3} mb={2}>
          <Box mb={4}>{errors.msg && <Error message={errors.msg} />}</Box>
          <form noValidate autoComplete="off" onSubmit={updateUserProfile}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.firstName ? true : false}
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="firstName"
                  label="First name"
                  fullWidth
                  value={userData.firstName === null ? "" : userData.firstName}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: userData.firstName ? true : false,
                  }}
                  helperText={
                    errors.firstName && <HelperTexts texts={errors.firstName} />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.lastName ? true : false}
                  helperText={
                    errors.lastName && <HelperTexts texts={errors.lastName} />
                  }
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="lastName"
                  label="Last name"
                  fullWidth
                  value={userData.lastName === null ? "" : userData.lastName}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.lastName ? true : false }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email ? true : false}
                  helperText={
                    errors.email && <HelperTexts texts={errors.email} />
                  }
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={userData.email === null ? "" : userData.email}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.email ? true : false }}
                />
              </Grid>
              <Grid item xs={12}>
                {userData.role === "ADMIN" ? (
                  <TextField
                    error={errors.about ? true : false}
                    helperText={
                      errors.about && <HelperTexts texts={errors.about} />
                    }
                    variant="outlined"
                    InputProps={{
                      readOnly: !editData,
                    }}
                    name="about"
                    label="About"
                    fullWidth
                    value={userData.about === null ? "" : userData.about}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: userData.about ? true : false }}
                  />
                ) : userData.role === "REVIEWER" ? (
                  <TextField
                    error={errors.language_skill ? true : false}
                    helperText={
                      errors.language_skill && (
                        <HelperTexts texts={errors.language_skill} />
                      )
                    }
                    variant="outlined"
                    InputProps={{
                      readOnly: !editData,
                    }}
                    name="language_skill"
                    label="Language skills"
                    fullWidth
                    value={
                      userData.language_skill === null
                        ? ""
                        : userData.language_skill
                    }
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: userData.language_skill ? true : false,
                    }}
                  />
                ) : (
                  <TextField
                    error={errors.writing_skill ? true : false}
                    helperText={
                      errors.writing_skill && (
                        <HelperTexts texts={errors.writing_skill} />
                      )
                    }
                    variant="outlined"
                    InputProps={{
                      readOnly: !editData,
                    }}
                    name="writing_skill"
                    label="Writing Skills"
                    fullWidth
                    value={
                      userData.writing_skill === null
                        ? ""
                        : userData.writing_skill
                    }
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: userData.writing_skill ? true : false,
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.phone ? true : false}
                  helperText={
                    errors.phone && <HelperTexts texts={errors.phone} />
                  }
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="phone"
                  label="phone"
                  fullWidth
                  value={userData.phone === null ? "" : userData.phone}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.phone ? true : false }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="country"
                  label="Country"
                  fullWidth
                  value="Sri Lanka"
                  InputLabelProps={{ shrink: true ? true : false }}
                  disabled
                />
              </Grid>
              {editData ? (
                <Grid item xs={12}>
                  <ButtonProgress
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<SaveIcon />}
                    name="Update profile"
                    loading={btnLoading}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    startIcon={<EditIcon />}
                    onClick={() => setEditData(true)}
                  >
                    Edit profile
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Box>
      )}
    </React.Fragment>
  );
}

export default Index;
