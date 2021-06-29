import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
