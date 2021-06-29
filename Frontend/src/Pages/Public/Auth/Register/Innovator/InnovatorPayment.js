import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import HelperTexts from "../../../../../components/HelperTexts";
import CardActionArea from "@material-ui/core/CardActionArea";

export default function Index({ handleForm, errors, registerInfo }) {
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
