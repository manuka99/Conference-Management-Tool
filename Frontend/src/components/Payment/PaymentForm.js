import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { PaymentProcess } from "./PaymentProcess";

export default function PaymentForm({ userData, amount, reason }) {
  const [paymentInfo, setPaymentInfo] = useState({
    amount,
    itemTitle: reason,
    ...userData,
  });
  const handleForm = (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [event.target.name]: event.target.value,
    });
  };
  const startPayment = (e) => {
    e.preventDefault();
    PaymentProcess(paymentInfo);
  };
  return (
    <>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        <strong>Please fill all the required details</strong>
      </Typography>
      <form onSubmit={startPayment}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              autoCapitalize
              variant="standard"
              required
              fullWidth
              id="first_name"
              label="First name"
              name="first_name"
              value={paymentInfo.first_name}
              InputLabelProps={{
                shrink: paymentInfo.first_name ? true : false,
              }}
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              autoCapitalize
              required
              fullWidth
              id="last_name"
              label="Last name"
              name="last_name"
              value={paymentInfo.last_name}
              InputLabelProps={{
                shrink: paymentInfo.last_name ? true : false,
              }}
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={paymentInfo.email}
              InputLabelProps={{ shrink: paymentInfo.email ? true : false }}
              onChange={handleForm}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              value={paymentInfo.address}
              InputLabelProps={{ shrink: paymentInfo.address ? true : false }}
              id="address"
              label="Address line 1"
              name="address"
              onChange={handleForm}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="standard"
              required
              fullWidth
              value={paymentInfo.phone}
              InputLabelProps={{ shrink: paymentInfo.phone ? true : false }}
              type="number"
              id="phone"
              label="Phone number"
              name="phone"
              onChange={handleForm}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="standard"
              required
              fullWidth
              value={paymentInfo.city}
              InputLabelProps={{ shrink: paymentInfo.city ? true : false }}
              id="city"
              label="City"
              name="city"
              onChange={handleForm}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="standard"
              required
              fullWidth
              value={paymentInfo.itemTitle}
              InputLabelProps={{
                shrink: paymentInfo.itemTitle ? true : false,
              }}
              disabled={reason ? true : false}
              id="itemTitle"
              label="Reason"
              name="itemTitle"
              onChange={handleForm}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="standard"
              required
              fullWidth
              value={paymentInfo.amount}
              disabled={amount ? true : false}
              InputLabelProps={{
                shrink: paymentInfo.amount ? true : false,
              }}
              id="amount"
              label="Transfer amount"
              name="amount"
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Process payment
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
