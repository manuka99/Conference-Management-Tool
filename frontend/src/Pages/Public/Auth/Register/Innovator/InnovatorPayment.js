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
import Api from "../../../../../common/Api";
import swal from "sweetalert";
import { Link as Link_NAV } from "react-router-dom";
import Error from "../../../../../components/alerts/Error";
import HelperTexts from "../../../../../components/HelperTexts";
import { authenticate } from "../../../../../common/auth";
import PaymentForm from "../../../../../components/Payment/PaymentForm";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({}));

export default function Index({ handleForm, errors, registerInfo }) {
  const classes = useStyles();

  // const getPaymentProfile = () => {
  //   const { firstName, lastName, email, address, phone } = paymentInfo;

  //   var userData = {
  //     first_name: firstName,
  //     last_name: lastName,
  //     email,
  //     address,
  //     phone,
  //   };
  //   return userData;
  // };

  return (
    <>
      <Typography variant="h6">Payment details *</Typography>
      <Typography variant="caption" gutterBottom>
        (Payment is required = LKR 500.00)
      </Typography>

      <CardActionArea style={{ marginTop: "20px" }}>
        <Typography gutterBottom variant="body2">
          <b> Why do we charge?</b>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Now organisations in the payments sector are facing a rapidly growing
          demand for instant access service options, driven by the world
          becoming more digital and consumers becoming more comfortable with
          transacting online. This trend is quickly becoming an expectation in
          the B2B payments space too with not only traditional banks finding
          themselves in this new digital ‘instant access’ realm;
        </Typography>
        <br />
        <Typography gutterBottom variant="body2">
          <b>How much do we charge?</b>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          We charge only <b>LKR 500.00 </b>for our services.
        </Typography>
        <br />
        <Typography gutterBottom variant="body2">
          <b>How to pay?</b>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          You cn use our tested and secure payment gateway to make payments. To
          begin your transaction, please{" "}
          <a href="/public/payment" target="_blank">
            click here.
          </a>
        </Typography>
        <br />
      </CardActionArea>
      <Typography variant="body2" color="textSecondary">
        <b>
          Please provide us the payment id which was sent mailed to you after
          completing the payment, this is mandatory to verify your payment.
        </b>
      </Typography>
      <TextField
        autoFocus
        variant="standard"
        required
        id="payment"
        label="Payment ID"
        name="payment"
        value={registerInfo.payment}
        InputLabelProps={{ shrink: registerInfo.payment ? true : false }}
        onChange={handleForm}
        error={errors.payment}
        helperText={errors.payment && <HelperTexts texts={errors.payment} />}
      />
    </>
  );
}
