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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as Link_NAV } from "react-router-dom";
import Error from "../../../../components/alerts/Error";
import HelperTexts from "../../../../components/HelperTexts";
import Innovator from "./Innovator";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1, 0),
  },
}));

export default function Index() {
  const classes = useStyles();

  const [subRole, setSubRole] = useState("");

  function getFormContent() {
    switch (subRole) {
      case "INNOVATOR":
        return <Innovator />;
      default:
        return null;
    }
  }

  const handleForm = (event) => {
    setSubRole(event.target.value);
  };

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      <CssBaseline />
      {getFormContent() ? (
        <>{getFormContent()}</>
      ) : (
        <Grid container maxWidth="md" spacing={1}>
          <Grid item xs={6}>
            <Box mt={2}>
              <FormControl fullWidth variant="outlined">
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
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
