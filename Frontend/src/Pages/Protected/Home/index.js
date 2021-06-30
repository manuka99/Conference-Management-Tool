import React, { useState, useEffect } from "react";
import Api from "../../../common/Api";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "0",
  },
  flex: {
    marginTop: theme.spacing(3),
    display: "flex",
    maxWidth: "100%",
    flexWrap: "wrap",
    gridGap: theme.spacing(4),
    alignItems: "flex-start",
  },
  item: {
    flexBasis: "18%",
  },
  card: {
    width: "20vw",
    height: "200px",
    overflow: "auto",
  },
  actions: {
    position: "relative",
    bottom: "0",
  },
}));

export default function Index() {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    Api()
      .get("/auth/notifications")
      .then((res) => setNotifications(res.data.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          <b>Manage your activity</b>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          The activity you keep helps us make services more useful for you, like
          helping you rediscover the things you've searched for, read, and
          watched. You can see and list your activity using the controls on this
          page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => fetchNotifications()}
        >
          Sync
        </Button>
      </Container>
      {notifications.length > 0 ? (
        <div className={classes.flex}>
          {notifications.map((notification) => (
            <div className={classes.item}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      <b>
                        {moment(new Date(notification.updatedAt)).fromNow()}
                      </b>
                    </Typography>
                    <Typography variant="body2">
                      {notification.message}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <div className={classes.actions}>
                  <CardActions>
                    <Link
                      component={NavLink}
                      to={notification.url}
                      size="small"
                      color="primary"
                    >
                      More
                    </Link>
                  </CardActions>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body2" color="textSecondary">
          <b>You do not have any notifications</b>
        </Typography>
      )}
    </>
  );
}
