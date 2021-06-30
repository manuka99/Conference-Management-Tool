import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Swal from "sweetalert2";
import Error from "../../../components/alerts/Error";
import Api from "../../../common/Api";
import ButtonProgress from "../../../components/common/ButtonProgress/ButtonProgress";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2, 4, 6),
  },
}));

export default function ViewUser() {
  const classes = useStyles();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getUserData();
    }, 2000);
    // eslint-disable-next-line
  }, []);

  const getUserData = () => {
    Api()
      .get(`/reviewer/users/${id}`)
      .then((res) => {
        setUserInfo(res.data.data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const approvalSubmit = async () => {
    setErrors({});
    var approvalReason = "";
    var isApproved = !userInfo.isApproved;
    while (approvalReason.length === 0) {
      const { value } = await Swal.fire({
        title: "Approval Reason *",
        input: "text",
        inputLabel:
          "Please provide us the reason why you are Approving/Rejecting this user?",
        inputPlaceholder: "Enter your reason",
        showCancelButton: false,
      });
      console.log(value);
      if (value) approvalReason = value;
    }
    // send rest api
    setLoading(true);
    Api()
      .patch(`/reviewer/approve/user/${id}`, { isApproved, approvalReason })
      .then((res) => {
        getUserData();
        Swal.fire("All changes were saved succesfully!");
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
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          <strong>User Profile</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          An Administrator provides office support to either an individual or
          team and is vital for the smooth-running of a business. Their duties
          may include fielding telephone calls, receiving and directing
          visitors, word processing, creating spreadsheets and presentations,
          and filing.
        </Typography>
        {loading ? (
          <CircularProgress
            size="60px"
            style={{ margin: "auto", display: "block" }}
          />
        ) : (
          <>
            {userInfo.role === "MEMBER" && (
              <>
                <ButtonProgress
                  onClick={approvalSubmit}
                  variant="contained"
                  color={userInfo.isApproved ? "secondary" : "primary"}
                  size="small"
                  loading={loading}
                  name={userInfo.isApproved ? "Reject user" : "Accept user"}
                />
                {userInfo.approvalReason && (
                  <Typography
                    variant="body2"
                    style={{ marginTop: "10px" }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <b>Approval reason </b>: {userInfo.approvalReason}
                  </Typography>
                )}
              </>
            )}

            {errors.msg && <Error message={errors.msg} />}

            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  style={{ marginTop: "20px", fontSize: "20px" }}
                  gutterBottom
                >
                  <b>Basic details</b>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gridGap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <b>Username</b>:{" "}
                  {userInfo.firstName + " " + userInfo.lastName} <br />
                  <b>Email</b>: {userInfo.email} <br />
                  <b>Phone</b>: {userInfo.phone} <br />
                  <b>User Role</b>: {userInfo.role} <br />
                  <b>Payment Info</b>: {userInfo.payment} <br />
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  style={{ marginTop: "20px", fontSize: "20px" }}
                  gutterBottom
                >
                  <b>Additional details</b>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gridGap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <b>
                    Account created (
                    {moment(new Date(userInfo.createdAt).valueOf()).fromNow()} )
                  </b>
                  : {userInfo.createdAt} <br />
                  <b>
                    Last update (
                    {moment(new Date(userInfo.updatedAt).valueOf()).fromNow()} )
                  </b>
                  : {userInfo.updatedAt} <br />
                  <b>Address</b>:{" "}
                  {userInfo.address ? userInfo.address : "Not provided"} <br />
                  <b>
                    Date of birth (
                    {moment(
                      new Date(userInfo.date_of_birth).valueOf()
                    ).fromNow()}{" "}
                    )
                  </b>
                  :{" "}
                  {userInfo.date_of_birth
                    ? userInfo.date_of_birth
                    : "Not provided"}{" "}
                  <br />
                </div>
              </Grid>
              {userInfo.file && (
                <>
                  <Grid item xs={3}>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "20px", fontSize: "20px" }}
                      gutterBottom
                    >
                      <b>Submission details</b>
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gridGap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <b>File name</b>: {userInfo.file.submit_name} <br />
                      <b>File size</b>: {userInfo.file.size} <br />
                      <b>File type</b>: {userInfo.file.type} <br />
                      <b>File path</b>{" "}
                      <div>
                        :{" "}
                        <a
                          href={`/public/file/view/${userInfo.file.name}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Click here to open
                        </a>{" "}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "20px", fontSize: "20px" }}
                      gutterBottom
                    >
                      <b>Additional details</b>
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gridGap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <b>
                        File created on (
                        {moment(
                          new Date(userInfo.file.createdAt).valueOf()
                        ).fromNow()}{" "}
                        )
                      </b>
                      : {userInfo.file.createdAt} <br />
                      <b>
                        Last update on (
                        {moment(
                          new Date(userInfo.file.updatedAt).valueOf()
                        ).fromNow()}{" "}
                        )
                      </b>
                      : {userInfo.file.updatedAt} <br />
                    </div>
                  </Grid>
                </>
              )}
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
}
