import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Api from "../../../common/Api";
import moment from "moment";

const useStyles = makeStyles({
  card: {
    display: "flex",
    padding: "16px",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  posts: {
    backgroundColor: "#D0D0D0",
    padding: "16px",
  },
  post: {
    padding: "16px",
    marginTop: "10px",
  },
});

export default function Posts() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Api()
      .get("/public/posts")
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    posts.length > 0 && (
      <div className={classes.posts}>
        {posts.map((post) => (
          <div className={classes.post}>
            <CardActionArea component="a" href="#">
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <b>{post.title}</b>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {moment(new Date(post.updatedAt)).fromNow()}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {post.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      Continue reading...
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.cardMedia}
                  image={post.imageUrl}
                  title={post.title}
                />
              </Card>
            </CardActionArea>
          </div>
        ))}
      </div>
    )
  );
}
