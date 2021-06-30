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
import PostForm from "./PostForm";
import SyncIcon from "@material-ui/icons/Sync";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  model: {
    overflow: "auto",
  },
});

export default function ViewPosts() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getPostData();
    // eslint-disable-next-line
  }, []);

  const getPostData = () => {
    setLoading(true);
    Api()
      .get(`/editor/posts`)
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const deletePost = (id) => {
    Api()
      .delete(`/admin/posts/${id}`)
      .then((res) => {
        swal("Post was deleted successfully!");
        getPostData();
      })
      .catch((err) => console.log(err));
  };

  const postApproval = (id, isApproved) => {
    Api()
      .patch(`/admin/posts/approve/${id}`, { isApproved })
      .then((res) => {
        swal("Post was updated successfully!");
        getPostData();
      })
      .catch((err) => console.log(err));
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
        <PostForm handleClose={closeModel} />
      </Modal>
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          <b>Manage posts ({posts.length})</b>
        </Typography>
        <TableContainer component={Paper}>
          <Button
            color="secondary"
            aria-label="New Post"
            component="span"
            size="small"
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpen(true)}
          >
            New Post
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            color="primary"
            aria-label="Sync"
            component="span"
            size="small"
            variant="contained"
            startIcon={<SyncIcon />}
            onClick={getPostData}
          >
            Sync
          </Button>
          {loading && <LinearProgress />}
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <b>Post Title</b>
                </TableCell>
                <TableCell align="left">
                  <b>Post Description</b>
                </TableCell>
                <TableCell align="left">
                  <b>Post url</b>
                </TableCell>
                <TableCell align="left">
                  <b>Published By</b>
                </TableCell>
                <TableCell align="left">
                  <b>Last update</b>
                </TableCell>
                <TableCell align="left">
                  <b>Created At</b>
                </TableCell>
                <TableCell align="left">
                  <b>Approval</b>
                </TableCell>
                <TableCell align="left">
                  <b>Delete</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post, index) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <b>#{index + 1}</b>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {post.title}
                  </TableCell>
                  <TableCell align="left">{post.description}</TableCell>
                  <TableCell align="left">
                    <a href={post.imageUrl}>View file</a>
                  </TableCell>
                  <TableCell align="left">
                    <a
                      href={`/protected/users/${post.user._id}`}
                    >{`${post.user.email} (${post.user.role})`}</a>
                  </TableCell>
                  <TableCell align="left">
                    {moment(new Date(post.updatedAt).valueOf()).fromNow()}
                  </TableCell>
                  <TableCell align="left">
                    {moment(new Date(post.createdAt).valueOf()).fromNow()}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      color={!post.isApproved ? "secondary" : "primary"}
                      variant="outlined"
                      size="small"
                      onClick={() => postApproval(post._id, !post.isApproved)}
                    >
                      {post.isApproved ? "Approved" : "Rejected"}
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      color="secondary"
                      aria-label="Delete"
                      component="span"
                      onClick={() => deletePost(post._id)}
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
