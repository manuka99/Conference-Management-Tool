import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PaymentForm from "../../../components/Payment/PaymentForm";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
  card: {
    padding: theme.spacing(2),
  },
  row: {
    display: "flex",
    flexDirection: "column",
  },
}));

function Index() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card elevation={4} className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Payhere"
            height="120"
            image="/static/images/payhere.png"
            title="Payhere"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              <strong>Payment gateway</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              We use payhere payment gateway which is safe and native. PayHere
              stays on the leading edge of safety and security. By partnering
              with Sampath Bank PLC with the approval of Central Bank, PayHere
              offers layers of trustable security.{" "}
              <a href="https://www.payhere.lk/">Learn More</a>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className={classes.row}>
            <PaymentForm />
          </div>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Index;
