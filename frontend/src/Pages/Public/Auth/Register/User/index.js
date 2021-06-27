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
import Error from "../../../../../components/alerts/Error";
import HelperTexts from "../../../../../components/HelperTexts";
import { authenticate } from "../../../../../common/auth";

export default function Index({ registerInfo, handleForm, errors }) {
  return (
    <>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        <strong>User profile</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            autoFocus
            autoCapitalize
            variant="standard"
            required
            fullWidth
            id="firstName"
            label="First name"
            name="firstName"
            value={registerInfo.firstName}
            InputLabelProps={{ shrink: registerInfo.firstName ? true : false }}
            onChange={handleForm}
            error={errors.firstName}
            helperText={
              errors.firstName && <HelperTexts texts={errors.firstName} />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            autoCapitalize
            required
            fullWidth
            id="lastName"
            label="Last name"
            name="lastName"
            value={registerInfo.lastName}
            InputLabelProps={{ shrink: registerInfo.lastName ? true : false }}
            onChange={handleForm}
            error={errors.lastName}
            helperText={
              errors.lastName && <HelperTexts texts={errors.lastName} />
            }
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
            value={registerInfo.email}
            InputLabelProps={{ shrink: registerInfo.email ? true : false }}
            onChange={handleForm}
            error={errors.email}
            helperText={errors.email && <HelperTexts texts={errors.email} />}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="standard"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={registerInfo.password}
            InputLabelProps={{ shrink: registerInfo.password ? true : false }}
            onChange={handleForm}
            error={errors.password}
            helperText={
              errors.password && <HelperTexts texts={errors.password} />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            required
            fullWidth
            value={registerInfo.confirm_password}
            InputLabelProps={{
              shrink: registerInfo.confirm_password ? true : false,
            }}
            name="confirm_password"
            label="Repeat password"
            type="password"
            id="confirm_password"
            onChange={handleForm}
            error={errors.confirm_password}
            helperText={
              errors.confirm_password && (
                <HelperTexts texts={errors.confirm_password} />
              )
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="standard"
            required
            fullWidth
            value={registerInfo.phone}
            InputLabelProps={{ shrink: registerInfo.phone ? true : false }}
            type="number"
            id="phone"
            label="Phone number"
            name="phone"
            onChange={handleForm}
            error={errors.phone}
            helperText={errors.phone && <HelperTexts texts={errors.phone} />}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="standard"
            required
            fullWidth
            value={registerInfo.date_of_birth}
            InputLabelProps={{
              shrink: registerInfo.date_of_birth ? true : false,
            }}
            id="date_of_birth"
            label="Date of birth"
            name="date_of_birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleForm}
            error={errors.date_of_birth}
            helperText={
              errors.date_of_birth && (
                <HelperTexts texts={errors.date_of_birth} />
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="standard"
            required
            fullWidth
            value={registerInfo.address}
            InputLabelProps={{ shrink: registerInfo.address ? true : false }}
            id="address"
            label="Address line 1"
            name="address"
            onChange={handleForm}
            error={errors.address}
            helperText={
              errors.address && <HelperTexts texts={errors.address} />
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
