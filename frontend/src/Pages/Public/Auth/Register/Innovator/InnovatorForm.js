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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Upload from "../../../../../components/Upload";

const useStyles = makeStyles((theme) => ({}));

export default function Index({ file, handleUpload, errors }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        <strong>Innovation details</strong>
      </Typography>

      <CardActionArea>
        <CardMedia
          component="img"
          alt="Innovation"
          height="200"
          width="200"
          image="/static/images/innovation.jpg"
          title="Innovation"
        />
        <CardContent>
          <Typography gutterBottom variant="body2">
            <b> What we look for?</b>
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Innovation is the practical implementation of ideas that result in
            the introduction of new goods or services or improvement in offering
            goods or services. ISO TC 279 on innovation management proposes in
            the standards, ISO 56000:2020 to define innovation as "a new or
            changed entity creating or redistributing value".
          </Typography>
          <Button size="small" color="primary" variant="outlined">
            Learn More
          </Button>
        </CardContent>
      </CardActionArea>

      <CardContent>
        <Typography gutterBottom variant="body2">
          <b>Need opportunity? Submit us your idea</b>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Innovation is the practical implementation of ideas that result in the
          introduction of new goods or services or improvement in offering goods
          or services.
        </Typography>
        <Typography variant="caption" gutterBottom>
          <br />
          {errors.file && <HelperTexts texts={errors.file} />}
          (Maximum file size allowed = 25mb)
        </Typography>
        <Upload handleFileChange={handleUpload} file={file} />
      </CardContent>
    </>
  );
}
