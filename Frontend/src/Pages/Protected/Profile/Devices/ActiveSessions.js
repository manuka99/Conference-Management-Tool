import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box, Button, CircularProgress, Divider } from "@material-ui/core";
import Api from "../../../../common/Api";
import { makeStyles } from "@material-ui/core/styles";
import SyncIcon from "@material-ui/icons/Sync";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ComputerIcon from "@material-ui/icons/Computer";
import SessionData from "./SessionData.js";
import BugReportIcon from "@material-ui/icons/BugReport";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  loaderWrapper: {
    display: "flex",
    padding: " 0 0  0 80px",
    boxSizing: "border-box",
  },
  sessions_wrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(4),
  },
  activeSession: {
    color: "#008000",
  },
}));

function ActiveSessions() {
  const [requestLoading, setRequestLoading] = useState(true);
  const [sessionsData, setSessionsData] = useState([]);
  const [currentSession, setCurrentSession] = useState({});
  const classes = useStyles();
  const [moreOnSession, setMoreOnSession] = useState("");

  useEffect(() => {
    if (requestLoading) {
      Api()
        .get("/auth/sessions")
        .then((res) => {
          setSessionsData(res.data.data.sessions);
          setCurrentSession(res.data.data.current);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setRequestLoading(false);
        });
    }
  }, [requestLoading]);

  const cancelSeeMoreOnSession = () => {
    setMoreOnSession("");
  };

  return (
    <Box mt={3} mb={3}>
      {moreOnSession && (
        <SessionData id={moreOnSession} onClose={cancelSeeMoreOnSession} />
      )}
      <Typography variant="h6" gutterBottom>
        Signed in devices
      </Typography>
      <Divider />
      <br />
      <Typography variant="body2" gutterBottom>
        This is a list of devices that have logged into your account. Revoke any
        device that you do not recognize. You can see your sign-in history,
        including the dates and times that your account was used. You can also
        see the IP addresses which were used to access your account. These are
        the details displayed from the device;
      </Typography>
      <ul style={{ listStylePosition: "outside" }}>
        <li>IP address</li>
        <li>Browser/App infomation</li>
        <li>Device information</li>
        <li>Accessed location</li>
      </ul>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setRequestLoading(true)}
        startIcon={<SyncIcon />}
      >
        Refresh device list
      </Button>
      <Box mt={3}>
        {requestLoading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress
              className={classes.loader}
              size="50px"
              disableShrink
            />
          </div>
        ) : (
          <React.Fragment>
            <div className={classes.sessions_wrap}>
              {sessionsData.map((session) => {
                return (
                  <Grid
                    container
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    direction="column"
                    alignItems="center"
                    alignContent="center"
                    justify="center"
                    spacing={2}
                    key={session._id}
                  >
                    <Grid item xs={12}>
                      {session.deviceType === "desktop" ? (
                        <ComputerIcon
                          className={
                            currentSession._id === session._id
                              ? classes.activeSession
                              : ""
                          }
                          fontSize="large"
                        />
                      ) : session.deviceType === "bot" ? (
                        <BugReportIcon
                          className={
                            currentSession._id === session._id
                              ? classes.activeSession
                              : ""
                          }
                          fontSize="large"
                        />
                      ) : (
                        <PhoneAndroidIcon
                          className={
                            currentSession._id === session._id
                              ? classes.activeSession
                              : ""
                          }
                          fontSize="large"
                        />
                      )}
                    </Grid>

                    <Grid
                      container
                      item
                      alignItems="center"
                      alignContent="center"
                      justify="center"
                      direction="column"
                      xs={12}
                    >
                      <Grid item>{session.ip_address}</Grid>
                      <Grid
                        item
                        className={
                          currentSession._id === session._id
                            ? classes.activeSession
                            : ""
                        }
                      >
                        {currentSession._id === session._id
                          ? "Current device"
                          : moment(new Date(session.updatedAt)).fromNow()}
                      </Grid>
                      {session.deviceType === "bot" ? (
                        <Grid item>Robot | Machine</Grid>
                      ) : (
                        <Grid item>{`${session.osInfo}`}</Grid>
                      )}
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        color={session.isValid ? "textSecondary" : "secondary"}
                        gutterBottom
                      >
                        {session.isValid ? "Active" : "Revoked"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        justify="flex-end"
                        variant="contained"
                        color="primary"
                        onClick={() => setMoreOnSession(session._id)}
                        size="small"
                        style={{ textTransform: "none", padding: "0" }}
                      >
                        more
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
            </div>
            <br />
            <br />
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

export default ActiveSessions;
