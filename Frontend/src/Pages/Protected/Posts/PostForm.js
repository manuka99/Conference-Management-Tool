import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
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
  const [postInfo, setPostInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleForm = (event) => {
    setPostInfo({
      ...postInfo,
      [event.target.name]: event.target.value,
    });
    delete errors[event.target.name];
  };

  const formSubmit = () => {
    setErrors({});
    setLoading(true);
    Api()
      .post("/editor/posts", postInfo)
      .then((res) => {
        swal({
          title: "Successfully submitted for review",
          text: `Your post has been sent and it is under review.`,
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
          <strong>Create new post</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          A post is what makes up the blog aspect of your site. These are
          generally news or informational updates about a certain topic or
          talking point. Posts are listed in reverse chronological order and can
          be tagged, categorized and even archived on your site.
        </Typography>
        {errors.msg && <Error message={errors.msg} />}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              autoCapitalize
              variant="standard"
              required
              fullWidth
              id="title"
              label="Post title"
              name="title"
              value={postInfo.title}
              InputLabelProps={{
                shrink: postInfo.title ? true : false,
              }}
              onChange={handleForm}
              error={errors.title}
              helperText={errors.title && <HelperTexts texts={errors.title} />}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              autoCapitalize
              required
              fullWidth
              id="description"
              label="Post description"
              name="description"
              value={postInfo.description}
              InputLabelProps={{
                shrink: postInfo.description ? true : false,
              }}
              onChange={handleForm}
              error={errors.description}
              helperText={
                errors.description && <HelperTexts texts={errors.description} />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="imageUrl"
              label="Image Url"
              name="imageUrl"
              value={postInfo.imageUrl}
              InputLabelProps={{ shrink: postInfo.imageUrl ? true : false }}
              onChange={handleForm}
              error={errors.imageUrl}
              helperText={
                errors.imageUrl && <HelperTexts texts={errors.imageUrl} />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonProgress
              onClick={formSubmit}
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              loading={loading}
              name="Publish post"
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
