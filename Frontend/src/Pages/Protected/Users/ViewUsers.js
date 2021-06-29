import React, { useState, useEffect } from "react";
import Api from "../../../common/Api";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, Button, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import swal from "sweetalert";
import Modal from "@material-ui/core/Modal";
import { useParams } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AdminForm from "./AdminForm";
import SyncIcon from "@material-ui/icons/Sync";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  model: {
    overflow: "auto",
  },
});

function ViewUsers() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { role_name } = useParams();

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  const getUserData = () => {
    setLoading(true);
    Api()
      .get(`/reviewer/user-role/${role_name}`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const deleteUser = (id) => {
    Api()
      .delete(`/admin/users/${id}`)
      .then((res) => {
        removeUserFromList(res.data.data._id);
        swal("User was deleted successfully!");
      })
      .catch((err) => console.log(err));
  };

  const removeUserFromList = (id) => {
    const rmv_index = users.findIndex((val, index) => val._id === id);
    var newUsers = users;
    newUsers.splice(rmv_index, 1);
    setUsers(newUsers);
    console.log(rmv_index);
    console.log(newUsers);
  };

  const closeModel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        className={classes.model}
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <AdminForm handleClose={closeModel} />
      </Modal>
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          <b>Manage users ({users.length})</b>
        </Typography>
        <TableContainer component={Paper}>
          <Button
            color="secondary"
            aria-label="New User"
            component="span"
            size="small"
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpen(true)}
          >
            New User
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            color="primary"
            aria-label="Sync"
            component="span"
            size="small"
            variant="contained"
            startIcon={<SyncIcon />}
            onClick={getUserData}
          >
            Sync
          </Button>
          {loading && <LinearProgress />}
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell align="right">
                  <b>User name</b>
                </TableCell>
                <TableCell align="right">
                  <b>Phone</b>
                </TableCell>
                <TableCell align="right">
                  <b>User role</b>
                </TableCell>
                <TableCell align="right">
                  <b>Status</b>
                </TableCell>
                <TableCell align="right">
                  <b>Last update</b>
                </TableCell>
                <TableCell align="right">
                  <b>Created At</b>
                </TableCell>
                <TableCell align="right">
                  <b>View</b>
                </TableCell>
                <TableCell align="right">
                  <b>Delete</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <b>#{index + 1}</b>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell align="right">
                    {user.firstName + " " + user.lastName}
                  </TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">{user.role}</TableCell>
                  <TableCell align="right">
                    {user.role === "MEMBER"
                      ? user.approved
                        ? "Approved"
                        : "Rejected"
                      : "Approved"}
                  </TableCell>
                  <TableCell align="right">
                    {moment(new Date(user.updatedAt).valueOf()).fromNow()}
                  </TableCell>
                  <TableCell align="right">
                    {moment(new Date(user.createdAt).valueOf()).fromNow()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      aria-label="View"
                      component="span"
                      onClick={() => navigate(`/protected/users/${user._id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="secondary"
                      aria-label="Delete"
                      component="span"
                      onClick={() => deleteUser(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default ViewUsers;
